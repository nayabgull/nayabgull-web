// @vitest-environment node
import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import sitemap from "@/app/(site)/sitemap.ts";
import {
  COMING_SOON_PATH,
  comingSoonDecision,
  isComingSoon,
  readSiteMode,
  siteModeSchema,
} from "@/lib/site-mode.ts";
import { proxy } from "@/proxy.ts";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("SITE_MODE", () => {
  it("is live unless it says coming-soon", () => {
    expect(readSiteMode({})).toBe("live");
    expect(readSiteMode({ SITE_MODE: "" })).toBe("live");
    expect(readSiteMode({ SITE_MODE: "  " })).toBe("live");
    expect(readSiteMode({ SITE_MODE: "live" })).toBe("live");
    expect(readSiteMode({ SITE_MODE: "coming-soon" })).toBe("coming-soon");
    expect(isComingSoon({ SITE_MODE: "coming-soon" })).toBe(true);
    expect(isComingSoon({})).toBe(false);
  });

  it("fails loudly on a typo instead of guessing", () => {
    expect(() => readSiteMode({ SITE_MODE: "comingsoon" })).toThrow(/Invalid SITE_MODE/);
    expect(siteModeSchema.safeParse("Live").success).toBe(false);
  });
});

describe("comingSoonDecision", () => {
  it("rewrites every public page to the coming-soon page", () => {
    for (const path of [
      "/",
      "/pricing",
      "/about",
      "/contact",
      "/services/x",
      "/unknown/deep/path",
    ]) {
      expect(comingSoonDecision(path)).toEqual({ action: "rewrite", to: COMING_SOON_PATH });
    }
    expect(comingSoonDecision("/pricing/")).toEqual({ action: "rewrite", to: COMING_SOON_PATH });
  });

  it("keeps the legal pages open for the form", () => {
    expect(comingSoonDecision("/privacy-policy")).toEqual({ action: "next" });
    expect(comingSoonDecision("/terms")).toEqual({ action: "next" });
    expect(comingSoonDecision("/terms/")).toEqual({ action: "next" });
  });

  it("never touches the CMS, framework files, generated images or static files", () => {
    for (const path of [
      "/admin",
      "/admin/collections/leads",
      "/api",
      "/api/users",
      "/_next/data/x/pricing.json",
      "/og/pricing",
      "/opengraph-image",
      "/opengraph-image-abc123",
      "/twitter-image",
      "/coming-soon/opengraph-image-abc123",
      "/coming-soon/twitter-image-abc123",
      "/robots.txt",
      "/sitemap.xml",
      "/favicon.ico",
      "/logo.svg",
    ]) {
      expect(comingSoonDecision(path)).toEqual({ action: "next" });
    }
  });

  it("does not treat look-alike paths as the CMS", () => {
    expect(comingSoonDecision("/administrator")).toEqual({
      action: "rewrite",
      to: COMING_SOON_PATH,
    });
    expect(comingSoonDecision("/apiary")).toEqual({ action: "rewrite", to: COMING_SOON_PATH });
  });

  it("sends the page's own route to the homepage address", () => {
    expect(comingSoonDecision(COMING_SOON_PATH)).toEqual({ action: "redirect", to: "/" });
  });
});

const request = (path: string) => new NextRequest(`https://nayabgull.com${path}`);

describe("proxy", () => {
  it("passes every page through in live mode", () => {
    vi.stubEnv("SITE_MODE", "live");
    const response = proxy(request("/pricing"));
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
    expect(response.headers.get("content-security-policy")).toContain("script-src");
  });

  it("rewrites pages to /coming-soon in coming-soon mode and keeps the CSP", () => {
    vi.stubEnv("SITE_MODE", "coming-soon");
    const response = proxy(request("/pricing"));
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      `https://nayabgull.com${COMING_SOON_PATH}`,
    );
    expect(response.headers.get("content-security-policy")).toContain("script-src");
  });

  it("leaves the legal pages alone in coming-soon mode", () => {
    vi.stubEnv("SITE_MODE", "coming-soon");
    for (const path of ["/privacy-policy", "/terms"]) {
      expect(proxy(request(path)).headers.get("x-middleware-rewrite")).toBeNull();
    }
  });

  it("redirects /coming-soon to / in coming-soon mode", () => {
    vi.stubEnv("SITE_MODE", "coming-soon");
    const response = proxy(request(COMING_SOON_PATH));
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe("https://nayabgull.com/");
  });
});

describe("sitemap", () => {
  it("lists every indexable page in live mode", () => {
    vi.stubEnv("SITE_MODE", "live");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.length).toBeGreaterThan(1);
    expect(urls).toContain("https://nayabgull.com/pricing");
  });

  it("lists only the homepage in coming-soon mode", () => {
    vi.stubEnv("SITE_MODE", "coming-soon");
    expect(sitemap().map((entry) => entry.url)).toEqual(["https://nayabgull.com"]);
  });
});
