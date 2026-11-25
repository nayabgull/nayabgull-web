import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST_DOC } from "./fixtures.ts";

const find = vi.fn();

vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));
vi.mock("payload", () => ({ getPayload: () => Promise.resolve({ find }) }));
vi.mock("@payload-config", () => ({ default: {} }));

const data = await import("@/lib/blog/data.ts");

describe("blog data", () => {
  const original = process.env.DATABASE_URI;
  beforeEach(() => {
    process.env.DATABASE_URI = "postgres://user:pass@db.example.com:5432/site";
    find.mockReset();
  });
  afterEach(() => {
    process.env.DATABASE_URI = original;
    vi.restoreAllMocks();
  });

  it("reads published posts, one post and an author through Payload", async () => {
    find.mockResolvedValue({ docs: [POST_DOC] });
    expect((await data.getPublishedSummaries()).map((p) => p.slug)).toEqual([POST_DOC.slug]);
    expect((await data.getPublishedPost(POST_DOC.slug))?.title).toBe(POST_DOC.title);
    expect(await data.hasPublishedPosts()).toBe(true);
    find.mockResolvedValue({ docs: [] });
    expect(await data.getPublishedPost("missing")).toBeUndefined();
    expect(await data.getAuthor("missing")).toBeUndefined();
    expect(await data.hasPublishedPosts()).toBe(false);
  });

  it("never touches the database when it is a CI placeholder", async () => {
    process.env.DATABASE_URI = "postgres://ci-placeholder:x@localhost:5432/ci-placeholder";
    expect(await data.getPublishedSummaries()).toEqual([]);
    expect(find).not.toHaveBeenCalled();
  });

  it("falls back to empty and logs when the database fails", async () => {
    const write = vi.spyOn(process.stderr, "write").mockReturnValue(true);
    find.mockRejectedValue(new Error("connection refused"));
    expect(await data.getPublishedSummaries()).toEqual([]);
    expect(await data.getAuthor("x")).toBeUndefined();
    expect(write).toHaveBeenCalledWith(expect.stringContaining("connection refused"));
  });
});
