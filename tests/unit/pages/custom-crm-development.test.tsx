import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { FeaturesSection } from "@/components/sections/blocks/FeaturesSection.tsx";
import { StepperSection } from "@/components/sections/blocks/StepperSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { customCrmDevelopment as content } from "@/content/pages/custom-crm-development.ts";
import { gohighlevelAgency } from "@/content/pages/gohighlevel-agency.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { readability, words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/gohighlevel-agency/custom-crm-development";

const byId = <K extends Block["kind"]>(kind: K, id: string): Extract<Block, { kind: K }> => {
  const found = content.blocks.find((candidate) => candidate.id === id);
  if (found?.kind !== kind) throw new Error(`No ${kind} block "${id}" on the page.`);
  return found as Extract<Block, { kind: K }>;
};

const render$ = (page: typeof content) =>
  snapshot(
    renderToStaticMarkup(
      <main>
        <ContentPage content={page} />
      </main>,
    ),
  );
const html = renderToStaticMarkup(
  <main>
    <ContentPage content={content} />
  </main>,
);
const page = snapshot(html);
/** The page's own copy: everything in <main> except the two lead forms. */
const pageCopy = snapshot(html.replace(/<form[\s\S]*?<\/form>/g, "")).bodyText;
const copy = ` ${page.bodyText.toLowerCase().replace(/\s+/g, " ")} `;

/** Entities from the brief (content/briefs/custom-crm-development.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  CRM: ["crm"],
  GoHighLevel: ["gohighlevel"],
  HubSpot: ["hubspot"],
  Salesforce: ["salesforce"],
  pipeline: ["pipeline"],
  contacts: ["contacts"],
  "custom fields": ["custom fields"],
  workflows: ["workflows"],
  automations: ["automations"],
  "role-based access": ["role-based access"],
  "dashboards and reports": ["dashboards and reports"],
  API: ["apis"],
  webhooks: ["webhooks"],
  "Next.js": ["next.js"],
  React: ["react"],
  Laravel: ["laravel"],
  PHP: ["php"],
  PostgreSQL: ["postgresql"],
  "web app": ["web app"],
  "data migration": ["import"],
  "real estate developer": ["real estate developer", "units"],
  ownership: ["own"],
  "US time zones": ["eastern time", "pacific"],
};

/** The two answers Nayab wrote, word for word (paragraph break only). */
const OWNERSHIP_ANSWER =
  "My clients do. In most projects, the client buys the tools in their own name, such as GoHighLevel, hosting or a database service. I build everything inside those accounts: the CRM, the code and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.";
const TIME_ZONE_ANSWER =
  "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.";

