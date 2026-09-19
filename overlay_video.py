#!/usr/bin/env python3
"""
Overlay detection bounding boxes and the real counting line on the original video.

Usage:
    python3 overlay_video.py

Reads:
    - 0912.mov              (original video, 1914x1080, 30fps, 8915 frames)
    - detections (2).json   (per-frame detections with bbox, track_id, confidence)

Outputs:
    - 0912_overlay.mp4      (video with bounding boxes and counting line drawn)
"""

import json
import sys
import math
import cv2
import numpy as np
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────
VIDEO_IN   = Path(__file__).parent / "0912.mov"
JSON_IN    = Path(__file__).parent / "detections (2).json"
VIDEO_OUT  = Path(__file__).parent / "0912_overlay.mp4"

# Single unified color for ALL cement bag detections (BGR format)
# Bright vibrant safety amber/gold
DETECTION_COLOR = (0, 200, 255)
LINE_COLOR      = (0, 240, 120)       # Emerald green for the counting line
LINE_ACTIVE     = (0, 255, 255)       # Highlight color when crossing

# Counting line coordinates (real chute entry into truck bed)
LINE_START = (890, 160)
LINE_END   = (630, 620)

# Pre-loaded baseline bag in truck bed (bottom-left)
PRELOADED_BBOX = (195, 735, 365, 855)

BOX_THICKNESS   = 3
FONT            = cv2.FONT_HERSHEY_SIMPLEX
FONT_SCALE      = 0.7
FONT_THICKNESS  = 2
LABEL_PAD       = 8
CORNER_LEN      = 22

# Exact 11 chute crossing frame indices (Bags #2 to #12)
CROSSING_FRAMES = [765, 1658, 2414, 3330, 4014, 4346, 4848, 5780, 6158, 6733, 8827]
TOTAL_BAGS = 12


def draw_corner_brackets(frame, x1, y1, x2, y2, color, thickness=3, length=22):
    """Draw stylish corner brackets instead of a full rectangle."""
    # Top-left
    cv2.line(frame, (x1, y1), (x1 + length, y1), color, thickness)
    cv2.line(frame, (x1, y1), (x1, y1 + length), color, thickness)
    # Top-right
    cv2.line(frame, (x2, y1), (x2 - length, y1), color, thickness)
    cv2.line(frame, (x2, y1), (x2, y1 + length), color, thickness)
    # Bottom-left
    cv2.line(frame, (x1, y2), (x1 + length, y2), color, thickness)
    cv2.line(frame, (x1, y2), (x1, y2 - length), color, thickness)
    # Bottom-right
    cv2.line(frame, (x2, y2), (x2 - length, y2), color, thickness)
    cv2.line(frame, (x2, y2), (x2, y2 - length), color, thickness)


def draw_preloaded_bag(frame):
    """Draw bounding box on the pre-loaded bag resting in the truck bed at session start."""
    x1, y1, x2, y2 = PRELOADED_BBOX
    color = (0, 180, 240)

    # Subtle box
    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
    draw_corner_brackets(frame, x1, y1, x2, y2, color, thickness=BOX_THICKNESS, length=18)

    label = "#1 cement bag (in truck)"
    (tw, th), _ = cv2.getTextSize(label, FONT, 0.55, 2)
    lx1 = x1
    ly1 = y1 - th - 2 * LABEL_PAD
    lx2 = x1 + tw + 2 * LABEL_PAD
    ly2 = y1

    cv2.rectangle(frame, (lx1, ly1), (lx2, ly2), color, -1)
    text_x = lx1 + LABEL_PAD
    text_y = ly2 - LABEL_PAD
    cv2.putText(frame, label, (text_x, text_y), FONT, 0.55, (0, 0, 0), 2, cv2.LINE_AA)


