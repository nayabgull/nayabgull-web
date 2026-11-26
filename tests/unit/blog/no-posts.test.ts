import { beforeEach, describe, expect, it, vi } from "vitest";

import type { PostSummary } from "@/lib/blog/types.ts";

/**
 * Launch rule: until the first post is published, the blog stays out of search and out of sight.
 * /blog and its sub-routes are noindex (they answer 404, which Next.js marks noindex), and they are
 * not in the sitemap, /llms.txt, the header or the footer. All of it turns on by itself with the
 * first published post: no deploy, no code change.
 */
const posts: PostSummary[] = [];

vi.mock("@/lib/blog/data.ts", () => ({
  getPublishedSummaries: () => Promise.resolve(posts),
  hasPublishedPosts: () => Promise.resolve(posts.length > 0),
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

const { default: sitemap } = await import("@/app/(site)/sitemap.ts");
const { GET: llms } = await import("@/app/llms.txt/route.ts");
const { BlogHub, hubMetadata } = await import("@/app/(site)/blog/_hub.tsx");
const { hasPublishedPosts } = await import("@/lib/blog/data.ts");
const { footerNav, primaryNav, isNavGroup } = await import("@/content/navigation.ts");

const FIRST_POST: PostSummary = {
  title: "GoHighLevel workflow examples for small businesses",
  slug: "gohighlevel-workflow-examples",
  excerpt: "Five workflows that follow up with leads for you.",
  datePublished: "2026-12-01T09:00:00.000Z",
  dateModified: "2026-12-01T09:00:00.000Z",
  category: undefined,
  tags: [],
  author: { name: "Nayab Gull", slug: "nayab-gull" },
};

const isBlogUrl = (url: string): boolean => /\/blog(\/|$)/.test(new URL(url).pathname);

async function navHrefs(): Promise<string[]> {
  const showBlog = await hasPublishedPosts();
  const header = primaryNav(showBlog).flatMap((item) =>
    isNavGroup(item) ? item.links.map((link) => link.href) : [item.href],
  );
  const footer = footerNav(showBlog).flatMap((group) => group.links.map((link) => link.href));
  return [...header, ...footer];
}

describe("blog with no published post", () => {
  beforeEach(() => {
    posts.length = 0;
  });

  it("keeps /blog out of the sitemap", async () => {
    expect((await sitemap()).filter((entry) => isBlogUrl(entry.url))).toEqual([]);
  });

  it("keeps /blog out of /llms.txt", async () => {
    const body = await (await llms()).text();
    expect(body).not.toContain("/blog");
    expect(body).not.toContain("## Blog");
  });

  it("keeps Blog out of the header and the footer", async () => {
    expect((await navHrefs()).filter((href) => href.startsWith("/blog"))).toEqual([]);
  });

  it("answers /blog with a 404 and marks it noindex", async () => {
    await expect(BlogHub({ page: 1 })).rejects.toThrow("NEXT_NOT_FOUND");
    expect((await hubMetadata(1)).robots).toMatchObject({ index: false, follow: true });
  });
});

describe("blog after the first post is published", () => {
  beforeEach(() => {
    posts.splice(0, posts.length, FIRST_POST);
  });

  it("adds the post to the sitemap and /llms.txt by itself", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);
    expect(urls).toContain("https://nayabgull.com/blog/gohighlevel-workflow-examples");
    const body = await (await llms()).text();
    expect(body).toContain("## Blog");
    expect(body).toContain("(https://nayabgull.com/blog/gohighlevel-workflow-examples)");
  });

  it("adds Blog to the header and the footer", async () => {
    expect((await navHrefs()).filter((href) => href === "/blog")).toHaveLength(2);
  });
});
