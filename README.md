# CineForge AI Video Editor

Production-style starter for a modern SaaS video editor built with Next.js, TypeScript, Tailwind, Zustand, FFmpeg.wasm, React DnD-ready timeline scaffolding, and Konva preview canvas.

## Run

```bash
npm install
npm run dev
```

## Included
- Landing page + core app routes (dashboard/editor/templates/pricing/profile/settings/auth)
- Dark premium glassmorphism UI baseline
- Zustand editor store (media + timeline + selection + zoom)
- FFmpeg hook with progress tracking
- IndexedDB project save helper
- Editor workspace with media library, preview canvas, timeline shell, floating toolbar

## Next production steps
- Add Web Worker FFmpeg bridge
- Implement true drag/drop multi-track timeline via React DnD
- Add undo/redo stack + keyframe engine
- Wire auth providers (Google/GitHub) via NextAuth
- Add API layer, rate limiting, collaboration websocket service
- Add PWA + offline caching + autosave recovery
