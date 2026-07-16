# Restaurant Terrace — single-page site

Marketing page for Restaurant Terrace (რესტორანი ტერასა), Expo Georgia,
118 Akaki Tsereteli Ave, Tbilisi.

## Run

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build + prerendered HTML in dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Swapping in real photos

Every image on the page comes from one file: `src/config/media.ts`.
Replace any `src` URL (and its `alt` text) — nothing else needs to change.
Aspect ratios are locked by the layout, so photos are cropped to fit
(`object-fit: cover`); portrait photos work best for the 3/4 and 4/5 slots.

Current placeholders are Unsplash stock. They are not photos of the
restaurant.

## Editing copy

All text lives in `src/config/content.ts`. The Facebook URL is a
placeholder — set the real page URL there. Keep total page copy under
200 words.

## Structure

- `src/config/` — media + copy, the only files that need touching day-to-day
- `src/hooks/` — Lenis smooth scroll, scroll reveals, the one pinned section,
  the hero image trail (`useImageTrail`, pointer-only) and floating-card
  parallax (`useFloatCards`)
- `src/components/` — `Figure` (ratio-locked image), `SplitLines` (line reveal)
- `src/sections/` — Hero, Place, Fire, Table (filter pills + GSAP Flip), Find
- `src/Preloader.tsx` — counter tied to the hero image decode
- `scripts/prerender.mjs` — bakes full HTML into `dist/index.html` at build
  time, so the page is complete with JavaScript disabled

The palette is light (warm paper `#FAF7F0`, ink `#2A2622`); the hero wordmark
is Caveat, everything else Instrument Serif / Inter, Georgian in Noto Serif
Georgian. The hero image trail mounts only on `(pointer: fine)` devices — its
12 pooled cards ship without `src` attributes, so phones never download them.

Reduced motion (`prefers-reduced-motion: reduce`) disables the preloader,
smooth scroll, and every animation; the page renders in its final state.
