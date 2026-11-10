# HANDOFF: where the work stands

Read this file at the start of every session. Update it and push it before you stop (CLAUDE.md §10).
Keep it short: current status, the next step, and what is waiting for Nayab.

Last updated: November 10, 2026

## Current status

- Homepage is merged into `main` ([PR #9](https://github.com/nayabgull/nayabgull-web/pull/9)).
- **Page work is paused (Nayab, November 10, 2026).** A redesign comes first: [PR #23](https://github.com/nayabgull/nayabgull-web/pull/23) on `feature/redesign` (from `main`) redesigns the homepage and adds `/contact`. It waits for Nayab's design approval. Do not merge it and do not touch other pages before that.
- The nine earlier PRs below are still open and unmerged. Their pages use the old layout (heading left, content right). After the design is approved, each one gets the new design.
- The eight page PRs are **stacked**: each one is based on the branch before it, so each diff shows one page. Merge them in order, #15 first.

### Redesign (PR #23), in short

- Sections: centered eyebrow, H2 and intro (max 60ch), content below in a centered grid. Container 1200px.
- Hero: copy and CTAs left, quote form right (`components/forms/LeadForm.tsx`, Server Action in `app/(site)/actions.ts`, works without JavaScript).
- Leads: Zod in `lib/leads/`, honeypot, optional Turnstile (loads on first focus), saved to the Payload collection `Leads`. Migration `migrations/20261110_113331_leads.ts` is generated, not run. Email hook: `lib/leads/notify.ts` (no service yet).
- Lead flow section after Services (`LeadFlow.tsx`): CSS-only animation started by `components/ui/InView.tsx`. No Motion or GSAP loaded.
- Sticky "Book a free call" in the header; sticky bottom bar on phones (`MobileCtaBar.tsx`).
- About is text only (no photo, no initials avatar).

### Earlier PRs

| #   | Page                                      | Branch                              | PR                                                        | Status |
| --- | ----------------------------------------- | ----------------------------------- | --------------------------------------------------------- | ------ |
| 0   | `docs/HANDOFF.md` + CLAUDE.md §10         | `chore/handoff`                     | [#14](https://github.com/nayabgull/nayabgull-web/pull/14) | open   |
| 1   | `/gohighlevel-agency`                     | `feature/gohighlevel-agency`        | [#15](https://github.com/nayabgull/nayabgull-web/pull/15) | open   |
| 2   | `/ai-automation-agency`                   | `feature/ai-automation-agency`      | [#16](https://github.com/nayabgull/nayabgull-web/pull/16) | open   |
| 3   | `/industries/roofing-hvac-website-design` | `feature/roofing-hvac-page`         | [#17](https://github.com/nayabgull/nayabgull-web/pull/17) | open   |
| 4   | `/services/web-design-development`        | `feature/web-design-development`    | [#18](https://github.com/nayabgull/nayabgull-web/pull/18) | open   |
| 5   | `/hire-full-stack-developer`              | `feature/hire-full-stack-developer` | [#19](https://github.com/nayabgull/nayabgull-web/pull/19) | open   |
| 6   | `/pricing`                                | `feature/pricing`                   | [#20](https://github.com/nayabgull/nayabgull-web/pull/20) | open   |
| 7   | `/about`                                  | `feature/about`                     | [#21](https://github.com/nayabgull/nayabgull-web/pull/21) | open   |
| 8   | `/privacy-policy` and `/terms`            | `feature/legal-pages`               | [#22](https://github.com/nayabgull/nayabgull-web/pull/22) | open   |

### How the pages are built

- Copy lives in `content/pages/<page>.ts`. The registry is `content/pages/index.ts`; the sitemap, the tests and the audits read it.
- One template renders every page: `components/sections/ContentPage.tsx`.
- Header and footer links live in `content/navigation.ts`.
- Approved starting prices (USD): landing page $600, business website (5 pages) $1,500, GoHighLevel setup $750, AI voice receptionist $750 setup + $149/month, full system $2,500. A unit test fails on any other dollar amount.

### CI on these PRs

Known red jobs, none caused by the page copy:

- `seo-audit`: `security-headers` fails on every page, as on `main` (separate PR, Nayab's decision). `internal-links` also fails on #15 and #16 only, because too few pages exist that early in the stack.
- `responsive`: no visual snapshots yet for the new pages, and the homepage, header and footer changed.
- `lighthouse`: mobile LCP was already red on `main`.

## Next step

Wait for Nayab's answer on [PR #23](https://github.com/nayabgull/nayabgull-web/pull/23). Then:

1. Apply any design changes Nayab asks for.
2. After approval: move the shared page template (`ContentPage` and its blocks on the stacked branches) to the new centered layout, end every page with the quote form section, and remove the initials avatar from `/about`.
3. Snapshots (`update-snapshots` label), the security-headers PR, then the hub child pages.

## Waiting for Nayab

**Redesign ([PR #23](https://github.com/nayabgull/nayabgull-web/pull/23))**

- Approve the design or ask for changes.
- Approve the proposed `/contact` keyword "contact nayab gull", or give another.
- Send the email address for `/contact` (`CONTACT_EMAIL` in `content/contact.ts`). None is shown now.
- Decide: once Turnstile keys are set, visitors with JavaScript off cannot send the form. Keep that rule or change it.
- Confirm the reply time on the forms ("within one business day").
- Run the Leads migration locally (`pnpm db:migrate`), and add Turnstile keys when ready.

**Review and merge**

- Merge [#14](https://github.com/nayabgull/nayabgull-web/pull/14), then #15 to #22 in order.
- Decide when to add the `update-snapshots` label (each use opens a snapshots PR).

**Send or decide**

- Photo for the About page (`public/images/nayab-gull.webp`) and real LinkedIn, GitHub and Upwork URLs.
- Your own story for the About page, in your words.
- A support email and phone number. No page shows one today; the only contact route is the booking link.
- Legal pages: lawyer review, the legal business name for A2P registration, and the governing law for the terms.
- An SMS opt-in form with an unchecked consent box (A2P reviewers look for it; the site has no form yet).
- An approved case-study number. Proof sections use only confirmed facts for now.

**Confirm (stated on the pages, marked `TODO(nayab)` in the content files)**

- Timelines: GoHighLevel setup "1 to 2 weeks", websites "2 to 6 weeks", roofing sites "2 to 4 weeks", quote "within 3 days".
- Tools named: Vapi, n8n, Make, Zapier, ChatGPT API, Payload, WordPress, Shopify, JobNimbus, AccuLynx, ServiceTitan, Housecall Pro.
- Policies: fixed price per project, monthly block of hours for ongoing work, "No long contracts", NDA on request, small jobs accepted, live demo and code walkthrough on calls.
- Privacy policy facts: providers (Vercel, Cal.com, GoHighLevel), "strong passwords and two-step sign-in", no advertising cookies.
- Every FAQ answer on every page.
