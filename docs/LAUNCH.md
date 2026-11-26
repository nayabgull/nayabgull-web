# Launch checklist — nayabgull.com

For Nayab. Do the steps in order. Each step says where to click or what to type, and how to check it worked.
The release PR (`feature/launch-release` → `main`) must be green and merged first. Nothing in this list was done by Claude:
Neon, Vercel production and DNS are untouched.

## 1. Environment variables (Vercel)

The production build validates these with Zod (`lib/env.ts`). A missing or malformed value fails the build, and
placeholder values (the ones CI uses) are refused when `VERCEL_ENV` is `production`.

| Name                             | Required           | What it is                                                                                                                     |
| -------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `DATABASE_URI`                   | Yes                | Neon **pooled** connection string (the host contains `-pooler`). Used by the running site.                                     |
| `PAYLOAD_SECRET`                 | Yes                | At least 32 random characters. Make one with `openssl rand -hex 32`. Never reuse it from another environment.                  |
| `DATABASE_URI_DIRECT`            | Optional on Vercel | Neon **direct** connection string (no `-pooler`). Only `pnpm db:migrate` uses it (step 2), so it can stay on your laptop only. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Recommended        | Cloudflare Turnstile site key (free). Set both Turnstile keys or neither.                                                      |
| `TURNSTILE_SECRET_KEY`           | Recommended        | Cloudflare Turnstile secret key. When set, every form submission needs a valid Turnstile token.                                |

`AUDIT_BASE_URL`, `BASE_URL` and `VERIFY_PORT` in `.env.example` are for audits and tests only. Do not set them on Vercel.
`VERCEL_ENV` is set by Vercel itself.

Where to set them: Vercel → the new project (step 3) → **Settings → Environment Variables** → add each name,
tick **Production** (and **Preview** if previews should reach the database) → **Save**. A change applies to the next
deployment, so redeploy after adding them.

GitHub also needs three secrets so the CI `deploy` job can publish `main` (until they exist the job prints
"Deploy skipped"): GitHub → repository → **Settings → Environments → production → Environment secrets** →
`VERCEL_TOKEN` (Vercel → Account Settings → Tokens), `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` (Vercel project →
Settings → General, or `.vercel/project.json` after `pnpm dlx vercel link`).

Not connected yet (no keys needed for this launch): the lead notifications (GoHighLevel webhook and Resend email)
are still a stub in `lib/leads/notify.ts`. Every lead is saved in Payload, so check **/admin → Leads** daily until
they are connected.

## 2. Payload migrations on Neon

The release contains five migrations, applied in date order:

1. `20261105_181948_initial`
2. `20261110_113331_leads`
3. `20261116_162409_lead_type`
4. `20261119_063341_blog`
5. `20261121_200233_lead_services` (only adds enum values; `down()` is a no-op on purpose)

Before you start: in Neon, create a branch or a backup of the production database (Neon → your project →
**Branches → Create branch** from `main`). You can delete it after launch.

On your laptop, on the merged `main`:

```bash
git checkout main
```

```bash
git pull
```

```bash
pnpm install --frozen-lockfile
```

Put the production values in `.env.local` (git-ignored): `DATABASE_URI` (pooled), `DATABASE_URI_DIRECT` (direct)
and `PAYLOAD_SECRET` (the same value as on Vercel). Then check what will run:

```bash
pnpm db:migrate:status
```

Run the migrations (this uses `DATABASE_URI_DIRECT`):

```bash
pnpm db:migrate
```

How to check it worked:

```bash
pnpm db:migrate:status
```

All five migrations show as ran. You can also check in Neon → **SQL Editor**:

```sql
select name, batch from payload_migrations order by created_at;
```

Then open `https://<your-vercel-url>/admin` and create the first admin user (Payload shows the "create first user"
form only while there is none). Delete the production values from `.env.local` when you are done.

## 3. Vercel project for this repo

Vercel → **Add New → Project** → import `nayabgull/nayabgull-web`.

| Setting           | Value                                  |
| ----------------- | -------------------------------------- |
| Framework Preset  | Next.js                                |
| Root Directory    | `./`                                   |
| Install Command   | `pnpm install --frozen-lockfile`       |
| Build Command     | `pnpm build`                           |
| Output Directory  | Next.js default (leave empty)          |
| Node.js Version   | 24.x (Settings → Build and Deployment) |
| Production Branch | `main` (Settings → Git)                |

- Add the environment variables from step 1 before the first deploy.
- `vercel.json` turns off Git deployments for `main`: production is deployed by the CI `deploy` job only after
  every CI check is green, followed by a smoke test and an automatic rollback if it fails. Pull requests still
  get preview deployments.
- Vercel cannot build this project itself on the Hobby plan (the build runs out of its 8 GB memory). That is fine:
  production is built on the GitHub runner by the CI `deploy` job and uploaded with `vercel deploy --prebuilt`.
- Before the domain moves, point the smoke test at the project's own production domain: GitHub → repository →
  **Settings → Secrets and variables → Actions → Variables → New repository variable** → name `SMOKE_TEST_URL`,
  value `https://<project>.vercel.app` (Vercel → project → Settings → Domains shows the exact name). Without it the
  smoke test runs against nayabgull.com, which still shows the coming-soon page, and the deploy rolls back.
- After the GitHub secrets from step 1 exist, re-run the `deploy` job of the latest `main` run (GitHub → Actions →
  CI → the run on `main` → **Re-run jobs**), or merge the next PR. Check the deployment shows as **Production** in
  Vercel → Deployments and opens on its `*.vercel.app` URL. Review the whole site there before step 4.

