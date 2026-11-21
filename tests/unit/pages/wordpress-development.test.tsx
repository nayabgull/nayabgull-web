import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { webDesignDevelopment } from "@/content/pages/web-design-development.ts";
import { wordpressDevelopment as content } from "@/content/pages/wordpress-development.ts";
import { faqPlainText } from "@/lib/content/faq.ts";
import { words } from "@/lib/content/readability.ts";
import { sharedTextRatio } from "@/lib/content/similarity.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { INDEXABLE_ROUTES } from "@/lib/seo/routes.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/services/wordpress-development";

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

/** Entities from the brief (content/briefs/wordpress-development.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  WordPress: ["wordpress"],
  "block editor (Gutenberg)": ["block editor", "gutenberg"],
  "themes and child themes": ["child theme"],
  "custom theme": ["custom theme"],
  plugins: ["plugin"],
  "custom plugin": ["custom plugin"],
  "Advanced Custom Fields": ["advanced custom fields"],
  "custom post types": ["custom post types"],
  WooCommerce: ["woocommerce"],
  Elementor: ["elementor"],
  "Core Web Vitals": ["core web vitals"],
  "caching and CDN": ["caching", "cdn"],
  // "managed WordPress hosting" is left out: /services/website-maintenance owns that keyword.
  hosting: ["hosting"],
  "staging site": ["staging site"],
  backups: ["backups"],
  "security updates": ["security updates"],
  "PHP version": ["php version"],
  "SEO plugins": ["seo plugin"],
  "forms and CRM integration": ["forms", "crm"],
  "accessibility (WCAG)": ["wcag"],
  "headless WordPress": ["headless wordpress"],
  "Next.js": ["next.js"],
};

describe("WordPress development page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page with the approved keywords", () => {
    expect(content.path).toBe(PATH);
    expect(INDEXABLE_ROUTES).toContain(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("wordpress development agency");
    expect(entry?.secondary).toEqual([
      "wordpress agency",
      "wordpress website design agency",
      "wordpress design company",
      "wordpress website development company",
      "custom wordpress development",
      "wordpress experts for hire",
      "hire wordpress developer",
      "wordpress web design company",
    ]);
    // No /services hub yet: the breadcrumb goes Home › this page.
    expect(content.parent).toBeUndefined();
  });

  it("adds the approved secondaries to the care plan row, without building that page", () => {
    expect(keywordFor("/packages/wordpress-care-plan")).toMatchObject({
      primary: "wordpress maintenance plans",
      secondary: [
        "wordpress care plans",
        "wordpress maintenance packages",
        "wordpress maintenance company",
      ],
    });
    expect(INDEXABLE_ROUTES).not.toContain("/packages/wordpress-care-plan");
  });

  it("is a full service page of 1,500 to 2,000 words", () => {
    const count = words(page.bodyText).length;
    expect(count).toBeGreaterThanOrEqual(1500);
    expect(count).toBeLessThanOrEqual(2000);
  });

  it("puts the primary keyword in the title, the meta description, the H1 and the first 100 words", () => {
    expect(content.meta.title.toLowerCase()).toMatch(/^wordpress development agency/);
    expect(content.meta.description.toLowerCase()).toContain("wordpress development agency");
    expect(content.hero.headline.highlight).toBe("WordPress development agency");
    expect(words(page.bodyText).slice(0, 100).join(" ").toLowerCase()).toContain(
      "wordpress development agency",
    );
  });

  it("uses every secondary keyword in the copy, and secondary keywords in H2s", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
    const h2s = page.headings
      .filter((heading) => heading.level === 2)
      .map((heading) => heading.text.toLowerCase());
    for (const keyword of [
      "wordpress agency",
      "custom wordpress development",
      "wordpress website development company",
      "hire a wordpress developer",
    ]) {
      expect(
        h2s.some((heading) => heading.includes(keyword)),
        keyword,
      ).toBe(true);
    }
  });

  it("does not target keywords that other pages own", () => {
    for (const keyword of [
      "woocommerce development services",
      "hire woocommerce developers",
      "wordpress support services",
      "wordpress maintenance plans",
      "wordpress care plans",
    ]) {
      expect(copy, keyword).not.toContain(keyword);
    }
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    const covered = Object.keys(ENTITIES).length - missing.length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it("covers the real work: design, themes and blocks, WooCommerce, speed, security, migration", () => {
    const services = JSON.stringify(block("features")).toLowerCase();
    for (const topic of [
      "custom wordpress design",
      "custom themes and blocks",
      "woocommerce",
      "core web vitals",
      "security updates",
      "migration and redesign",
    ]) {
      expect(services, topic).toContain(topic);
    }
  });

  it("shows the two approved FAQ answers word for word, in the FAQ and in the schema", () => {
    const approved = {
      "Who owns the accounts and the work?":
        "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a CRM. I build everything inside those accounts: the website, the intake flows and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      "Do you work in US time zones?":
        "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
    };
    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const schema = faqNode?.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    for (const [question, answer] of Object.entries(approved)) {
      const item = content.faq?.items.find((candidate) => candidate.question === question);
      expect(item, question).toBeDefined();
      expect(faqPlainText(item?.answer ?? "")).toBe(answer);
      expect(schema.find((node) => node.name === question)?.acceptedAnswer.text).toBe(answer);
    }
  });

  it("answers the People Also Ask questions and the hiring objections", () => {
    const questions = [
      ...(content.faq?.items.map((item) => item.question) ?? []),
      ...page.headings.map((heading) => heading.text),
    ];
    expect(content.faq?.items.length).toBeGreaterThanOrEqual(6);
    for (const topic of [
      /what is a wordpress agency/i,
      /is wordpress still a good choice/i,
      /cost to hire a wordpress developer/i,
      /best in the usa/i,
      /chatgpt/i,
      /redesign or migrate/i,
      /edit the site myself/i,
      /after launch/i,
    ]) {
      expect(
        questions.some((question) => topic.test(question)),
        String(topic),
      ).toBe(true);
    }
  });

  it("shows no price and puts no Offer in the Service schema until Nayab sets one", () => {
    expect(pagePrices(content)).toEqual([]);
    expect(JSON.stringify(content)).not.toMatch(/\$\s?\d/);
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
      serviceType: "WordPress website design and development",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study, client, statistic or guarantee", () => {
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("no approved WordPress case study");
    const text = JSON.stringify(content);
    expect(text).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
    expect(text).not.toMatch(/\bguarantee/i);
    expect(text).not.toMatch(/\bcompliant\b/i);
  });

  it("links to pages that exist, never to the care plan or other unbuilt pages", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/pricing",
      "/services/web-design-development",
      "/gohighlevel-agency",
      "/about",
    ]) {
      expect(hrefs, href).toContain(href);
    }
    for (const href of hrefs) {
      if (href.startsWith("/")) expect(INDEXABLE_ROUTES, href).toContain(href);
    }
    expect(hrefs).not.toContain("/packages/wordpress-care-plan");
  });

  it("is in the header Services menu and the footer", () => {
    const link = { label: "WordPress development", href: PATH };
    const services = PRIMARY_NAV.find((item) => item.label === "Services");
    expect(services && isNavGroup(services) ? services.links : []).toContainEqual(link);
    expect(FOOTER_NAV.find((group) => group.title === "Services")?.links).toContainEqual(link);
  });

  it("shares almost no text with the web design and development page", () => {
    // Only the page copy counts: the forms and the closing section are shared on every page.
    const own = (blocks: readonly Block[]) => JSON.stringify(blocks);
    expect(sharedTextRatio(own(content.blocks), own(webDesignDevelopment.blocks))).toBeLessThan(
      0.05,
    );
  });
});

describe("Process with timeline", () => {
  it("has five steps, each with a time", () => {
    const steps = block("steps").steps;
    expect(steps).toHaveLength(5);
    for (const step of steps) expect(step.when).not.toBe("");
  });
});

describe("Marketplace vs agency vs me table", () => {
  const compare = block("compare");

  it("compares the three options in a real table, one sentence per cell", () => {
    render(<CompareSection block={compare} />);
    const table = screen.getByRole("table", { name: compare.heading });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((cell) => cell.textContent),
    ).toEqual(["Question", "Freelance marketplace", "Large WordPress agency", "Working with me"]);
    for (const row of compare.rows) {
      expect(row.cells).toHaveLength(3);
      for (const cell of row.cells) expect(cell).toMatch(/\.$/);
    }
  });
});
