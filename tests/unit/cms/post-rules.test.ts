import { describe, expect, it } from "vitest";

import type { PostRuleInput } from "@/lib/cms/post-rules.ts";
import {
  checkPostRules,
  DIRECT_ANSWER_MAX_WORDS,
  postTemplateLinks,
} from "@/lib/cms/post-rules.ts";

import {
  faqBlock,
  FAQ_DOC,
  GOOD_CONTENT,
  linksParagraph,
  TEST_ENTRY,
  TEST_POST_PATH,
} from "../blog/fixtures.ts";

import { heading, lexical, paragraph } from "./fixtures.ts";

const good: PostRuleInput = {
  path: TEST_POST_PATH,
  slug: "gohighlevel-workflow-examples",
  excerpt: "Five workflows.",
  directAnswer: "Answer new leads in seconds.",
  hub: "/gohighlevel-agency",
  hasAuthor: true,
  hasCategory: true,
  heroImageAlt: "Workflow builder with three steps",
  bodyImageAlts: [],
  content: GOOD_CONTENT,
  secondaryKeywords: ["ghl workflow ideas"],
  entry: TEST_ENTRY,
};

const rules = (input: Partial<PostRuleInput>) =>
  checkPostRules({ ...good, ...input }).map((issue) => issue.rule);

describe("checkPostRules", () => {
  it("passes a complete post", () => {
    expect(checkPostRules(good)).toEqual([]);
  });

  it("counts the template links (Home, Blog, hub) with the body links", () => {
    expect(postTemplateLinks("/pricing")).toEqual(["/", "/blog", "/pricing"]);
    expect(postTemplateLinks(undefined)).toEqual(["/", "/blog"]);
  });

  it("requires the direct answer, at most 60 words", () => {
    expect(rules({ directAnswer: "" })).toContain("direct-answer");
    expect(rules({ directAnswer: "word ".repeat(DIRECT_ANSWER_MAX_WORDS + 1) })).toContain(
      "direct-answer",
    );
  });

  it("requires excerpt, hub, author, category and a hero image with good alt text", () => {
    expect(rules({ excerpt: " " })).toContain("excerpt");
    expect(rules({ hub: "/not-a-hub" })).toContain("hub");
    expect(rules({ hasAuthor: false })).toContain("author");
    expect(rules({ hasCategory: false })).toContain("category");
    expect(rules({ heroImageAlt: null })).toContain("hero-image");
    expect(rules({ heroImageAlt: "" })).toContain("hero-image");
    expect(rules({ bodyImageAlts: ["Chart of leads", undefined] })).toEqual(["image-alt"]);
  });

  it("blocks slugs reserved for list pages", () => {
    expect(rules({ slug: "category" })).toContain("slug-reserved");
  });

  it("requires an FAQ block with at least one question and two H2 sections", () => {
    const thin = lexical(
      heading("h2", "Only section"),
      paragraph("Text."),
      faqBlock([]),
      linksParagraph(["/pricing", "website pricing"]),
    );
    expect(rules({ content: thin })).toEqual(expect.arrayContaining(["faq-block", "toc-headings"]));
  });

  it("keeps internal links between 3 and 8, template links included", () => {
    const many = lexical(
      heading("h2", "One"),
      heading("h2", "Two"),
      faqBlock([FAQ_DOC]),
      linksParagraph(
        ["/about", "about Nayab"],
        ["/contact", "contact page"],
        ["/pricing", "pricing"],
        ["/hire-full-stack-developer", "hire a developer"],
        ["/services/web-design-development", "web design"],
        ["/ai-automation-agency", "AI automation"],
      ),
    );
    expect(rules({ content: many })).toContain("internal-links");
    expect(
      rules({
        content: lexical(heading("h2", "A"), heading("h2", "B"), faqBlock([FAQ_DOC])),
        hub: undefined,
      }),
    ).toContain("internal-links");
  });

  it("flags body links to pages that do not exist, /admin and /api", () => {
    const content = lexical(
      heading("h2", "One"),
      heading("h2", "Two"),
      faqBlock([FAQ_DOC]),
      linksParagraph(
        ["/no-such-page", "a missing page"],
        ["/admin", "the admin"],
        ["https://nayabgull.com/blog/other-post", "another post"],
        ["https://example.com", "an outside source"],
      ),
    );
    const issues = checkPostRules({ ...good, content }).filter(
      (issue) => issue.rule === "internal-link-target",
    );
    expect(issues.map((issue) => issue.message)).toEqual([
      expect.stringContaining("/no-such-page"),
      expect.stringContaining("/admin"),
    ]);
  });

  it("accepts only registered secondary keywords, 60% of them in the copy", () => {
    expect(rules({ secondaryKeywords: ["random keyword"] })).toContain("secondary-registered");
    expect(
      rules({ secondaryKeywords: ["ghl workflow ideas", "crm follow up automation"] }),
    ).toEqual(["secondary-coverage"]);
    expect(rules({ secondaryKeywords: [" ", ""] })).toEqual([]);
    expect(rules({ entry: undefined, secondaryKeywords: ["anything"] })).toEqual([]);
  });
});
