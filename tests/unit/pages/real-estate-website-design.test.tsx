import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AgentFlow } from "@/components/sections/blocks/AgentFlow.tsx";
import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { realEstateWebsiteDesign as content } from "@/content/pages/real-estate-website-design.ts";
import { roofingHvacWebsiteDesign } from "@/content/pages/roofing-hvac-website-design.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { faqPlainText } from "@/lib/content/faq.ts";
import { words } from "@/lib/content/readability.ts";
import { sharedTextRatio } from "@/lib/content/similarity.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/industries/real-estate-website-design";

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

/** Entities from the brief (content/briefs/real-estate-website-design.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  "real estate agent": ["agent"],
  realtor: ["realtor"],
  team: ["team"],
  brokerage: ["brokerage"],
  IDX: ["idx"],
  MLS: ["mls"],
  "MLS membership": ["mls membership"],
  "IDX provider": ["idx provider"],
  "MLS approval": ["mls approves"],
  "listing search": ["listing search"],
  "saved search": ["saved search", "saves a search"],
  "new-listing alerts": ["new-listing alert"],
  "lead capture": ["lead capture"],
  "showing request": ["showing request"],
  calendar: ["calendar"],
  CRM: ["crm"],
  "drip follow-up": ["drip"],
  texts: ["text"],
  GoHighLevel: ["gohighlevel"],
  "A2P 10DLC": ["a2p 10dlc"],
  "agent pages": ["agent page"],
  "lead routing": ["lead routing"],
  "neighborhood pages": ["neighborhood page"],
  "mobile speed": ["phone"],
  "Fair Housing": ["fair housing"],
  "US time zones": ["us time zones"],
};

describe("Real estate website design page", () => {
  const entry = keywordFor(PATH);

  it("is registered as an industry page with the keywords from the keyword map", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("industry");
    expect(entry?.primary).toBe("real estate website design");
    expect(entry?.secondary).toEqual([
      "realtor website design",
      "real estate agent website design",
      "real estate idx website design",
      "real estate brokerage website design",
      "real estate marketing automation",
    ]);
    // The breadcrumb goes Home › Industries › this page.
    expect(content.parent).toEqual({ name: "Industries", path: "/industries" });
  });

  it("is a full industry page of 1,500 to 2,000 words", () => {
    const count = words(page.bodyText).length;
    expect(count).toBeGreaterThanOrEqual(1500);
    expect(count).toBeLessThanOrEqual(2000);
  });

  it("puts the primary keyword in the title, the meta description, the H1 and an H2", () => {
    expect(content.meta.title.toLowerCase()).toMatch(/^real estate website design/);
    expect(content.meta.description.toLowerCase()).toContain("real estate website design");
    expect(content.hero.headline.highlight).toBe("Real estate website design");
    const h2s = page.headings
      .filter((heading) => heading.level === 2)
      .map((heading) => heading.text.toLowerCase());
    expect(h2s.some((heading) => heading.includes("real estate website design"))).toBe(true);
  });

  it("uses every secondary keyword in the copy, and four of them in H2s", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
    const h2s = page.headings
      .filter((heading) => heading.level === 2)
      .map((heading) => heading.text.toLowerCase());
    for (const keyword of [
      "realtor website design",
      "real estate idx website design",
      "real estate marketing automation",
      "real estate brokerage website design",
    ]) {
      expect(
        h2s.some((heading) => heading.includes(keyword)),
        keyword,
      ).toBe(true);
    }
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.some((term) => copy.includes(term)))
      .map(([entity]) => entity);
    const covered = Object.keys(ENTITIES).length - missing.length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it("explains IDX correctly: the client's MLS membership, an approved provider, MLS approval", () => {
    const idx = JSON.stringify(content.blocks.find((candidate) => candidate.id === "idx"));
    expect(idx).toContain(
      "through your own MLS membership and an IDX provider that your MLS approves",
    );
    expect(idx).toContain("Your MLS has to approve the setup");
    expect(idx).toContain("I do not provide MLS access or a listing feed");
    const text = JSON.stringify(content).toLowerCase();
    expect(text).not.toMatch(
      /\b(i|we) (provide|supply|give you) (mls|an idx|a listing|the listing)/,
    );
  });

  it("names Fair Housing only as the brokerage's responsibility and makes no compliance claim", () => {
    const text = JSON.stringify(content).toLowerCase();
    expect(text).not.toMatch(/\bcompliant\b|\bcompliance\b/);
    expect(copy).toContain(
      "fair housing rules apply to every page and ad. your brokerage is responsible",
    );
    const faq = content.faq?.items.find((item) => /fair housing/i.test(item.question));
    expect(faq?.answer).toMatch(/^Your brokerage is\./);
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

  it("answers the objections an agent or broker raises before hiring", () => {
    const questions = content.faq?.items.map((item) => item.question) ?? [];
    expect(questions.length).toBeGreaterThanOrEqual(6);
    for (const topic of [/mls access/i, /idx provider and crm/i, /how long/i, /myself/i]) {
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
      serviceType: "Real estate website design",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study, client, statistic or result", () => {
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("no approved real estate case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
    expect(JSON.stringify(content)).not.toMatch(/zillow|realtor\.com|redfin/i);
  });

  it("links to the web design service, the GHL and AI hubs, pricing and up to /industries", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/services/web-design-development",
      "/gohighlevel-agency",
      "/ai-automation-agency",
      "/pricing",
      "/industries",
    ]) {
      expect(hrefs, href).toContain(href);
    }
  });

  it("is in the header Industries menu and the footer", () => {
    const industries = PRIMARY_NAV.find((item) => item.label === "Industries");
    expect(industries && isNavGroup(industries) ? industries.links : []).toContainEqual({
      label: "Real estate websites",
      href: PATH,
    });
    const footer = FOOTER_NAV.find((group) => group.title === "Industries");
    expect(footer?.links).toContainEqual({ label: "Real estate websites", href: PATH });
  });

  it("shares almost no text with the roofing page", () => {
    // Only the page copy counts: the forms and the closing section are shared on every page.
    const own = (blocks: readonly Block[]) => JSON.stringify(blocks);
    expect(sharedTextRatio(own(content.blocks), own(roofingHvacWebsiteDesign.blocks))).toBeLessThan(
      0.05,
    );
  });
});

describe("Lead follow-up flow", () => {
  const flow = block("agent-flow");

  it("walks saved search, first text, agent alert, showing booked, CRM and drip", () => {
    expect(flow.steps.map((step) => step.label)).toEqual([
      "Saved search",
      "First text",
      "Agent alert",
      "Showing booked",
      "CRM and drip",
    ]);
    expect(flow.steps.map((step) => step.icon)).toEqual([
      "target",
      "chat",
      "person",
      "calendar",
      "crm",
    ]);
  });

  it("renders as a CSS-only radio group with a panel and an icon per step", () => {
    const { container } = render(<AgentFlow block={flow} />);
    const group = screen.getByRole("group", { name: flow.heading });
    expect(within(group).getAllByRole("radio")).toHaveLength(5);
    expect(container.querySelectorAll(".agent-node svg")).toHaveLength(5);
    expect(container.querySelector("script")).toBeNull();
  });
});

describe("Template vs large company vs me table", () => {
  const compare = block("compare");

  it("compares the three options in a real table, one sentence per cell", () => {
    render(<CompareSection block={compare} />);
    const table = screen.getByRole("table", { name: compare.heading });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((cell) => cell.textContent),
    ).toEqual([
      "Question",
      "Template site from a vendor",
      "Large real estate web company",
      "Working with me",
    ]);
    for (const row of compare.rows) {
      expect(row.cells).toHaveLength(3);
      for (const cell of row.cells) expect(cell).toMatch(/\.$/);
    }
  });
});
