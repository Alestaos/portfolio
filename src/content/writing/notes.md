---
title: "Notes — galleries and PDFs"
summary: "Internal note: what has to be true for a gallery to render, and how to link a full PDF, on a case study."
year: 2026
cover: ../../assets/projects/placeholder-writing.jpg
coverAlt: "Placeholder cover, unused — this entry is draft-only and never builds a page."
client: "—"
role: "—"
draft: true
---

Checklist for adding a gallery of images to a `writing` (or `design`/`games`)
entry. If the gallery isn't showing up, it's one of these.

## 1. The collection schema must have a `gallery` field

Defined in `src/content.config.ts`. `design` and `games` had it from the
start; `writing` didn't until the `example-paid-campaign` entry needed it.
If you add a new collection, or a `gallery` on one that doesn't have it yet,
add this to its schema:

```ts
gallery: z
  .array(z.object({ src: ctx.image(), alt: z.string(), caption: z.string().optional() }))
  .default([]),
```

Without this, any `gallery:` you write in frontmatter is silently stripped —
no build error, it just never reaches the page.

## 2. The frontmatter needs a `gallery` array

```yaml
gallery:
  - src: ../../assets/projects/<slug>/01-hero.jpg
    alt: "Required — describe the image."
    caption: "Optional."
  - src: ../../assets/projects/<slug>/02-story.jpg
    alt: "Required."
```

`alt` is required, `caption` isn't. Order in the array is render order.

## 3. The image files have to actually exist

`src` is a path relative to the `.md` file itself, same as `cover`. Point it
at real files under `src/assets/projects/<slug>/` — not `public/`, which
skips Astro's image optimization and isn't what `image()` in the schema
expects. Missing file = build fails, not a blank gallery.

## 4. That's it — no component needed in the body

The `gallery` section isn't something you place in the Markdown body. It's
read straight from frontmatter by `src/layouts/CaseStudy.astro`, which
renders it as its own section *after* the body content, automatically, only
when `gallery.length > 0`. The body (`## Headings` etc.) is separate and
unaffected either way.

## Checking it worked

`npm run build`, then check `dist/writing/<slug>/index.html` (or whichever
collection) for one `<figure>` per gallery image, or just `npm run dev` and
look at the page.

---

## Linking a full PDF (brochures, print pieces)

For something like a printed brochure, gallery a handful of representative
spreads/covers as images, then link the whole document as a PDF rather than
trying to gallery every page.

### 1. Currently `design`-only

`pdfUrl` is defined on the `design` schema in `src/content.config.ts`, not on
`games` or `writing`. If a brochure-type piece belongs in one of those
collections instead, add the same field there first:

```ts
pdfUrl: z.string().optional(),
```

### 2. Put the file in `public/`, not `src/assets/`

PDFs aren't images, so they don't go through `ctx.image()` — there's nothing
to optimize. Drop the file in `public/files/`, e.g.
`public/files/northline-brochure.pdf`. Anything in `public/` is served as-is
at that same path, unlike `src/assets`, which only exists to feed the
build-time image pipeline.

### 3. Point `pdfUrl` at it in frontmatter

```yaml
pdfUrl: /files/northline-brochure.pdf
```

Root-relative, matching where it landed in `public/`. An external URL (a PDF
hosted elsewhere) works too — `pdfUrl` is a plain string, not validated
against `img-src`'s same-origin CSP rule the way `<img>` tags are, because
it's a normal link, not an embed.

### 4. That's it — renders automatically as a link button

Same idea as the gallery: nothing goes in the Markdown body. Each
`[...slug].astro` page (`design`, `games`, `writing`) reads its own optional
URL fields — `pdfUrl`, `itchUrl`, `externalUrl`, etc. — and builds a `links`
array it passes to `CaseStudy.astro`, which renders them as pill buttons
under the meta block, above the write-up. For `design`, that's in
`src/pages/design/[...slug].astro`:

```ts
const links = pdfUrl ? [{ label: 'View full PDF', href: pdfUrl, primary: true }] : [];
```

No `pdfUrl` set → no button, nothing breaks.
