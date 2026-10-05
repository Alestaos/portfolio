# Content build progress

Working notes for the real-content build-out, so a new session (or a future me) can pick up
without re-deriving context. Safe to keep editing/trimming this as work progresses — it's a
scratch status file, not project documentation (see AGENTS.md for that).

## Status as of 2026-10-03

**All placeholder entries are now hidden (`draft: true`). Everything live is Stuart's real
work:** 15 Marketing entries, 25 Design, and 1 Games (Blender WIP). The site also has a
**Results** page, a **contact form** and a full **SEO/AEO** setup (see sections below). The
build passes `npm run build && npm run check` with 0 errors and 0 warnings. The live site is
https://alestaos.com (Azure SWA Free, auto-deploys from `main`).

### Open items / likely next steps
- **Awards banner** (2026-10-05): full-width banner at the end of the Marketing section on /work (`banner` object on `disciplines.writing` in `src/lib/collections.ts`): Finalist, Best Student, Digital Media Awards Ireland 2025, for Stuart's final-year TUS Athlone digital marketing project built around Mersus Technologies. It links to his LinkedIn announcement. Stuart confirmed all three Mersus Marketing entries came from that project, so each now ends with a "Recognition" section linking the announcement.
- **Mersus role wording** (open): the three Mersus Marketing entries say "Digital Marketing Executive & Designer", but they were also Stuart's TUS final-year project. Asked Stuart whether to change the role or mention both; no answer yet.
- Stuart may add 2–3 more self-hosted videos (re-encode them first; see the video policy) and
  YouTube embeds later. A possible new Marketing entry is the **SuperValu bakery video**: it's
  on the Results page but has no case study yet.
- **About page** still has placeholder copy (a `TODO(stuart)` comment), an outdated line about
  games and itch.io builds, and a Mersus title ("Digital Marketing & Strategy Consultant") that
  doesn't match the case studies ("Digital Marketing Executive & Designer"). Offered to rework
  it with Stuart.
- **Homepage pick #2**: Stuart asked for "the Mersus wireframe". I used
  `mersus-04-wireframe-to-colour`, but it could have meant `mersus-website-mockup`. Not yet
  confirmed.
- Unconfirmed details flagged earlier: tools for the UCD covers, Nightwalker, BitBoi, the other
  XNDK pieces and the cats; which AI tool made the Rolly video; whether BitBoi was UCD work;
  which degree XNDK was for; tools for the Meet Tommy, Grace and LinkedIn Beara pieces.
