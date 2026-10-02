# Content build progress

Working notes for the real-content build-out, so a new session (or a future me) can pick up
without re-deriving context. Safe to keep editing/trimming this as work progresses — it's a
scratch status file, not project documentation (see AGENTS.md for that).

## Status as of 2026-10-02

Replacing placeholder/example entries across the three content collections (`design`, `games`,
`writing`) with Stuart's real work. Started with Marketing (`writing` collection).

## Done

- `ProjectCard.astro` now shows the client name next to discipline/year on grid cards, so
  Marketing pieces aren't anonymous until clicked into.
- Added native self-hosted video support: a `videos` field on the `writing` collection schema
  (`content.config.ts`) and a plain `<video controls>` gallery in `CaseStudy.astro`. No JS
  framework, same-origin files under `public/videos/`, so the existing CSP needed no changes.
- `example-campaign.md` and `example-paid-campaign.md` (Harbour Co. placeholders) set to
  `draft: true` — hidden in production, kept as local reference templates for the frontmatter
  shape. `example-brand-system.md` (design) and `example-xr-prototype.md` (games) are
  **still live placeholders** — not yet touched.
- Real Marketing entries published:
  1. **Flemings Department Store — Spring Fashion Campaign**
     (`src/content/writing/flemings-spring-fashion.md`) — social/email fashion ad series, 9-image
     gallery. Correctly attributes Red Button / Fransa / White Stuff as third-party brands
     Flemings stocks, not Flemings house brands (this was a correction mid-build — got it wrong
     first pass).
  2. **Elf on the Shelf — Flemings** (`src/content/writing/flemings-elf-on-the-shelf.md`) —
     "Freddy's Adventures", a 12-episode mystery video series. The real videos and posters were
     pulled directly from the live storefront page (see below), not from raw OneDrive exports —
     the first pass using local files only found 4 of the 12 real clips.
  3. **Expert Electrical — Outdoor Living Paid Social**
     (`src/content/writing/expert-outdoor-living.md`) — client is "Expert Electrical (Monaghan)"
     (Stuart's chosen wording), made as part of his Flemings role. Three Eden (Hartman) garden
     furniture sale ads. Stuart explicitly wanted **only the three Eden ads** — the same source
     folder (`Downloads\Social Media\`) also has Amalfi ads and price-free variants; don't add
     them.
  4. **Toymaster — RSA Check It Fits Event** (`src/content/writing/toymaster-check-it-fits.md`)
     — one key visual in 3 formats (1:1, 9:16, A4 poster) for the RSA's free car seat checking
     day at Flemings on 28 Oct 2025. Facts are taken from the live events blog post (linked as
     `externalUrl`). The A4 source `OneDrive\Flemings\A42.pdf` is 100MB, too big for Read; it was
     rendered with the `mupdf` npm package in the scratchpad (sharp can't read PDFs, and
     Python isn't installed).
- Marketing entry **Beara Beara — Trustpilot Review Card**
  (`src/content/writing/beara-beara-trustpilot.md`, 2026). An in-store QR review card in a
  vintage engraved style. It started in Design and Stuart asked to move it to Marketing,
  because Design is for his non-marketing pieces. Source is in `Downloads\Beara\`. Stuart said
  **not** to link the print PDF. He made it in his in-house **Marketing Executive** role at
  Beara Beara (one of the 4 businesses). Tools: Photoshop, plus LTX Studio AI detailing over
  his own base illustrations. Keep that split stated honestly in any Beara entry, and don't
  claim base art is his own unless he says so for that piece.
- First real **Design** entry: **Beara Beara — Gift Card**
  (`src/content/design/beara-beara-gift-card.md`, 2026). Front and back, kept as transparent
  PNGs so the rounded corners survive. Tools: Photoshop, Illustrator, LTX Studio.
  `example-brand-system.md` is now `draft: true`.
- Marketing entry **Beara Beara — Customer Review Showcase**
  (`src/content/writing/beara-beara-customer-reviews.md`, 2026). Organic social posts plus a
  website "Customer Notes" card built from a real 5-star review (Rebecca bag, Emily R.).
  Sources are loose in `Downloads\`. The review block wasn't visible on the bearabeara.co.uk
  homepage when fetched, so the website version wasn't checked live.
- Marketing entry **Beara Beara — LinkedIn Brand Introduction**
  (`src/content/writing/beara-beara-linkedin-newspaper.md`, 2026). A single 16:9
  newspaper-front-page post. Its artwork says "Est. 2012" but the dateline reads "MMXIII"
  (2013); this was flagged to Stuart.
- **Homepage featuring:** `getFeatured()` shows only `featured: true` entries if any exist,
  otherwise the most recent ones. The Beara gift card is `featured: true` to take the hidden Northline
  placeholder's slot. `example-xr-prototype.md` (games) is still live and `featured: true`.
  Ask Stuart which real pieces he wants featured.

## Not started yet

- Stuart had in-house content roles at **4 businesses** total. Ask him
  which business to do next. Flemings (incl. Expert, Toymaster) and Beara Beara are in progress.
- More unused Flemings material sitting in OneDrive: a Black Friday electronics push, toy
  department social reels (Elf/Gabby/Pokémon toy videos), a "Flemings Grand Prix" video in the
  `Portfolio` folder. Ask before picking one.
- `design` collection: Beara gift card only (placeholder is now draft). Stuart has more non-marketing design pieces to add.
- `games` collection: only has the placeholder `example-xr-prototype.md`.

## Useful context for next session

- Stuart's source assets live in his local OneDrive (Files On-Demand — not everything is synced
  locally until touched, so a first `find` can under-report what's actually there; re-run it
  after accessing the folder once):
  - `C:\Users\stuar\OneDrive\Flemings\` — raw working files for the Flemings role. Contains a
    `Passwords - Flemings.xlsx` — never read or touch that file.
  - `C:\Users\stuar\OneDrive\Portfolio\` — exports Stuart already curated specifically for
    portfolio use. Check here first.
- **When a campaign is already live somewhere public (e.g. flemingsofmonaghan.com, a Shopify
  store), pull the real published asset from there instead of trusting raw local exports.** The
  live page is often the complete, correctly-encoded, authoritative version — raw OneDrive
  folders can be partial, duplicated, or ambiguously named. (Shopify video CDN URLs can be read
  straight out of the page's `<video><source>` elements once each tile's player is clicked /
  mounted — see git history on the Elf entry for the extraction approach.)
- Stuart's old portfolio (being replaced by this site) is at
  https://stuartgrahammay.wixsite.com/corevisual/portfolio-collections/my-portfolio/ — useful as
  a checklist of prior pieces to recreate here.
- Workflow: Stuart wants commits made **and pushed** each time he asks to see a result — don't
  leave work uncommitted between sessions. Run `npm run build && npm run check` before every
  commit (see AGENTS.md).
