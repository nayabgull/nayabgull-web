import { describe, expect, it, vi } from "vitest";

import { authorDescription, BLOG_COPY, tagDescription } from "@/lib/blog/copy.ts";
import { listImagePath } from "@/lib/blog/metadata.ts";
import { toSummary } from "@/lib/blog/normalize.ts";
import { blogSitemapEntries } from "@/lib/blog/sitemap.ts";
import type * as Keywords from "@/lib/seo/keywords.ts";

import { POST_DOC } from "./fixtures.ts";

// Pretend Nayab registered keywords for the hub and one category (real ones: keyword-map.md).
type KeywordsModule = typeof Keywords;

vi.mock("@/lib/seo/keywords.ts", async (importOriginal) => {
  const actual = await importOriginal<KeywordsModule>();
  const registered = new Set(["/blog", "/blog/category/gohighlevel"]);
  return {
    ...actual,
    keywordFor: (url: string) =>
      registered.has(url)
        ? { url, pageType: "hub", primary: `test ${url}`, secondary: [] }
        : actual.keywordFor(url),
  };
});

describe("indexable list pages", () => {
  it("join the sitemap with the newest post date once they have 3 posts and a keyword", () => {
    const base = toSummary(POST_DOC);
    const posts = ["a", "b", "c"].map((slug, index) => ({
      ...base,
      slug,
      dateModified: `2026-11-0${index + 1}T00:00:00.000Z`,
    }));
    const entries = blogSitemapEntries(posts);
    expect(entries.slice(0, 2)).toEqual([
      { url: "https://nayabgull.com/blog", lastModified: new Date("2026-11-03T00:00:00.000Z") },
      {
        url: "https://nayabgull.com/blog/category/gohighlevel",
        lastModified: new Date("2026-11-03T00:00:00.000Z"),
      },
    ]);
    expect(blogSitemapEntries(posts.slice(0, 2)).map((e) => e.url)).not.toContain(
      "https://nayabgull.com/blog",
    );
    expect(blogSitemapEntries([{ ...base, category: undefined }])).toHaveLength(1);
  });
});

describe("blog list copy", () => {
  it("keeps every fixed title and description inside the SEO limits", () => {
    expect(BLOG_COPY.hub.title.length).toBeLessThanOrEqual(60);
    expect(BLOG_COPY.hub.description.length).toBeGreaterThanOrEqual(120);
    expect(BLOG_COPY.hub.description.length).toBeLessThanOrEqual(155);
    expect(BLOG_COPY.pageTitle(2)).toBe("Blog, Page 2: Guides and Articles | Nayab Gull");
    expect(tagDescription("Workflows")).toContain('"Workflows"');
    expect(authorDescription("Nayab Gull")).toMatch(/^Nayab Gull writes/);
    expect(listImagePath("tag", "ai")).toBe("/og/blog/tag/ai");
  });
});
