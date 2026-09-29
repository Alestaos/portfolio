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
    blurb: 'Brand systems, campaign artwork and visual identity built for real briefs.',
    accent: 'var(--color-design)',
    href: '/design',
  },
  games: {
    id: 'games',
    label: 'Games & XR',
    blurb: 'Playable prototypes and XR experiments, most from my MSc coursework.',
    accent: 'var(--color-games)',
    href: '/games',
  },
  writing: {
    id: 'writing',
    label: 'Marketing',
    blurb: 'Campaigns and content with the numbers they moved.',
    accent: 'var(--color-writing)',
    href: '/writing',
  },
} as const satisfies Record<WorkCollection, {
  id: WorkCollection;
  label: string;
  blurb: string;
  accent: string;
  href: string;
}>;

/** Drafts are visible while developing, hidden in production builds. */
const isVisible = (entry: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !entry.data.draft;

/** Newest first; `order` breaks ties within a year. */
const byRecency = (a: WorkEntry, b: WorkEntry) =>
  b.data.year - a.data.year || a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

export async function getWork(collection: WorkCollection) {
  const entries = await getCollection(collection, isVisible);
  return entries.sort(byRecency);
}

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
  const featured = all.filter((entry) => entry.data.featured).sort(byRecency);
  // Fall back to most recent so the homepage is never empty before content lands.
  return (featured.length ? featured : all.sort(byRecency)).slice(0, limit);
}

export const hrefFor = (entry: WorkEntry) =>
  `${disciplines[entry.collection as WorkCollection].href}/${entry.id}`;
