# ── Stage 1: Build the React app ─────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Serve with nginx ─────────────────────────────────────────────────
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Videos are mounted via Coolify volume:
# /data/coolify/volumes/bagcounter_videos -> /usr/share/nginx/html/videos

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
