import { ValidationError } from "payload";
import type { CollectionBeforeChangeHook, PayloadRequest } from "payload";
import { describe, expect, it, vi } from "vitest";

import { enforcePostRules, payloadLoader } from "@/collections/hooks/enforce-post-rules.ts";
import type { PostRelationLoader } from "@/lib/cms/post-relations.ts";
import type * as Keywords from "@/lib/seo/keywords.ts";

import { FAQ_DOC, GOOD_POST_DATA, MEDIA, TEST_ENTRY } from "../blog/fixtures.ts";

// The test post's keyword is registered only inside this test (real posts: docs/seo/keyword-map.md).
type KeywordsModule = typeof Keywords;

vi.mock("@/lib/seo/keywords.ts", async (importOriginal) => {
  const actual = await importOriginal<KeywordsModule>();
  const { TEST_ENTRY: entry } = await import("../blog/fixtures.ts");
  return {
    ...actual,
    keywordFor: (url: string) => (url === entry.url ? entry : actual.keywordFor(url)),
  };
});

type Args = Parameters<CollectionBeforeChangeHook>[0];

const loader = (alt: string = MEDIA.alt): PostRelationLoader => ({
  mediaAlts: (ids) => Promise.resolve(new Map(ids.map((id) => [String(id), alt]))),
  faqs: (ids) =>
    Promise.resolve(
      new Map(
        ids.map((id) => [String(id), { question: FAQ_DOC.question, answer: FAQ_DOC.answer }]),
      ),
    ),
});

const NOW = new Date("2026-11-19T12:00:00.000Z");

const run = async (
  data: Record<string, unknown>,
  originalDoc?: Record<string, unknown>,
  relations: PostRelationLoader = loader(),
) =>
  (await enforcePostRules(
    () => relations,
    () => NOW,
  )({
    data,
    originalDoc,
    req: {},
    operation: originalDoc ? "update" : "create",
  } as unknown as Args)) as Record<string, unknown>;

async function errorsOf(promise: Promise<unknown>): Promise<{ message: string; path: string }[]> {
  try {
    await promise;
  } catch (error) {
    expect(error).toBeInstanceOf(ValidationError);
    return (error as ValidationError).data.errors;
  }
  return [];
}

describe("enforcePostRules", () => {
  it("lets a draft save even when it breaks every rule", async () => {
    const result = await run({ _status: "draft", title: "x", slug: "x" });
    expect(result).toMatchObject({ title: "x" });
    expect(result.datePublished).toBeUndefined();
  });

  it("fills in the canonical from the slug", async () => {
    const result = await run({ _status: "draft", slug: "my-post" });
    expect(result.seo).toMatchObject({ canonical: "https://nayabgull.com/blog/my-post" });
  });

  it("publishes a post that passes every rule and stamps both dates", async () => {
    const result = await run({ ...GOOD_POST_DATA });
    expect(result.datePublished).toBe(NOW.toISOString());
    expect(result.dateModified).toBe(NOW.toISOString());
    expect(result.seo).toMatchObject({ canonical: `https://nayabgull.com${TEST_ENTRY.url}` });
  });

  it("keeps the first publish date and moves dateModified on a later publish", async () => {
    const result = await run(
      { ...GOOD_POST_DATA },
      { datePublished: "2026-10-01T00:00:00.000Z", _status: "published" },
    );
    expect(result.datePublished).toBeUndefined();
    expect(result.dateModified).toBe(NOW.toISOString());
  });

  it("blocks publishing when the keyword is not registered for the URL", async () => {
    const errors = await errorsOf(run({ ...GOOD_POST_DATA, slug: "unregistered-post" }));
    expect(errors).toContainEqual(
      expect.objectContaining({
        path: "seo.primaryKeyword",
        message: expect.stringContaining("[keyword-registered]") as string,
      }),
    );
  });

  it("blocks publishing on bad alt text, with the error on the hero image field", async () => {
    const errors = await errorsOf(run({ ...GOOD_POST_DATA }, undefined, loader("Image of a desk")));
    expect(errors).toContainEqual(
      expect.objectContaining({
        path: "heroImage",
        message: expect.stringContaining("hero-image") as string,
      }),
    );
  });

  it("blocks publishing a post with a too-long title and no direct answer", async () => {
    const errors = await errorsOf(
      run({
        ...GOOD_POST_DATA,
        directAnswer: "",
        seo: { ...GOOD_POST_DATA.seo, title: `${"Very long title ".repeat(6)}| Nayab Gull` },
      }),
    );
    const paths = errors.map((error) => error.path);
    expect(paths).toContain("seo.title");
    expect(paths).toContain("directAnswer");
  });
});

describe("payloadLoader", () => {
  it("reads media alt text and FAQs through the Local API in the same request", async () => {
    const find = vi.fn((args: { collection: string }) =>
      Promise.resolve({
        docs:
          args.collection === "media"
            ? [{ id: 11, alt: "A chart" }]
            : [{ id: 7, question: "Q?", answer: "A." }],
      }),
    );
    const req = { payload: { find } } as unknown as PayloadRequest;
    const relations = payloadLoader(req);
    expect([...(await relations.mediaAlts([11]))]).toEqual([["11", "A chart"]]);
    expect([...(await relations.faqs([7]))]).toEqual([["7", { question: "Q?", answer: "A." }]]);
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({ collection: "media", where: { id: { in: [11] } }, req }),
    );
  });
});
