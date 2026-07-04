# Titan Eye+ — Warranty AI Auditor Console (Demo)

A polished, 4-screen demo of an AI-driven eyewear warranty adjudication system,
built for a client walkthrough. All data is mock — no backend required.

## The auditor journey (demo flow)

1. **Login** (`/`) — branded, secure console entry. Any credentials sign you in.
2. **Command Center** (`/dashboard`) — KPIs + the exception-based review queue.
3. **AI Inspection** (`/inspect/:id`) — split-screen workspace with the 4-angle
   image matrix, live AI bounding boxes, confidence score, and keyboard-first
   approve/reject.
4. **Analytics** (`/analytics`) — turnaround + cost-saving impact, defect mix,
   and the AI accuracy climbing past the 90% target (continuous learning).

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (default http://localhost:5173).

## Keyboard shortcuts (Inspection page)

- `Enter` → Approve claim & return to queue
- `R` → Reject claim
- `Esc` → Back to queue

## Add real Titan photos

Drop `front.jpg`, `side.jpg`, `hinge.jpg`, `temple.jpg` into `public/images/`.
See `public/images/README.md` for defect + bounding-box instructions.

## Deploy

```bash
npm run build      # outputs static files to /dist
```

- **Vercel / Netlify:** push the repo — SPA routing is preconfigured
  (`vercel.json` / `public/_redirects`).
- **VPS (nginx):** serve `/dist` and add an SPA fallback:
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

## Customize the brand

Titan green + navy live in `tailwind.config.js` (`titan` / `navy` colors).
Adjust the hex to the exact brand values, and swap the wordmark for the real
logo in `src/components/Brand.jsx`.
