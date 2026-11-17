import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { aiAutomationAgency } from "@/content/pages/ai-automation-agency.ts";
import { n8nAutomationAgency as content } from "@/content/pages/n8n-automation-agency.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { readability, words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

const PATH = "/ai-automation-agency/n8n-automation-agency";

const block = <K extends Block["kind"]>(kind: K): Extract<Block, { kind: K }> => {
  const found = content.blocks.find((candidate) => candidate.kind === kind);
  if (!found) throw new Error(`No ${kind} block on the page.`);
  return found as Extract<Block, { kind: K }>;
};

const html = renderToStaticMarkup(
  <main>
    <ContentPage content={content} />
  </main>,
);
const page = snapshot(html);
/**
 * Lowercase copy without articles and dots, so "hire an n8n expert" counts for "hire n8n expert"
 * and "Make.com expert" for "make com expert".
 */
const plain = (text: string): string =>
  ` ${text.toLowerCase().replace(/\./g, " ")} `
    .replace(/\s+(?:a|an|the)(?=\s)/g, "")
    .replace(/\s+/g, " ");
const copy = plain(page.bodyText);

/** Entities from the brief (content/briefs/n8n-automation-agency.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  n8n: ["n8n"],
  Make: ["make"],
  Zapier: ["zapier"],
  workflow: ["workflow"],
  "self-hosting": ["self-host"],
  "n8n Cloud": ["n8n cloud"],
  CRM: ["crm"],
  "AI step": ["ai step"],
  API: ["api"],
  "QuickBooks or Xero": ["quickbooks", "xero"],
  "error alerts": ["error"],
  "custom code": ["code"],
};

describe("n8n automation agency page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page under the AI automation hub", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("n8n automation agency");
    expect(entry?.secondary).toHaveLength(12);
    expect(content.parent).toEqual({
      name: aiAutomationAgency.name,
      path: aiAutomationAgency.path,
    });
  });

  it("stays short: at least 1,200 words on the page, at most 1,500 words of written copy", () => {
    // bodyText also counts the two forms and the buttons; paragraphs are the copy itself.
    expect(words(page.bodyText).length).toBeGreaterThanOrEqual(1200);
    expect(words(page.paragraphs.join(" ")).length).toBeLessThanOrEqual(1500);
  });

  it("reads easily: Flesch Reading Ease of at least 65", () => {
    expect(readability(page.paragraphs.join(" ")).readingEase).toBeGreaterThanOrEqual(65);
  });

  it("uses every approved secondary keyword in the copy", () => {
    const missing = (entry?.secondary ?? []).filter(
      (keyword) => !copy.includes(plain(keyword).trim()),
    );
    expect(missing).toEqual([]);
  });

  it("covers every entity of the brief", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    expect(missing).toEqual([]);
  });

  it("speaks as one person: no we, our or us outside quotes", () => {
    expect(page.bodyText).not.toMatch(/\b(we|we're|we'll|we've|our|ours|let's)\b/i);
    expect(page.bodyText).not.toMatch(/\bus\b/);
  });

  it("has the six FAQ topics the brief asks for", () => {
    const questions = (content.faq?.items ?? []).map((item) => item.question.toLowerCase());
    expect(questions).toHaveLength(6);
    for (const topic of ["cost", "how long", "self-host", "who owns", "support", "time zone"]) {
      expect(
        questions.some((question) => question.includes(topic)),
        topic,
      ).toBe(true);
    }
  });

  it("shows no price and puts no Offer in the Service schema until Nayab sets one", () => {
    expect(pagePrices(content)).toEqual([]);
    expect(JSON.stringify(content)).not.toMatch(/\$\s?\d/);
    const graph = pageJsonLd(content)["@graph"];
    const types = graph.map((node) => node["@type"]);
    for (const type of ["ProfessionalService", "WebSite", "BreadcrumbList", "Service", "FAQPage"]) {
      expect(types, type).toContain(type);
    }
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({
      serviceType: "n8n automation agency services",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study: the proof section says none is approved yet", () => {
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("no approved n8n case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
  });

  it("has a three-step breadcrumb trail on the page and in the JSON-LD", () => {
    const trail = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    const names = (trail?.itemListElement as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(["Home", "AI automation agency", "n8n automation agency"]);
    render(<Breadcrumbs current={content.name} parent={content.parent} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "AI automation agency" })).toHaveAttribute(
      "href",
      "/ai-automation-agency",
    );
  });

  it("links to the hub, the AI agent page and GoHighLevel, and the hub links back down", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/ai-automation-agency",
      "/ai-automation-agency/ai-agent-development",
      "/gohighlevel-agency",
      "/pricing",
    ]) {
      expect(hrefs, href).toContain(href);
    }
    const hub = snapshot(
      renderToStaticMarkup(
        <main>
          <ContentPage content={aiAutomationAgency} />
        </main>,
      ),
    );
    const down = hub.links.filter((link) => link.href === PATH).map((link) => link.text);
    expect(down).toContain("n8n automation agency");
  });
});

describe("n8n vs Make vs Zapier table", () => {
  const compare = block("compare");

  it("compares cost, self-hosting, flexibility and ease, one sentence per tool", () => {
    render(<CompareSection block={compare} />);
    const table = screen.getByRole("table", { name: compare.heading });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((cell) => cell.textContent),
    ).toEqual(["Question", "n8n", "Make", "Zapier"]);
    expect(compare.rows.map((row) => row.label)).toEqual([
      "Cost",
      "Self-hosting",
      "Flexibility",
      "Ease of use",
    ]);
    for (const row of compare.rows) expect(row.cells).toHaveLength(3);
  });
});