## 4. Move the domain from the coming-soon project (no downtime)

The GoDaddy DNS records already point to Vercel, so they do not change. Only the project that owns the domain
changes, and Vercel switches it in seconds.

1. Make sure step 3 has a working production deployment on its `*.vercel.app` URL, with the migrations from
   step 2 done. Open a few pages and `/admin`.
2. Vercel → **new project → Settings → Domains → Add** `nayabgull.com`. Vercel says it is in use by the
   coming-soon project and offers to move it: confirm. The domain now serves the new project.
3. Add `www.nayabgull.com` in the same screen and set it to **Redirect to** `nayabgull.com` with **301 Moved
   Permanently**. `nayabgull.com` stays the primary domain (no `www`, seo.md §7).
4. GitHub → **Settings → Secrets and variables → Actions → Variables**: delete `SMOKE_TEST_URL`, so every later
   deploy is smoke-tested on nayabgull.com again.
5. In the coming-soon project → Settings → Domains, check no `nayabgull.com` entries are left. Keep that project
   (do not delete it) for a week in case you need to move the domain back.
6. Check from a terminal:

```bash
curl -sI https://www.nayabgull.com | grep -iE "^(HTTP|location)"
```

Expected: `HTTP/2 301` and `location: https://nayabgull.com/`.

```bash
curl -sI http://nayabgull.com | grep -iE "^(HTTP|location)"
```

Expected: a redirect to `https://nayabgull.com/`. Then `https://nayabgull.com` answers `HTTP/2 200` with the new site.

## 5. Post-launch checks

Run each one and compare with the expected result.

- **robots.txt:** `curl -s https://nayabgull.com/robots.txt` shows `Disallow: /admin`, `Disallow: /api` and
  `Sitemap: https://nayabgull.com/sitemap.xml`.
- **Sitemap:** `curl -s https://nayabgull.com/sitemap.xml` lists the homepage, every service, hub and industry page
  and `/contact`. No `/blog`, `/admin`, `/api`, `/privacy-policy` or `/terms` (legal pages are noindex). The blog
  appears by itself after the first post is published.
- **/admin noindex header:** `curl -sI https://nayabgull.com/admin | grep -i x-robots-tag` shows
  `x-robots-tag: noindex, nofollow`. Same for `https://nayabgull.com/api`.
- **Blog hidden:** `https://nayabgull.com/blog` answers 404, and there is no "Blog" link in the header or footer.
- **Test lead:** on `https://nayabgull.com/contact`, send the form with your own name and email and the message
  "Launch test". Check it in `/admin → Leads`, then delete it there.
- **Search Console:** search.google.com/search-console → add the **Domain** property `nayabgull.com` (verify with
  the TXT record at GoDaddy if it is not verified yet) → **Sitemaps** → submit `sitemap.xml` → status "Success".
  Then **URL Inspection** → `https://nayabgull.com/` → **Request indexing**.
- **Bing and IndexNow:** bing.com/webmasters → **Import from Google Search Console** (or add the site) → submit
  `https://nayabgull.com/sitemap.xml` → **URL Submission** → submit the homepage and the hub pages. Bing shares
  these submissions with the other IndexNow search engines. Automatic IndexNow pings on publish are not built yet
  (seo.md §7); that is a follow-up task.
- **CI on production:** the nightly workflow (`nightly.yml`) checks production every night and opens an issue on
  any failure. Look at GitHub → Issues the next morning.

## 6. Old PRs to close after the release PR is merged into `main`

These are all inside the release. Some will show as **Merged** by themselves once their commits are in `main`
(the ones based on `main`: #14, #15, #23, #25, #49). Close the rest with a comment "Shipped in the launch release".

| PR                                               | What it was                              |
| ------------------------------------------------ | ---------------------------------------- |
| #14, #15, #16, #17, #18, #19, #20, #21, #22, #23 | Old chain, already in #25                |
| #25                                              | feat: launch site in new design          |
| #29                                              | AI agent development page                |
| #30                                              | Dependabot next 16.4.5 (replaced by #34) |
| #31                                              | Cloud session setup                      |
| #32                                              | /hire-saas-developer                     |
| #33                                              | n8n automation agency                    |
| #34                                              | next and eslint-config-next 16.4.5       |
| #35                                              | Lighthouse noindex SEO and mobile LCP    |
| #36                                              | picomatch audit ignore                   |
| #37                                              | AI receptionist for small business       |
| #38                                              | Business process automation services     |
| #39                                              | GoHighLevel workflows                    |
| #40                                              | Next.js and React development            |
| #41                                              | Custom CRM development                   |
| #42                                              | AI chatbot development                   |
| #43                                              | Contractor website design                |
| #44                                              | Law firm website design                  |
| #45                                              | Blog                                     |
| #46                                              | GoHighLevel API integrations             |
| #47                                              | Real estate website design               |
| #48                                              | Dental and medical website design        |
| #49                                              | Shopify and WordPress research           |
| #50                                              | Industries hub                           |
| #51                                              | WordPress development                    |
| #52                                              | Shopify development                      |
| #53                                              | Lead form services                       |

Your decision, not part of the release:

- **#28** (coming-soon mode): not included. Close it once the domain has moved (step 4), or keep it if you want
  the coming-soon mode later.
- **Dependabot PRs** (#3, #6, #26, #27, #54): leave them open. After the release is in `main`, comment
  `@dependabot rebase` on each one so it updates against the new `main`, then review them one by one.
