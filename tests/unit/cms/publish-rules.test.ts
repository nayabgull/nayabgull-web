import { describe, expect, it } from "vitest";

import { checkPublishRules, fieldForRule, pathFor } from "@/lib/cms/publish-rules.ts";
import type { PublishCandidate } from "@/lib/cms/publish-rules.ts";

import { GOOD_SERVICE, heading, lexical, paragraph } from "./fixtures.ts";

const rules = (candidate: PublishCandidate) => checkPublishRules(candidate).map((i) => i.rule);

describe("pathFor", () => {
  it("maps each collection to its URL section", () => {
    expect(pathFor({ collection: "posts", slug: "a-post" })).toBe("/blog/a-post");
    expect(pathFor({ collection: "industries", slug: "law-firm-website-design" })).toBe(
      "/industries/law-firm-website-design",
    );
    expect(pathFor({ collection: "case-studies", slug: "intake" })).toBe("/case-studies/intake");
    expect(pathFor({ collection: "services", slug: "x" })).toBe("/services/x");
    expect(pathFor({ collection: "services", slug: "x", section: "packages" })).toBe("/packages/x");
  });
});

describe("fieldForRule", () => {
  it("points each rule at the admin field that fixes it", () => {
    expect(fieldForRule("title-length")).toBe("seo.title");
    expect(fieldForRule("meta-keyword")).toBe("seo.metaDescription");
    expect(fieldForRule("canonical-self")).toBe("seo.canonical");
    expect(fieldForRule("slug-format")).toBe("slug");
    expect(fieldForRule("h1-keyword")).toBe("seo.primaryKeyword");
    expect(fieldForRule("keyword-registered-match")).toBe("seo.primaryKeyword");
    expect(fieldForRule("h1-single")).toBe("title");
    expect(fieldForRule("reading-ease")).toBe("content");
  });
});

describe("checkPublishRules", () => {
  it("passes a document that follows every rule", () => {
    expect(checkPublishRules(GOOD_SERVICE)).toEqual([]);
  });

  it("blocks a path that is not in the keyword map", () => {
    const issues = checkPublishRules({ ...GOOD_SERVICE, slug: "not-in-the-map" });
    expect(issues.filter((i) => i.rule === "keyword-registered")).toHaveLength(1);
    expect(issues.find((i) => i.rule === "keyword-registered")?.field).toBe("seo.primaryKeyword");
  });

  it("blocks a primary keyword that differs from the registered one", () => {
    const issues = rules({
      ...GOOD_SERVICE,
      seo: { ...GOOD_SERVICE.seo, primaryKeyword: "web design" },
    });
    expect(issues).toContain("keyword-registered-match");
  });

  it("treats the keyword case-insensitively", () => {
    expect(
      checkPublishRules({
        ...GOOD_SERVICE,
        seo: { ...GOOD_SERVICE.seo, primaryKeyword: "  Website Design Company " },
      }),
    ).toEqual([]);
  });

  it("reuses the title, meta description and canonical rules", () => {
    const issues = rules({
      ...GOOD_SERVICE,
      seo: { title: "Short", metaDescription: "Too short.", canonical: "https://example.com/x" },
    });
    expect(issues).toEqual(
      expect.arrayContaining([
        "title-length",
        "title-brand",
        "title-keyword",
        "meta-length",
        "meta-keyword",
        "canonical-self",
        "keyword-registered-match",
      ]),
    );
  });

  it("derives the canonical when it is empty", () => {
    expect(
      checkPublishRules({ ...GOOD_SERVICE, seo: { ...GOOD_SERVICE.seo, canonical: "  " } }),
    ).toEqual([]);
  });

  it("checks the slug format", () => {
    expect(rules({ ...GOOD_SERVICE, slug: "Bad Slug" })).toContain("slug-format");
  });

  it("checks heading structure and the keyword in the H1", () => {
    const issues = rules({
      ...GOOD_SERVICE,
      title: "Fast sites that book calls",
      content: lexical(paragraph("Intro."), heading("h4", "Skipped a level")),
    });
    expect(issues).toEqual(expect.arrayContaining(["h1-keyword", "heading-order", "h2-keyword"]));
  });

  it("applies the content rules to the body copy", () => {
    const issues = rules({
      ...GOOD_SERVICE,
      content: lexical(heading("h2", "Website design company"), paragraph("Let us delve in.")),
    });
    expect(issues).toEqual(expect.arrayContaining(["banned-phrase", "min-words"]));
  });

  it("rejects vague link text but leaves link counts to the page template", () => {
    const link = {
      type: "link",
      version: 1,
      fields: { url: "/pricing" },
      children: [{ type: "text", text: "click here", version: 1 }],
    };
    const content = lexical(
      { type: "paragraph", version: 1, children: [link] },
      ...(GOOD_SERVICE.content as { root: { children: unknown[] } }).root.children,
    );
    const issues = rules({ ...GOOD_SERVICE, content });
    expect(issues).toContain("anchor-text");
    expect(issues).not.toContain("internal-links");
  });

  it("blocks a case study until the result is approved", () => {
    const study: PublishCandidate = {
      ...GOOD_SERVICE,
      collection: "case-studies",
      slug: "intake",
    };
    expect(rules(study)).toContain("result-approved");
    expect(rules({ ...study, resultApproved: true })).not.toContain("result-approved");
  });

  it("returns an empty candidate's problems without throwing", () => {
    const issues = checkPublishRules({
      collection: "posts",
      slug: "",
      title: "",
      seo: {},
      content: undefined,
    });
    expect(issues.length).toBeGreaterThan(0);
  });
});
