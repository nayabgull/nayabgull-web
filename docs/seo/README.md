# SEO files — where everything lives

Every Claude session (any account, any agent) reads these files before it writes a page, a title, a meta description or any content. They are the only source for keywords and SEO research.

| File | What it holds | Status |
| --- | --- | --- |
| `keyword-map.md` | One primary keyword per page, plus secondary keywords. The CI `cannibalization` job checks it. | Live |
| `research/keywords-all.csv` | 642 keywords from Google Keyword Planner (US, English, October 2025 – September 2026, pulled October 23, 2026): volume range, Ads competition, 3-month and yearly change, top-of-page bids in USD, intent. `sources` says which research file each row came from. | Live |
| `research/low-dr-sites.csv` | 14 low-DR sites that rank on Google US for buyer keywords: DR, ranking keyword, position, URL, page type, Similarweb visits (July – September 2026) and the lesson for us. | Live |
| `research/fast-selling-services.csv` | 25 quick-win services with their main keyword and why they sell fast. | Live |
| `research/clusters/keywords-<cluster>.csv` | Deep research per cluster (November 2026): Keyword Planner ranges, Ads competition, bids, Ahrefs KD for the top keywords, intent. Clusters: voice, ai-automation, then ai-agents, ghl, web-dev. | 3 of 5 done |
| `research/clusters/low-dr-<cluster>.csv` | Sites with Ahrefs DR 0–15 (a few older rows up to 20) in the Google US top 10 for that cluster, with the ranking page and the lesson. | 3 of 5 done |
| `research/keyword-tracker.csv` | Generated. One row per keyword: all research merged (newest wins), the page that targets it from `lib/seo/keywords.ts`, role, page status, cannibalization flag, low-DR sites. Feeds the Keyword Tracker dashboard. Do not edit by hand; regenerate after research or keyword-map changes. | Live |
| `research/competitors.csv` | Generated. Every low-DR site from all research files, with cluster and our page for that keyword. | Live |
| `research/kd.md` | Keyword difficulty and top 10 sites (DR) for every primary keyword. Filled by hand with the free Ahrefs checker. | To fill |
| `competitors.md` | Deep review of the low-DR competitors: page structure, titles, FAQs, schema, internal links, blog topics, trust signals, and the gap list for us. | Planned |
| `offpage-plan.md` | White-hat backlinks, free directories, LinkedIn and Facebook groups, linkable assets, 12-week blog calendar, AI search (GEO). | Planned |
| `reviews/YYYY-MM.md` | Monthly Search Console review: positions 8–20, low CTR pages, new queries, next 5 actions. | After launch |

## Rules for using these files

- Keywords come only from `keyword-map.md`. A keyword that is not in the map needs Nayab's approval before any page targets it.
- Numbers (volume, KD, DR, traffic) come only from these files. If a number is missing, leave it empty and write "research pending". Never estimate.
- Volume is a Keyword Planner range, not an exact number. "Competition" is Google Ads competition, not SEO difficulty; use `kd.md` for difficulty.
- Similarweb traffic counts all visits (organic, direct, referral), and for small sites it is an estimate. Use it for trends only.
- Competitor pages are for structure and gaps only. Never copy their text.
- Target market is the United States only. Ignore UK or other regions.

## How the low-DR list was built

36 buyer-intent keywords (hire, agency, services, plus niches) were searched on Google US. The top 20 results (672 URLs) were collected. Big platforms (Upwork, Clutch, Reddit, Shopify and similar) were removed, leaving 391 domains. Their Ahrefs DR was checked on October 23, 2026. Nine domains had DR 3–15 and real traffic; five bonus sites were added (three with DR 16–19, two with DR under 3 that still rank well).

Patterns seen:

1. A service page that targets the exact keyword ranks on page 1 even with low DR (automaly.io `/services/`, nivara.co Shopify setup, techformation.io SaaS page).
2. "Top / best X companies" list posts rank for low-DR sites (localspark, hourlydeveloper, brainboxautomations, aiemployees).
3. GoHighLevel content gets 5,000–9,000 visits a month at DR 0–9 (grow-highlevel.com, hexalevel.com). This is the biggest opening for us.
