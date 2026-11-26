# Shopify and WordPress keyword and competitor research

Pages: `/services/shopify-development`, `/services/wordpress-development`, `/packages/wordpress-care-plan` (check only).
Researched on November 21, 2026. Everything here is a **proposal**. Nayab makes the final call. Nothing in `keyword-map.md` or `lib/seo/keywords.ts` was changed.

## Sources and method

| Data | Tool | Settings | Date |
| --- | --- | --- | --- |
| Volume, Ads competition, bids | Google Keyword Planner (Discover new keywords) | United States, English, Google, Nov 2025 – Oct 2026 | November 21, 2026 |
| Bids in USD | Converted from PKR (account currency) at 276.5 PKR per USD | Wise mid-market rate | November 21, 2026 |
| SERPs | Google search, pages 1 and 2 | `gl=us`, `hl=en`, `pws=0` | November 21, 2026 |
| DR, backlinks | Ahrefs Website Authority Checker and Backlink Checker (free) | Domain with subdomains | November 21, 2026 |
| KD | Ahrefs Keyword Difficulty Checker (free) | United States | November 21, 2026 |

- Keyword Planner runs: 10 Shopify seeds (898 ideas), 10 WordPress seeds (981 ideas), plus 2 runs for jobs/salary/course/login/pricing/comparison keywords. Kept: every idea with 100+ monthly searches, every keyword in the map, and the cost keywords.
- Volume is a range because the Ads account is cancelled (no exact numbers).
- "Ads competition" is Google Ads competition, not SEO difficulty. KD is the SEO difficulty.
- 24 SERPs, 163 domains after removing platforms (Shopify, WordPress), marketplaces (Upwork, Fiverr, Clutch, Toptal and similar) and forums. DR was checked for every remaining US-relevant domain. 3 non-US domains (.co.uk, .com.au) were skipped.

## Files

| File | What it holds |
| --- | --- |
| `shopify-keywords.csv` | 111 Shopify keywords: volume, competition, bids (PKR and USD), KD, intent, buyer intent, quick-win flag, never-primary flag, keyword-map owner, `taken_by` |
| `wordpress-keywords.csv` | 106 WordPress / WooCommerce keywords, same columns |
| `shopify-wordpress-competitors.csv` | The 10 sites with DR 0–15 in the US top 20, with page details |
| `shopify-wordpress-serp-notes.md` | Top 10 per keyword with DR, page-type mix, gap and People Also Ask |
| `content/briefs/shopify-development.md`, `content/briefs/wordpress-development.md` | Content briefs (content.md §4) |

## Summary

- The current primaries are hard: **shopify agency** KD 56 and **wordpress agency** KD 43. No DR 0–15 site ranks in the top 20 for either. Directories, list posts and DR 50–80 agencies hold page 1.
- Close variants with the same buyer intent are easy (KD 0–10, Ads competition Low): 18 Shopify keywords and 19 WordPress keywords. Best ones: **shopify development agency** KD 3, **shopify seo agency** KD 4 (1K–10K), **hire shopify expert** KD 2, **wordpress development agency** KD 5, **wordpress website design agency** KD 3 (1K–10K), **wordpress design company** KD 4 (1K–10K), **wordpress care plans** KD 1.
- 10 sites with DR 0–15 rank in the US top 20 (all on long-tail keywords). 4 show US signals (US office, US list, US cities or USD prices), 1 likely targets the US (.us domain), 1 does not (UAE), 4 could not be checked.
- The pattern that wins at low DR: **exact keyword in domain or URL + H1**, a definition section, **visible monthly or project price**, a free audit/check offer, and **FAQ + Service/FAQPage schema**. Their backlinks are few or low quality (link-seller sites, directories).

## Recommendations

### 1. `/services/shopify-development`

**Primary: change** from `shopify agency` to **`shopify development agency`** (proposal). It also fits the existing slug `/services/shopify-development`.

