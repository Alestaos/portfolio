---
title: "Harbour Co. — Paid Social Campaign"
summary: "A 10-creative paid social push for the autumn restock — same idea cut ten ways across feed, story and carousel formats."
year: 2024
cover: ../../assets/projects/harbour-paid/01-hero.jpg
coverAlt: "Harbour Co. autumn restock — lead creative for the paid social campaign."
client: "Harbour Co."
role: "Art director"
channels: ["Paid social", "Meta Ads", "TikTok"]
results: ["4.2x ROAS", "-31% CPA vs. prior quarter", "12M impressions over 6 weeks"]
tags: ["Campaign", "Paid social", "Marketing"]
featured: false
order: 1
gallery:
  - src: ../../assets/projects/harbour-paid/01-hero.jpg
    alt: "Lead feed creative — product on a warm gradient background."
    caption: "Feed — hero creative, week 1–2."
  - src: ../../assets/projects/harbour-paid/02-story.jpg
    alt: "9:16 story creative with swipe-up prompt."
  - src: ../../assets/projects/harbour-paid/03-carousel-1.jpg
    alt: "Carousel card 1 — product detail shot."
    caption: "Carousel, card 1 of 3."
  - src: ../../assets/projects/harbour-paid/04-carousel-2.jpg
    alt: "Carousel card 2 — lifestyle shot."
  - src: ../../assets/projects/harbour-paid/05-carousel-3.jpg
    alt: "Carousel card 3 — call to action card."
  - src: ../../assets/projects/harbour-paid/06-tiktok.jpg
    alt: "TikTok in-feed creative still frame."
    caption: "TikTok in-feed, weeks 3–4."
  - src: ../../assets/projects/harbour-paid/07-retarget.jpg
    alt: "Retargeting creative with discount code."
  - src: ../../assets/projects/harbour-paid/08-ugc-style.jpg
    alt: "UGC-style creative shot on phone."
  - src: ../../assets/projects/harbour-paid/09-bundle.jpg
    alt: "Bundle offer creative for week 5 push."
    caption: "Bundle push, weeks 5–6."
  - src: ../../assets/projects/harbour-paid/10-recap.jpg
    alt: "End-of-campaign recap creative with results callout."
draft: false
---

> This is a reference example, not live content — see the note at the bottom
> before publishing it for real.

## The brief

Harbour Co.'s autumn restock needed a paid-only push (no organic lead-in) to
hit a 4x ROAS target in six weeks, across Meta and TikTok, without a full
reshoot — everything had to come from one studio day.

## The approach

One hero shot, one lighting setup, cut into ten formats: a feed hero, a story
variant, a three-card carousel, a TikTok-native edit, a retargeting frame with
a discount code, a UGC-style phone shot, a bundle push for the back half of
the flight, and a recap creative for the final week. The `gallery` field below
shows all ten in sequence, in the order they went live.

## Results

4.2x ROAS against a 3.5x target, a 31% drop in CPA versus the prior quarter's
campaign, and 12M impressions across the six-week flight. The recap creative
(#10) outperformed the original hero on CTR, which shaped the opening creative
for the next campaign.

---

**How the gallery above works:** each entry's `src` is a relative path from
this file to `src/assets/projects/harbour-paid/`, matching how `cover` works.
Astro resolves and optimizes them at build time via the `image()` schema in
`content.config.ts`. The 10 files currently there are generated placeholders
(solid colour + label) so this builds and renders — swap them for the real
campaign exports as `01-hero.jpg` … `10-recap.jpg` (or rename the files and
update the paths to match) when you're ready.
