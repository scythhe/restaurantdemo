/**
 * Every string of copy on the page. Edit here, not in components.
 * Keep the voice: short, concrete, unhurried. No exclamation marks.
 *
 * Client: Stories Tbilisi Coffee & Tea (სთორის თბილისი)
 * 9 Galaktion Tabidze St, Tbilisi · 599 00 33 47 · open daily until 20:00
 */

import type { MediaKey } from './media';

export const CONTENT = {
  brand: {
    nameEn: 'Stories',
    nameKa: 'სთორის თბილისი',
    tagline: 'Coffee & tea · Tbilisi',
  },

  nav: {
    links: [
      { label: 'The place', href: '#place' },
      { label: 'The coffee', href: '#fire' },
      { label: 'Menu', href: '#menu' },
      { label: 'Find us', href: '#find' },
    ],
    cta: 'Reserve',
  },

  hero: {
    titleEn: 'Stories',
    titleKa: 'სთორის · coffee & tea',
    line: 'Coffee, tea and slow mornings on Galaktion Tabidze.',
    rating: '4.5 ★ · 522 Google reviews',
    hint: 'move your cursor',
    ctaPrimary: { label: 'Book a table', href: '#reserve' },
    ctaSecondary: { label: 'See the menu', href: '#menu' },
  },

  place: {
    eyebrow: 'The place',
    heading: 'More than coffee.',
    body:
      'A small coffee bar on Galaktion Tabidze, a few steps from Freedom Square. ' +
      'Stories is about the moments people choose to share here — slow breakfasts, ' +
      'terrace mornings, one more chapter before you go.',
    facts: [
      { value: '4.5 ★', label: 'Google rating' },
      { value: '522', label: 'Reviews & counting' },
      { value: '10–30 ₾', label: 'Per person' },
    ],
  },

  fire: {
    heading: 'The Coffee',
    line: 'Beans dialed in every morning. Start with the double cappuccino.',
    kicker: 'Espresso, filter, matcha — and honey cake, of course.',
  },

  marquee: ['Double cappuccino', 'Filter', 'Matcha', 'Honey cake', 'Syrniki', 'სთორის'],

  table: {
    eyebrow: 'The menu',
    heading: 'Breakfast till closing.',
    line: 'The honey cake and syrniki come up in reviews more than anything else.',
    items: [
      { key: 'doubleCappuccino', name: 'Double cappuccino' },
      { key: 'scramble', name: 'Scramble with green salad' },
      { key: 'syrniki', name: 'Syrniki' },
      { key: 'avocadoToast', name: 'Avocado toast' },
      { key: 'matchaLatte', name: 'Matcha latte' },
      { key: 'pumpkinSoup', name: 'Pumpkin cream soup' },
      { key: 'sandwich', name: 'Sandwiches' },
      { key: 'cheesecake', name: 'Cheesecake' },
      { key: 'filterCoffee', name: 'Filter coffee' },
      { key: 'cakeOfDay', name: 'Cake of the day' },
      { key: 'croissant', name: 'Croissants' },
    ] as ReadonlyArray<{ key: MediaKey; name: string }>,
    filters: [
      { id: 'all', label: 'All', keys: null },
      { id: 'coffee', label: 'Coffee & tea', keys: ['doubleCappuccino', 'filterCoffee', 'matchaLatte'] },
      { id: 'breakfast', label: 'Breakfast', keys: ['scramble', 'avocadoToast', 'syrniki'] },
      { id: 'lunch', label: 'Lunch', keys: ['pumpkinSoup', 'sandwich'] },
      { id: 'sweet', label: 'Sweet', keys: ['croissant', 'cheesecake', 'cakeOfDay'] },
    ] as ReadonlyArray<{ id: string; label: string; keys: readonly MediaKey[] | null }>,
  },

  voices: {
    eyebrow: 'Google reviews',
    heading: 'People talk.',
    line: '4.5 stars across 522 reviews. A few favourites:',
    reviews: [
      {
        quote:
          'I discovered it while on vacation in Tbilisi — and kept coming back almost every single day for breakfast, coffee and matcha.',
        name: 'Evelina S.',
        stars: 5,
      },
      {
        quote: 'Best coffee terrace in the city. Everything feels so aesthetic.',
        name: 'A. S.',
        stars: 5,
      },
      {
        quote:
          'Plenty of pastries, desserts and croissants inside — and the filter coffee was excellent.',
        name: 'Büşra',
        stars: 4,
      },
    ],
  },

  reserve: {
    eyebrow: 'Reserve & order',
    heading: 'Your table, your corner.',
    line:
      'Terrace mornings go fast. Book ahead — ' +
      'or get Stories delivered anywhere in Tbilisi.',
    wolt: {
      label: 'Order on Wolt',
      // placeholder — replace with the exact Wolt venue URL
      href: 'https://wolt.com/en/discovery/search?q=stories%20tbilisi',
    },
    fields: {
      name: 'Your name',
      phone: 'Phone',
      guests: 'Guests',
      date: 'Date',
      time: 'Time',
    },
    guestOptions: ['1', '2', '3', '4', '5', '6+'],
    submit: 'Request a table',
    success: 'Got it. We will call you shortly to confirm.',
    or: 'Or just call —',
  },

  find: {
    eyebrow: 'Find us',
    heading: 'Come by.',
    address: '9 Galaktion Tabidze St, Tbilisi 0105',
    phoneLabel: '599 00 33 47',
    phoneHref: 'tel:+995599003347',
    hours: 'Open daily until 20:00',
    openHour: 9, // confirm opening time with the client
    /** Closing hour per weekday, Sunday-first (matches footer.hours). */
    closeHours: [20, 20, 20, 20, 20, 20, 20],
    services: ['Dine-in', 'Kerbside pickup', 'Delivery'],
    note: 'LGBTQ+ friendly · everyone welcome',
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/' }, // placeholder — set the real page
      { label: 'Facebook', href: 'https://www.facebook.com/' }, // placeholder — set the real page
    ],
    mapEmbed:
      'https://maps.google.com/maps?q=Stories%20Tbilisi%20Coffee%20%26%20Tea%2C%209%20Galaktion%20Tabidze%20St%2C%20Tbilisi&z=17&output=embed',
    mapLink:
      'https://maps.google.com/?q=Stories%20Tbilisi%20Coffee%20%26%20Tea%2C%209%20Galaktion%20Tabidze%20St%2C%20Tbilisi',
  },

  footer: {
    blurb:
      'A small specialty coffee & tea bar on Galaktion Tabidze — breakfast all day, ' +
      'pastries from morning, a terrace under the trees.',
    hoursTitle: 'Hours',
    hours: [
      { days: 'Monday – Friday', time: '9:00 – 20:00' }, // confirm with the client
      { days: 'Saturday – Sunday', time: '9:00 – 20:00' },
    ],
    visitTitle: 'Visit',
    followTitle: 'Follow',
    note: '© 2026 Stories Tbilisi · Coffee & Tea',
    credit: {
      label: 'Website by Nikoloz Berdznishvili',
      phone: '599 14 82 42',
      href: 'tel:+995599148242',
    },
  },

  /** Short captions for the hero trail + floating cards. */
  captions: {
    doubleCappuccino: 'Cappuccino',
    matchaLatte: 'Matcha',
    syrniki: 'Syrniki',
    croissant: 'Croissants',
    cheesecake: 'Cheesecake',
    avocadoToast: 'Avocado toast',
    cakeOfDay: 'Cake',
    scramble: 'Scramble',
  } as Partial<Record<MediaKey, string>>,
} as const;
