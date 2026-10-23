import { describe, expect, it } from "vitest";

import {
  checkRobotsTxt,
  checkSecurityHeaders,
  parseSitemap,
  REQUIRED_HSTS,
} from "@/lib/seo/site-rules.ts";
import { canonicalFor } from "@/lib/seo/site.ts";

describe("canonicalFor", () => {
  it("strips trailing slashes and keeps the homepage as the bare origin", () => {
    expect(canonicalFor("/")).toBe("https://nayabgull.com");
    expect(canonicalFor("/pricing/")).toBe("https://nayabgull.com/pricing");
  });
});

describe("checkSecurityHeaders", () => {
  const good = {
    "strict-transport-security": REQUIRED_HSTS,
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=()",
    "content-security-policy": "script-src 'nonce-abc'; frame-ancestors 'none'",
  };

  it("passes the required set", () => {
    expect(checkSecurityHeaders(good)).toEqual([]);
  });

  it("reports every missing header", () => {
    expect(checkSecurityHeaders({})).toHaveLength(5);
  });

  it("checks CSP contents", () => {
    expect(
      checkSecurityHeaders({ ...good, "content-security-policy": "default-src 'self'" }),
    ).toHaveLength(2);
  });
});

describe("checkRobotsTxt", () => {
  it("requires the file, both disallows and the sitemap link", () => {
    expect(checkRobotsTxt(undefined)).toHaveLength(1);
    expect(checkRobotsTxt("User-agent: *\nAllow: /")).toHaveLength(3);
    expect(
      checkRobotsTxt(
        "User-agent: *\nDisallow: /admin\nDisallow: /api\nSitemap: https://nayabgull.com/sitemap.xml",
      ),
    ).toEqual([]);
  });
});

describe("parseSitemap", () => {
  it("returns paths and flags bad entries", () => {
    const xml = `<urlset>
      <url><loc>https://nayabgull.com</loc><lastmod>2026-10-23</lastmod></url>
      <url><loc>https://nayabgull.com/pricing</loc></url>
      <url><loc>https://nayabgull.com/admin</loc><lastmod>2026-10-23</lastmod></url>
      <url><loc>https://www.nayabgull.com/x</loc></url>
    </urlset>`;
    const { paths, issues } = parseSitemap(xml);
    expect(paths).toEqual(["/", "/pricing", "/admin"]);
    expect(issues).toHaveLength(3);
  });

  it("reports a missing sitemap", () => {
    expect(parseSitemap(undefined).issues).toHaveLength(1);
  });
});
