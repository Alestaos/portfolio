# alestaos.com

Personal portfolio — graphic design, brand marketing, and game/XR development.

Built with [Astro](https://astro.build) and Tailwind CSS v4, deployed to Azure
Static Web Apps (Free tier).

## Design constraints

These are deliberate. Please keep them when adding features.

- **No client-side framework.** The site ships one ~400-byte script and nothing
  else. Scroll animations use CSS `animation-timeline: view()`; the script is
  only an `IntersectionObserver` fallback that no-ops on browsers with
  scroll-driven animation support.
- **No inline `style` attributes.** The Content Security Policy is hash-based
  (`style-src 'self'`), so inline styles are blocked. Use a `data-discipline`
  attribute or a utility class instead — see `src/styles/global.css`.
- **Self-hosted fonts.** No requests leave the origin. CSP is `default-src 'self'`.
- **Syntax highlighting is Prism, not Shiki**, because Shiki emits inline styles.

## Commands

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Typecheck `.astro` and `.ts` files |
| `node scripts/generate-placeholders.mjs` | Regenerate placeholder cover art |

## Adding a project

Each discipline is a content collection under `src/content/`:

| Collection | Folder | Route | For |
| --- | --- | --- | --- |
| `design` | `src/content/design/` | `/design/<slug>` | Graphic design & identity work |
| `games` | `src/content/games/` | `/games/<slug>` | Game and XR projects |
| `writing` | `src/content/writing/` | `/writing/<slug>` | Marketing campaigns |

1. Drop cover art in `src/assets/projects/` (JPG/PNG, ~1600×1000). Astro
   converts and resizes it at build time — commit the original, not a
   pre-optimised file.
2. Add a Markdown file to the relevant folder. Copy the frontmatter from the
   `example-*.md` file already there; the schema in `src/content.config.ts` is
   the authority and the build fails on a mismatch.
3. Set `featured: true` to surface it on the homepage. `draft: true` hides it
   from production builds but keeps it visible in `npm run dev`.

Game entries with an `itchUrl` get a "Playable" badge and a play button.

## Deployment

Pushes to `main` build and deploy via
`.github/workflows/azure-static-web-apps.yml`. Pull requests get their own
preview environment, torn down when the PR closes.

First-time setup:

```powershell
az login
./scripts/setup-azure.ps1          # creates the resource group + SWA, sets the GitHub secret
./scripts/setup-custom-domain.ps1  # requests alestaos.com + www, prints the DNS records
```

Routing, cache and security headers live in `public/staticwebapp.config.json`
(it must sit in `public/` so it lands at the root of `dist/`).

## Before launch

- [ ] Replace the three `example-*.md` files with real case studies
- [ ] Replace placeholder cover art in `src/assets/projects/`
- [ ] Confirm the public email address in `src/config.ts`
- [ ] Fix the itch.io and LinkedIn URLs in `src/config.ts`
- [ ] Rewrite the bio and timeline in `src/pages/about.astro`
- [ ] Rewrite the hero copy in `src/components/Hero.astro`
