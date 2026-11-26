import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TwoWaySection } from "@/components/sections/blocks/TwoWaySection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { gohighlevelAgency } from "@/content/pages/gohighlevel-agency.ts";
import { gohighlevelApiIntegrations as content } from "@/content/pages/gohighlevel-api-integrations.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { faqPlainText } from "@/lib/content/faq.ts";
import { readability, words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { ALL_ROUTES } from "@/lib/seo/routes.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/gohighlevel-agency/api-integrations";

const block = <K extends Block["kind"]>(kind: K, id?: string): Extract<Block, { kind: K }> => {
  const found = content.blocks.find(
    (candidate) => candidate.kind === kind && (id === undefined || candidate.id === id),
  );
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

/** Entities from the brief (content/briefs/gohighlevel-api-integrations.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  GoHighLevel: ["gohighlevel"],
  CRM: ["crm"],
  API: ["api"],
  webhook: ["webhook"],
  "API v2": ["api v2"],
  OAuth: ["oauth"],
  "rate limits": ["rate limits"],
  "error alerts": ["error alerts"],
  "data mapping": ["data mapping"],
  "custom fields": ["custom fields"],
  workflow: ["workflow"],
  pipeline: ["pipeline"],
  "website forms": ["website forms"],
  Stripe: ["stripe"],
  "Google Sheets": ["google sheets"],
  QuickBooks: ["quickbooks"],
  Vapi: ["vapi"],
  Zapier: ["zapier"],
  Make: ["make"],
  "native integration": ["native integration"],
  dashboards: ["dashboard"],
  "US time zones": ["us time zones"],
};

/** The two answers Nayab wrote word for word. */
const EXACT_FAQ: Record<string, string> = {
  "Who owns the accounts and the work?":
    "My clients do. In most projects, the client buys the tools in their own name, such as GoHighLevel, hosting or the apps being connected. I build everything inside those accounts: the integrations, the code and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
  "Do you work in US time zones?":
    "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
};

describe("GoHighLevel API integrations page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page under the GoHighLevel hub, with the map's keywords only", () => {
    expect(content.path).toBe(PATH);
    expect(entry).toMatchObject({
      pageType: "service",
      primary: "gohighlevel api",
      secondary: ["crm integration", "webhook automation"],
    });
    expect(content.parent).toEqual({ name: gohighlevelAgency.name, path: gohighlevelAgency.path });
  });

  it("puts the primary keyword in the H1 and in an H2, and each secondary keyword in the copy", () => {
    const h1 = page.headings.find((heading) => heading.level === 1)?.text.toLowerCase();
    expect(h1).toContain("gohighlevel api");
    const h2s = page.headings.filter((heading) => heading.level === 2).map((h) => h.text);
    expect(h2s.some((text) => text.toLowerCase().includes("gohighlevel api"))).toBe(true);
    for (const keyword of entry?.secondary ?? []) expect(copy).toContain(keyword);
  });

  it("is a short service page: 1,200 to 1,500 words of copy, reading ease 65 or more", () => {
    const count = words(page.paragraphs.join(" ")).length;
    expect(count).toBeGreaterThanOrEqual(1200);
    expect(count).toBeLessThanOrEqual(1500);
    expect(readability(page.paragraphs.join(" ")).readingEase).toBeGreaterThanOrEqual(65);
  });

  it("covers at least 70% of the brief's entities", () => {
    const covered = Object.values(ENTITIES).filter((terms) =>
      terms.every((term) => copy.includes(term)),
    ).length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it('speaks as "I" only, never "we"', () => {
    expect(page.bodyText).not.toMatch(/\b(we|we're|we'll|our|ours)\b/i);
  });

  it("explains the API and the webhook in one plain sentence each", () => {
    const basics = block("two-way");
    const plain = basics.paragraphs.filter((p): p is string => typeof p === "string");
    expect(plain.filter((p) => p.startsWith("An API is "))).toHaveLength(1);
    expect(plain.filter((p) => p.startsWith("A webhook is "))).toHaveLength(1);
  });

  it("shows six integration cards, in the agreed order", () => {
    expect(block("features", "integrations").items?.map((item) => item.title)).toEqual([
      "Website and custom forms",
      "Stripe and payments",
      "Google Sheets and reports",
      "Vapi AI calls",
      "QuickBooks or accounting",
      "Custom apps and dashboards",
    ]);
  });

  it("compares native, Zapier or Make and a custom build in one table", () => {
    expect(block("compare").columns).toEqual([
      "Native integration",
      "Zapier or Make",
      "Custom API build",
    ]);
  });

  it("lists the four checks and a four-step process", () => {
    expect(block("features", "checks").items?.map((item) => item.title)).toEqual([
      "API v2 and OAuth",
      "Rate limits",
      "Error alerts",
      "Data mapping",
    ]);
    expect(block("stepper").steps).toHaveLength(4);
  });

  it("shows no price, no timeline and no Offer until Nayab approves them", () => {
    expect(pagePrices(content)).toEqual([]);
    expect(page.bodyText).not.toMatch(/\$\d/);
    expect(JSON.stringify(block("stepper").steps)).not.toMatch(/\b(day|days|week|weeks)\b/i);
    const service = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "Service");
    expect(service).toBeDefined();
    expect(service).not.toHaveProperty("offers");
  });

  it("has 6+ FAQs with Nayab's two answers word for word, also in the FAQPage JSON-LD", () => {
    const items = content.faq?.items ?? [];
    expect(items.length).toBeGreaterThanOrEqual(6);
    const faqPage = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const json = JSON.stringify(faqPage);
    for (const [question, answer] of Object.entries(EXACT_FAQ)) {
      const item = items.find((candidate) => candidate.question === question);
      expect(item && faqPlainText(item.answer)).toBe(answer);
      expect(json).toContain(JSON.stringify(answer).slice(1, -1));
    }
  });

  it("builds Organization, WebSite, a 3-step BreadcrumbList through the hub, Service and FAQPage", () => {
    const graph = pageJsonLd(content)["@graph"];
    const types = graph.map((node) => node["@type"]);
    for (const type of ["ProfessionalService", "WebSite", "BreadcrumbList", "Service", "FAQPage"]) {
      expect(types).toContain(type);
    }
    const trail = graph.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string }[];
    };
    expect(trail.itemListElement.map((item) => item.name)).toEqual([
      "Home",
      "GoHighLevel agency",
      "GoHighLevel API integrations",
    ]);
  });

  it("links up to the hub and only to pages that exist", () => {
    const internal = page.links.map((link) => link.href).filter((href) => href.startsWith("/"));
    expect(internal).toContain("/gohighlevel-agency");
    expect(internal.filter((href) => !ALL_ROUTES.includes(href))).toEqual([]);
  });

  it("is linked from the hub, the header menu and the footer; the hub stays at 8 links or fewer", () => {
    const hub = renderPage(gohighlevelAgency);
    expect(hub.links.map((link) => link.href)).toContain(PATH);
    const hubTargets = new Set(
      hub.links
        .map((link) => link.href)
        .filter((href) => href.startsWith("/") && href !== gohighlevelAgency.path),
    );
    expect(hubTargets.size).toBeLessThanOrEqual(8);
    const header = PRIMARY_NAV.flatMap((item) => (isNavGroup(item) ? item.links : [item]));
    expect(header.map((link) => link.href)).toContain(PATH);
    expect(FOOTER_NAV.flatMap((group) => group.links.map((link) => link.href))).toContain(PATH);
  });
});

describe("TwoWaySection", () => {
  it("is one labelled image to screen readers, with both lanes in the picture", () => {
    const basics = block("two-way");
    render(<TwoWaySection block={basics} />);
    const figure = screen.getByRole("img", { name: basics.diagramLabel });
    expect(figure.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(figure).toHaveTextContent(basics.request.tag);
    expect(figure).toHaveTextContent(basics.event.tag);
    expect(figure.querySelector(".twoway-lane-back")).toHaveTextContent(basics.event.text);
    const section = screen.getByRole("region", { name: basics.heading });
    expect(within(section).getAllByRole("listitem")).toHaveLength(basics.notes.length);
    expect(section).toHaveTextContent(basics.callout);
  });
});
