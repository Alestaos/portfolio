/**
 * Campaign and channel results shown on /results.
 *
 * Every figure comes from platform analytics (GA4, Meta, LinkedIn, Klaviyo,
 * Google Business Profile, TikTok, YouTube) as reported in Stuart's own
 * performance reports and LinkedIn write-ups. Where a later LinkedIn post
 * updated a number from an earlier report, the later figure is used.
 * Percentages only for revenue — never absolute revenue amounts.
 *
 * `href` links a tile to the case study it belongs to; keep the matching
 * entry's `results` frontmatter in sync when changing one.
 */

export type ResultStat = {
  /** The headline figure, e.g. "+108%" or "22,584". */
  value: string;
  /** What was measured, in sentence case. */
  label: string;
  /** Period, comparison or supporting detail. */
  context: string;
  /** Optional link to the related case study. */
  href?: string;
};

export type ResultGroup = {
  id: string;
  org: string;
  role: string;
  period: string;
  sections: { title: string; stats: ResultStat[] }[];
};

export const resultGroups: ResultGroup[] = [
  {
    id: 'beara-beara',
    org: 'Beara Beara',
    role: 'Marketing Executive',
    period: 'April – September 2026',
    sections: [
      {
        title: 'Website & e-commerce',
        stats: [
          {
            value: '+87%',
            label: 'Online revenue',
            context: '16–30 Sep 2026 vs the previous fortnight (GA4)',
          },
          {
            value: '+84%',
            label: 'Key events (high-intent actions)',
            context: 'Jul–Sep 2026 vs the matched prior period',
          },
          {
            value: '+75%',
            label: 'Engagement time per user',
            context: 'Jul–Sep 2026 vs prior period, up to 1m 57s',
          },
          {
            value: '+13%',
            label: 'Engaged sessions',
            context: 'Jul–Sep 2026 vs prior period',
          },
        ],
      },
      {
        title: 'Email, search & social',
        stats: [
          {
            value: '45%',
            label: 'Email flow open rate',
            context: 'Above the 43.5% peer median (Klaviyo benchmark, Aug 2026)',
          },
          {
            value: '5.29%',
            label: 'Email flow click rate',
            context: 'vs a 3.53% peer median; revenue per recipient also above median',
          },
          {
            value: '4.04%',
            label: 'Google Search ads click-through rate',
            context: '534 clicks from 13,216 impressions, 16–28 Sep 2026',
          },
          {
            value: '15.8K',
            label: 'Google Business Profile views',
            context: '664 website clicks and 1,352 interactions, Apr–Sep 2026',
          },
          {
            value: '+62%',
            label: 'Organic social sessions',
            context: '16–30 Sep 2026 vs the previous fortnight; Instagram traffic up 51%',
          },
          {
            value: '50K',
            label: 'Monthly Pinterest impressions',
            context: 'Organic only, 30 days to 9 Sep 2026; 1.56K engagements',
          },
        ],
      },
    ],
  },
  {
    id: 'flemings',
    org: 'Flemings Department Store',
    role: 'E-Commerce & Digital Marketing Executive',
    period: '2025',
    sections: [
      {
        title: 'Website & e-commerce',
        stats: [
          {
            value: '+108%',
            label: 'Online sales',
            context: 'Q4 vs Q3 2025',
          },
          {
            value: '+245%',
            label: 'Online orders',
            context: 'Q4 vs Q3 2025',
          },
          {
            value: '+107%',
            label: 'Organic search revenue',
            context: 'Jul–Nov 2025 vs prior period, after SEO and site work',
          },
          {
            value: '+1,036%',
            label: 'Google Shopping product clicks',
            context: 'Jul–Nov 2025 vs prior period; impressions up 865%',
          },
          {
            value: '+55%',
            label: 'Organic search sessions',
            context: 'Jul–Nov 2025 vs prior period',
          },
          {
            value: '+75%',
            label: 'Engaged sessions',
            context: 'Q4 vs Q3 2025; website sessions up 26%',
          },
        ],
      },
      {
        title: 'Social media',
        stats: [
          {
            value: '+2,600%',
            label: 'Three-second Reel views',
            context: 'Q4 vs Q3 2025; Reels reached 59.2K views',
          },
          {
            value: '+700%',
            label: 'Instagram views',
            context: 'Q4 vs Q3 2025, to 28.8K',
          },
          {
            value: '+121%',
            label: 'Facebook link clicks',
            context: 'Q4 2025; 680+ website visits from Facebook alone',
          },
          {
            value: '44,854',
            label: 'Organic views, SuperValu bakery video',
            context: '528 engagements and 131 new followers, no paid spend',
          },
          {
            value: '58K+',
            label: 'Views in a single day',
            context: '"An Evening of Christmas" event content, reels of 6K–21K+ each',
          },
          {
            value: '22,584',
            label: 'Views, Elf on the Shelf series',
            context: 'Meta 9,030 · TikTok 6,908 · YouTube Shorts 6,536',
            href: '/writing/flemings-elf-on-the-shelf',
          },
        ],
      },
      {
        title: 'Paid campaigns',
        stats: [
          {
            value: '42,231',
            label: 'People reached, Christmas event ad',
            context: '131,564 impressions at a €0.86 CPM; staff reported higher footfall',
          },
          {
            value: '33,618',
            label: 'People reached, mirror giveaway',
            context: '1,659 engagements and 421 comments at €1.01 per result',
          },
          {
            value: '8,835',
            label: 'People reached, RSA Check It Fits',
            context: 'On a €2/day budget; RSA staff reported it busier than previous visits',
            href: '/writing/toymaster-check-it-fits',
          },
        ],
      },
      {
        title: 'Channel launches',
        stats: [
          {
            value: '16,256',
            label: 'TikTok views in the first 25 days',
            context: 'Channel launched 3 Dec 2025',
          },
          {
            value: '19,104',
            label: 'YouTube Shorts views in 35 days',
            context: 'After reactivating a dormant channel, Nov 2025',
          },
          {
            value: '4.5★',
            label: 'Trustpilot rating at launch',
            context: 'Review platform launched Q4 2025',
          },
        ],
      },
    ],
  },
  {
    id: 'mersus',
    org: 'Mersus Technologies',
    role: 'Digital Marketing Executive & Designer',
    period: 'January – April 2025',
    sections: [
      {
        title: 'LinkedIn',
        stats: [
          {
            value: '10.7%',
            label: 'Average post engagement rate',
            context: '166% above the competitor average, Jan–Apr 2025',
          },
          {
            value: '+156%',
            label: 'Website sessions from LinkedIn',
            context: 'GA4, implementation period vs previous period',
          },
          {
            value: '+64%',
            label: 'LinkedIn page views',
            context: '774 views from 310 unique visitors (+55%)',
          },
          {
            value: '+38%',
            label: 'LinkedIn impressions',
            context: '5,767 total; reactions up 69%, reposts up 143%',
          },
          {
            value: '16%',
            label: 'Engagement rate, Avatar Learning post',
            context: 'With a 7.4% click-through rate, about 3× the organic benchmark',
            href: '/writing/mersus-organic-social',
          },
          {
            value: '+130%',
            label: 'Daily website users after the Jordan Murphy spotlight',
            context: 'The post reached 803 impressions and drove 64 clicks',
            href: '/writing/mersus-jordan-murphy-spotlight',
          },
        ],
      },
      {
        title: 'Website & local search',
        stats: [
          {
            value: '+24%',
            label: 'Website active users',
            context: '13 Jan–17 Apr 2025 vs the previous period',
          },
          {
            value: '+24%',
            label: 'Organic search traffic',
            context: 'Same period, after on-page SEO work',
          },
          {
            value: '+63%',
            label: 'Active users from Ireland',
            context: 'Same period',
          },
          {
            value: '+27.5%',
            label: 'Google Business Profile views',
            context: 'Feb–Mar 2025 vs the same period in 2024',
          },
        ],
      },
    ],
  },
];
