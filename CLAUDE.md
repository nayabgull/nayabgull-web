# nayabgull.com — Claude Code Project Rules

Personal services website of **Nayab Gull**: full-stack development, GoHighLevel and AI automation for US businesses.
**Goal:** rank on Google US for buyer-intent keywords and turn visitors into booked strategy calls.

These rules are **non-negotiable**. If a rule cannot be met, stop and ask Nayab. Never weaken a rule to make a task pass.

## Rule files (read before every task — they are part of this file)

@docs/rules/quality-gates.md
@docs/rules/seo.md
@docs/rules/content.md
@docs/rules/frontend.md
@docs/seo/keyword-map.md

Priority when rules conflict: **quality-gates > seo > content > frontend > convenience**.

---

## 1. Stack (locked — ask before changing anything here)

| Layer | Choice |
| --- | --- |
| Runtime | Node.js >= 24.22.1 (LTS 24) |
| Framework | Next.js 16 (App Router, TypeScript strict) — Payload needs >= 16.2.6 |
| CMS | Payload CMS 3 inside this Next.js app, `@payloadcms/db-postgres` |
| Database | PostgreSQL on Neon |
| Styling | Tailwind CSS v4, design tokens in CSS variables |
| UI primitives | shadcn/ui (Radix) — only the components actually used |
| Animation | Framer Motion via `LazyMotion` + CSS; never on the critical path |
| Forms | Server Actions + Zod + Cloudflare Turnstile |
| Leads | Form → GoHighLevel webhook + Resend email |
| Hosting | Vercel (preview per PR, production from `main`) |
| Domain | nayabgull.com (registrar: GoDaddy) |
| Testing | Vitest, Testing Library, Playwright, axe-core, Lighthouse CI |
| Monitoring | Vercel Speed Insights, GA4, Search Console, Sentry |

## 2. Package manager

- **pnpm only.** Never run `npm`, `npx` or `yarn`; never create `package-lock.json` or `yarn.lock`. Use `pnpm dlx` instead of `npx`.
- `package.json` has `"packageManager": "pnpm@11.x"` and `"engines": { "node": ">=24.22.1" }`.
- CI installs with `pnpm install --frozen-lockfile`.
- **ESLint stays on v9** until eslint-plugin-react, eslint-plugin-jsx-a11y and eslint-plugin-import support v10. Check with `pnpm peers check` before upgrading.
- Before adding any dependency: check bundle impact, maintenance and licence. Prefer the platform (Web APIs, Next.js built-ins) over a library.

## 3. Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Local dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint, `--max-warnings=0` |
| `pnpm format` / `pnpm format:check` | Prettier write / check |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit + component tests with coverage |
| `pnpm test:e2e` | Playwright (Chromium, Firefox, WebKit) |
| `pnpm test:responsive` | Playwright viewport matrix + visual snapshots |
| `pnpm test:a11y` | axe-core on every route |
| `pnpm audit:seo` | Crawls the built site, enforces `docs/rules/seo.md` |
| `pnpm audit:content` | Enforces `docs/rules/content.md` |
| `pnpm audit:links` | Broken link check |
| `pnpm lhci` | Lighthouse CI with assertions |
| `pnpm verify` | Runs everything CI runs, in the same order |

If a script in this table does not exist yet, creating it is part of the current task.

## 4. Folder structure

```
app/
  (site)/                     public website, own root layout
    page.tsx                  homepage
    gohighlevel-agency/       GHL hub + [slug]
    ai-automation-agency/     AI hub + [slug]
    industries/               hub + [slug]
    services/                 hub + [slug]
    packages/[slug]/
    case-studies/             hub + [slug]
    blog/                     hub + [slug], category, tag, author
    tools/[slug]/
    hire-full-stack-developer/
    sitemap.ts  robots.ts  llms.txt/route.ts  not-found.tsx
  (payload)/                  Payload admin + API (from the blank template)
components/
  ui/                         primitives (Button, Container, Heading…)
  sections/                   Hero, ProofBar, FAQ, CTA, CaseStudyGrid…
  seo/                        JsonLd, Breadcrumbs
collections/                  Payload: Pages, Posts, Services, Industries, CaseStudies, FAQs, Authors, Media, Redirects
lib/
  seo/                        metadata builder, JSON-LD builders, keyword registry
  content/                    readability + content-lint helpers (shared by CI and Payload hooks)
scripts/                      audit-seo.ts, audit-content.ts, check-cannibalization.ts
tests/
  unit/  e2e/  responsive/  a11y/
docs/
  rules/  seo/
payload.config.ts
```

## 5. Definition of Done (every task)

A task is done only when **all** of these are true:

1. `pnpm verify` passes locally with zero warnings.
2. New logic has unit tests; new routes have e2e, responsive and a11y coverage.
3. Every new public page passes `audit:seo` and `audit:content`, and its keywords are registered in `docs/seo/keyword-map.md`.
4. Lighthouse budgets in `quality-gates.md` hold on mobile and desktop.
5. Screenshots checked at 375 px, 768 px and 1440 px.
6. Conventional commit on a feature branch, PR opened, CI green.

## 6. Forbidden — never do these

- Skip, disable or weaken any CI check, threshold, lint rule or test (`--no-verify`, `test.skip`, `.only`, `eslint-disable` without a written reason, lowering a Lighthouse budget). Threshold changes need Nayab's explicit approval in chat.
- Push to `main` or force-push any shared branch.
- Commit secrets, `.env*` files (except `.env.example`) or real client data.
- Invent statistics, reviews, testimonials, client names, logos, awards or a US address.
- Publish thin, duplicated or name-swapped pages (Google scaled-content and doorway policies).
- Expose `/admin` or `/api` to search engines.
- Add tracking or third-party scripts without consent handling and a performance check.

## 7. Git workflow

- Branches: `feature/<name>`, `fix/<name>`, `content/<name>`, `chore/<name>`.
- Conventional commits enforced by commitlint (`feat:`, `fix:`, `content:`, `chore:`, `docs:`, `test:`, `perf:`, `refactor:`).
- One logical change per PR; PR description lists the pages touched and their target keywords.
- Husky: pre-commit runs lint-staged (ESLint, Prettier, typecheck on changed files); pre-push runs unit tests.

## 8. Environment variables

- Real values live in `.env.local` (git-ignored) and in Vercel. Every key is documented in `.env.example`.
- Validate env at boot with Zod (`lib/env.ts`); the build fails on a missing or malformed key.
- Never prefix a secret with `NEXT_PUBLIC_`.

## 9. How to work with Nayab

- Explain briefly in **Roman Urdu**; keep code, commands, comments and commit messages in English.
- One clear step at a time, with exact terminal commands.
- Before large changes, show a short plan and wait for approval.
- Ask before changing the stack, deleting files, adding paid services or changing any rule in `docs/rules/`.
- When unsure about a fact (versions, Google guidance), check the official docs instead of guessing.
- After every push, give clickable links to the PR checks page and the GitHub Actions run, plus a table `job · status · link to its log` for every CI job.
