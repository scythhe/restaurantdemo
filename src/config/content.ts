/**
 * Every string of copy on the page. Edit here, not in components.
 * Keep the voice: short, concrete, unhurried. No exclamation marks.
 */

import type { MediaKey } from './media';

export const CONTENT = {
  brand: {
    nameEn: 'Veranda',
    nameKa: 'ვერანდა',
    tagline: 'Courtyard restaurant · Tbilisi',
  },

  nav: {
    links: [
      { label: 'The place', href: '#place' },
      { label: 'The fire', href: '#fire' },
      { label: 'Menu', href: '#menu' },
      { label: 'Find us', href: '#find' },
    ],
    cta: 'Reserve',
  },

  hero: {
    titleEn: 'Veranda',
    titleKa: 'რესტორანი ვერანდა',
    line: 'A courtyard off the avenue. Under the trees.',
    rating: '4.9 ★ · loved by locals',
    hint: 'move your cursor',
    ctaPrimary: { label: 'Reserve a table', href: '#reserve' },
    ctaSecondary: { label: 'See the menu', href: '#menu' },
  },

  place: {
    eyebrow: 'The place',
    heading: 'Quiet, for a city.',
    body:
      'A hidden courtyard terrace just off the avenue. ' +
      'Old trees, room between the tables, good wine, cool music. ' +
      'Most people walk past the gate without knowing it is here.',
    facts: [
      { value: 'Est. 2019', label: 'Same courtyard since' },
      { value: '80', label: 'Seats under the trees' },
      { value: '40+', label: 'Dishes & natural wines' },
    ],
  },

  fire: {
    heading: 'The Fire',
    line: 'The oven burns wood. Start with the pizza.',
    khachapuriLine: 'Khachapuri, of course.',
  },

  marquee: ['Wood fire', 'Old trees', 'Natural wine', 'Slow evenings', 'ვერანდა'],

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

  voices: {
    eyebrow: 'Word of mouth',
    heading: 'People talk.',
    reviews: [
      {
        quote:
          'The kind of place you keep to yourself. Wood-fired everything, and the terrace at dusk is unreal.',
        name: 'Mariam K.',
      },
      {
        quote: 'Best khachapuri this side of the river — and the cheesecake deserves its own paragraph.',
        name: 'Giorgi T.',
      },
      {
        quote: 'We came for a quick lunch and stayed until the lights came on.',
        name: 'Ana D.',
      },
    ],
  },

  reserve: {
    eyebrow: 'Reservations',
    heading: 'Book a table.',
    line:
      'Evenings fill up fast, Friday to Sunday especially. ' +
      'Leave your details and we will call to confirm.',
    fields: {
      name: 'Your name',
      phone: 'Phone',
      guests: 'Guests',
      date: 'Date',
      time: 'Time',
    },
    guestOptions: ['2', '3', '4', '5', '6', '7', '8+'],
    submit: 'Request a table',
    success: 'Got it. We will call you shortly to confirm.',
    or: 'Or just call —',
  },

  find: {
    eyebrow: 'Find us',
    heading: 'Come by.',
    address: '12 Petriashvili St, Vera, Tbilisi 0179',
    phoneLabel: '599 14 82 42',
    phoneHref: 'tel:+995599148242',
    hours: 'Open daily from 12:00',
    openHour: 12,
    /** Closing hour per weekday, Sunday-first (matches footer.hours). */
    closeHours: [22, 23, 23, 23, 23, 24, 24],
    services: ['Dine-in', 'Terrace', 'Takeaway'],
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/' }, // placeholder — set the real page
      { label: 'Facebook', href: 'https://www.facebook.com/' }, // placeholder — set the real page
    ],
    mapEmbed:
      'https://maps.google.com/maps?q=12%20Petriashvili%20St%2C%20Tbilisi&z=16&output=embed',
    mapLink: 'https://maps.google.com/?q=12%20Petriashvili%20St%2C%20Tbilisi',
  },

  footer: {
    blurb: 'A courtyard restaurant in Vera. Wood-fired kitchen, old trees, slow evenings.',
    hoursTitle: 'Hours',
    hours: [
      { days: 'Monday – Thursday', time: '12:00 – 23:00' },
      { days: 'Friday – Saturday', time: '12:00 – 00:00' },
      { days: 'Sunday', time: '12:00 – 22:00' },
    ],
    visitTitle: 'Visit',
    followTitle: 'Follow',
    note: '© 2026 Veranda · Tbilisi',
    credit: {
      label: 'Website by Nikoloz Berdznishvili',
      phone: '599 14 82 42',
      href: 'tel:+995599148242',
    },
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
} as const;
