/**
 * Single source of truth for identity, nav and social links.
 * Values marked TODO are placeholders — replace before launch.
 */
export const site = {
  name: 'Stuart May',
  url: 'https://alestaos.com',
  /** Used as the <title> suffix and in structured data. */
  title: 'Stuart May — Digital Marketer & Designer',
  tagline: 'Digital marketing, graphic design, and 3D & XR work.',
  description:
    'Stuart May, digital marketing executive and designer: campaigns, social and video for retail, lifestyle and tech brands, plus graphic design and 3D work.',
  locale: 'en_GB',
  /**
   * Web3Forms access key for the contact form. Messages are delivered to the
   * address the key was created for (stuartgrahammay@outlook.com), so the
   * address itself never appears in the page. Create one at
   * https://web3forms.com and paste it here. It's designed to be public.
   * While it's empty, the form shows a fallback note instead of submitting.
   */
  contactFormKey: '',
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
  { label: 'Results', href: '/results' },
  { label: 'About', href: '/about' },
] as const;
