# ── Stage 1: Build the React app ─────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Download video & serve with nginx ────────────────────────────────
FROM nginx:stable-alpine

# Install gdown to fetch the video from Google Drive
RUN apk add --no-cache python3 py3-pip && \
    pip3 install gdown --break-system-packages

# Copy built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Download the overlay video from Google Drive and compress to 720p for fast loading
RUN apk add --no-cache ffmpeg && \
    mkdir -p /usr/share/nginx/html/videos && \
    gdown 1kJWNR9RY6f3t6dthpYr8Wv8412kHE07S -O /tmp/overlay_raw.mp4 && \
    ffmpeg -y -i /tmp/overlay_raw.mp4 \
      -vf "scale=1280:720" -vcodec libx264 -pix_fmt yuv420p \
      -crf 28 -preset fast -movflags faststart \
      /usr/share/nginx/html/videos/0912_overlay_h264.mp4 && \
    rm /tmp/overlay_raw.mp4

# SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
