import { describe, expect, it, vi } from "vitest";

import type { PostRelationLoader } from "@/lib/cms/post-relations.ts";
import { relationId, resolvePostRelations } from "@/lib/cms/post-relations.ts";

import { faqBlock, uploadNode } from "../blog/fixtures.ts";

import { lexical, paragraph } from "./fixtures.ts";

const loader = (): PostRelationLoader & {
  mediaAlts: ReturnType<typeof vi.fn>;
  faqs: ReturnType<typeof vi.fn>;
} => ({
  mediaAlts: vi.fn(() =>
    Promise.resolve(
      new Map<string, string | undefined>([
        ["1", "Hero alt"],
        ["2", "Body alt"],
      ]),
    ),
  ),
  faqs: vi.fn(() => Promise.resolve(new Map([["5", { question: "Q?", answer: "A." }]]))),
});

describe("relationId", () => {
  it("reads ids and populated documents", () => {
    expect(relationId(3)).toBe(3);
    expect(relationId("abc")).toBe("abc");
    expect(relationId({ id: 9, alt: "x" })).toBe(9);
    expect(relationId("")).toBeUndefined();
    expect(relationId(null)).toBeUndefined();
  });
});

describe("resolvePostRelations", () => {
  it("loads hero and body alt text and populates FAQ blocks", async () => {
    const relations = loader();
    const result = await resolvePostRelations(
      {
        heroImage: 1,
        content: lexical(uploadNode({ id: 2 }), uploadNode(99), faqBlock([5, { id: 6 }])),
      },
      relations,
    );
    expect(result.heroImageAlt).toBe("Hero alt");
    expect(result.bodyImageAlts).toEqual(["Body alt", undefined]);
    expect(relations.mediaAlts).toHaveBeenCalledWith([1, 2, 99]);
    expect(relations.faqs).toHaveBeenCalledWith([5, 6]);
    const block = (result.content as { root: { children: { fields?: { faqs?: unknown } }[] } }).root
      .children[2];
    expect(block?.fields?.faqs).toEqual([{ id: 5, question: "Q?", answer: "A." }]);
  });

  it("asks for nothing when there is no image or FAQ", async () => {
    const relations = loader();
    const result = await resolvePostRelations({ content: lexical(paragraph("Hi.")) }, relations);
    expect(result.heroImageAlt).toBeNull();
    expect(relations.mediaAlts).not.toHaveBeenCalled();
    expect(relations.faqs).not.toHaveBeenCalled();
  });

  it("treats an image with no alt text as an empty alt", async () => {
    const relations = loader();
    relations.mediaAlts.mockResolvedValueOnce(new Map());
    expect((await resolvePostRelations({ heroImage: 4 }, relations)).heroImageAlt).toBe("");
  });

  it("keeps an FAQ block with no faqs list as an empty list", async () => {
    const content = lexical({ type: "block", fields: { blockType: "faq", heading: "FAQ" } });
    const result = await resolvePostRelations({ content }, loader());
    expect(JSON.stringify(result.content)).toContain('"faqs":[]');
  });
});
