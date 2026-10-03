/**
 * /llms.txt — a plain-text map of the site for AI assistants and answer
 * engines (https://llmstxt.org). Generated from the content collections and
 * results data at build time, so it never drifts from the site itself.
 */
import type { APIRoute } from 'astro';
import { site, socials } from '../config';
import { getAllWork, disciplines, hrefFor } from '../lib/collections';
import { resultGroups } from '../data/results';

const abs = (path: string) => new URL(path, site.url).href;

export const GET: APIRoute = async () => {
  const work = await getAllWork();
  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is a digital marketing executive and designer, with in-house roles at Beara Beara (handcrafted leather bags), Flemings Department Store (Monaghan, including its Toymaster and Expert departments) and Mersus Technologies (VR training). Qualifications: a Bachelor of Business (Hons) in Digital Marketing and a Professional Diploma in Graphic Design; currently studying for an MSc in Game Development & XR.`,
    '',
    '## Key pages',
    '',
    `- [Work](${abs('/work')}): every case study, grouped by discipline`,
    `- [Results](${abs('/results')}): measured campaign and channel results by employer`,
    `- [About](${abs('/about')}): background, experience and a contact form`,
    ...socials.map((s) => `- [${s.label}](${s.href})`),
    '',
    '## Results highlights',
    '',
  ];

  for (const group of resultGroups) {
    lines.push(`### ${group.org} (${group.role}, ${group.period})`, '');
    for (const section of group.sections) {
      for (const stat of section.stats) {
        lines.push(`- ${stat.label}: ${stat.value} (${stat.context})`);
      }
    }
    lines.push('');
  }

  for (const key of ['writing', 'design', 'games'] as const) {
    const entries = work[key];
    if (!entries.length) continue;
    lines.push(`## ${disciplines[key].label}`, '', disciplines[key].blurb, '');
    for (const entry of entries) {
      const client = 'client' in entry.data ? ` (${entry.data.client}, ${entry.data.year})` : ` (${entry.data.year})`;
      lines.push(`- [${entry.data.title}](${abs(hrefFor(entry))})${client}: ${entry.data.summary}`);
    }
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
