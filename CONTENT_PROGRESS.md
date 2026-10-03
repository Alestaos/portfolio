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
  (2013). Stuart confirmed MMXIII is decorative, so leave it.
- Marketing entry **Beara Beara — Meet the Grace**
  (`src/content/writing/beara-beara-meet-the-grace.md`, 2026). A social post that was **never
  published**; the entry says so in its channel and its "Status" section.
- Design entry **AIPF — Social Media Best-Practice Infographics**
  (`src/content/design/aipf-social-infographics.md`, 2025). **Volunteer** work for the
  Association of Irish Powerchair Football: two 9:16 infographics for young club members.
  Source PSDs are in `OneDrive\AIPF\`. The artwork has the typos "unrecongisable" and
  "Coherencey"; these were flagged to Stuart, and the site copy uses the correct spellings.
- First real **Games** entry: **Old Man — Blender Character (WIP)**
  (`src/content/games/blender-old-man.md`, 2026). A pre-materials clay render from Stuart
  learning Blender, rendered in Eevee, with status `in-development`. Stuart will send updated
  renders as it progresses, so add them to the gallery and keep the WIP framing until he says
  it's finished. `example-xr-prototype.md` is now `draft: true`, so **all placeholders are now
  hidden**.
- **Mersus Technologies**: 8 Design entries (`src/content/design/mersus-0[1-8]-*.md`), one per
  post in the series order Stuart set, pinned with `order: 1`–`8`. Role "Digital Marketing
  Executive & Designer". The work spans 2024–2025 and the year field is 2025 (files dated April
  2025). Source: `OneDrive\University Documents\Digital Content\Final Projects\Final Versions\`
  (Stuart's file-to-post mapping is in the git log for this commit). Tools Photoshop and
  Illustrator were inferred from the PSD and AI source files, not confirmed by Stuart. There's
  more unused Mersus material in OneDrive: brand guidelines V6, a documentary video, and the
  "Other Alts" and "Post 3/6 Alts" folders.
- Marketing entry **Mersus Technologies — Organic Social Posts**
  (`src/content/writing/mersus-organic-social.md`, 2025; the body says 2024–2025). Five blog
  promotion posts. Three are from `Posts Published\` and two (Education, Success Stories) were
  rendered from the PSDs in `Template Options\` with the `psd` npm package in the scratchpad
  (sharp can't read PSD). Mersus's blog has moved to mersus.ie, and its older posts weren't
  visible to check. Stuart confirmed all 5 were posted as part of the same run.
- Marketing entry **Mersus Technologies — Employee Spotlight: Jordan Murphy**
  (`src/content/writing/mersus-jordan-murphy-spotlight.md`, 2025). A blog post Stuart wrote
  (live at mersus.ie, published 11 Apr 2025, byline "mersusglobal"; linked via `externalUrl`)
  plus his promo banner. Facts in the entry are taken from the live article.
- Marketing entry **Mersus Technologies — 4 Benefits of VR Training**
  (`src/content/writing/mersus-vr-benefits-infographic.md`, 2025). A tall LinkedIn infographic
  from `OneDrive\Portfolio\Infographic-01.png`. Its artwork has the typo "enganging"; this was
  flagged to Stuart.
- **Big design batch (2026-10-03)**: 14 Design entries plus 1 Marketing entry. Sources are
  mostly in `OneDrive\Portfolio\`.
  - UCD Professional Diploma in Graphic Design coursework (2022): `ucd-all-the-way-home`
    (normal edition), `ucd-all-the-way-home-special`, and `nightwalker-poster`.
  - `bitboi-games` (2021): a logo concept. Uses the "White" artboards from
    `Portfolio Work\UCD\UCD Images\Bitboi\White\1x\`. The business card is a CMYK JPEG and was
    converted to sRGB.
  - **XNDK** (a fictional co-ed K-pop band for his degree; Stuart sometimes types "XNDX", but
    the artwork says XNDK): `xndk-demi`, `xndk-nari` (2024), `xndk-xaveri`, `xndk-kai` (2023),
    `xndk-album-promo` (2024, Photoshop double exposure; uses the widescreen version), and
    `xndk-social-media` (2024, 5 square posts). The member is spelled "Xaveri" (the source file
    says "Xavier").
  - `double-exposure-cats` (2023): personal experiments.
  - Three 2021 Illustrator vectors: `vector-different-shades-of-music`,
    `vector-drip-fed-color`, and `vector-valentines-day-romance`.
  - Marketing `toymaster-rolly-toys` (2025): a Photoshop poster plus an AI-animated video,
    self-hosted at `public/videos/toymaster-rolly-toys/` (H.264/AAC, 15MB).
  - Tools were only filled in where Stuart named them (Photoshop for the album promo,
    Illustrator for the vectors). The rest are blank pending his answer.
- Marketing entry **Break Your Barriers — Nike Promo Concept**
  (`src/content/writing/flemings-nike-break-your-barriers.md`, 2025). A **candidate task** for
  Flemings' hiring process, not a real Nike campaign; keep it framed as an unpublished concept.
- Marketing entry **Beara Beara — Meet Tommy: Meta Paid Campaign**
  (`src/content/writing/beara-beara-tommy-meta.md`, 2026). Six square ads from
  `Downloads\With Text-20261002T191709Z-1-001\With Text\`. Stuart called it "the Tom and
  Tommy bag" but the artwork only says "Tommy"; this was flagged.
- **Homepage featuring:** `getFeatured()` shows only `featured: true` entries if any exist,
  otherwise the most recent ones. **Nothing is featured right now** (both featured placeholders
  are drafts), so the homepage shows the 5 most recent real entries across all sections.
  Ask Stuart which real pieces he wants featured.

## Not started yet

- Stuart had in-house content roles at **4 businesses** total. Ask him
  which business to do next. Flemings (incl. Expert, Toymaster) and Beara Beara are in progress.
- More unused Flemings material sitting in OneDrive: a Black Friday electronics push, toy
  department social reels (Elf/Gabby/Pokémon toy videos), a "Flemings Grand Prix" video in the
  `Portfolio` folder. Ask before picking one.
- `design` collection: Beara gift card only (placeholder is now draft). Stuart has more non-marketing design pieces to add.
- `games` collection: Blender Old Man WIP only.

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

## Grid ordering

Entries sort by year (newest first), then by `order` (lowest first), then alphabetically by
title. In Marketing, Stuart wants the Customer Review Showcase directly before the Trustpilot
card, so they're pinned with `order: -2` and `order: -1`. Everything else is `order: 0`.
Stuart plans to do a **full grid ordering pass once all content is up**, so don't fine-tune
order values before then unless he asks.
