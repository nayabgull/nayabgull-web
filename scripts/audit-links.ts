import { LinkChecker, LinkState } from "linkinator";

import { sitePath } from "../lib/seo/site.ts";

import type { PageResult } from "./lib/site.ts";
import { BASE_URL, run } from "./lib/site.ts";

await run("Link check", async () => {
  const checker = new LinkChecker();
  const internalRedirects: string[] = [];
  checker.on("redirect", (details) => {
    if (details.url.startsWith(BASE_URL)) {
      internalRedirects.push(`${details.url} → ${details.targetUrl ?? "?"} (${details.status})`);
    }
  });

  const result = await checker.check({
    path: BASE_URL,
    recurse: true,
    sitemap: false,
    redirects: "warn",
    retry: true,
    retryErrors: true,
    retryErrorsCount: 2,
    timeout: 20_000,
    concurrency: 10,
  });

  const byParent = new Map<string, PageResult>();
  const add = (path: string, rule: string, message: string) => {
    const entry = byParent.get(path) ?? { path, issues: [] };
    entry.issues.push({ rule, message });
    byParent.set(path, entry);
  };

  for (const link of result.links) {
    const parent = link.parent ? sitePath(link.parent.replace(BASE_URL, "")) : "/";
    if (link.state === LinkState.BROKEN)
      add(parent, "broken-link", `${link.url} answered ${link.status ?? "no response"}.`);
    else if (!byParent.has(parent)) byParent.set(parent, { path: parent, issues: [] });
  }
  for (const redirect of internalRedirects)
    add("(internal redirects)", "internal-redirect", `Link points to a redirect: ${redirect}`);
  return [...byParent.values()].sort((a, b) => a.path.localeCompare(b.path));
});
