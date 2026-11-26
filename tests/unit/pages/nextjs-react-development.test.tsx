import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { nextjsReactDevelopment as content } from "@/content/pages/nextjs-react-development.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { readability, words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

const PATH = "/services/nextjs-react-development";

const page = snapshot(
  renderToStaticMarkup(
    <main>
      <ContentPage content={content} />
    </main>,
  ),
);

/**
 * Lowercase copy without articles, with "Next.js" / "nextjs" / "next js" (and Node.js) read as one
 * word, so "hire a Next.js developer" counts for "hire next js developer".
 */
const plain = (text: string): string =>
  ` ${text.toLowerCase()} `
    .replace(/\bnext\.?\s?js\b/g, "nextjs")
    .replace(/\bnode\.?\s?js\b/g, "nodejs")
    .replace(/\s+(?:a|an|the)(?=\s)/g, "")
    .replace(/\s+/g, " ");
const copy = plain(page.bodyText);

const block = (id: string): Block => {
  const found = content.blocks.find((candidate) => candidate.id === id);
  if (!found) throw new Error(`No block "${id}".`);
  return found;
};

/** Nayab's own answers, word for word. */
const EXACT_FAQ = {
  "Who owns the accounts and the work?":
    "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a database service. I build everything inside those accounts: the code, the setup and the full site. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
  "Do you work in US time zones?":
    "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
};

describe("Next.js and React development page", () => {
  const entry = keywordFor(PATH);

  it("is the registered service page for react development company", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("react development company");
    expect(content.parent).toBeUndefined();
  });

  it("puts the primary keyword in the title, the meta description and the H1", () => {
    for (const text of [content.meta.title, content.meta.description]) {
      expect(text.toLowerCase()).toContain("react development company");
    }
    const h1 = page.headings.filter((heading) => heading.level === 1);
    expect(h1).toHaveLength(1);
    expect(h1[0]?.text.toLowerCase()).toContain("react development company");
  });

  it("uses every approved secondary keyword and no keyword from outside the map", () => {
    const missing = (entry?.secondary ?? []).filter(
      (keyword) => !copy.includes(plain(keyword).trim()),
    );
    expect(missing).toEqual([]);
    const h2 = page.headings.filter((heading) => heading.level === 2).map((h) => plain(h.text));
    expect(h2.some((heading) => heading.includes("react development services"))).toBe(true);
  });

  it("is short and easy: 1,200 to 1,500 words of copy, reading ease 65 or more", () => {
    const stats = readability(page.paragraphs.join(" "));
    expect(stats.words).toBeGreaterThanOrEqual(1200);
    expect(stats.words).toBeLessThanOrEqual(1500);
    expect(stats.readingEase).toBeGreaterThanOrEqual(65);
    expect(words(page.bodyText).length).toBeGreaterThanOrEqual(1200);
  });

  it("speaks as I only", () => {
    expect(page.bodyText).not.toMatch(/\b(we|our|ours|let's)\b/i);
  });

  it("shows the six things I build and the eight tools of the stack", () => {
    const build = block("what-i-build");
    const stack = block("stack");
    if (build.kind !== "features" || stack.kind !== "features") throw new Error("Wrong kind.");
    expect(build.items?.map((item) => item.title)).toEqual([
      "Marketing sites",
      "Web apps and dashboards",
      "SaaS front ends",
      "Headless CMS sites",
      "E-commerce front ends",
      "API and Node.js back ends",
    ]);
    expect(stack.items?.map((item) => item.title)).toEqual([
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Payload CMS",
      "Vercel",
    ]);
  });

  it("compares Next.js, WordPress and page builders in a table", () => {
    const compare = block("compare");
    if (compare.kind !== "compare") throw new Error("Wrong kind.");
    expect(compare.columns).toEqual(["Next.js and React", "WordPress", "Page builders"]);
    for (const row of compare.rows) expect(row.cells).toHaveLength(3);
  });

  it("has a five-step process with no invented timelines", () => {
    const process = block("process");
    if (process.kind !== "stepper") throw new Error("Wrong kind.");
    expect(process.steps).toHaveLength(5);
    expect(JSON.stringify(process)).not.toMatch(/\b\d+\s?(day|week|month)s?\b/i);
  });

  it("invents no portfolio project and no result", () => {
    expect(JSON.stringify(block("portfolio"))).toContain("each with the client's approval");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
  });

  it("shows no price and puts no Offer in the Service schema", () => {
    expect(pagePrices(content)).toEqual([]);
    expect(JSON.stringify(content)).not.toMatch(/\$\s?\d/);
    const graph = pageJsonLd(content)["@graph"];
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({
      serviceType: "React development services",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("carries Organization, WebSite, BreadcrumbList, Service and FAQPage", () => {
    const types = pageJsonLd(content)["@graph"].map((node) => node["@type"]);
    for (const type of ["ProfessionalService", "WebSite", "BreadcrumbList", "Service", "FAQPage"]) {
      expect(types).toContain(type);
    }
  });

  it("has 6+ FAQs, with Nayab's two answers word for word on the page and in the schema", () => {
    expect(content.faq?.items.length).toBeGreaterThanOrEqual(6);
    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const entities = faqNode?.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    for (const [question, answer] of Object.entries(EXACT_FAQ)) {
      expect(entities.find((item) => item.name === question)?.acceptedAnswer.text).toBe(answer);
      expect(page.paragraphs.join(" ")).toContain(answer);
    }
  });

  it("links to web design, hire full stack developer, pricing and about, and not to missing pages", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/services/web-design-development",
      "/hire-full-stack-developer",
      "/pricing",
      "/about",
    ]) {
      expect(hrefs, href).toContain(href);
    }
    expect(hrefs).not.toContain("/hire-saas-developer");
  });

  it("is in the header Services menu and the footer Services list", () => {
    const services = PRIMARY_NAV.find((item) => isNavGroup(item) && item.label === "Services");
    const header = services && isNavGroup(services) ? services.links : [];
    expect(header.map((link) => link.href)).toContain(PATH);
    const footer = FOOTER_NAV.find((group) => group.title === "Services")?.links ?? [];
    expect(footer.map((link) => link.href)).toContain(PATH);
  });
});
