import { describe, expect, it, vi } from "vitest";

import { toAuthor, toCategory, toImage, toPost, toSummary } from "@/lib/blog/normalize.ts";
import type { BlogClient } from "@/lib/blog/source.ts";
import { findAuthor, findPublishedPost, findPublishedSummaries } from "@/lib/blog/source.ts";

import { AUTHOR, CATEGORY, MEDIA, POST_DOC } from "./fixtures.ts";

describe("normalize", () => {
  it("reads populated relationships and ignores bare ids", () => {
    expect(toImage(MEDIA)).toEqual({ url: MEDIA.url, alt: MEDIA.alt, width: 1600, height: 900 });
    expect(toImage(11)).toBeUndefined();
    expect(toImage({ ...MEDIA, width: null })).toBeUndefined();
    expect(toCategory(3)).toBeUndefined();
    expect(toCategory(CATEGORY)?.slug).toBe("gohighlevel");
    expect(toAuthor(null)).toBeUndefined();
    expect(toAuthor({ ...AUTHOR, jobTitle: null, photo: 4 })).toMatchObject({
      jobTitle: undefined,
      photo: undefined,
    });
  });

  it("builds the post the page renders, with real profile links only", () => {
    const post = toPost(POST_DOC);
    expect(post).toMatchObject({
      slug: "gohighlevel-workflow-examples",
      author: { name: "Test Author", slug: "test-author" },
      category: { slug: "gohighlevel" },
      hub: "/gohighlevel-agency",
      seo: { title: POST_DOC.seo?.title },
    });
    expect(post.authorProfile?.profiles.map((p) => p.label)).toEqual(["LinkedIn", "Upwork"]);
  });

  it("falls back to Payload timestamps and drops empty tags", () => {
    const summary = toSummary({
      ...POST_DOC,
      datePublished: null,
      dateModified: null,
      tags: ["", "AI"],
      author: 1,
    });
    expect(summary).toMatchObject({
      datePublished: POST_DOC.createdAt,
      dateModified: POST_DOC.updatedAt,
      tags: ["AI"],
      author: undefined,
    });
    expect(toPost({ ...POST_DOC, seo: undefined, tags: null }).seo).toEqual({
      title: "",
      metaDescription: "",
    });
  });
});

describe("source", () => {
  const client = (docs: unknown[]) => {
    const find = vi.fn(() => Promise.resolve({ docs }));
    return { client: { find } as unknown as BlogClient, find };
  };

  it("lists published posts only, newest first, without the body", async () => {
    const { client: c, find } = client([POST_DOC]);
    const posts = await findPublishedSummaries(c);
    expect(posts.map((p) => p.slug)).toEqual([POST_DOC.slug]);
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "posts",
        where: { _status: { equals: "published" } },
        sort: "-datePublished",
        draft: false,
        overrideAccess: false,
        select: { content: false, directAnswer: false, seo: false },
      }),
    );
  });

  it("finds one published post by slug, or nothing", async () => {
    const { client: c, find } = client([POST_DOC]);
    expect((await findPublishedPost(c, "x"))?.slug).toBe(POST_DOC.slug);
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { and: [{ _status: { equals: "published" } }, { slug: { equals: "x" } }] },
        draft: false,
      }),
    );
    expect(await findPublishedPost(client([]).client, "x")).toBeUndefined();
  });

  it("finds an author by slug", async () => {
    expect((await findAuthor(client([AUTHOR]).client, "test-author"))?.name).toBe("Test Author");
    expect(await findAuthor(client([]).client, "x")).toBeUndefined();
  });
});
