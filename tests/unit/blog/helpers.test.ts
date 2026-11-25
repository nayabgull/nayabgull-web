import { describe, expect, it } from "vitest";

import { hubFor, HUB_OPTIONS, validateHub } from "@/lib/blog/hubs.ts";
import {
  authorPath,
  categoryPath,
  listPagePath,
  pageCount,
  parsePageParam,
  postPath,
  tagPath,
} from "@/lib/blog/paths.ts";
import { PROFILE_SITES, profileLinks, validateProfileUrl } from "@/lib/blog/profiles.ts";
import { postChangeIsPublic } from "@/lib/blog/revalidate.ts";

const [linkedin] = PROFILE_SITES;

describe("blog paths", () => {
  it("builds every blog URL", () => {
    expect(postPath("a")).toBe("/blog/a");
    expect(categoryPath("c")).toBe("/blog/category/c");
    expect(authorPath("n")).toBe("/blog/author/n");
    expect(tagPath("AI Agents")).toBe("/blog/tag/ai-agents");
    expect(listPagePath("/blog", 1)).toBe("/blog");
    expect(listPagePath("/blog", 3)).toBe("/blog/page/3");
  });

  it("accepts only page numbers from 2 up", () => {
    expect(parsePageParam("2")).toBe(2);
    expect(parsePageParam("1")).toBeUndefined();
    expect(parsePageParam("02")).toBeUndefined();
    expect(parsePageParam("x")).toBeUndefined();
    expect(parsePageParam("99999")).toBeUndefined();
  });

  it("counts pages, with at least one", () => {
    expect(pageCount(0)).toBe(1);
    expect(pageCount(6)).toBe(1);
    expect(pageCount(7)).toBe(2);
    expect(pageCount(5, 2)).toBe(3);
  });
});

describe("hubs", () => {
  it("offers live indexable pages only, never About, Contact or legal pages", () => {
    const paths = HUB_OPTIONS.map((hub) => hub.value);
    expect(paths).toContain("/gohighlevel-agency");
    expect(paths).not.toContain("/about");
    expect(paths).not.toContain("/contact");
    expect(paths).not.toContain("/privacy-policy");
  });

  it("validates the hub field", () => {
    expect(hubFor("/gohighlevel-agency")?.label).toBe("GoHighLevel agency");
    expect(validateHub(undefined)).toBe(true);
    expect(validateHub("/gohighlevel-agency")).toBe(true);
    expect(validateHub("/nope")).toMatch(/Use one of these paths/);
    expect(validateHub(5)).toMatch(/Use one of these paths/);
  });
});

describe("author profiles", () => {
  it("accepts empty or a https URL on the right site", () => {
    if (!linkedin) throw new Error("no LinkedIn site");
    expect(validateProfileUrl("", linkedin)).toBe(true);
    expect(validateProfileUrl(null, linkedin)).toBe(true);
    expect(validateProfileUrl("https://www.linkedin.com/in/x", linkedin)).toBe(true);
    expect(validateProfileUrl("http://linkedin.com/in/x", linkedin)).toMatch(/https/);
    expect(validateProfileUrl("https://evil.com/in/x", linkedin)).toMatch(/linkedin\.com/);
    expect(validateProfileUrl("not a url", linkedin)).toMatch(/full URL/);
    expect(validateProfileUrl(3, linkedin)).toMatch(/text/);
  });

  it("lists valid profiles in a fixed order", () => {
    expect(
      profileLinks({
        upworkUrl: "https://www.upwork.com/freelancers/x",
        githubUrl: "https://example.com/x",
        linkedinUrl: " https://linkedin.com/in/x ",
      }),
    ).toEqual([
      { label: "LinkedIn", url: "https://linkedin.com/in/x" },
      { label: "Upwork", url: "https://www.upwork.com/freelancers/x" },
    ]);
  });
});

describe("postChangeIsPublic", () => {
  it("is true for a publish or an unpublish, false for draft-only saves", () => {
    expect(postChangeIsPublic({ _status: "published" }, { _status: "draft" })).toBe(true);
    expect(postChangeIsPublic({ _status: "draft" }, { _status: "published" })).toBe(true);
    expect(postChangeIsPublic({ _status: "draft" }, { _status: "draft" })).toBe(false);
    expect(postChangeIsPublic({ _status: "draft" }, undefined)).toBe(false);
  });
});