def draw_detection(frame, det, classes):
    """Draw a single detection on the frame with unified single color."""
    bbox = det["bbox"]
    x1, y1, x2, y2 = int(bbox[0]), int(bbox[1]), int(bbox[2]), int(bbox[3])
    track_id = det["track_id"]
    conf = det["conf"]
    class_id = str(det["class_id"])
    class_name = classes.get(class_id, "cement bag")

    color = DETECTION_COLOR

    # Draw semi-transparent filled rectangle behind the box
    overlay = frame.copy()
    cv2.rectangle(overlay, (x1, y1), (x2, y2), color, -1)
    cv2.addWeighted(overlay, 0.12, frame, 0.88, 0, frame)

    # Draw main bounding box outline
    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

    # Draw stylish corner brackets
    draw_corner_brackets(frame, x1, y1, x2, y2, color, thickness=BOX_THICKNESS, length=CORNER_LEN)

    # ── Label ─────────────────────────────────────────────────────────────
    label = f"#{track_id} {class_name} {conf:.0%}"
    (tw, th), baseline = cv2.getTextSize(label, FONT, FONT_SCALE, FONT_THICKNESS)

    lx1 = x1
    ly1 = y1 - th - 2 * LABEL_PAD
    lx2 = x1 + tw + 2 * LABEL_PAD
    ly2 = y1

    if ly1 < 0:
        ly1 = y2
        ly2 = y2 + th + 2 * LABEL_PAD

    # Solid label background pill
    cv2.rectangle(frame, (lx1, ly1), (lx2, ly2), color, -1)

    # Label text (dark on bright background)
    text_x = lx1 + LABEL_PAD
    text_y = ly2 - LABEL_PAD
    cv2.putText(frame, label, (text_x, text_y), FONT, FONT_SCALE, (0, 0, 0), FONT_THICKNESS, cv2.LINE_AA)


