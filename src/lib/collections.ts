import { getCollection, type CollectionEntry } from 'astro:content';

export type WorkCollection = 'design' | 'games' | 'writing';

export type WorkEntry =
  | CollectionEntry<'design'>
  | CollectionEntry<'games'>
  | CollectionEntry<'writing'>;

/** Presentation metadata per discipline: label, colour token, route prefix. */
export const disciplines = {
  design: {
    id: 'design',
    label: 'Design',
    blurb: 'Identity, print, web and photo-manipulation work, from client briefs to coursework and experiments.',
    accent: 'var(--color-design)',
    href: '/design',
    banner: {
      title: 'The DeviantArt Era (2003–2011)',
      detail: 'Where my creative journey began: 37 recovered pieces from my early Photoshop years as Neo Android, from fan art and photo edits to an early website concept.',
      href: '/design/deviantart-era',
      linkLabel: 'Explore the archive',
    },
  },
  games: {
    id: 'games',
    label: 'Games & XR',
    blurb: "3D modelling and interactive projects, including what I'm learning in Blender.",
    accent: 'var(--color-games)',
    href: '/games',
  },
  writing: {
    id: 'writing',
    label: 'Marketing',
    blurb: 'Campaigns, social content and video for retail, lifestyle and tech brands.',
    accent: 'var(--color-writing)',
    href: '/writing',
    note: "I've created a lot of video content for brands that isn't hosted here. If you'd like to see more of my video editing, get in touch and I'll send links to the videos live on the brands' TikTok and Instagram channels.",
    banner: {
      title: 'Finalist, Best Student — Digital Media Awards Ireland 2025',
      detail: 'Shortlisted for my final-year digital marketing project at TUS Athlone, built around the challenges Mersus Technologies was facing.',
      href: 'https://www.linkedin.com/posts/stuartmay90_dma2025-activity-7370502087454904320-MOeb',
      linkLabel: 'See the announcement',
    },
  },
} as const satisfies Record<WorkCollection, {
  id: WorkCollection;
  label: string;
  blurb: string;
  accent: string;
  href: string;
  /** Optional callout shown under the section heading on /work. */
  note?: string;
  /** Optional full-width banner shown after the section's grid on /work. */
  banner?: { title: string; detail?: string; href?: string; linkLabel?: string };
}>;

/** The DeviantArt Era: early personal work, kept as a separate archive within Design. */
export const archive = {
  title: 'The DeviantArt Era',
  period: '2003–2011',
  subtitle: 'Where my creative journey began.',
  href: '/design/deviantart-era',
  seoTitle: 'The DeviantArt Era (2003–2011)',
  description:
    'Explore the early creative work of Stuart May, formerly Neo Android, including Photoshop compositions, fan art, photography, abstract graphics and early website designs.',
  notice:
    'Historical personal artwork created during 2003–2011. Some pieces incorporate third-party characters, illustrations or photographs. Original source imagery and characters remain the property of their respective rights holders.',
  categories: [
    {
      id: 'compositing',
      label: 'Digital Compositing & Fan Art',
      blurb: 'Anime, video game, celebrity and fantasy-inspired compositions, including the signature-style work.',
    },
    {
      id: 'photography',
      label: 'Photography & Image Manipulation',
      blurb: 'Photographic edits, stylised animal portraits, urban compositions, environmental artwork and personal photography.',
    },
    {
      id: 'web',
      label: 'Early Web Design',
      blurb: 'Historical website layout experiments, particularly the Heaven on Earth concept.',
    },
    {
      id: 'identity',
      label: 'Visual Identity & Community Graphics',
      blurb: 'Avatars, decorative signatures, emblems, banners and community graphics.',
    },
    {
      id: 'abstract',
      label: 'Abstract & Experimental Design',
      blurb: 'Textures, symmetrical ornamental designs, geometric compositions and miscellaneous Photoshop experiments.',
    },
  ],
} as const;

export type ArchiveCategory = (typeof archive.categories)[number]['id'];

/** Drafts are visible while developing, hidden in production builds. */
const isVisible = (entry: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !entry.data.draft;

const isArchived = (entry: WorkEntry) => 'archive' in entry.data && !!entry.data.archive;

/** Newest first; `order` breaks ties within a year. */
const byRecency = (a: WorkEntry, b: WorkEntry) =>
  b.data.year - a.data.year || a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

/** Current work only; archive entries live on their own page via getArchive. */
export async function getWork(collection: WorkCollection) {
  const entries = await getCollection(collection, isVisible);
  return entries.filter((entry) => !isArchived(entry)).sort(byRecency);
}

/** DeviantArt Era entries: highlights first, then the curated `order`. */
export async function getArchive() {
  const entries = await getCollection('design', (entry) => isVisible(entry) && !!entry.data.archive);
  return entries.sort(
    (a, b) =>
      Number(b.data.archive!.highlight) - Number(a.data.archive!.highlight) ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

/** "2003–2011" for archive entries, the year otherwise. */
export const periodFor = (entry: WorkEntry) =>
  'archive' in entry.data && entry.data.archive ? entry.data.archive.period : String(entry.data.year);

export async function getAllWork() {
  const [design, games, writing] = await Promise.all([
    getWork('design'),
    getWork('games'),
    getWork('writing'),
  ]);
  return { design, games, writing };
}

export async function getFeatured(limit = 6) {
  const { design, games, writing } = await getAllWork();
  const all = [...design, ...games, ...writing];
  const featured = all
    .filter((entry) => entry.data.featured)
    .sort(
      (a, b) =>
        (a.data.featuredOrder ?? Infinity) - (b.data.featuredOrder ?? Infinity) || byRecency(a, b),
    );
  // Fall back to most recent so the homepage is never empty before content lands.
  return (featured.length ? featured : all.sort(byRecency)).slice(0, limit);
}

export const hrefFor = (entry: WorkEntry) =>
  `${disciplines[entry.collection as WorkCollection].href}/${entry.id}`;
