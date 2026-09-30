import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Fields every discipline shares. Anything the card grid needs to render
 * lives here so ProjectCard can stay collection-agnostic.
 */
const common = ({ image }: { image: () => any }) => ({
  title: z.string(),
  summary: z.string().max(200),
  year: z.number().int().min(1990).max(2100),
  cover: image(),
  coverAlt: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  /** Lower sorts first within a year. */
  order: z.number().default(0),
});

const design = defineCollection({
  loader: glob({ base: './src/content/design', pattern: '**/*.md' }),
  schema: (ctx) =>
    z.object({
      ...common(ctx),
      client: z.string(),
      role: z.string(),
      deliverables: z.array(z.string()).default([]),
      tools: z.array(z.string()).default([]),
      gallery: z
        .array(z.object({ src: ctx.image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      /** Full print/PDF artefact — e.g. a brochure. Path under public/, or an external URL. */
      pdfUrl: z.string().optional(),
    }),
});

const games = defineCollection({
  loader: glob({ base: './src/content/games', pattern: '**/*.md' }),
  schema: (ctx) =>
    z.object({
      ...common(ctx),
      role: z.string(),
      engine: z.string(),
      platforms: z.array(z.string()).default([]),
      teamSize: z.number().int().positive().optional(),
      status: z.enum(['prototype', 'in-development', 'released', 'archived']).default('in-development'),
      /** Playable build. The grid badges entries that have one. */
      itchUrl: z.url().optional(),
      sourceUrl: z.url().optional(),
      trailerUrl: z.url().optional(),
      /** Set for MSc coursework so it can be grouped as academic work. */
      course: z.string().optional(),
      gallery: z
        .array(z.object({ src: ctx.image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
    }),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: (ctx) =>
    z.object({
      ...common(ctx),
      client: z.string(),
      role: z.string(),
      channels: z.array(z.string()).default([]),
      /** Short outcome strings, e.g. "+38% organic sessions". */
      results: z.array(z.string()).default([]),
      externalUrl: z.url().optional(),
      gallery: z
        .array(z.object({ src: ctx.image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
    }),
});

export const collections = { design, games, writing };
