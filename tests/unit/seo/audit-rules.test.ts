import { describe, expect, it } from "vitest";

import {
  auditSeoPage,
  checkCanonical,
  checkHeadings,
  checkImages,
  checkInternalLinks,
  checkMetaDescription,
  checkTitle,
} from "@/lib/seo/audit-rules.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

import { GOOD_HTML, HOME_ENTRY, PLACEHOLDER_HTML } from "./fixtures.ts";

const rules = (issues: { rule: string }[]) => [...new Set(issues.map((i) => i.rule))].sort();

describe("auditSeoPage", () => {
  it("passes a page that meets every rule", () => {
    expect(auditSeoPage(snapshot(GOOD_HTML), "/", HOME_ENTRY)).toEqual([]);
  });

  it("fails the create-next-app placeholder on title, meta, canonical, h1, lang and links", () => {
    const issues = auditSeoPage(snapshot(PLACEHOLDER_HTML), "/", HOME_ENTRY);
    expect(rules(issues)).toEqual([
      "anchor-text",
      "canonical-present",
      "h1-keyword",
      "h2-keyword",
      "heading-order",
      "html-lang",
      "img-size",
      "internal-links",
      "keyword-first-100",
      "meta-keyword",
      "meta-length",
      "social-tags",
      "title-brand",
      "title-keyword",
      "title-length",
    ]);
  });

  it("flags pages without a registered keyword", () => {
    expect(rules(auditSeoPage(snapshot(GOOD_HTML), "/", undefined))).toEqual([
      "keyword-registered",
    ]);
  });
});

describe("individual rules", () => {
  const empty = snapshot("<html><head></head><body></body></html>");

  it("requires title, meta description, canonical and exactly one h1", () => {
    expect(rules(checkTitle(empty))).toEqual(["title-present"]);
    expect(rules(checkMetaDescription(empty))).toEqual(["meta-present"]);
    expect(rules(checkCanonical(empty, "/"))).toEqual(["canonical-present"]);
    expect(rules(checkHeadings(empty))).toEqual(["h1-single"]);
  });

  it("checks the canonical is the absolute self URL", () => {
    const page = snapshot('<link rel="canonical" href="https://nayabgull.com/">');
    expect(checkCanonical(page, "/")).toEqual([]);
    expect(rules(checkCanonical(page, "/pricing"))).toEqual(["canonical-self"]);
  });

  it("checks image alt text and next/image usage", () => {
    const page = snapshot(
      `<img src="a" width="1" height="1"><img alt="Image of a cat" data-nimg="1" width="1" height="1"><img alt="${"x".repeat(126)}" data-nimg="1" width="1" height="1">`,
    );
    const issues = checkImages(page);
    expect(issues.map((i) => i.rule)).toEqual(["img-next", "img-alt", "img-alt", "img-alt"]);
  });

  it("counts unique internal targets and ignores self links and fragments", () => {
    const links = ["/", "/a", "/a#top", "https://nayabgull.com/b/", "https://example.com"]
      .map((href) => `<a href="${href}">Descriptive text</a>`)
      .join("");
    const issues = checkInternalLinks(snapshot(`<main>${links}</main>`), "/");
    expect(issues).toEqual([
      { rule: "internal-links", message: "Main content links to 2 internal pages (3–8)." },
    ]);
  });
});
