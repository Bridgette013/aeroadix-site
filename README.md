# AEROADIX — Bespoke Automotive Aerodynamics

Single-page application built with **Vite + React + Tailwind CSS + Framer Motion**.

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Output goes to `/dist` — deploy that folder to Netlify, Vercel, or any static host.

## Project Structure

```
aeroadix-site/
├── public/
│   └── assets/
│       └── aeroadix-logo.png    ← Hero logo
├── src/
│   ├── App.jsx                  ← Full SPA (all sections)
│   ├── main.jsx                 ← React entry point
│   └── index.css                ← Tailwind directives + base styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Adding Product Images

Drop images into `public/assets/` and reference them as `/assets/filename.ext` in the JSX.

---

© 2026 AeroAdix Fabrication Solutions · A Division of 3DBoomPrint# aeroadix-site
