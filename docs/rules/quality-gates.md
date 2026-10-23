# Quality Gates & CI/CD — red means stop

The CI pipeline exists **from day one**, before any page is built.
If any gate fails, the PR cannot merge and nothing deploys to production. No exceptions.

## 1. Build order (first tasks of the project)

1. Tooling: Prettier, ESLint (`--max-warnings=0`), TypeScript strict, commitlint, Husky + lint-staged.
2. Test harness: Vitest, Playwright (3 engines), axe-core, Lighthouse CI config.
3. Audit scripts: `scripts/audit-seo.ts`, `scripts/audit-content.ts`, `scripts/check-cannibalization.ts`, link check.
4. GitHub Actions workflows + branch protection.
5. Only then: pages and content.

## 2. Pipeline (`.github/workflows/ci.yml`)

Runs on every pull request and on every push to `main`. Node 24.22.1+, pnpm with cache, `--frozen-lockfile`.

| Stage | Job | Fails when |
| --- | --- | --- |
| 1 · Static (parallel) | `lint` | Any ESLint error **or warning** |
| | `format` | `prettier --check` finds a diff |
| | `typecheck` | Any `tsc` error |
| | `commitlint` | A commit message breaks conventional-commit format |
| | `secrets` | gitleaks finds a secret |
| | `deps` | `pnpm audit --audit-level=high` finds an issue; a dependency's licence is not on the allow-list in `scripts/check-licenses.ts` |
| | `sast` | Semgrep OSS (`p/ci`, `p/typescript`, `p/react`, `p/nextjs`, `p/secrets`) reports any finding |
| 2 · Unit | `unit` | Any failing test; coverage below **90%** for `lib/**`, **80%** overall |
| 3 · Build | `build` | `pnpm build` fails or prints a warning about missing metadata/images |
| | `bundle` | Per route (gzip): framework chunks (react-dom, Next.js runtime, Turbopack runtime) > **135 KB**; app-owned first-load JS > **30 KB**; total first-load JS > **165 KB**; total grows > **10 KB** vs `main` |
| 4 · Preview checks (against the Vercel preview URL or `pnpm start`) | `e2e` | Any Playwright test fails in Chromium, Firefox or WebKit |
| | `responsive` | Horizontal overflow, overlapping elements, clipped text or a visual diff > **0.1%** at any viewport in `frontend.md` |
| | `a11y` | **Any** axe-core violation (all impact levels) on any route, light and dark theme |
| | `lighthouse` | Any budget below is missed (median of 3 runs) |
| | `seo-audit` | Any rule in `seo.md` fails on any URL |
| | `content-audit` | Any rule in `content.md` fails on any page |
| | `cannibalization` | Two pages share a primary keyword, a keyword (primary or secondary) is targeted on more than one page, `lib/seo/keywords.ts` differs from `docs/seo/keyword-map.md`, or a page has none registered |
| | `links` | Any broken internal or external link |
| | `structured-data` | Any JSON-LD block fails schema validation |
| 5 · Deploy | `deploy` | Runs only on `main` after all jobs pass; then post-deploy smoke test; on failure → Vercel instant rollback |

### Lighthouse budgets (mobile and desktop, every page template)

| Metric | Budget |
| --- | --- |
| Performance | ≥ 95 mobile, ≥ 98 desktop |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | ≤ 2.0 s |
| CLS | ≤ 0.05 |
| TBT (INP proxy) | ≤ 150 ms |
| FCP | ≤ 1.5 s |
| Total page weight | ≤ 1 MB (homepage ≤ 1.2 MB) |

### Scheduled jobs

- **Nightly** (`nightly.yml`): Lighthouse + SEO audit + content audit + link check against **production**; opens a GitHub issue on any failure.
- **Weekly**: Dependabot PRs (grouped). Dependabot alerts and security updates are on. Static analysis runs on every PR in the `sast` job.

## 3. Branch protection on `main`

- All jobs above are **required** status checks.
- Pull request required; 1 approval (self-review allowed); conversation resolution required.
- Linear history, no force pushes, no deletions, admins included.
- Stale approvals dismissed on new commits.

