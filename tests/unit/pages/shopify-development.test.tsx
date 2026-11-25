import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { CALL_CTA } from "@/content/home.ts";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { shopifyDevelopment as content } from "@/content/pages/shopify-development.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { webDesignDevelopment } from "@/content/pages/web-design-development.ts";
import { faqPlainText } from "@/lib/content/faq.ts";
import { words } from "@/lib/content/readability.ts";
import { sharedTextRatio } from "@/lib/content/similarity.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/services/shopify-development";

const block = <K extends Block["kind"]>(kind: K): Extract<Block, { kind: K }> => {
  const found = content.blocks.find((candidate) => candidate.kind === kind);
  if (!found) throw new Error(`No ${kind} block on the page.`);
  return found as Extract<Block, { kind: K }>;
};

const page = snapshot(
  renderToStaticMarkup(
    <main>
      <ContentPage content={content} />
    </main>,
  ),
);
const copy = page.bodyText.toLowerCase();
const h2s = page.headings
  .filter((heading) => heading.level === 2)
  .map((heading) => heading.text.toLowerCase());

/** Entities from the brief (content/briefs/shopify-development.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  Shopify: ["shopify"],
  "Shopify Plus": ["shopify plus"],
  "Online Store 2.0": ["online store 2.0"],
  Liquid: ["liquid"],
  "Dawn and paid themes": ["dawn", "paid theme"],
  "sections and blocks": ["sections and blocks"],
  metafields: ["metafields"],
  "Shopify apps": ["apps"],
  "Shopify Payments": ["shopify payments"],
  "Shop Pay": ["shop pay"],
  checkout: ["checkout"],
  "Storefront API": ["storefront api"],
  Hydrogen: ["hydrogen"],
  "product and collection pages": ["product pages", "collection pages"],
  "Core Web Vitals": ["core web vitals"],
  "page speed": ["speed"],
  "structured data": ["structured data"],
  "Google Analytics 4": ["google analytics 4"],
  Klaviyo: ["klaviyo"],
  "migration from WooCommerce, Magento or Wix": ["woocommerce", "magento", "wix"],
  "301 redirects": ["301 redirect"],
  "store audit": ["store audit"],
};

describe("Shopify development page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page with the keywords approved on 2026-11-22", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("shopify development agency");
    expect(entry?.secondary).toEqual([
      "shopify agency",
      "shopify development company",
      "hire shopify developer",
      "hire shopify expert",
      "shopify plus development agency",
      "shopify seo services",
      "expert shopify developers",
      "shopify website development company",
      "shopify store design services",
      "headless shopify",
    ]);
    // No /services hub yet: the breadcrumb goes Home › this page.
    expect(content.parent).toBeUndefined();
  });

  it("is a full service page of 1,500 to 2,000 words", () => {
    const count = words(page.bodyText).length;
    expect(count).toBeGreaterThanOrEqual(1500);
    expect(count).toBeLessThanOrEqual(2000);
  });

  it("puts the primary keyword in the title, the meta description, the H1, the first 100 words and an H2", () => {
    expect(content.meta.title.toLowerCase()).toMatch(/^shopify development agency/);
    expect(content.meta.description.toLowerCase()).toContain("shopify development agency");
    expect(content.hero.headline.highlight).toBe("Shopify development agency");
    expect(words(page.bodyText).slice(0, 100).join(" ").toLowerCase()).toContain(
      "shopify development agency",
    );
    expect(h2s.some((heading) => heading.includes("shopify development agency"))).toBe(true);
  });

  it("uses every secondary keyword in the copy, and secondary keywords in H2s", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
    for (const keyword of [
      "shopify development company",
      "shopify plus development agency",
      "hire shopify developer",
      "hire shopify expert",
      "headless shopify",
    ]) {
      expect(
        h2s.some((heading) => heading.includes(keyword)),
        keyword,
      ).toBe(true);
    }
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    const covered = Object.keys(ENTITIES).length - missing.length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it("covers the real work: setup, theme, migration, speed, apps, headless and Plus", () => {
    const ids = content.blocks.map((candidate) => candidate.id);
    expect(ids).toEqual([
      "problems",
      "what-it-is",
      "services",
      "migration",
      "headless",
      "plus",
      "audit",
      "process",
      "pricing",
      "compare",
      "proof",
      "related",
    ]);
    const services = block("features");
    expect(services.items?.map((item) => item.title)).toEqual([
      "Store setup",
      "Theme customization",
      "Shopify store design services",
      "Apps and integrations",
      "Speed work",
      "Shopify SEO services",
    ]);
  });

  it("explains headless Shopify in plain words", () => {
    expect(copy).toContain(
      "headless shopify means shopify still runs your products, payments and orders",
    );
    expect(copy).toContain("most small stores do not need it");
  });

  it("offers a free store audit in the hero, its own section and the closing", () => {
    expect(content.hero.body?.join(" ")).toMatch(/free store audit/);
    expect(h2s).toContain("start with a free shopify store audit");
    expect(content.closing?.text).toMatch(/free audit/);
  });

  it("opens and closes with Book a free call, and preselects Website in the quote forms", () => {
    expect(content.hero.primaryCta).toEqual(CALL_CTA);
    expect(content.request).toEqual({ type: "quote", service: "website" });
  });

  it("answers the People Also Ask questions and the hiring objections in the FAQ", () => {
    const questions = content.faq?.items.map((item) => item.question) ?? [];
    expect(questions.length).toBeGreaterThanOrEqual(6);
    for (const question of [
      "Can I hire someone to set up my Shopify store?",
      "How much does a Shopify developer charge?",
      "Is it worth it to hire a Shopify expert?",
      "Can I hire someone to manage my Shopify store?",
      "Who owns the store and the code?",
      "Do you work in US time zones?",
    ]) {
      expect(questions).toContain(question);
    }
  });

  it("shows the approved time zone answer word for word, in the FAQ and in the schema", () => {
    const question = "Do you work in US time zones?";
    const answer =
      "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.";
    const item = content.faq?.items.find((candidate) => candidate.question === question);
    expect(faqPlainText(item?.answer ?? "")).toBe(answer);
    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const schema = faqNode?.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    expect(schema.find((node) => node.name === question)?.acceptedAnswer.text).toBe(answer);
  });

  it("shows the approved starting price as a prices block and as an Offer in the Service schema", () => {
    expect(pagePrices(content)).toEqual([
      expect.objectContaining({
        name: "Shopify store build",
        from: 1500,
        label: "Starts at $1,500.",
      }),
    ]);
    expect(copy).toContain("shopify store builds start at $1,500.");
    expect(JSON.stringify(content).match(/\$\d+(?:,\d{3})*/g)).toEqual(
      expect.arrayContaining(["$1,500"]),
    );
    expect(new Set(JSON.stringify(content).match(/\$\d+(?:,\d{3})*/g))).toEqual(
      new Set(["$1,500"]),
    );
    const graph = pageJsonLd(content)["@graph"];
    expect(graph.map((node) => node["@type"])).toEqual([
      "ProfessionalService",
      "WebSite",
      "BreadcrumbList",
      "Service",
      "FAQPage",
    ]);
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({
      serviceType: "Shopify development",
      areaServed: { "@type": "Country", name: "United States" },
      offers: [
        {
          "@type": "Offer",
          name: "Shopify store build",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 1500,
            priceCurrency: "USD",
          },
        },
      ],
    });
    expect(service).toHaveProperty("provider");
  });

  it("shows the approved timelines, the week of monitoring and the access wording", () => {
    const process = block("stepper");
    expect(process.steps.find((step) => step.title === "Design and build")?.text).toContain(
      "A new store takes 2 to 4 weeks. A migration takes 1 to 3 weeks, depending on how many products and orders move.",
    );
    expect(process.steps.at(-1)?.text).toContain("watch the store that week");
    const owner = content.faq?.items.find(
      (item) => item.question === "Who owns the store and the code?",
    );
    expect(faqPlainText(owner?.answer ?? "")).toContain(
      "I work through a Shopify collaborator account (or a staff account if you prefer). You never share your password, and you can remove my access anytime.",
    );
  });

  it("invents no case study, store, result or partner badge", () => {
    const text = JSON.stringify(content);
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("no approved Shopify case study");
    expect(text).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
    expect(text).not.toMatch(/shopify (partner|expert badge|certified)|premier|award/i);
    // The only numbers are the confirmed ones: 5+ years, 400+ projects, 30-minute call, quote in
    // 3 days, the time zone window, the $1,500 starting price, the 2 to 4 and 1 to 3 week timelines,
    // Online Store 2.0, Google Analytics 4 and 301 redirects.
    const pageCopy = JSON.stringify([content.hero, content.blocks, content.faq, content.closing]);
    const numbers = [...new Set(pageCopy.match(/\b\d+(?:\.\d+)?\+?/g) ?? [])].sort();
    expect(numbers).toEqual(
      ["1", "1500", "2", "2.0", "3", "30", "301", "4", "400+", "5+", "500", "6", "9"].sort(),
    );
  });

  it("links to the web design service, pricing, hiring, the AI hub and About", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/services/web-design-development",
      "/pricing",
      "/hire-full-stack-developer",
      "/ai-automation-agency",
      "/about",
    ]) {
      expect(hrefs, href).toContain(href);
    }
    expect(hrefs).not.toContain("/services");
  });

  it("is in the header Services menu and the footer", () => {
    const services = PRIMARY_NAV.find((item) => item.label === "Services");
    expect(services && isNavGroup(services) ? services.links : []).toContainEqual({
      label: "Shopify development",
      href: PATH,
    });
    const footer = FOOTER_NAV.find((group) => group.title === "Services");
    expect(footer?.links).toContainEqual({ label: "Shopify development", href: PATH });
  });

  it("shares almost no text with the web design and development page", () => {
    // Only the page copy counts: the forms and the closing section are shared on every page.
    const own = (blocks: readonly Block[]) => JSON.stringify(blocks);
    expect(sharedTextRatio(own(content.blocks), own(webDesignDevelopment.blocks))).toBeLessThan(
      0.05,
    );
  });
});

describe("Freelancer vs agency vs me table", () => {
  const compare = block("compare");

  it("compares the three options in a real table, one sentence per cell", () => {
    render(<CompareSection block={compare} />);
    const table = screen.getByRole("table", { name: compare.heading });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((cell) => cell.textContent),
    ).toEqual(["Question", "Marketplace freelancer", "Large Shopify agency", "Working with me"]);
    for (const row of compare.rows) {
      expect(row.cells).toHaveLength(3);
      for (const cell of row.cells) expect(cell).toMatch(/\.$/);
    }
  });
});

describe("Shopify Plus section", () => {
  it("does not sell Shopify Flow as a Plus-only feature (it is on every current plan)", () => {
    const plus = content.blocks.find((candidate) => candidate.id === "plus");
    expect(JSON.stringify(plus)).not.toMatch(/\bflow\b/i);
  });
});
