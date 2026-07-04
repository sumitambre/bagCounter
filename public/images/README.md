# Drop your Titan Eye+ frame photos here

The demo looks for these four files (the 4-angle matrix):

| File            | Angle shown | Suggested source photo                 |
|-----------------|-------------|----------------------------------------|
| `front.jpg`     | Front       | Straight-on front of the frame         |
| `side.jpg`      | Side        | Full side / temple profile             |
| `hinge.jpg`     | Hinge       | Close-up of the hinge                  |
| `temple.jpg`    | Temple      | Angled / temple-arm view               |

If a file is missing, the app shows a clean labeled placeholder instead — so
the demo never looks broken.

## Adding defects + bounding boxes

1. Edit the real photo to add the defect (scratch / crack) — keep the frame.
2. Ask the AI to return the defect location as **percentages**:
   `{ "x": 27.5, "y": 50.5, "width": 6.6, "height": 3.4 }`
3. Paste those numbers into `src/data/mockData.js` under the matching claim's
   `boxes.<Angle>` array. The rose bounding box will land on the defect and the
   "Show AI Bounding Boxes" toggle will control it.

Recommended image size: ~1000×750px, JPG, on a white/light background.
