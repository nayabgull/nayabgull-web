# SEO Rules — on-page and technical

Every rule marked **[CI]** is checked by `pnpm audit:seo` on every built URL. A single failure turns CI red.
Google guidance followed: people-first helpful content, E-E-A-T, Core Web Vitals, spam policies (scaled content, doorway pages, site reputation abuse).

## 1. Keyword ownership

- **[CI]** Every indexable page has exactly **one primary keyword** registered in `docs/seo/keyword-map.md` (and mirrored in `lib/seo/keywords.ts`).
- **[CI]** No two pages share a primary keyword. Secondary keywords may appear on one page only as targets.
- New pages get their keywords from the research files first; a new keyword needs Nayab's approval.
- "near me" keywords are never primary (no US office).

## 2. Title, meta and URL

- **[CI]** `<title>`: unique, 30–60 characters, primary keyword in the first half, brand at the end (`| Nayab Gull`).
- **[CI]** Meta description: unique, 120–155 characters, contains the primary keyword or a close variant, ends with a clear benefit or CTA.
- **[CI]** URL slug: lowercase, hyphens, ≤ 5 words, contains the primary keyword, no dates, no stop-word padding, no trailing slash.
- **[CI]** Self-referencing canonical, absolute `https://nayabgull.com/...`.
- **[CI]** Open Graph (`og:title`, `og:description`, `og:image` 1200×630, `og:url`, `og:type`) and Twitter card on every page.
- Titles and descriptions are written for humans first: specific, no keyword stuffing, no ALL CAPS.

## 3. Headings and structure

- **[CI]** Exactly one `<h1>`, containing the primary keyword (or exact variant), different wording from `<title>` is allowed.
- **[CI]** No skipped heading levels (H2 → H4 is a failure).
- **[CI]** At least one H2 contains the primary keyword or a secondary keyword.
- **[CI]** Primary keyword appears in the first 100 words of body copy.
- H2s follow search intent; question-style H2s for informational sections (from People Also Ask).

## 4. Links

- **[CI]** Each page links to **3–8** relevant internal pages with descriptive anchor text (never "click here", "read more", "learn more" alone).
- **[CI]** Every page is reachable within **3 clicks** from the homepage and has at least one incoming internal link (no orphans).
- **[CI]** No broken links; no internal links to redirects (link to the final URL).
- External links: only to authoritative sources; `rel="noopener"` on new-tab links; sponsored/affiliate links get `rel="sponsored"`.
- Blog posts link up to their hub page; hubs link down to every child.

## 5. Images and media

- **[CI]** Every `<img>` comes from `next/image` with `alt` (descriptive, ≤ 125 chars, no "image of"), `width` and `height`.
- **[CI]** Decorative images use `alt=""`.
- File names are descriptive and hyphenated (`law-firm-intake-automation-flow.webp`).
- AVIF/WebP, the LCP image uses `priority`; everything else lazy-loads.

## 6. Structured data (JSON-LD)

- **[CI]** Valid JSON-LD on every page, built only through `lib/seo/jsonld.ts`.
- **[CI]** Markup matches visible content (no hidden FAQs, no prices not on the page).

| Page type | Required schema |
| --- | --- |
| All pages | `Organization` (ProfessionalService), `WebSite`, `BreadcrumbList` |
| Home, About | + `Person` (Nayab Gull, `sameAs` LinkedIn, GitHub, Upwork) |
| Hub, service, industry, package | + `Service` (with `provider`, `areaServed: US`, `Offer` when a price is shown), `FAQPage` when an FAQ is visible |
| Blog post | + `BlogPosting` (author `Person`, `datePublished`, `dateModified`, `image`) |
| Case study | + `Article` |
| Free tool | + `WebApplication` |

- Never add self-serving `Review` / `AggregateRating` on the organisation or services.

## 7. Crawling and indexing

- **[CI]** `app/sitemap.ts` lists every indexable URL with `lastModified`; sitemap index if > 1 sitemap; no noindex or redirected URLs inside.
- **[CI]** `app/robots.ts`: allow the site, `Disallow: /admin`, `Disallow: /api`, link the sitemap.
- **[CI]** `/admin` and `/api` responses send `X-Robots-Tag: noindex, nofollow`; they never appear in the sitemap or in internal links.
- **[CI]** Drafts, previews, search results and thin tag pages are `noindex, follow`.
- **[CI]** One canonical host: `https://nayabgull.com` (no `www`, no trailing slash) — all variants 301 to it.
- **[CI]** Real HTTP 404 for missing pages (custom page), 410 for removed content, 301 via the Payload `Redirects` collection when a slug changes.
- `<html lang="en-US">`; no hreflang (single locale).
- IndexNow ping on publish; Search Console + Bing Webmaster verified.
- `/llms.txt` lists the key pages with one-line descriptions for AI search.

## 8. Performance (ranking + UX)

- Core Web Vitals budgets live in `quality-gates.md` and are enforced there.
- Real-user Web Vitals reported to GA4 via `useReportWebVitals` and Vercel Speed Insights.

## 9. Security headers (trust + Best Practices 100)

- **[CI]** HTTPS only, HSTS (`max-age=63072000; includeSubDomains; preload`), CSP with nonces, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `frame-ancestors 'none'`.

## 10. Page-type checklist

| Page type | Min words | Must include |
| --- | --- | --- |
| Homepage | 1,200 | Proof bar, 3 pillars, industries, case studies, FAQ (6+), CTA |
| Hub (GHL, AI, Industries, Services) | 1,500 | Links to every child, FAQ (8+), case study, CTA |
| Industry page | 1,500 | Industry pain points, features, automation flow, pricing range, FAQ (6+), unique visuals |
| Service page | 1,200 | Process, deliverables, tech, pricing range, FAQ (6+), case study link |
| Package page | 600 | Fixed price, scope, timeline, what's excluded, buy/book CTA |
| Blog post | 1,500 | Direct answer in first 60 words, TOC, FAQ, author box, updated date |
| Case study | 800 | Problem, solution, stack, measurable result (real and approved) |
