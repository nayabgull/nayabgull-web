import { describe, expect, it } from "vitest";

import type { PageContent } from "@/content/pages/types.ts";
import { headlineText, pagePrices } from "@/content/pages/types.ts";
import { service } from "@/lib/seo/jsonld.ts";
import { ogSlug, pageMetadata } from "@/lib/seo/metadata.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { contentMetadata } from "@/lib/seo/page-metadata.ts";
import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from "@/lib/seo/routes.ts";

const BASE: PageContent = {
  path: "/example",
  name: "Example",
  updated: "2026-11-10",
  meta: { title: "Example | Nayab Gull", description: "An example page." },
  hero: {
    eyebrow: "Example",
    headline: { before: "An ", highlight: "example", after: " page" },
    lede: "Lede.",
    proof: [],
  },
  blocks: [],
};

const types = (content: PageContent): unknown[] =>
  pageJsonLd(content)["@graph"].map((node) => node["@type"]);

describe("service JSON-LD", () => {
  it("names the provider and the US as the area served, with no offers by default", () => {
    const node = service({ name: "S", serviceType: "T", description: "D", path: "/s" });
    expect(node).toMatchObject({
      "@type": "Service",
      "@id": "https://nayabgull.com/s#service",
      url: "https://nayabgull.com/s",
      provider: { "@id": "https://nayabgull.com/#organization" },
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(node).not.toHaveProperty("offers");
  });

  it("marks each visible price as a minimum price in US dollars, never a fixed price", () => {
    const node = service({
      name: "S",
      serviceType: "T",
      description: "D",
      path: "/s",
      offers: [{ name: "Setup", from: 750 }],
    });
    expect(node.offers).toEqual([
      {
        "@type": "Offer",
        name: "Setup",
        priceSpecification: { "@type": "PriceSpecification", minPrice: 750, priceCurrency: "USD" },
      },
    ]);
  });
});

describe("pageJsonLd", () => {
  it("always carries the organization, the website and a two-step breadcrumb", () => {
    expect(types(BASE)).toEqual(["ProfessionalService", "WebSite", "BreadcrumbList"]);
    expect(headlineText(BASE)).toBe("An example page");
    const crumbs = pageJsonLd(BASE)["@graph"][2] as { itemListElement: { item: string }[] };
    expect(crumbs.itemListElement.map((c) => c.item)).toEqual([
      "https://nayabgull.com",
      "https://nayabgull.com/example",
    ]);
  });

  it("adds Service with one Offer per visible price, Person and FAQPage when the page has them", () => {
    const full: PageContent = {
      ...BASE,
      person: true,
      service: { name: "S", serviceType: "T", description: "D" },
      faq: {
        eyebrow: "FAQ",
        heading: "Questions",
        items: [{ question: "Q?", answer: "A.\n\nB." }],
      },
      blocks: [
        {
          kind: "prices",
          id: "pricing",
          eyebrow: "Pricing",
          heading: "Prices",
          note: "These are starting prices.",
          items: [
            { name: "Site", from: 1500, label: "Starts at $1,500.", text: "T.", includes: [] },
          ],
        },
        { kind: "prose", id: "p", eyebrow: "E", heading: "H", paragraphs: ["Text."] },
      ],
    };
    expect(pagePrices(full).map((price) => price.from)).toEqual([1500]);
    expect(types(full)).toEqual([
      "ProfessionalService",
      "WebSite",
      "BreadcrumbList",
      "Service",
      "Person",
      "FAQPage",
    ]);
    const graph = pageJsonLd(full)["@graph"];
    expect(graph[3]?.offers).toHaveLength(1);
    expect(graph[5]?.mainEntity).toEqual([
      { "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "A. B." } },
    ]);
  });
});

describe("contentMetadata", () => {
  it("points Open Graph and Twitter at the page's own 1200×630 image", () => {
    const meta = contentMetadata({ ...BASE, path: "/services/example" });
    const image = {
      url: "/og/services-example",
      width: 1200,
      height: 630,
      alt: "An example page",
    };
    expect(meta.alternates?.canonical).toBe("https://nayabgull.com/services/example");
    expect(meta.openGraph?.images).toEqual([image]);
    expect(meta.twitter?.images).toEqual([image]);
    expect(meta).not.toHaveProperty("robots");
    expect(contentMetadata({ ...BASE, noindex: true }).robots).toEqual({
      index: false,
      follow: true,
    });
  });

  it("builds a flat image name from the path", () => {
    expect(ogSlug("/gohighlevel-agency")).toBe("gohighlevel-agency");
    expect(ogSlug("/industries/roofing/")).toBe("industries-roofing");
  });

  it("leaves the homepage image to its opengraph-image file", () => {
    const meta = pageMetadata({ title: "T | Nayab Gull", description: "D", path: "/" });
    expect(meta.openGraph).not.toHaveProperty("images");
  });
});

describe("routes and robots", () => {
  it("keeps noindex pages out of the indexable list", () => {
    expect(INDEXABLE_ROUTES).toContain("/");
    for (const route of NOINDEX_ROUTES) expect(INDEXABLE_ROUTES).not.toContain(route);
  });

  it("sets noindex, follow only when a page asks for it", () => {
    const input = { title: "T | Nayab Gull", description: "D", path: "/x" };
    expect(pageMetadata(input)).not.toHaveProperty("robots");
    expect(pageMetadata({ ...input, noindex: true }).robots).toEqual({
      index: false,
      follow: true,
    });
  });
});
