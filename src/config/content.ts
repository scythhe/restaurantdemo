/**
 * Every string of copy on the page. Edit here, not in components.
 * Total on-page word budget: under 200. Count before adding.
 */

import type { MediaKey } from './media';

export const CONTENT = {
  hero: {
    titleEn: 'Restaurant Terrace',
    titleKa: 'რესტორანი ტერასა',
    line: 'Inside the old exhibition grounds. Under the trees.',
    rating: '4.6 ★ · 856 reviews',
    hint: 'move your cursor',
  },

  place: {
    eyebrow: 'The place',
    heading: 'Quiet, for a city.',
    body:
      'A terrace on the ExpoGeorgia grounds, off Tsereteli Avenue. ' +
      'Old trees, room between the tables, good wine, cool music. ' +
      'Most people walk past the gate without knowing it is here.',
  },

  fire: {
    heading: 'The Fire',
    line: 'The oven burns wood. Start with the pizza.',
    khachapuriLine: 'Khachapuri, of course.',
  },

  table: {
    eyebrow: 'The table',
    heading: 'The rest of it.',
    line: 'The cheesecake comes up in reviews more than anything else.',
    items: [
      { key: 'cheesecake', name: 'Cheesecake' },
      { key: 'clubSandwich', name: 'Club sandwich' },
      { key: 'pizza', name: 'Wood-fired pizza' },
      { key: 'salad', name: 'Chicken avocado salad' },
      { key: 'burger', name: 'Burger' },
      { key: 'khachapuri', name: 'Khachapuri' },
      { key: 'soup', name: 'Mushroom cream soup' },
      { key: 'salmon', name: 'Grilled salmon' },
      { key: 'mojito', name: 'Mojito' },
      { key: 'coffee', name: 'Coffee' },
    ] as ReadonlyArray<{ key: MediaKey; name: string }>,
    filters: [
      { id: 'all', label: 'All', keys: null },
      { id: 'fire', label: 'From the Fire', keys: ['pizza', 'salmon', 'khachapuri'] },
      { id: 'plates', label: 'Plates', keys: ['clubSandwich', 'salad', 'soup', 'burger'] },
      { id: 'sweet', label: 'Sweet', keys: ['cheesecake'] },
      { id: 'drinks', label: 'Drinks', keys: ['mojito', 'coffee'] },
    ] as ReadonlyArray<{ id: string; label: string; keys: readonly MediaKey[] | null }>,
  },

  /** Short captions for the hero trail + floating cards. */
  captions: {
    pizza: 'Pizza',
    cheesecake: 'Cheesecake',
    mojito: 'Mojito',
    coffee: 'Coffee',
    khachapuri: 'Khachapuri',
    salmon: 'Salmon',
    burger: 'Burger',
    clubSandwich: 'Club sandwich',
  } as Partial<Record<MediaKey, string>>,

  find: {
    eyebrow: 'Find us',
    heading: 'Come by.',
    address: 'Expo Georgia, 118 Akaki Tsereteli Ave, Tbilisi 0119',
    phoneLabel: '032 234 18 38',
    phoneHref: 'tel:+995322341838',
    hours: 'Open until 11pm',
    services: ['Dine-in', 'Takeaway', 'No-contact delivery'],
    facebook: {
      label: 'Facebook',
      href: 'https://www.facebook.com/', // placeholder — set the real page URL
    },
    mapEmbed:
      'https://maps.google.com/maps?q=Expo%20Georgia%2C%20118%20Akaki%20Tsereteli%20Ave%2C%20Tbilisi&z=16&output=embed',
    mapLink:
      'https://maps.google.com/?q=Expo%20Georgia%2C%20118%20Akaki%20Tsereteli%20Ave%2C%20Tbilisi',
  },
} as const;
