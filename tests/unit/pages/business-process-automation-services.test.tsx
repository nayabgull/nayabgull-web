import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { UseCasesSection } from "@/components/sections/blocks/UseCasesSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { aiAutomationAgency } from "@/content/pages/ai-automation-agency.ts";
import { businessProcessAutomationServices as content } from "@/content/pages/business-process-automation-services.ts";
import { PAGES } from "@/content/pages/index.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { readability, words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/ai-automation-agency/business-process-automation-services";

const block = <K extends Block["kind"]>(kind: K): Extract<Block, { kind: K }> => {
  const found = content.blocks.find((candidate) => candidate.kind === kind);
  if (!found) throw new Error(`No ${kind} block on the page.`);
  return found as Extract<Block, { kind: K }>;
};

const renderPage = (page: typeof content) =>
  snapshot(
    renderToStaticMarkup(
      <main>
        <ContentPage content={page} />
      </main>,
    ),
  );

const page = renderPage(content);
const copy = ` ${page.bodyText.toLowerCase().replace(/\s+/g, " ")} `;

/** Entities from the brief (content/briefs/business-process-automation-services.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  "business process automation": ["business process automation"],
  "workflow automation": ["workflow automation"],
  trigger: ["trigger"],
  CRM: ["crm"],
  "APIs and webhooks": ["apis", "webhooks"],
  n8n: ["n8n"],
  Make: ["make"],
  Zapier: ["zapier"],
  GoHighLevel: ["gohighlevel"],
  QuickBooks: ["quickbooks"],
  Stripe: ["stripe"],
  "Google Sheets": ["google sheet"],
  "Google reviews": ["google review"],
  "AI model": ["ai model"],
  "error alerts": ["alert"],
  "human approval": ["approval"],
  "US time zones": ["eastern time", "pacific"],
};

/** Answers Nayab wrote for this page, word for word (a blank line only splits the paragraph). */
const EXACT_FAQ = [
  {
    question: "Who owns the accounts and the work?",
    answer:
      "My clients do. In most projects, the client buys the tools in their own name, such as n8n, a CRM or a phone service. I build everything inside those accounts: the workflows, the code and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
  },
  {
    question: "Do you work in US time zones?",
    answer:
      "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
  },
];

