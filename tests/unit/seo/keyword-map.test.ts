import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { findConflicts, normalizeKeyword, parseKeywordMap } from "@/lib/seo/keyword-map.ts";
import { KEYWORDS, keywordFor } from "@/lib/seo/keywords.ts";

const SAMPLE = `
| Page | URL | Primary | Volume | Secondary |
| --- | --- | --- | --- | --- |
| Home | / | Web Development Agency | 1K | web dev company, ai agency (link only), law firm web design ($176) |
| Law | /law | law firm website design | — | law firm web design |
| About | /about | nayab gull (brand) | — | — |

| URL | Primary | Volume |
| --- | --- | --- |
| /packages/a | package one (brand) | — |

| Cluster | Links up to | Starter topics |
| --- | --- | --- |
| GHL | /gohighlevel-agency | review |
`;

describe("keyword map parser", () => {
  it("normalizes notes, case and spacing", () => {
    expect(normalizeKeyword("  Law Firm   Web Design ($176) ")).toBe("law firm web design");
  });

  it("reads every table with URL and Primary columns and skips link-only entries", () => {
    expect(parseKeywordMap(SAMPLE)).toEqual([
      {
        url: "/",
        primary: "web development agency",
        secondary: ["web dev company", "law firm web design"],
      },
      { url: "/law", primary: "law firm website design", secondary: ["law firm web design"] },
      { url: "/about", primary: "nayab gull", secondary: [] },
      { url: "/packages/a", primary: "package one", secondary: [] },
    ]);
  });

  it("finds a keyword that is one page's primary and another page's secondary", () => {
    const pages = [
      { url: "/packages/speed", primary: "speed service", secondary: [] },
      { url: "/services/care", primary: "care company", secondary: ["speed service"] },
    ];
    expect(findConflicts(pages)).toEqual([
      { keyword: "speed service", urls: ["/packages/speed", "/services/care"] },
    ]);
  });

  it("finds keywords targeted by more than one page", () => {
    expect(findConflicts(parseKeywordMap(SAMPLE))).toEqual([
      { keyword: "law firm web design", urls: ["/", "/law"] },
    ]);
  });

  it("skips rows with an empty URL or primary", () => {
    expect(parseKeywordMap("| URL | Primary |\n| --- | --- |\n|  | x |\n| /a |  |")).toEqual([]);
  });
});

describe("keyword registry", () => {
  it("mirrors docs/seo/keyword-map.md exactly", () => {
    const mapped = parseKeywordMap(readFileSync("docs/seo/keyword-map.md", "utf8"));
    expect(KEYWORDS.map(({ url, primary, secondary }) => ({ url, primary, secondary }))).toEqual(
      mapped,
    );
  });

  it("gives each URL one primary keyword and finds entries by URL", () => {
    expect(new Set(KEYWORDS.map((k) => k.url)).size).toBe(KEYWORDS.length);
    expect(new Set(KEYWORDS.map((k) => k.primary)).size).toBe(KEYWORDS.length);
    expect(keywordFor("/")?.primary).toBe("web development agency");
    expect(keywordFor("/missing")).toBeUndefined();
  });
});
