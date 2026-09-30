/**
 * Single source of truth for identity, nav and social links.
 * Values marked TODO are placeholders — replace before launch.
 */
export const site = {
  name: 'Stuart May',
  url: 'https://alestaos.com',
  /** Used as the <title> suffix and in structured data. */
  title: 'Stuart May — Designer, Marketer, Game Developer',
  tagline: 'Visual design, brand marketing, and game & XR development.',
  description:
    'Portfolio of Stuart May — graphic design and brand marketing work, plus game and XR development from an MSc in Game Development.',
  locale: 'en_GB',
  /** TODO: confirm before launch — this address goes public. */
  email: 'hello@alestaos.com',
} as const;

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Alestaos' },
  // TODO: replace with your real itch.io and LinkedIn handles.
  //{ label: 'itch.io', href: 'https://alestaos.itch.io' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/stuartmay90' },
] as const;

export const nav = [
  { label: 'Games & XR', href: '/work#games' },
  { label: 'Marketing', href: '/work#writing' },
  { label: 'Design', href: '/work#design' },
  { label: 'About', href: '/about' },
] as const;
