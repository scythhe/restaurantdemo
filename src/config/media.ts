/**
 * Single source of truth for every image on the site.
 *
 * Real photos of Stories live in /public/img — the `web-*.jpg` files are
 * resized/compressed for the web (originals kept alongside). Anything still
 * on images.unsplash.com is a stand-in for a real menu item; swap it the
 * moment the client sends a proper photo. `ratio` is locked by the layout.
 *
 * NOTE: /public/img also holds six 203px Google-Maps thumbnails (breakfast,
 * dessert, fruitsalad, pie, salad, tiramisu) — too low-res for any slot on
 * this layout. Ask the client's photographer for the originals.
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export type Ratio = '1/1' | '3/4' | '4/5' | '16/9';

export interface MediaItem {
  src: string;
  alt: string;
  ratio: Ratio;
}

export const MEDIA = {
  /* ── Real photos of Stories ── */
  hero: {
    src: '/img/web-outsideview.jpg',
    alt: 'The Stories storefront window on Galaktion Tabidze, warm bulbs behind the glass',
    ratio: '3/4',
  },
  place: {
    src: '/img/web-interier.jpg',
    alt: 'Inside Stories: framed Tbilisi sketches above the teal banquette',
    ratio: '4/5',
  },
  room: {
    src: '/img/web-interierforbackground.jpg',
    alt: 'The long teal banquette with mustard cushions inside Stories',
    ratio: '16/9',
  },
  doubleCappuccino: {
    src: '/img/web-coffeeuncropped.jpg',
    alt: 'Double cappuccino on the terrace, daisies on the table',
    ratio: '3/4',
  },
  pumpkinSoup: {
    src: '/img/web-pumpkincreamsoup.jpg',
    alt: 'Pumpkin cream soup with toasted seeds, served on the terrace',
    ratio: '3/4',
  },

  /* ── Stand-ins for real menu items (replace with client photos) ── */
  brewBar: {
    src: u('photo-1442512595331-e89e73853f31', 1080),
    alt: 'Filter coffee being poured at the brew bar',
    ratio: '4/5',
  },
  filterCoffee: {
    src: u('photo-1509042239860-f550ce710b93', 1080),
    alt: 'Filter coffee served black',
    ratio: '1/1',
  },
  matchaLatte: {
    src: u('photo-1536256263959-770b48d82b0a', 1080),
    alt: 'Matcha latte with leaf art',
    ratio: '3/4',
  },
  scramble: {
    src: u('photo-1525351484163-7529414344d8', 1080),
    alt: 'Eggs on sourdough with greens',
    ratio: '1/1',
  },
  avocadoToast: {
    src: u('photo-1541519227354-08fa5d50c44d', 1080),
    alt: 'Avocado toast with soft egg',
    ratio: '1/1',
  },
  syrniki: {
    src: u('photo-1567620905732-2d1ec7ab7445', 1080),
    alt: 'Syrniki stack with honey being poured',
    ratio: '3/4',
  },
  sandwich: {
    src: u('photo-1550507992-eb63ffee0847', 1080),
    alt: 'Baguette sandwich with cheese and greens',
    ratio: '1/1',
  },
  croissant: {
    src: u('photo-1555507036-ab1f4038808a', 1080),
    alt: 'Croissants dusted with sugar',
    ratio: '1/1',
  },
  cheesecake: {
    src: u('photo-1565958011703-44f9829ba187', 1080),
    alt: 'A slice of cheesecake',
    ratio: '4/5',
  },
  cakeOfDay: {
    src: u('photo-1578985545062-69928b1d9587', 1080),
    alt: 'Chocolate layer cake, the cake of the day',
    ratio: '3/4',
  },
} as const satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof MEDIA;

/** Intrinsic width/height attributes derived from the locked ratio (CLS = 0). */
export function ratioBox(ratio: Ratio, base = 1200): { width: number; height: number } {
  const [w, h] = ratio.split('/').map(Number);
  return { width: base, height: Math.round((base * h) / w) };
}
