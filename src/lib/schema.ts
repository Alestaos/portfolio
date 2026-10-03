/**
 * JSON-LD builders. Every page carries the WebSite + Person graph so search
 * and answer engines resolve the same entity everywhere; case studies point
 * back at it by @id rather than repeating it.
 */
import { site, socials } from '../config';
import { disciplines, type WorkCollection, type WorkEntry } from './collections';

const abs = (path: string) => new URL(path, site.url).href;

export const personId = abs('/#person');
const websiteId = abs('/#website');

export const person = {
  '@type': 'Person',
  '@id': personId,
  name: site.name,
  url: site.url,
  image: abs('/og-default.png'),
  jobTitle: 'Digital Marketing Executive & Designer',
  description: site.description,
  sameAs: socials.map((s) => s.href),
  knowsAbout: [
    'Digital marketing',
    'Social media marketing',
    'Paid social advertising',
    'Search engine optimisation',
    'E-commerce marketing',
    'Email marketing',
    'Content creation',
    'Video editing',
    'Graphic design',
    'Photo manipulation',
    'Brand identity',
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Google Analytics 4',
    'Blender',
    'Unity',
    'Extended reality (XR)',
  ],
};

export const websiteGraph = [
  {
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: `${site.name} — Portfolio`,
    description: site.description,
    inLanguage: 'en-GB',
    author: { '@id': personId },
  },
  person,
];

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

/** CreativeWork + breadcrumbs for a single case study page. */
export function caseStudySchema(entry: WorkEntry, imagePath: string) {
  const collection = entry.collection as WorkCollection;
  const discipline = disciplines[collection];
  const path = `${discipline.href}/${entry.id}`;
  const data = entry.data;
  const client = 'client' in data ? data.client : undefined;
  const tools = 'tools' in data ? data.tools : [];

  return [
    {
      '@type': 'CreativeWork',
      '@id': abs(`${path}#work`),
      name: data.title,
      headline: data.title,
      description: data.summary,
      url: abs(path),
      image: abs(imagePath),
      dateCreated: String(data.year),
      inLanguage: 'en-GB',
      genre: discipline.label,
      keywords: [...data.tags, ...tools].join(', '),
      creator: { '@id': personId },
      author: { '@id': personId },
      ...(client ? { sourceOrganization: { '@type': 'Organization', name: client } } : {}),
      isPartOf: { '@id': websiteId },
    },
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
      { name: discipline.label, path: `/work#${collection}` },
      { name: data.title, path },
    ]),
  ];
}

/** A plain page that's about Stuart, e.g. /results or /work. */
export function pageSchema(name: string, path: string, description: string, type = 'WebPage') {
  return [
    {
      '@type': type,
      '@id': abs(`${path}#page`),
      name,
      url: abs(path),
      description,
      inLanguage: 'en-GB',
      isPartOf: { '@id': websiteId },
      ...(type === 'ProfilePage' ? { mainEntity: { '@id': personId } } : { about: { '@id': personId } }),
    },
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name, path },
    ]),
  ];
}
