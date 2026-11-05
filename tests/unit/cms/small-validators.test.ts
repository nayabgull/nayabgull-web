import { describe, expect, it } from "vitest";

import { validateAlt } from "@/lib/cms/alt.ts";
import { validateRedirectFrom, validateRedirectTo } from "@/lib/cms/redirects.ts";
import { slugify } from "@/lib/cms/slugify.ts";
import { checkSlug } from "@/lib/seo/slug.ts";

describe("validateAlt", () => {
  it("accepts a descriptive alt", () => {
    expect(validateAlt("Lead intake flow for a law firm")).toBe(true);
  });
  it.each([undefined, null, "", "   "])("requires text (%s)", (value) => {
    expect(validateAlt(value)).toMatch(/required/);
  });
  it("caps the length at 125", () => {
    expect(validateAlt("a".repeat(125))).toBe(true);
    expect(validateAlt("a".repeat(126))).toMatch(/126/);
  });
  it('rejects "image of"', () => {
    expect(validateAlt("Image of a dashboard")).toMatch(/image of/);
    expect(validateAlt("photo of a desk")).toMatch(/image of/);
  });
});

describe("validateRedirectFrom", () => {
  it("accepts a clean site path", () => {
    expect(validateRedirectFrom("/old-page")).toBe(true);
    expect(validateRedirectFrom("/")).toBe(true);
  });
  it.each([
    ["", /starting/],
    ["old", /starting/],
    ["//evil.com", /starting/],
    ["/a?b=1", /query/],
    ["/a#b", /query/],
    ["/old/", /trailing/],
    ["/admin", /admin/],
    ["/api/users", /admin/],
  ])("rejects %j", (value, message) => {
    expect(validateRedirectFrom(value)).toMatch(message);
  });
  it("rejects a missing value", () => {
    expect(validateRedirectFrom(undefined)).toMatch(/starting/);
  });
});

describe("validateRedirectTo", () => {
  it("accepts a path or a nayabgull.com URL", () => {
    expect(validateRedirectTo("/new", "301", "/old")).toBe(true);
    expect(validateRedirectTo("https://nayabgull.com/new", "301", "/old")).toBe(true);
    expect(validateRedirectTo("https://nayabgull.com", "301", "/old")).toBe(true);
  });
  it("needs no destination for a 410", () => {
    expect(validateRedirectTo(undefined, "410", "/old")).toBe(true);
  });
  it.each([
    [undefined, /needs/],
    ["", /needs/],
    ["https://example.com/x", /site path/],
    ["//example.com", /site path/],
    ["/admin/x", /admin/],
    ["/old", /itself/],
  ])("rejects %j", (value, message) => {
    expect(validateRedirectTo(value, "301", "/old")).toMatch(message);
  });
  it("compares against an unset source", () => {
    expect(validateRedirectTo("/new", "301", undefined)).toBe(true);
  });
});

describe("slugify", () => {
  it("makes lowercase hyphenated slugs", () => {
    expect(slugify("Law Firm Website Design!")).toBe("law-firm-website-design");
    expect(slugify("  Café & Bar  ")).toBe("cafe-and-bar");
    expect(slugify("---")).toBe("");
  });
});

describe("checkSlug", () => {
  it("accepts a short slug", () => {
    expect(checkSlug("law-firm-website-design")).toEqual([]);
  });
  it("flags format, length and dates", () => {
    expect(checkSlug("Bad_Slug").map((i) => i.rule)).toEqual(["slug-format"]);
    expect(checkSlug("a-b-c-d-e-f").map((i) => i.rule)).toEqual(["slug-length"]);
    expect(checkSlug("best-tools-2026").map((i) => i.rule)).toEqual(["slug-date"]);
    expect(checkSlug("").map((i) => i.rule)).toContain("slug-format");
  });
});
