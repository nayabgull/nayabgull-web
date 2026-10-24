import { describe, expect, it } from "vitest";

import type { PageType } from "@/lib/seo/page-types.ts";
import { MIN_WORDS, minReadingEase, requiredSchemaTypes } from "@/lib/seo/page-types.ts";

describe("page types", () => {
  it("matches the seo.md word minimums", () => {
    expect(MIN_WORDS).toMatchObject({
      home: 1200,
      hub: 1500,
      industry: 1500,
      service: 1200,
      package: 600,
    });
  });

  it("uses 55 reading ease for blog posts and 60 elsewhere", () => {
    expect(minReadingEase("blog")).toBe(55);
    expect(minReadingEase("service")).toBe(60);
  });

  it.each<[PageType, string]>([
    ["home", "Person"],
    ["about", "Person"],
    ["hub", "Service"],
    ["industry", "Service"],
    ["package", "Service"],
    ["service", "Service"],
    ["blog", "BlogPosting"],
    ["case-study", "Article"],
    ["tool", "WebApplication"],
  ])("%s pages need %s schema", (type, schema) => {
    expect(requiredSchemaTypes(type)).toEqual([
      "ProfessionalService",
      "WebSite",
      "BreadcrumbList",
      schema,
    ]);
  });

  it("pricing pages need only the base schema", () => {
    expect(requiredSchemaTypes("pricing")).toEqual([
      "ProfessionalService",
      "WebSite",
      "BreadcrumbList",
    ]);
  });
});
