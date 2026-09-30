---
title: "Notes — gallery images"
summary: "Internal note: what has to be true for a gallery section to render on a case study."
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
