import { describe, expect, it } from "vitest";

import { isPublishing, toCandidate } from "@/lib/cms/candidate.ts";

describe("isPublishing", () => {
  it("is true only for a published status", () => {
    expect(isPublishing({ _status: "published" })).toBe(true);
    expect(isPublishing({ _status: "draft" })).toBe(false);
    expect(isPublishing({})).toBe(false);
    expect(isPublishing(null)).toBe(false);
    expect(isPublishing("published")).toBe(false);
  });
});

describe("toCandidate", () => {
  it("reads a full document", () => {
    const content = { root: {} };
    expect(
      toCandidate("services", {
        title: "T",
        slug: "s",
        section: "packages",
        content,
        resultApproved: true,
        seo: { title: "a", metaDescription: "b", primaryKeyword: "c", canonical: "d" },
      }),
    ).toEqual({
      collection: "services",
      slug: "s",
      section: "packages",
      title: "T",
      content,
      resultApproved: true,
      seo: { title: "a", metaDescription: "b", primaryKeyword: "c", canonical: "d" },
    });
  });

  it("survives partial or malformed input", () => {
    const candidate = toCandidate("posts", { slug: 5, seo: "nope", section: "elsewhere" });
    expect(candidate.slug).toBe("");
    expect(candidate.title).toBe("");
    expect(candidate.section).toBeUndefined();
    expect(candidate.seo.title).toBeUndefined();
    expect(candidate.resultApproved).toBe(false);
    expect(toCandidate("posts", undefined).slug).toBe("");
  });
});