| Keyword | Volume | Ads comp. | Bid high (USD) | KD | Low-DR in top 20 |
| --- | --- | --- | --- | --- | --- |
| shopify agency (now) | 1K–10K | Low | 32.27 | 56 | none |
| **shopify development agency** | 100–1K | Low | 63.26 | 3 | SERP not pulled |
| shopify development company (option B) | 100–1K | Low | 36.88 | 9 | markup-service.com DR 9 (#18) |

Why: same hire intent, KD 3 instead of 56, almost double the bid (buyers pay more for it). Keep `shopify agency` as a secondary so the page still matches it once authority grows.

Top 5 keywords for this page (proposal):

1. shopify development agency — 100–1K · Low · $63.26 · KD 3 (primary)
2. shopify development company — 100–1K · Low · $36.88 · KD 9
3. hire shopify developer — 100–1K · Low · $32.25 · KD 8 (already in map)
4. hire shopify expert — 100–1K · Low · $47.56 · KD 2
5. shopify plus development agency — 100–1K · Low · $51.02 · KD 1

More secondaries: shopify consultant (KD 9, $74.68; shopifyconsultants.com DR 0.2 ranks #6), shopify consultation (KD 0), shopify website designer (KD 10), shopify migration services (KD 13), shopify store design services (KD 8, in map), shopify agency (KD 56), headless shopify (KD 20, in map).

**Separate Shopify SEO page later (needs approval):** a whole cluster is easy and has volume: shopify seo agency 1K–10K KD 4, shopify seo services 1K–10K KD 6 (now a secondary here), shopify seo company KD 2, shopify seo expert KD 2. One page would own these; keep `shopify seo services` here until that page exists.

Possible fixed-price package later: `shopify store setup service` (100–1K · Low · $25.04 · KD 18), like nivara.co in `low-dr-sites.csv`.

### 2. `/services/wordpress-development`

**Primary: change** from `wordpress agency` to **`wordpress development agency`** (proposal; already a secondary on this page and fits the slug).

| Keyword | Volume | Ads comp. | Bid high (USD) | KD | Low-DR in top 20 |
| --- | --- | --- | --- | --- | --- |
| wordpress agency (now) | 1K–10K | Low | 29.92 | 43 | none |
| **wordpress development agency** | 100–1K | Low | 42.98 | 5 | none seen |
| wordpress website design agency (option B) | 1K–10K | Low | 41.41 | 3 | SERP not pulled |

Why: KD 5 instead of 43, higher bid, matches the slug. Option B has 10x more volume at KD 3, but it is a design keyword; it fits better on a separate WordPress design page (needs approval) or as a strong secondary here.

Top 5 keywords for this page (proposal):

1. wordpress development agency — 100–1K · Low · $42.98 · KD 5 (primary)
2. wordpress website design agency — 1K–10K · Low · $41.41 · KD 3
3. wordpress design company — 1K–10K · Low · $41.41 · KD 4
4. wordpress website development company — 100–1K · Low · $73.42 · KD 2
5. custom wordpress development — 100–1K · Low · $30.01 · KD 0 (wptechstudio.net DR 6 #12)

More secondaries: wordpress web design agency (1K–10K, KD 6), hire dedicated wordpress developer (KD 0), wordpress designers (KD 0), wordpress specialist (KD 8), hire wordpress developer (KD 24, in map), wordpress experts for hire (KD 25, in map), wordpress agency (KD 43). `wordpress web design company` (in map) has KD 45; swap it for `wordpress design company` (KD 4).

`woocommerce development company` (KD 26), `hire woocommerce developers` and `woocommerce development services` belong to `/services/ecommerce-development` (taken by that page).

### 3. `/packages/wordpress-care-plan` (check)

**Primary: keep** `wordpress maintenance plans` — 100–1K · Low · $31.26 · KD 11.

Add as secondary (proposal):

- wordpress care plans — 100–1K · Low · $19.37 · **KD 1** (wp.support DR 2.2 #12)
- wordpress maintenance services — 100–1K · Low · $25.35 · **KD 6** (DR 0.5 site #1, DR 1.7 site #5). Check overlap with `/services/website-maintenance` (secondary `wordpress support services`) before adding.
- wordpress maintenance packages — 100–1K · Low · KD 1
- wordpress maintenance company — 100–1K · Low · $31.70 · KD 1
- wp maintenance plans — 100–1K · Low · $31.26 · KD 8

### 4. Blog post ideas (not for service pages)

| Topic / keyword | Volume | KD | Why |
| --- | --- | --- | --- |
| migrate wordpress to shopify | 100–1K | 8 | Guides rank (suplex.design DR 8 #9); links to the Shopify page |
| shopify vs woocommerce / shopify vs wordpress | 100–1K each | not checked | Compare intent, feeds both pages |
| How much does it cost to hire a Shopify expert? (PAA) | `shopify developer cost`, `shopify store setup cost` 10–100 | not checked | Price intent, answers PAA |
| How much does WordPress maintenance cost? (PAA) | `wordpress website maintenance cost` 10–100 | not checked | Feeds the care plan |
| Is WordPress outdated in 2026? (PAA on 3 SERPs) | — | — | Shows up on wordpress agency, hire and maintenance SERPs |
| How to choose a Shopify Plus agency | `shopify plus development agency` KD 1 | 1 | ecommwizards DR 15 ranks #11 with this format |
| Best Shopify development companies in the USA (fair list incl. Nayab) | `shopify development company` KD 9 | 9 | markup-service DR 9 ranks #18 |
| shopify theme customization | 100–1K | 38 | SERP is DIY/learn intent |

### 5. Never primary (flagged in the CSVs)

Jobs, salary, course, tutorial, login, free themes, platform pricing/plans (`shopify pricing`, `shopify plans`, `wordpress pricing`, `woocommerce pricing`), all `near me` and `upwork wordpress developer`. Examples: `shopify login` 100K–1M, `wordpress login` 10K–100K, `shopify free themes` 1K–10K.

## Quick wins: target these first

Rule used: Ads competition **Low** + Ahrefs KD **0–10** + buyer intent High or Medium + not owned by another page. In the CSVs, `quick_win` = `yes` when a DR 0–15 site also ranks in the top 20, `likely` when KD is easy but we did not see a DR 0–15 site, `KD pending` when KD was not checked.

| Keyword | Cluster | Volume | Bid high (USD) | KD | Buyer intent | Fits page |
| --- | --- | --- | --- | --- | --- | --- |
| shopify consultation | shopify | 100-1K | 74.68 | 0 | High | /services/shopify-development |
| shopify plus agency | shopify | 100-1K | 44.52 | 1 | High | /services/shopify-development |
| shopify plus development agency | shopify | 100-1K | 51.02 | 1 | High | /services/shopify-development |
| hire shopify expert | shopify | 100-1K | 47.56 | 2 | High | /services/shopify-development |
| shopify experts seo | shopify | 100-1K | 80.80 | 2 | High | new Shopify SEO page (or secondary now) |
| shopify seo company | shopify | 100-1K | 28.01 | 2 | High | new Shopify SEO page (or secondary now) |
| shopify seo expert | shopify | 100-1K | 80.80 | 2 | High | new Shopify SEO page (or secondary now) |
| shopify development agency | shopify | 100-1K | 63.26 | 3 | High | /services/shopify-development |
| shopify marketing agency | shopify | 100-1K | 83.23 | 3 | High | /services/shopify-development |
| migrate from wordpress to shopify | shopify | 100-1K | 45.01 | 3 | Medium | blog post |
| shopify seo agency | shopify | 1K-10K | 33.28 | 4 | High | new Shopify SEO page (or secondary now) |
| shopify seo services | shopify | 1K-10K | 33.28 | 6 | High | new Shopify SEO page (or secondary now) |
| hire shopify developer | shopify | 100-1K | 32.25 | 8 | High | /services/shopify-development |
| shopify store design services | shopify | 10-100 | 45.01 | 8 | High | /services/shopify-development |
| migrate wordpress to shopify | shopify | 100-1K | 45.01 | 8 | Medium | blog post |
| shopify consultant | shopify | 100-1K | 74.68 | 9 | High | /services/shopify-development |
| shopify development company | shopify | 100-1K | 36.88 | 9 | High | /services/shopify-development |
| shopify website designer | shopify | 100-1K | 45.01 | 10 | High | /services/shopify-development |
| hire dedicated wordpress developer | wordpress | 100-1K | 38.85 | 0 | High | /services/wordpress-development |
| wordpress designers | wordpress | 100-1K | 47.14 | 0 | High | /services/wordpress-development |
| custom wordpress development | wordpress | 100-1K | 30.01 | 0 | Medium | /services/wordpress-development |
| wordpress care plans | wordpress | 100-1K | 19.37 | 1 | High | /packages/wordpress-care-plan |
| wordpress maintenance company | wordpress | 100-1K | 31.70 | 1 | High | /packages/wordpress-care-plan |
| wordpress maintenance packages | wordpress | 100-1K | — | 1 | High | /packages/wordpress-care-plan |
| wordpress website development company | wordpress | 100-1K | 73.42 | 2 | High | /services/wordpress-development |
| wordpress website design agency | wordpress | 1K-10K | 41.41 | 3 | High | /services/wordpress-development |
| wordpress design agency | wordpress | 100-1K | 33.01 | 3 | High | /services/wordpress-development |
| wordpress design company | wordpress | 1K-10K | 41.41 | 4 | High | /services/wordpress-development |
| wordpress website development agency | wordpress | 100-1K | — | 4 | High | /services/wordpress-development |
| wordpress development agency | wordpress | 100-1K | 42.98 | 5 | High | /services/wordpress-development |
| wordpress web development agency | wordpress | 100-1K | — | 5 | High | /services/wordpress-development |
| wordpress web design agency | wordpress | 1K-10K | 41.41 | 6 | High | /services/wordpress-development |
| wordpress maintenance services | wordpress | 100-1K | 25.35 | 6 | High | /packages/wordpress-care-plan |
| wordpress website design company | wordpress | 1K-10K | 41.41 | 7 | High | /services/wordpress-development |
| wordpress specialist | wordpress | 100-1K | 54.09 | 8 | High | /services/wordpress-development |
| wp maintenance plans | wordpress | 100-1K | 31.26 | 8 | High | /packages/wordpress-care-plan |
| wordpress speed optimization | wordpress | 100-1K | 16.46 | 9 | Medium | /packages/website-speed-optimization |

## Low-DR competitors (DR 0–15)

| Site | DR | Keyword | Pos. | KD | Page type | US target |
| --- | --- | --- | --- | --- | --- | --- |
| shopifyconsultants.com | 0.2 | shopify consultant | 6 | 9 | homepage, exact-match domain | yes |
| wordpressmaintenanceservices.us | 0.5 | wordpress maintenance services | 1 | 6 | homepage, exact-match .us | likely |
| wordpressmaintenanceservice.com | 1.7 | wordpress maintenance services | 5 | 6 | homepage, exact-match domain | USD prices |
| wp.support | 2.2 | wordpress care plans | 12 | 1 | plans page | not available |
| wptechstudio.net | 6 | custom wordpress development | 12 | 0 | blog guide | not available |
| suplex.design | 8 | migrate wordpress to shopify | 9 | 8 | blog guide | no (UAE) |
| markup-service.com | 9 | shopify development company | 18 | 9 | listicle | yes |
| equinoxitsol.com | 13 | wordpress website design services | 8 | 41 | list blog | not available |
| ecommwizards.com | 15 | shopify plus development agency | 11 | 1 | how-to-choose guide | yes |
| nexvertisedigital.com | 15 | wordpress website design services | 15 | 41 | service page | not available |

Near misses (DR 16–20): fluxpress.io 16, qewebby.com 17, fishertechsolutions.com 18, geeksforless.com 20 (#5 for custom wordpress development), theclickcommerce.com 20, thrivestudioinc.com 20.

## Content analysis (what top pages cover)

Opened pages: sherocommerce.com hire page (2,260 words), coalitiontechnologies.com Shopify page (2,447 words, "$2,500" shown), prontomarketing.com WordPress design page (3,370 words, $4,500–$15,000 builds, $99/mo plans, money-back guarantee), wordpressmaintenanceservice.com (1,604 words, $39/$79 per month), ecommwizards.com guide (2,541 words), shopifyconsultants.com (1,934 words). Word counts exclude header, nav and footer.

Covered by most: FAQ block with FAQPage schema, process steps, portfolio/case studies, partner badges (Shopify Plus/Premier Partner), testimonials, a free audit or site check.

Gaps (what almost nobody does well):

- Transparent **price ranges for small US businesses** (only Pronto, Coalition and the maintenance site show numbers).
- **Timeline per step** and what happens in week 1.
- **Ownership**: who owns the store/theme/code and accounts after handover.
- **What is not included** in a plan.
- A **solo senior developer** angle (direct contact, US time-zone overlap) versus agencies and marketplaces.
- Answers to PAA: cost to hire a Shopify expert, can I hire someone to set up my store, is WordPress outdated in 2026, what a maintenance plan should include.

## Strategy: from DR 0 upward

1. **Start with the quick-win list** (KD ≤ 10, Ads competition Low). Low-DR sites rank only on keywords like these.
2. **One page = one exact keyword.** Put it in the URL slug, H1, title and first 100 words. We cannot use exact-match domains, so exact-match pages are our version of that.
3. **Show prices on the page** (range or "starts at"), plus a free audit offer. Every low-DR winner selling a service does one of these.
4. **FAQ from People Also Ask** + `Service` and `FAQPage` JSON-LD (already required by `seo.md`).
5. **Write 1,500–2,500 useful words** per money page: definition, what is included, process with timeline, cost, mistakes to avoid.
6. **Support with guides and fair lists**: "how to choose a Shopify Plus agency", "best Shopify development companies in the USA", "migrate WordPress to Shopify". These rank at DR 8–15 and link up to the service pages.
7. **Easy first links** (see below), then review positions in Search Console every month (`reviews/YYYY-MM.md`).

## Backlink opportunities (from low-DR competitors' profiles)

1. City/state agency directories: goodfirms.co (state pages), revenuebase.ai (city agency lists) — both link to shopifyconsultants.com.
2. Agency directories by service: listedagencies.com (links to ecommwizards.com).
3. Footer credit on client sites ("Designed by …") — ecommwizards.com gets links this way. Only with client permission.
4. Design/dev resource blogs: hongkiat.com, instantshift.com, wparena.com, crazyleafdesign.com, domestika.org — they link to markup-service.com. Pitch a useful guide or resource.
5. Platform directories that rank on page 1: Shopify Partner Directory and WP Engine / WP VIP agency directories (listing, not a dofollow guarantee).

## Data not available

- 5 low-DR pages did not load from our connection: wordpressmaintenanceservices.us, wp.support, wptechstudio.net, equinoxitsol.com (blank page), nexvertisedigital.com. Their word count, outline, pricing, FAQ and schema are "not available".
- Backlink sources: the Ahrefs free top-links list was empty for wordpressmaintenanceservices.us; all other 9 sites have sources listed.
- KD checked for 97 keywords (56 Shopify, 41 WordPress): every primary/secondary candidate and most buyer-intent keywords. The rest (spelling variants, learn-intent and never-primary keywords) say "KD pending".
- No US IP or incognito window: searches used `gl=us` from Pakistan, so positions can differ slightly from a real US search.
- Keyword Planner gives ranges only (cancelled Ads account), and bids are in PKR, converted to USD.