- Stuart to do: submit the sitemap in Google Search Console and Bing Webmaster Tools, and send a
  test message through the contact form (check Outlook's Junk folder).
- A **full grid ordering pass** happens once all content is up.

## Done

- `ProjectCard.astro` now shows the client name next to discipline/year on grid cards, so
  Marketing pieces aren't anonymous until clicked into.
- Added native self-hosted video support: a `videos` field on the `writing` collection schema
  (`content.config.ts`) and a plain `<video controls>` gallery in `CaseStudy.astro`. No JS
  framework, same-origin files under `public/videos/`, so the existing CSP needed no changes.
- All four `example-*.md` placeholders are `draft: true`: hidden in production, and kept as
  local frontmatter templates. `writing/notes.md` is also a draft-only internal note.
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
     (Stuart's chosen wording), made as part of Stuart's Flemings role. Three Eden (Hartman) garden
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
  because Design is for Stuart's non-marketing pieces. Source is in `Downloads\Beara\`. Stuart said
  **not** to link the print PDF. Stuart made it in Stuart's in-house **Marketing Executive** role at
  Beara Beara (one of the 4 businesses). Tools: Photoshop, plus LTX Studio AI detailing over
  Stuart's own base illustrations. Keep that split stated honestly in any Beara entry, and don't
  claim base art is Stuart's own unless Stuart says so for that piece.
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
  renders as it progresses, so add them to the gallery and keep the WIP framing until Stuart says
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
  plus Stuart's promo banner. Facts in the entry are taken from the live article.
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
  - **XNDK** (a fictional co-ed K-pop band for Stuart's degree; Stuart sometimes types "XNDX", but
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
    Illustrator for the vectors). The rest are blank pending Stuart's answer.
- Marketing entry **Break Your Barriers — Nike Promo Concept**
  (`src/content/writing/flemings-nike-break-your-barriers.md`, 2025). A **candidate task** for
  Flemings' hiring process, not a real Nike campaign; keep it framed as an unpublished concept.
- Marketing entry **Beara Beara — Meet Tommy: Meta Paid Campaign**
  (`src/content/writing/beara-beara-tommy-meta.md`, 2026). Six square ads from
  `Downloads\With Text-20261002T191709Z-1-001\With Text\`. Stuart called it "the Tom and
  Tommy bag" but the artwork only says "Tommy"; this was flagged.
- Design entry **Mersus Technologies — Website Homepage Mockup**
  (`src/content/design/mersus-website-mockup.md`, 2025, `order: 9` so it follows the Mersus
  series). The 1440×6790 mockup is cut into 5 section crops plus the full page. Stuart says
  Mersus adapted it into the live mersus.ie; this was checked on 2026-10-03 and the live site
  shares the structure (results row, 8-feature "Why Avatar Academy", case studies, contact,
  partner footer).
- Marketing entry **Toymaster — Disney Descendants: Step Into Your Story**
  (`src/content/writing/toymaster-disney-descendants.md`, 2025). A 15s 9:16 reel, self-hosted
  at `public/videos/toymaster-disney-descendants/`, plus 2 frames as stills. Stuart asked for
  the client as "Toymaster (Flemings Department Store)"; the older Toymaster entries say
  "Toymaster (Monaghan)", and Stuart chose "Toymaster (Monaghan)" for all of them. It ran on Instagram + TikTok. Video frames were extracted with
  `ffmpeg-static` installed in the scratchpad (no system ffmpeg).
- **Homepage featuring:** see "Homepage, contact form and SEO/AEO" below (hand-picked using
  `featuredOrder`).

## Not started yet

- Covered so far: Flemings (incl. Expert, Toymaster), Beara Beara, Mersus Technologies, AIPF
  (volunteer), UCD and degree coursework, and personal pieces. The About page also lists
  SuperValu Monaghan and Marks & Spencer Athlone roles, which have no entries yet. Ask before
  adding any.
- Unused Flemings material in OneDrive: a Black Friday electronics push, toy reels
  (Gabby/Pokémon), a "Flemings Grand Prix" video. More Mersus material: brand guidelines V6, a
  documentary video, and alternates folders. Ask before picking any.
- `games` collection: Blender Old Man WIP only. Stuart will send updated renders.

## Useful context for next session

- Stuart's source assets live in Stuart's local OneDrive (Files On-Demand — not everything is synced
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
- Workflow: Stuart wants commits made **and pushed** each time Stuart asks to see a result — don't
  leave work uncommitted between sessions. Run `npm run build && npm run check` before every
  commit (see AGENTS.md).

## Grid ordering

Entries sort by year (newest first), then by `order` (lowest first), then alphabetically by
title. Current pins: Marketing has Grace -5, Tommy -4, LinkedIn -3, Customer Reviews -2,
Trustpilot -1. Design has the Mersus series 1–8 and the website mockup 9, AIPF 10, XNDK 1–6
(within their years), UCD covers 1–2, Nightwalker 4, and the vectors 1–3. Everything else is 0.
Stuart plans to do a **full grid ordering pass once all content is up**, so don't fine-tune
order values before then unless Stuart asks.

## Video hosting policy (2026-10-03)

- The Azure SWA **Free tier caps the deployed site at 250MB**. `dist/` reached 219MB with 1080p
  video, so all videos were re-encoded to web quality: short side ≤720px, H.264 CRF 24 capped at
  2.5 Mbps, AAC 128k, `+faststart`. Video went from 162MB to 30MB and `dist/` from 219MB to 88MB.
  **Re-encode every new video the same way before committing** (use `ffmpeg-static` from
  npm in the scratchpad; there's no system ffmpeg):
  `ffmpeg -i in.mp4 -vf "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)'" -c:v libx264 -preset slow -crf 24 -maxrate 2500k -bufsize 5000k -profile:v high -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart out.mp4`
- Case-study pages with videos show a line saying higher-fidelity versions are available on
  request (`CaseStudy.astro`). The Marketing section on `/work` has a callout (the
  `disciplines.writing.note` field in `collections.ts`) saying Stuart has more brand video
  content and can send links to it live on TikTok and Instagram.
- Stuart only plans **2–3 more self-hosted videos**. Stuart'll also upload videos to **YouTube**
  over time. `youtube-nocookie.com` is already allowed in the CSP `frame-src`, so YouTube embeds
  can be added later without a CSP change. For any TikTok or Instagram embeds, use a
  click-to-load facade.
- The git history still contains the original large videos (`.git` is about 300MB). That's
  harmless for GitHub, and rewriting history isn't worth it.

## Results page (2026-10-03)

- `/results` (`src/pages/results.astro`) is driven by `src/data/results.ts` and grouped by
  employer, newest first: Beara Beara (Apr–Sep 2026), Flemings (2025), then Mersus (Jan–Apr
  2025). "Results" is in the nav (`src/config.ts`). Sections with 4 tiles use a 4-column row;
  everything else uses 3 columns.
- Sources: Beara's "Actions and Results 29 Sep 2026" and "Master Work & Evidence Record"
  docx; Flemings' "Q4 2025 Final.pdf" and Marketing Performance Overview; Stuart's LinkedIn
  posts (SEO results, Q4 Toys/Giftware results, SuperValu video); and the Mersus capstone
  "Final Document With Clickable Links.pdf" (results chapter).
- Stuart's rules:
  - **Revenue is shown as percentage change only, never absolute amounts.**
  - **When a LinkedIn post and a report disagree, the LinkedIn post wins** because it was
    written later and is more up to date (SuperValu 44,854 views; Christmas ad CPM €0.86).
  - **No Meet Tommy / Travel & Exploring figures.** The campaign was cancelled after about 2
    days, so the data is skewed.
  - Leave out figures the source docs mark as not attributable, and leave out negative or
    diagnostic figures.
- From the Beara docx files, use **only** the marketing results sections.
- Case-study `results` frontmatter has been added to Elf on the Shelf, Check It Fits, Mersus
  Organic Social and Jordan Murphy. Writing pages with results get an "All results →" button.
  Keep each entry's `results` in sync with the tiles in `results.ts` that link to it.
- Possible future entry: the SuperValu bakery video (Flemings' strongest organic post). It's
  on the Results page but has no case study yet.

## Homepage, contact form and SEO/AEO (2026-10-03)

- **Homepage picks** are hand-set using `featured: true` plus `featuredOrder` (1 = the wide
  first card): 1 Old Man, 2 Mersus Wireframe to Colour, 3 Beara gift card, 4 Beara LinkedIn
  newspaper, 5 Meet the Grace. Entries without `featuredOrder` sort after these by recency.
- **Marketing grid order** (Stuart's choice): Grace -5, Tommy -4, LinkedIn -3, Customer
  Reviews -2, Trustpilot -1. Design: AIPF is `order: 10`, so it sits after the Mersus series
  and directly before XNDK Demi.
- **Contact form** (`src/components/ContactForm.astro`, on About#contact) posts to Web3Forms
  and redirects to `/thanks` (noindex, not in the sitemap). **It needs `site.contactFormKey`
  in `src/config.ts`** (key added 2026-10-03, created for
  stuartgrahammay@outlook.com). If the key is ever removed, the form falls back to a LinkedIn note. The
  public email address was removed from the site.
- **SEO/AEO**:
  - `src/lib/schema.ts` builds the JSON-LD. Every page has a WebSite + Person graph; case
    studies add CreativeWork + BreadcrumbList; About, Work and Results add
    ProfilePage/CollectionPage/WebPage.
  - `/llms.txt` is generated from content and `results.ts`.
  - The html lang is `en-GB`.
  - The site title and description focus on digital marketing and design.
- Still to do for SEO (Stuart's side): submit `https://alestaos.com/sitemap-index.xml` in
  Google Search Console and Bing Webmaster Tools. The About page still has placeholder copy
  (a `TODO(stuart)` comment) and an outdated line about games and itch.io.
