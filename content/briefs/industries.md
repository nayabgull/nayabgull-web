# Content brief: industries hub

Page: `/industries` (hub). Breadcrumb: Home › Industries. Every industry page goes Home › Industries › that page.
Keywords: the "Industries" table of `docs/seo/keyword-map.md`, row "Hub". Research: `docs/seo/research/keywords-all.csv` and `docs/seo/research/clusters/keywords-web-dev.csv`.

## 1. Primary keyword and intent

- Primary: **industry website design**. Volume: research pending (not in the research files; the map shows "—"). Intent: compare and hire. A business owner wants to know if a developer understands their kind of business, then picks the page for their industry.

## 2. Secondary keywords (this page only)

- website design for small business (1K–10K, Ads competition Low, `keywords-all.csv`).

KD for these keywords: research pending (`docs/seo/research/kd.md`).

No child page keyword is targeted here. The hub names each child page in its link text only.

## 3. Entities to cover

Small business, industry-specific website, generic template, law firm, attorney, intake, dental office, clinic, patient forms, online booking, reminders, real estate agent, brokerage, IDX, MLS, roofing, HVAC, contractor, estimate form, project gallery, quote form with photos, tap-to-call, CRM, follow-up texts, missed-call text-back, AI receptionist, GoHighLevel, Google Business Profile, A2P 10DLC, WCAG 2.2 AA, fixed quote, domain ownership, US time zones.

`tests/unit/pages/industries.test.tsx` checks the secondary keyword and the entities on the rendered page.

## 4. Questions to answer

- Why does an industry-specific website work better than a generic one?
- Which industries do you build for, and what does each page offer?
- Do you only work with these five industries?
- What does every site include, whatever the industry?
- What is the process, and how long does it take?
- What does it cost?
- Who owns the accounts? Do you work in US time zones?
- Can you redesign my current site? Can I edit it myself?
- Do I need the CRM or the AI receptionist to start?
- Can you promise a top spot on Google?
- Who checks the rules for my industry (state bar, MLS, Fair Housing, patient information)?

## 5. What ranks now, and the gap this page fills

Low-DR competitor review for this keyword: research pending (`docs/seo/competitors.md` is still planned). Never copy competitor text.

Planned gap: most "industries we serve" pages are a grid of logos and one line each. This hub explains in plain words why an industry site works better (different form questions, different trust proof, different rules), gives each industry the real problem and the real offer from its own page, and shows the one process and the shared parts behind every build.

## 6. Facts used (all from the repo)

- Card text: the problem and feature sections of each child page in `content/pages/`.
- Process steps: the five-step process on the law firm, contractor, dental and real estate pages.
- "Most websites take two to six weeks": `content/home.ts` (process and FAQ), `content/pages/dental-medical-website-design.ts`.
- Prices ($1,500 business website, $2,500 full system): `content/pages/pricing.ts`.
- 5+ years and 400+ projects: `content/home.ts` hero proof and the child pages.
- Ownership and time zone answers: the approved FAQ answers on the law firm and contractor pages.
- MLS approval for IDX: real estate page. A2P 10DLC registration: dental page.

## 7. Open items for Nayab

- **Case study (hub rule, seo.md §10):** no approved case study exists. The page says so and shows none. Send a real, approved result to replace the note in the "proof" section.
- Confirm "two to six weeks" also holds for law firm, contractor and real estate sites (those pages show no timeline yet).
- Confirm the FAQ answer "Do you only work with these five industries?".
