import { describe, expect, it } from "vitest";

import { home } from "@/content/home.ts";
import { homeJsonLd } from "@/lib/seo/home-jsonld.ts";
import { validateJsonLd } from "@/lib/seo/jsonld-validate.ts";
import {
  breadcrumbs,
  faqPage,
  graph,
  organization,
  person,
  serializeJsonLd,
  website,
} from "@/lib/seo/jsonld.ts";

describe("JSON-LD builders", () => {
  it("builds the organization as a ProfessionalService serving the US", () => {
    const org = organization({ description: "Test" });
    expect(org["@type"]).toBe("ProfessionalService");
    expect(org.url).toBe("https://nayabgull.com");
    expect(org).not.toHaveProperty("sameAs");
  });

  it("adds sameAs only when real profile URLs are given", () => {
    const urls = ["https://github.com/example"];
    expect(organization({ description: "x", sameAs: urls }).sameAs).toEqual(urls);
    expect(
      person({ name: "A", jobTitle: "B", locality: "C", country: "PK", sameAs: [] }),
    ).not.toHaveProperty("sameAs");
  });

  it("numbers breadcrumbs and makes their URLs absolute", () => {
    const list = breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]);
    expect(list.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://nayabgull.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://nayabgull.com/services",
      },
    ]);
  });

  it("maps FAQ items to Question/Answer pairs", () => {
    const faq = faqPage([{ question: "Q?", answer: "A." }]);
    expect(faq.mainEntity).toEqual([
      { "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "A." } },
    ]);
  });

  it("escapes < so a value cannot close the script tag", () => {
    const json = serializeJsonLd(graph([faqPage([{ question: "</script>", answer: "x" }])]));
    expect(json).not.toContain("</script>");
    expect(JSON.parse(json)).toBeTruthy();
  });

  it("produces a homepage graph that passes the structured-data audit", () => {
    const data = homeJsonLd(home);
    expect(validateJsonLd([serializeJsonLd(data)], "home")).toEqual([]);
    const types = data["@graph"].map((n) => n["@type"]);
    expect(types).toEqual([
      "ProfessionalService",
      "WebSite",
      "BreadcrumbList",
      "Person",
      "FAQPage",
    ]);
    expect(website()["@type"]).toBe("WebSite");
  });
});