## 4. CMS content cannot bypass the gates

Content saved in Payload never goes through a PR, so the **same rules run inside Payload**:

- `lib/content/*` and `lib/seo/*` validators are shared by CI scripts and Payload `validate` / `beforeChange` hooks.
- A document that fails a hard rule **cannot be published** (draft save allowed, publish blocked, error shown to the editor).
- Publishing triggers on-demand revalidation, then the nightly production audit re-checks everything.

## 5. Rules for Claude

- Run `pnpm verify` before saying a task is done. Paste the summary.
- If a gate fails, fix the cause. Never mute the check.
- Never add `// @ts-ignore`, `eslint-disable`, `test.skip`, `.only`, Lighthouse `warn` instead of `error`, or `continue-on-error` in workflows.
- A threshold changes only after Nayab approves it in chat; record the reason in this file.

## 6. Approved changes log

- **2026-10-23:** CodeQL replaced by Semgrep OSS while the repo is private (approved by Nayab 2026-10-23). Reason: CodeQL and dependency-review need GitHub Advanced Security on private repos.
- **2026-10-23:** `deps` checks licences with `license-checker-rseidelsohn` and an allow-list instead of `dependency-review-action`, for the same reason (approved by Nayab 2026-10-23).
- **2026-10-23:** `cannibalization` also fails when a secondary keyword is targeted on more than one page (approved by Nayab 2026-10-23).
- **2026-10-23:** On macOS 12, `pnpm verify` reports the Playwright stages (bundle, e2e, responsive, a11y, lighthouse) as SKIPPED, never as passed. Playwright 1.64 has no browsers for macOS 12. Those stages run in full in GitHub CI and Claude Code cloud. Visual baselines are created only on Linux (approved by Nayab 2026-10-23).
- **2026-10-23:** `bundle` budget split into framework ≤ 135 KB, app-owned ≤ 30 KB and total ≤ 165 KB first-load JS per route (gzip), growth vs `main` ≤ 10 KB unchanged (approved by Nayab 2026-10-23). Reason: the original 120 KB total predates Next.js 16. Measured on a bare Next.js 16.4.2 + React 19.3 page (one `<h1>`, no client components): 131.7 KB gzip (react-dom 70.1, Next.js runtime 48.4, React core 5.9, Turbopack runtime 3.8, route chunk 3.4). Framework chunks are the `rootMainFiles` in `.next/build-manifest.json`; the 135 KB cap fails the check when a dependency update grows them past it. Lighthouse budgets are unchanged.
- **2026-10-23:** `deps`: pnpm override `@puppeteer/browsers` → 3.2.6 (approved by Nayab 2026-10-23). Reason: `extract-zip` ≤ 2.0.1 (GHSA-jmr9-qjv8-65gv, GHSA-7pqw-9j4j-h8q3, high) has no patched release on npm; `@puppeteer/browsers` 3 no longer uses it. `pnpm lhci` verified end-to-end (mobile + desktop) with the override.
- **2026-10-23:** `@puppeteer/browsers` 3.2.6 declares `proxy-agent >=8.0.1` as an **optional** peer, while `@lhci/cli` installs 6.5.0, so `pnpm peers check` reports one unmet optional peer. Accepted (approved by Nayab 2026-10-23): it is only used to download browsers through a proxy, which Lighthouse CI never does, and no gate checks peers.
- **2026-10-23:** Visual baselines are generated by `update-snapshots.yml` in the CI Playwright container when the `update-snapshots` label is added to a PR; it commits them to `snapshots/<branch>` and opens a review PR instead of uploading an artifact (approved by Nayab 2026-10-23).
- **2026-10-23:** `build` accepts exactly one Next.js line: `⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache` (whole-line match in `lib/build/build-warnings.ts`; every other warning still fails). Reason: GitHub Actions caches are scoped per PR ref, so the first build of every new PR (for example the snapshots PR) has no `.next/cache`; the warning is about CI caching speed, not code quality. The `.next/cache` restore/save steps stay (approved by Nayab 2026-10-23).
