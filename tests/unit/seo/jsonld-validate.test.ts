import { describe, expect, it } from "vitest";

import { validateJsonLd } from "@/lib/seo/jsonld-validate.ts";

const ctx = "https://schema.org";
const org = { "@type": "ProfessionalService", name: "Nayab Gull", url: "https://nayabgull.com" };
const site = { "@type": "WebSite", name: "Nayab Gull", url: "https://nayabgull.com" };
const crumbs = { "@type": "BreadcrumbList", itemListElement: [] };

const block = (value: unknown) => JSON.stringify(value);
const rules = (issues: { rule: string }[]) => issues.map((i) => i.rule);

describe("validateJsonLd", () => {
  it("requires at least one block", () => {
    expect(rules(validateJsonLd([], "home"))).toEqual(["jsonld-present"]);
  });

  it("passes a complete @graph for a home page", () => {
    const graph = {
      "@context": ctx,
      "@graph": [org, site, crumbs, { "@type": "Person", name: "Nayab Gull" }],
    };
    expect(validateJsonLd([block(graph)], "home")).toEqual([]);
  });

  it("accepts separate blocks, arrays and multiple types", () => {
    const service = {
      "@context": ctx,
      "@type": ["Service", "Thing"],
      name: "GHL",
      provider: {},
      areaServed: "US",
    };
    const blocks = [
      block([
        { "@context": ctx, ...org },
        { "@context": ctx, ...site },
      ]),
      block({ "@context": ctx, ...crumbs }),
      block(service),
    ];
    expect(validateJsonLd(blocks, "service")).toEqual([]);
  });

  it("reports invalid JSON, a wrong context, missing types and properties", () => {
    const issues = validateJsonLd(
      [
        "{not json",
        block({ "@context": "http://schema.org", name: "x" }),
        block({ "@context": ctx, "@type": "Service" }),
      ],
      "pricing",
    );
    expect(rules(issues)).toEqual([
      "jsonld-parse",
      "jsonld-context",
      "jsonld-type",
      "jsonld-property",
      "jsonld-property",
      "jsonld-property",
      "jsonld-required-type",
      "jsonld-required-type",
      "jsonld-required-type",
    ]);
  });

  it("bans self-serving review markup", () => {
    const graph = {
      "@context": ctx,
      "@graph": [org, site, crumbs, { "@type": "AggregateRating" }],
    };
    expect(rules(validateJsonLd([block(graph)], "pricing"))).toEqual(["jsonld-banned"]);
  });

  it("ignores non-object values and non-string types", () => {
    const graph = {
      "@context": ctx,
      "@graph": [org, site, crumbs, 5, { "@type": [7], name: "x" }],
    };
    expect(rules(validateJsonLd([block(graph)], "pricing"))).toEqual(["jsonld-type"]);
  });
});
