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
| | `deps` | `pnpm audit --audit-level=high` finds an issue; dependency-review flags a bad licence or vulnerability |
| 2 · Unit | `unit` | Any failing test; coverage below **90%** for `lib/**`, **80%** overall |
| 3 · Build | `build` | `pnpm build` fails or prints a warning about missing metadata/images |
| | `bundle` | First-load JS > **120 KB** (gzip) on any route; any route grows > **10 KB** vs `main` |
| 4 · Preview checks (against the Vercel preview URL or `pnpm start`) | `e2e` | Any Playwright test fails in Chromium, Firefox or WebKit |
| | `responsive` | Horizontal overflow, overlapping elements, clipped text or a visual diff > **0.1%** at any viewport in `frontend.md` |
| | `a11y` | **Any** axe-core violation (all impact levels) on any route, light and dark theme |
| | `lighthouse` | Any budget below is missed (median of 3 runs) |
| | `seo-audit` | Any rule in `seo.md` fails on any URL |
| | `content-audit` | Any rule in `content.md` fails on any page |
| | `cannibalization` | Two pages share a primary keyword, or a page has none registered |
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
- **Weekly**: Dependabot / Renovate PRs (grouped), CodeQL scan.

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
