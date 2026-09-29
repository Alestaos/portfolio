# Working in this repo

Astro 7 + Tailwind v4 static portfolio. Deployed to Azure Static Web Apps.

## Hard constraints

Violating these breaks the production site, not just style preferences.

1. **No inline `style` attributes anywhere in `src/`.** The CSP is hash-based
   with `style-src 'self'`, so the browser blocks them. To vary a colour per
   discipline, set `data-discipline="design|games|writing"` on an ancestor and
   use the `.accent-text` / `.accent-bg` classes, which read `--card-accent`.
   For reveal stagger use `data-delay="1..4"` or `data-stagger` on the parent.
2. **No UI framework, no animation library.** Two reveal attributes:
   `data-reveal` for below-the-fold elements (CSS `animation-timeline: view()`,
   with an `IntersectionObserver` fallback in `src/layouts/Base.astro` for
   Firefox, which no-ops elsewhere), and `data-intro` for above-the-fold
   elements, which a scroll-driven timeline would render instantly at their
   end state. The site ships zero JS bundles.
3. **Markdown uses Prism, not Shiki** (`markdown.syntaxHighlight` in
   `astro.config.mjs`) because Shiki emits inline styles the CSP blocks.
4. **`staticwebapp.config.json` lives in `public/`**, not the repo root — SWA
   reads it from the root of the deployed artifact.
5. **Inline scripts must be hashed into the CSP.** Astro hashes the scripts it
   generates but not `is:inline` ones; those are pinned in
   `security.csp.scriptDirective.hashes`. `npm run check:csp` fails the build
   if one drifts — never silence it by loosening the CSP.

## Layout

```
src/
  config.ts              identity, nav, social links
  content.config.ts      zod schemas for the three collections
  lib/collections.ts     query helpers, discipline metadata, sorting
  content/{design,games,writing}/*.md
  assets/projects/       cover art, processed by astro:assets at build
  components/            Nav, Footer, Hero, ProjectCard, ProjectGrid, SectionHeading, Seo
  layouts/               Base (shell + CSP + reveal script), CaseStudy
  pages/                 index, about, work, 404, and [...slug] per collection
  styles/global.css      tokens, glass utilities, reveal, prose, Prism theme
scripts/                 PowerShell Azure setup, placeholder image generator
```

## Checks

Run both before committing:

```sh
npm run build
npm run check
```

`npm run check` runs `astro check` plus a CSP audit; both must pass. The build fails if content frontmatter
does not satisfy the schema in `src/content.config.ts`.

## Documentation

- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Images](https://docs.astro.build/en/guides/images/)
- [CSP](https://docs.astro.build/en/reference/configuration-reference/#securitycsp)
- [Azure Static Web Apps config](https://learn.microsoft.com/azure/static-web-apps/configuration)
