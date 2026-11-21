# Content brief: dental and medical website design

Page: `/industries/dental-medical-website-design` (industry page). Breadcrumb: Home › Industries › Dental and medical websites.
Keywords: the "Dental & medical" row of `docs/seo/keyword-map.md`. Research: `docs/seo/research/keywords-all.csv` (cluster "Niche: Dental, Medical & Healthcare Websites"; "healthcare workflow automation" sits under "Business Process & Workflow Automation").

## 1. Primary keyword and intent

- Primary: **medical website design company** (100–1K, Ads competition Low). Intent: hire.

## 2. Secondary keywords (this page only)

dental website design agency (100–1K), dental web design company (100–1K), healthcare website design agency (100–1K), doctor website design (100–1K), healthcare workflow automation (100–1K).

Volumes are Keyword Planner ranges from `keywords-all.csv`. Note: the map lists Ads competition Low for the primary only; `keywords-all.csv` shows "dental web design company" as Medium. KD for all of them: research pending (`docs/seo/research/kd.md`, row 17 is empty).

## 3. Entities to cover

Dental practice, dentist, medical clinic, doctor, front desk, new patients, online booking, appointment types, new patient forms, insurance plans, missed calls, missed-call text back, after hours, AI receptionist, emergencies (911), medical advice (never given), appointment reminders, no-shows, recall reminders (cleanings), review requests, Google reviews, Google Business Profile, local SEO, name, address and phone, mobile speed, accessibility (WCAG 2.2 AA), screen reader, ADA (no claim, advisor's call), HIPAA (no claim), protected health information, business associate agreement (BAA), CRM, A2P 10DLC texting registration, practice management software, healthcare workflow automation.

`tests/unit/pages/dental-medical-website-design.test.tsx` checks the secondary keywords and the entities on the rendered page.

## 4. Questions to answer

- What should a dental or medical practice website include?
- How do I stop losing new patients when the front desk cannot pick up?
- Can patients book online and fill in forms before the visit?
- How do reminders and review requests work, and what must I avoid?
- Is my site HIPAA compliant / ADA compliant? (Answer: the practice decides with its own advisor; the page makes no compliance claim.)
- How long does it take, and what does it cost?
- Can it connect to my practice management software?
- Who owns the accounts? Do you work in US time zones?

## 5. What ranks now, and the gap this page fills

Low-DR competitor review for dental and medical keywords: research pending (`docs/seo/competitors.md` is still planned, and no `low-dr-*.csv` file has dental or medical rows). Never copy competitor text.

Planned gap from the research patterns (`docs/seo/README.md`): one focused page on the exact keyword, plus what most dental design pages leave out: the patient flow behind the site (booking, forms, reminders, review requests), a missed-call and after-hours answer, plain words on where patient data may and may not go, and honest limits (no compliance claims, no medical advice).

## 6. Facts used and where they come from

- Prices: `content/pages/pricing.ts` (business website from $1,500, AI voice receptionist from $750 plus $149 per month, full system from $2,500).
- Timeline: "Most websites take two to six weeks" (`content/home.ts` FAQ, `web-design-development.ts`).
- Experience: 5+ years, 400+ projects (`content/home.ts`).
- Ownership and time zone answers: `content/home.ts` FAQ.
- A2P 10DLC texting registration: `content/pages/gohighlevel-agency.ts`.
- Outside facts (not from the repo, for Nayab to check): HIPAA and BAAs, Google's rule against asking only happy patients for reviews. No statistics are used.

## 7. Open items for Nayab

- Proof: no dental or medical case study, client, number or review is approved yet.
- Prices: the page shows the general starting prices from `/pricing`. Confirm they apply to dental and medical sites, or give dental-specific ones.
- Practice management software: the page names no product. Add the ones you have really connected.
- Switch the after-hours link to the AI receptionist page when it exists.
