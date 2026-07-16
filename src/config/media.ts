/**
 * Single source of truth for every image on the site.
 * Swap any `src` for a real photo; nothing else needs to change.
 * `ratio` is locked by the layout — the file's natural size is irrelevant.
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
  hero: {
    src: u('photo-1552566626-52f8b828add9', 1080),
    alt: 'Terrace tables in the evening, lit warm under the trees',
    ratio: '3/4',
  },
  heroWide: {
    src: u('photo-1414235077428-338989a2e8c0', 1920),
    alt: 'Terrace tables in the evening, lit warm under the trees',
    ratio: '16/9',
  },
  place: {
    src: u('photo-1441974231531-c6227db76b6e', 1080),
    alt: 'Old trees on the ExpoGeorgia grounds',
    ratio: '4/5',
  },
  oven: {
    src: u('photo-1533134242443-d4fd215305ad', 1080),
    alt: 'Fire inside the wood-burning oven',
    ratio: '4/5',
  },
  pizza: {
    src: u('photo-1513104890138-7c749659a591', 1080),
    alt: 'Wood-fired pizza, blistered crust',
    ratio: '1/1',
  },
  salmon: {
    src: u('photo-1467003909585-2f8a72700288', 1080),
    alt: 'Grilled salmon fillet on a plate',
    ratio: '1/1',
  },
  khachapuri: {
    src: u('photo-1509440159596-0249088772ff', 1600),
    alt: 'Khachapuri fresh from the oven',
    ratio: '1/1',
  },
  cheesecake: {
    src: u('photo-1565958011703-44f9829ba187', 1080),
    alt: 'A slice of cheesecake',
    ratio: '4/5',
  },
  clubSandwich: {
    src: u('photo-1528735602780-2552fd46c7af', 1080),
    alt: 'Club sandwich cut in half',
    ratio: '1/1',
  },
  salad: {
    src: u('photo-1546069901-ba9599a7e63c', 1080),
    alt: 'Chicken avocado salad in a bowl',
    ratio: '3/4',
  },
  soup: {
    src: u('photo-1547592166-23ac45744acd', 1080),
    alt: 'Mushroom cream soup',
    ratio: '1/1',
  },
  burger: {
    src: u('photo-1568901346375-23c9450c58cd', 1080),
    alt: 'Burger on a wooden board',
    ratio: '3/4',
  },
  mojito: {
    src: u('photo-1551024709-8f23befc6f87', 1080),
    alt: 'Mojito with mint and ice',
    ratio: '3/4',
  },
  coffee: {
    src: u('photo-1509042239860-f550ce710b93', 1080),
    alt: 'Coffee served black',
    ratio: '1/1',
  },
} as const satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof MEDIA;

/** Intrinsic width/height attributes derived from the locked ratio (CLS = 0). */
export function ratioBox(ratio: Ratio, base = 1200): { width: number; height: number } {
  const [w, h] = ratio.split('/').map(Number);
  return { width: base, height: Math.round((base * h) / w) };
}