describe("custom CRM development page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page under the GoHighLevel hub", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("custom crm development services");
    expect(content.parent).toEqual({ name: gohighlevelAgency.name, path: gohighlevelAgency.path });
  });

  it("is a short service page: 1,200 to 1,500 words, reading ease 65 or more", () => {
    const count = words(pageCopy).length;
    expect(count).toBeGreaterThanOrEqual(1200);
    expect(count).toBeLessThanOrEqual(1500);
    // Same input as the content audit: the copy blocks, not the form labels.
    expect(readability(page.paragraphs.join(" ")).readingEase).toBeGreaterThanOrEqual(65);
  });

  it("puts the primary keyword in the title, meta, H1, one H2 and the first 100 words", () => {
    const primary = entry?.primary ?? "";
    expect(content.meta.title.toLowerCase()).toContain(primary);
    expect(content.meta.description.toLowerCase()).toContain(primary);
    const h1 = page.headings.find((heading) => heading.level === 1);
    expect(h1?.text.toLowerCase()).toContain(primary);
    expect(
      page.headings.some(
        (heading) => heading.level === 2 && heading.text.toLowerCase().includes(primary),
      ),
    ).toBe(true);
    expect(words(page.bodyText).slice(0, 100).join(" ").toLowerCase()).toContain(primary);
  });

  it("uses every secondary keyword and no keyword outside its own map row", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
    // Other pages own these (keyword-map.md): they may appear in text, never in a heading or the meta.
    const owned = [
      "gohighlevel agency",
      "gohighlevel workflows",
      "gohighlevel api",
      "crm integration",
    ];
    const targets = [
      content.meta.title,
      content.meta.description,
      ...page.headings.filter((heading) => heading.level <= 2).map((heading) => heading.text),
    ]
      .join(" | ")
      .toLowerCase();
    expect(owned.filter((keyword) => targets.includes(keyword))).toEqual([]);
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    expect(missing.length / Object.keys(ENTITIES).length).toBeLessThanOrEqual(0.3);
  });

  it("speaks as I: no we, our or us", () => {
    expect(page.bodyText).not.toMatch(/\b(we|we're|we'll|our|ours)\b/i);
  });

  it("shows at least six FAQs, with Nayab's two answers word for word, all in the FAQPage schema", () => {
    const items = content.faq?.items ?? [];
    expect(items.length).toBeGreaterThanOrEqual(6);
    const answer = (question: string) =>
      items.find((item) => item.question === question)?.answer.replace(/\n\n/g, " ");
    expect(answer("Who owns the accounts and the work?")).toBe(OWNERSHIP_ANSWER);
    expect(answer("Do you work in US time zones?")).toBe(TIME_ZONE_ANSWER);
    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const names = (faqNode?.mainEntity as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(items.map((item) => item.question));
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
      serviceType: "Custom CRM development services",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study and no result numbers", () => {
    expect(JSON.stringify(byId("features", "proof"))).toContain("no approved CRM case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
  });

  it("has a three-step breadcrumb trail through the GoHighLevel hub", () => {
    const trail = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    const names = (trail?.itemListElement as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(["Home", "GoHighLevel agency", "Custom CRM development"]);
    render(<Breadcrumbs current={content.name} parent={content.parent} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "GoHighLevel agency" })).toHaveAttribute(
      "href",
      "/gohighlevel-agency",
    );
  });

  it("links up to the hub and to the hire page, and the hub links back down (hub stays at 8 or fewer)", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of ["/gohighlevel-agency", "/hire-full-stack-developer", "/about"]) {
      expect(hrefs, href).toContain(href);
    }
    const hub = render$(gohighlevelAgency);
    expect(hub.links.find((link) => link.href === PATH)?.text).toBe(
      "Custom CRM development services",
    );
    const hubTargets = new Set(
      hub.links
        .map((link) => link.href)
        .filter((href) => href.startsWith("/") && href !== gohighlevelAgency.path),
    );
    expect(hubTargets.size).toBeLessThanOrEqual(8);
  });
});

describe("custom CRM sections", () => {
  it("compares GoHighLevel, custom-built and off-the-shelf CRMs in a real table", () => {
    const compare = byId("compare", "compare");
    render(<CompareSection block={compare} />);
    const table = screen.getByRole("table", { name: compare.heading });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((cell) => cell.textContent),
    ).toEqual([
      "Question",
      "GoHighLevel CRM",
      "Custom-built CRM",
      "Off-the-shelf (HubSpot and others)",
    ]);
    for (const row of compare.rows) expect(row.cells).toHaveLength(3);
  });

  it("shows the six feature cards in order", () => {
    const features = byId("features", "features");
    render(<FeaturesSection block={features} />);
    expect(features.items?.map((item) => item.title)).toEqual([
      "Pipelines",
      "Contacts and history",
      "Automations",
      "Role-based access",
      "Dashboards and reports",
      "Integrations and APIs",
    ]);
    for (const item of features.items ?? []) {
      expect(screen.getByText(item.title ?? "", { selector: "strong" })).toBeInTheDocument();
    }
  });

  it("names the agreed stack", () => {
    expect(byId("features", "stack").items?.map((item) => item.title)).toEqual([
      "GoHighLevel",
      "Next.js",
      "Laravel",
      "PostgreSQL",
      "APIs",
    ]);
  });

  it("has a single real estate example paragraph and a five-step process", () => {
    expect(byId("prose", "real-estate").paragraphs).toHaveLength(1);
    const process = byId("stepper", "process");
    render(<StepperSection block={process} />);
    expect(process.steps).toHaveLength(5);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });
});
