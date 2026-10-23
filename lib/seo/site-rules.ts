import type { Issue } from "./issue.ts";
import { SITE_URL } from "./site.ts";

export const REQUIRED_HSTS = "max-age=63072000; includeSubDomains; preload";

/** Security headers from seo.md §9. Header names must be lowercase (as `fetch` returns them). */
export function checkSecurityHeaders(headers: Readonly<Record<string, string>>): Issue[] {
  const issues: Issue[] = [];
  const fail = (message: string) => issues.push({ rule: "security-headers", message });

  if (headers["strict-transport-security"] !== REQUIRED_HSTS) {
    fail(`Strict-Transport-Security must be "${REQUIRED_HSTS}".`);
  }
  if (headers["x-content-type-options"] !== "nosniff")
    fail("X-Content-Type-Options must be nosniff.");
  if (headers["referrer-policy"] !== "strict-origin-when-cross-origin") {
    fail("Referrer-Policy must be strict-origin-when-cross-origin.");
  }
  if (!headers["permissions-policy"]) fail("Permissions-Policy header is missing.");
  const csp = headers["content-security-policy"] ?? "";
  if (!csp) fail("Content-Security-Policy header is missing.");
  else {
    if (!csp.includes("frame-ancestors 'none'")) fail("CSP must contain frame-ancestors 'none'.");
    if (!/'nonce-[^']+'/.test(csp)) fail("CSP must use nonces for scripts.");
  }
  return issues;
}

export function checkRobotsTxt(body: string | undefined): Issue[] {
  if (body === undefined) return [{ rule: "robots-txt", message: "/robots.txt is missing." }];
  const issues: Issue[] = [];
  for (const path of ["/admin", "/api"]) {
    if (!new RegExp(`^Disallow:\\s*${path}\\b`, "mi").test(body)) {
      issues.push({ rule: "robots-txt", message: `robots.txt must contain "Disallow: ${path}".` });
    }
  }
  if (!new RegExp(`^Sitemap:\\s*${SITE_URL}/sitemap\\.xml`, "mi").test(body)) {
    issues.push({ rule: "robots-txt", message: `robots.txt must link ${SITE_URL}/sitemap.xml.` });
  }
  return issues;
}

/** Returns the site-relative paths listed in a sitemap, plus issues with the sitemap itself. */
export function parseSitemap(xml: string | undefined): { paths: string[]; issues: Issue[] } {
  if (xml === undefined)
    return { paths: [], issues: [{ rule: "sitemap", message: "/sitemap.xml is missing." }] };
  const issues: Issue[] = [];
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1] ?? "");
  const paths: string[] = [];
  for (const entry of entries) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(entry)?.[1]?.trim() ?? "";
    if (!loc.startsWith(SITE_URL)) {
      issues.push({ rule: "sitemap", message: `Sitemap URL "${loc}" is not on ${SITE_URL}.` });
      continue;
    }
    if (!entry.includes("<lastmod>"))
      issues.push({ rule: "sitemap", message: `Sitemap URL "${loc}" has no lastmod.` });
    if (/\/(admin|api)(\/|$)/.test(loc))
      issues.push({ rule: "sitemap", message: `Sitemap must not list "${loc}".` });
    paths.push(loc.slice(SITE_URL.length) || "/");
  }
  return { paths, issues };
}
