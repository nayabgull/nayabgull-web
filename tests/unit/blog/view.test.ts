import { describe, expect, it } from "vitest";

import type { PostSummary } from "@/lib/blog/types.ts";
import {
  categoriesWithPosts,
  formatDate,
  isListIndexable,
  paginate,
  postsByAuthor,
  postsInCategory,
  postsWithTag,
  relatedPosts,
  tagLabel,
  wasUpdated,
} from "@/lib/blog/view.ts";

const cat = (slug: string) => ({ name: slug.toUpperCase(), slug, description: "d" });

const post = (slug: string, extra: Partial<PostSummary> = {}): PostSummary => ({
  title: slug,
  slug,
  excerpt: "e",
  datePublished: "2026-11-01T00:00:00.000Z",
  dateModified: "2026-11-01T00:00:00.000Z",
  category: undefined,
  tags: [],
  author: { name: "A", slug: "a" },
  ...extra,
});

const POSTS = [
  post("p1", { category: cat("ghl"), tags: ["Workflows"] }),
  post("p2", { category: cat("ai"), tags: ["Workflows", "AI"] }),
  post("p3", { category: cat("ghl") }),
  post("p4", { author: { name: "B", slug: "b" }, tags: ["ai"] }),
];

describe("paginate", () => {
  it("returns one page, or undefined for a page that does not exist", () => {
    expect(paginate([1, 2, 3, 4, 5], 2, 2)).toEqual({ items: [3, 4], page: 2, totalPages: 3 });
    expect(paginate([1, 2], 2, 2)).toBeUndefined();
    expect(paginate([1], 0)).toBeUndefined();
    expect(paginate([], 1)).toBeUndefined();
  });
});

describe("isListIndexable", () => {
  it("needs 3+ posts and a registered keyword", () => {
    expect(isListIndexable("/blog", 10)).toBe(false);
    expect(isListIndexable("/gohighlevel-agency", 2)).toBe(false);
    expect(isListIndexable("/gohighlevel-agency", 3)).toBe(true);
  });
});

describe("filters", () => {
  it("filters by category, author and tag", () => {
    expect(postsInCategory(POSTS, "ghl").map((p) => p.slug)).toEqual(["p1", "p3"]);
    expect(postsByAuthor(POSTS, "b").map((p) => p.slug)).toEqual(["p4"]);
    expect(postsWithTag(POSTS, "ai").map((p) => p.slug)).toEqual(["p2", "p4"]);
    expect(tagLabel(POSTS, "ai")).toBe("AI");
    expect(tagLabel(POSTS, "none")).toBeUndefined();
  });

  it("counts categories that have posts, by name", () => {
    expect(categoriesWithPosts(POSTS).map((c) => [c.category.slug, c.count])).toEqual([
      ["ai", 1],
      ["ghl", 2],
    ]);
  });
});

describe("relatedPosts", () => {
  it("prefers the same category, then shared tags, never the post itself", () => {
    const current = post("p1", { category: cat("ghl"), tags: ["Workflows"] });
    expect(relatedPosts(current, POSTS).map((p) => p.slug)).toEqual(["p3", "p2", "p4"]);
    expect(relatedPosts(current, POSTS, 1).map((p) => p.slug)).toEqual(["p3"]);
  });
});

describe("dates", () => {
  it("formats US dates", () => {
    expect(formatDate("2026-11-19T23:00:00.000Z")).toBe("November 19, 2026");
    expect(formatDate("nope")).toBe("");
  });

  it("shows an update only when it happened on a later day", () => {
    expect(
      wasUpdated({ datePublished: "2026-11-01T08:00:00Z", dateModified: "2026-11-01T20:00:00Z" }),
    ).toBe(false);
    expect(
      wasUpdated({ datePublished: "2026-11-01T08:00:00Z", dateModified: "2026-11-03T08:00:00Z" }),
    ).toBe(true);
  });
});
