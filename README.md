# Veranda — single-page restaurant site (demo)

Portfolio/pitch demo of a marketing page for a fictional courtyard
restaurant, "Veranda" (ვერანდა), Tbilisi.

Contact for the demo: Nikoloz Berdznishvili · 599 14 82 42.

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

Current placeholders are Unsplash stock.

## Editing copy

All text lives in `src/config/content.ts` — brand name, nav, hours,
reviews, reservation copy, footer credit, socials (currently placeholder
URLs). The phone number appears in `content.ts` only.

## Structure

- `src/config/` — media + copy, the only files that need touching day-to-day
- `src/hooks/` — Lenis smooth scroll (+ `scrollToAnchor` for nav links),
  scroll reveals, the one pinned section, the hero image trail
  (`useImageTrail`, pointer-only) and floating-card parallax (`useFloatCards`)
- `src/components/` — `Figure` (ratio-locked image), `SplitLines` (line
  reveal), `Nav` (fixed glass bar + scroll-progress hairline), `Marquee`
  (CSS ticker divider)
- `src/sections/` — Hero (with CTAs), Place, Fire, Table (filter pills +
  GSAP Flip), Voices (reviews), Reserve (booking request form, demo-only
  submit — wire it to a booking API or WhatsApp link for production),
  Find (map + live open/closed dot), Footer
- `src/Preloader.tsx` — counter tied to the hero image decode
- `scripts/prerender.mjs` — bakes full HTML into `dist/index.html` at build
  time, so the page is complete with JavaScript disabled

The palette is light (warm paper `#FAF7F0`, ink `#2A2622`); the hero wordmark
is Caveat, everything else Instrument Serif / Inter, Georgian in Noto Serif
Georgian. The hero image trail mounts only on `(pointer: fine)` devices — its
12 pooled cards ship without `src` attributes, so phones never download them.

Reduced motion (`prefers-reduced-motion: reduce`) disables the preloader,
smooth scroll, marquee, and every animation; the page renders in its final
state. The nav is always visible in that mode (and without JS).