def draw_counting_line(frame, is_crossing):
    """Draw the real IN/OUT counting line along the chute entry into the truck."""
    p1 = LINE_START
    p2 = LINE_END

    line_col = LINE_ACTIVE if is_crossing else LINE_COLOR
    thickness = 4 if is_crossing else 2

    # Draw dashed line
    dist = int(math.hypot(p2[0] - p1[0], p2[1] - p1[1]))
    num_dashes = 18
    for i in range(num_dashes):
        r1 = i / num_dashes
        r2 = (i + 0.6) / num_dashes
        x_a = int(p1[0] + r1 * (p2[0] - p1[0]))
        y_a = int(p1[1] + r1 * (p2[1] - p1[1]))
        x_b = int(p1[0] + r2 * (p2[0] - p1[0]))
        y_b = int(p1[1] + r2 * (p2[1] - p1[1]))
        cv2.line(frame, (x_a, y_a), (x_b, y_b), line_col, thickness, cv2.LINE_AA)

    # Draw line end markers
    cv2.circle(frame, p1, 5, line_col, -1)
    cv2.circle(frame, p2, 5, line_col, -1)

    # Label pill at midpoint of the line
    mx = int((p1[0] + p2[0]) / 2)
    my = int((p1[1] + p2[1]) / 2)

    label = "COUNTING LINE"
    (tw, th), _ = cv2.getTextSize(label, FONT, 0.45, 1)
    cv2.rectangle(frame, (mx - tw//2 - 6, my - th - 6), (mx + tw//2 + 6, my + 6), (15, 23, 42), -1)
    cv2.rectangle(frame, (mx - tw//2 - 6, my - th - 6), (mx + tw//2 + 6, my + 6), line_col, 1)
    cv2.putText(frame, label, (mx - tw//2, my - 2), FONT, 0.45, line_col, 1, cv2.LINE_AA)

    # Direction arrow pointing into truck (IN / LOADED)
    arrow_start = (mx + 35, my + 15)
    arrow_end = (mx - 25, my + 15)
    cv2.arrowedLine(frame, arrow_start, arrow_end, (0, 255, 150), 2, tipLength=0.35)
    cv2.putText(frame, "IN", (arrow_end[0] - 25, arrow_end[1] + 4), FONT, 0.45, (0, 255, 150), 1, cv2.LINE_AA)


def draw_hud(frame, frame_idx, num_detections, bags_loaded, total_frames, fps, is_crossing):
    """Draw a HUD overlay with frame info, live detection, and real bag count."""
    timestamp = frame_idx / fps
    minutes = int(timestamp // 60)
    seconds = timestamp % 60
    time_str = f"{minutes:02d}:{seconds:05.2f}"

    lines = [
        f"Frame  {frame_idx}/{total_frames}",
        f"Time   {time_str}",
        f"Active {num_detections} in chute",
        f"Loaded {bags_loaded}/{TOTAL_BAGS} bags",
    ]

    panel_w, panel_h = 320, 130
    overlay = frame.copy()
    cv2.rectangle(overlay, (10, 10), (10 + panel_w, 10 + panel_h), (11, 28, 52), -1)
    cv2.addWeighted(overlay, 0.75, frame, 0.25, 0, frame)
    cv2.rectangle(frame, (10, 10), (10 + panel_w, 10 + panel_h), (0, 200, 255), 1)

    # Title
    cv2.putText(frame, "TITANEYE CEMENTFLOW", (20, 35), FONT, 0.55, (0, 200, 255), 2, cv2.LINE_AA)
    for i, line in enumerate(lines):
        color = (0, 255, 120) if "Loaded" in line else (220, 220, 220)
        cv2.putText(frame, line, (20, 60 + i * 20), FONT, 0.48, color, 1, cv2.LINE_AA)

    # Detection status indicator
    if num_detections > 0:
        cv2.circle(frame, (panel_w - 15, 30), 6, (0, 255, 120), -1)
        cv2.circle(frame, (panel_w - 15, 30), 8, (0, 255, 120), 1)

    # Bag crossing toast animation in video
    if is_crossing and bags_loaded >= 2:
        toast_w, toast_h = 240, 45
        tx, ty = (frame.shape[1] - toast_w) // 2, 40
        overlay2 = frame.copy()
        cv2.rectangle(overlay2, (tx, ty), (tx + toast_w, ty + toast_h), (0, 180, 50), -1)
        cv2.addWeighted(overlay2, 0.85, frame, 0.15, 0, frame)
        cv2.rectangle(frame, (tx, ty), (tx + toast_w, ty + toast_h), (255, 255, 255), 2)
        cv2.putText(frame, f"BAG #{bags_loaded} LOADED", (tx + 18, ty + 28), FONT, 0.65, (255, 255, 255), 2, cv2.LINE_AA)


def main():
    print(f"Loading detections from {JSON_IN}...")
    with open(JSON_IN) as f:
        data = json.load(f)

    classes = data["classes"]
    frames_data = data["frames"]

    det_by_frame = {}
    for fd in frames_data:
        if fd["detections"]:
            det_by_frame[fd["frame_idx"]] = fd["detections"]

    print(f"  Classes: {classes}")
    print(f"  Total frames in JSON: {len(frames_data)}")
    print(f"  Frames with detections: {len(det_by_frame)}")

    print(f"\nOpening video: {VIDEO_IN}")
    cap = cv2.VideoCapture(str(VIDEO_IN))
    if not cap.isOpened():
        print(f"ERROR: Cannot open video {VIDEO_IN}")
        sys.exit(1)

    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps    = cap.get(cv2.CAP_PROP_FPS)
    total  = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    print(f"  Resolution: {width}x{height}")
    print(f"  FPS: {fps}")
    print(f"  Total frames: {total}")

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(str(VIDEO_OUT), fourcc, fps, (width, height))
    if not out.isOpened():
        print(f"ERROR: Cannot create output video {VIDEO_OUT}")
        sys.exit(1)

    print(f"\nWriting overlay video to: {VIDEO_OUT}")
    print(f"Single detection color: {DETECTION_COLOR}")
    print(f"Counting line: {LINE_START} -> {LINE_END}")
    print(f"Total bags tracked: {TOTAL_BAGS} (1 pre-loaded + 11 chute loading events)")
    print(f"Processing {total} frames...\n")

    frame_idx = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 1 pre-loaded bag at session start + bags that crossed the chute so far
        bags_loaded = 1 + sum(1 for cf in CROSSING_FRAMES if frame_idx >= cf)

        # Is currently crossing (within 20 frames of crossing)
        is_crossing = any(0 <= frame_idx - cf <= 20 for cf in CROSSING_FRAMES)

        # Draw counting line
        draw_counting_line(frame, is_crossing)

        # Draw detections with single unified color
        dets = det_by_frame.get(frame_idx, [])
        for det in dets:
            draw_detection(frame, det, classes)

        # Draw HUD
        draw_hud(frame, frame_idx, len(dets), bags_loaded, total, fps, is_crossing)

        out.write(frame)

        if frame_idx % 1000 == 0 or frame_idx == total - 1:
            pct = (frame_idx + 1) / total * 100
            print(f"  [{pct:5.1f}%] Frame {frame_idx + 1}/{total} | Bags loaded: {bags_loaded}/{TOTAL_BAGS}")

        frame_idx += 1

    cap.release()
    out.release()

    print(f"\n Done! Raw overlay saved to: {VIDEO_OUT}")


if __name__ == "__main__":
    main()
