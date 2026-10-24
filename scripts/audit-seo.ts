import { auditSeoPage } from "../lib/seo/audit-rules.ts";
import type { Issue } from "../lib/seo/issue.ts";
import { validateJsonLd } from "../lib/seo/jsonld-validate.ts";
import { keywordFor } from "../lib/seo/keywords.ts";
import { checkRobotsTxt, checkSecurityHeaders, parseSitemap } from "../lib/seo/site-rules.ts";
import { snapshot } from "../lib/seo/snapshot.ts";

import type { PageResult } from "./lib/site.ts";
import { discoverPaths, fetchOptional, fetchPath, run } from "./lib/site.ts";

async function auditSite(): Promise<PageResult> {
  const issues: Issue[] = [
    ...checkRobotsTxt(await fetchOptional("/robots.txt")),
    ...parseSitemap(await fetchOptional("/sitemap.xml")).issues,
  ];

  const missing = await fetchPath("/this-page-does-not-exist-audit");
  if (missing.status !== 404) {
    issues.push({
      rule: "status-404",
      message: `Missing pages answer ${missing.status}, expected 404.`,
    });
  }
  for (const path of ["/admin", "/api"]) {
    const res = await fetchPath(path);
    if (res.status < 400 && res.headers["x-robots-tag"] !== "noindex, nofollow") {
      issues.push({
        rule: "x-robots-tag",
        message: `${path} must send "X-Robots-Tag: noindex, nofollow".`,
      });
    }
  }
  return { path: "(site-wide)", issues };
}

async function auditPage(path: string): Promise<PageResult> {
  const res = await fetchPath(path);
  if (res.status !== 200) {
    return {
      path,
      issues: [{ rule: "status-200", message: `Answered ${res.status}, expected 200.` }],
    };
  }
  const page = snapshot(res.body);
  const entry = keywordFor(path);
  const issues = [
    ...auditSeoPage(page, path, entry),
    ...validateJsonLd(page.jsonLd, entry?.pageType ?? "service"),
    ...checkSecurityHeaders(res.headers),
  ];
  if (page.robots?.includes("noindex")) {
    issues.push({
      rule: "indexable",
      message: "Indexable page carries a noindex robots meta tag.",
    });
  }
  return { path, issues };
}

await run("SEO audit", async () => {
  const paths = await discoverPaths();
  return [await auditSite(), ...(await Promise.all(paths.map(auditPage)))];
});