describe("Business process automation services page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page under the AI automation hub with the approved keywords", () => {
    expect(PAGES).toContain(content);
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("business process automation services");
    expect(entry?.secondary).toEqual([
      "business process automation",
      "workflow automation",
      "workflow automation solutions",
      "workflow automation services",
      "workflow automation for small business",
      "business process automation companies",
    ]);
    expect(content.parent).toEqual({
      name: aiAutomationAgency.name,
      path: aiAutomationAgency.path,
    });
  });

  it("puts the primary keyword in the title, the meta description, the H1 and an H2", () => {
    const primary = "business process automation services";
    expect(content.meta.title.toLowerCase()).toContain(primary);
    expect(content.meta.description.toLowerCase()).toContain(primary);
    const h1 = page.headings.find((heading) => heading.level === 1);
    expect(h1?.text.toLowerCase()).toBe(primary);
    const h2s = page.headings.filter((heading) => heading.level === 2);
    expect(h2s.some((heading) => heading.text.toLowerCase().includes(primary))).toBe(true);
  });

  it("is short and easy: 1,200 to 1,500 words of copy and reading ease of at least 65", () => {
    const count = words(page.paragraphs.join(" ")).length;
    expect(count).toBeGreaterThanOrEqual(1200);
    expect(count).toBeLessThanOrEqual(1500);
    expect(readability(page.paragraphs.join(" ")).readingEase).toBeGreaterThanOrEqual(65);
  });

  it("uses every approved secondary keyword and never the AI hub's keyword", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
    expect(copy).not.toContain("ai workflow automation");
    expect(JSON.stringify(content).toLowerCase()).not.toContain("ai workflow automation");
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    const covered = Object.keys(ENTITIES).length - missing.length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it("speaks as I only, never we", () => {
    expect(page.bodyText).not.toMatch(/\b(we|we're|we'll|our|ours|let's)\b/i);
  });

  it("shows Nayab's two FAQ answers word for word, at least six questions, all in the schema", () => {
    const items = content.faq?.items ?? [];
    expect(items.length).toBeGreaterThanOrEqual(6);
    for (const exact of EXACT_FAQ) {
      const item = items.find((candidate) => candidate.question === exact.question);
      expect(item?.answer.replace(/\n\n/g, " ")).toBe(exact.answer);
    }
    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const names = (faqNode?.mainEntity as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(items.map((item) => item.question));
  });

  it("shows no price and puts no Offer in the Service schema until Nayab sets one", () => {
    expect(pagePrices(content)).toEqual([]);
    expect(JSON.stringify(content)).not.toMatch(/\$\s?\d/);
    const graph = pageJsonLd(content)["@graph"];
    expect(graph.map((node) => node["@type"])).toEqual(
      expect.arrayContaining([
        "ProfessionalService",
        "WebSite",
        "BreadcrumbList",
        "Service",
        "FAQPage",
      ]),
    );
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({
      serviceType: "Business process automation services",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no proof and no time savings: no case study, no percentages, no timelines", () => {
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("no approved process automation case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
    expect(JSON.stringify(content)).not.toMatch(/\b\d+\s?(hours?|days?|weeks?)\b/i);
  });

  it("has a three-step breadcrumb trail on the page and in the JSON-LD", () => {
    const trail = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    const names = (trail?.itemListElement as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(["Home", "AI automation agency", "Business process automation"]);
    render(<Breadcrumbs current={content.name} parent={content.parent} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "AI automation agency" })).toHaveAttribute(
      "href",
      "/ai-automation-agency",
    );
  });

  it("links to the AI hub, the AI agent page and the GoHighLevel hub, and the hub links back down", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/ai-automation-agency",
      "/ai-automation-agency/ai-agent-development",
      "/gohighlevel-agency",
    ]) {
      expect(hrefs, href).toContain(href);
    }
    // The n8n / Make / Zapier page is not built yet.
    expect([...hrefs].some((href) => href.includes("n8n"))).toBe(false);
    const hub = renderPage(aiAutomationAgency);
    expect(hub.links.find((link) => link.href === PATH)?.text).toBe(
      "Business process automation services",
    );
    const hubTargets = new Set(
      hub.links.map((link) => link.href).filter((href) => href.startsWith("/")),
    );
    expect(hubTargets.size).toBeLessThanOrEqual(8);
  });
});

describe("UseCasesSection with workflow labels", () => {
  const workflows = block("use-cases");

  it("shows six workflow cards with the page's own row labels and no expander", () => {
    const { container } = render(<UseCasesSection block={workflows} />);
    expect(workflows.items.map((item) => item.title)).toEqual([
      "Lead form to CRM to text",
      "Invoices to accounting",
      "Client onboarding",
      "Review requests",
      "Weekly reports",
      "Email sorting with AI",
    ]);
    expect(screen.getAllByText("The task by hand")).toHaveLength(6);
    expect(screen.getAllByText("What the workflow does")).toHaveLength(6);
    expect(screen.queryByText("What the agent does")).toBeNull();
    expect(container.querySelector("details")).toBeNull();
  });
});

describe("before and after table", () => {
  it("compares the same tasks done by hand and automated", () => {
    const compare = block("compare");
    expect(compare.columns).toEqual(["Done by hand", "Automated"]);
    for (const row of compare.rows) expect(row.cells).toHaveLength(2);
  });
});

describe("process", () => {
  it("has four steps and no timeline until Nayab confirms one", () => {
    const stepper = block("stepper");
    expect(stepper.steps).toHaveLength(4);
    expect(JSON.stringify(stepper.steps)).not.toMatch(/\d/);
  });
});
