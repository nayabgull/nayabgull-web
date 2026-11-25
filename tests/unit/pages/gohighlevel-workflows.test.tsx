import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { ExplainerSection } from "@/components/sections/blocks/ExplainerSection.tsx";
import { FeaturesSection } from "@/components/sections/blocks/FeaturesSection.tsx";
import { StepperSection } from "@/components/sections/blocks/StepperSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { gohighlevelAgency } from "@/content/pages/gohighlevel-agency.ts";
import { gohighlevelWorkflows as content } from "@/content/pages/gohighlevel-workflows.ts";
import type { Block } from "@/content/pages/types.ts";
import { headlineText, pagePrices } from "@/content/pages/types.ts";
import { faqPlainText } from "@/lib/content/faq.ts";
import { readability, words } from "@/lib/content/readability.ts";
import { checkInternalLinks } from "@/lib/seo/audit-rules.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/gohighlevel-agency/workflows-automation";
const AI_AGENT_PATH = "/ai-automation-agency/ai-agent-development";

const block = <K extends Block["kind"]>(kind: K, id?: string): Extract<Block, { kind: K }> => {
  const found = content.blocks.find(
    (candidate) => candidate.kind === kind && (id === undefined || candidate.id === id),
  );
  if (!found) throw new Error(`No ${kind} block${id ? ` "${id}"` : ""} on the page.`);
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
const page = render$(content);
const copy = page.bodyText.toLowerCase();

/** Entities from the brief (content/briefs/gohighlevel-workflows.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  GoHighLevel: ["gohighlevel"],
  workflow: ["workflow"],
  trigger: ["trigger"],
  action: ["action"],
  "wait step": ["wait step"],
  "if/else condition": ["if/else"],
  "goal step": ["goal step"],
  "pipeline and stages": ["pipeline", "stage"],
  "tags and custom fields": ["tags", "custom fields"],
  SMS: ["text"],
  email: ["email"],
  "calendar booking": ["calendar", "book"],
  "appointment reminders": ["appointment reminders"],
  "missed-call text back": ["missed-call text back"],
  "speed to lead": ["speed-to-lead"],
  "Google reviews": ["google review"],
  "reactivation of old leads": ["reactivation"],
  "A2P 10DLC": ["a2p 10dlc"],
  "opt-in and opt-out": ["opt-in", "opt out"],
  "quiet hours and time zone": ["quiet hours", "time zone"],
  webhooks: ["webhooks"],
  "AI agent": ["ai agent"],
};

/** Nayab's exact answers (approved in chat on November 19, 2026). */
const OWNERSHIP_ANSWER =
  "My clients do. In most projects, the client buys the tools in their own name, such as GoHighLevel, a phone number or a CRM. I build everything inside those accounts: the workflows, the code and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.";
const TIME_ZONE_ANSWER =
  "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.";

describe("GoHighLevel workflows page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page under the GoHighLevel hub with its keyword-map row", () => {
    expect(content.path).toBe(PATH);
    expect(entry).toMatchObject({
      pageType: "service",
      primary: "gohighlevel workflows",
      secondary: ["crm automation", "automated crm system"],
    });
    expect(content.parent).toEqual({ name: gohighlevelAgency.name, path: gohighlevelAgency.path });
  });

  it("puts the primary keyword in the title, the meta description and the H1", () => {
    for (const text of [content.meta.title, content.meta.description, headlineText(content)]) {
      expect(text.toLowerCase()).toContain("gohighlevel workflows");
    }
    expect(page.headings.filter((heading) => heading.level === 1)).toHaveLength(1);
  });

  it("is short and easy to read: 1,200–1,500 words of copy, reading ease 65 or more", () => {
    const stats = readability(page.paragraphs.join(" "));
    expect(stats.words).toBeGreaterThanOrEqual(1200);
    expect(stats.words).toBeLessThanOrEqual(1500);
    expect(stats.readingEase).toBeGreaterThanOrEqual(65);
    expect(words(page.bodyText).length).toBeGreaterThanOrEqual(1200);
  });

  it("uses both secondary keywords, one of them in an H2", () => {
    for (const keyword of entry?.secondary ?? []) expect(copy).toContain(keyword);
    const h2s = page.headings.filter((heading) => heading.level === 2).map((h) => h.text);
    expect(h2s.some((text) => /crm automation|automated crm system/i.test(text))).toBe(true);
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    const covered = Object.keys(ENTITIES).length - missing.length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it("targets no keyword from another row in the title, the meta, the H1 or an H2", () => {
    const others = [
      "gohighlevel agency",
      "gohighlevel expert",
      "crm automation services",
      "crm and marketing automation",
      "gohighlevel api",
      "crm integration",
      "webhook automation",
      "gohighlevel setup service",
      "custom crm",
    ];
    const targets = [
      content.meta.title,
      content.meta.description,
      ...page.headings.filter((heading) => heading.level <= 2).map((heading) => heading.text),
    ]
      .join(" | ")
      .toLowerCase();
    expect(others.filter((keyword) => targets.includes(keyword))).toEqual([]);
  });

  it("asks for a demo with GoHighLevel preselected, with Book a free call beside it", () => {
    expect(content.request).toEqual({ type: "demo", service: "gohighlevel" });
    expect(content.hero.primaryCta).toEqual({ label: "Get a free demo", href: "#hero-quote" });
    expect(content.hero.secondaryCta?.label).toBe("Book a free call");
    expect(content.closing?.band).toBe(true);
  });

  it("shows the FAQ with Nayab's exact ownership and time-zone answers, in the schema too", () => {
    const items = content.faq?.items ?? [];
    expect(items.length).toBeGreaterThanOrEqual(6);
    const answer = (question: string) =>
      faqPlainText(items.find((item) => item.question === question)?.answer ?? "");
    expect(answer("Who owns the accounts and the work?")).toBe(OWNERSHIP_ANSWER);
    expect(answer("Do you work in US time zones?")).toBe(TIME_ZONE_ANSWER);

    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const entities = faqNode?.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    expect(entities.map((item) => item.name)).toEqual(items.map((item) => item.question));
    expect(entities.map((item) => item.acceptedAnswer.text)).toContain(OWNERSHIP_ANSWER);
    expect(page.bodyText).toContain(TIME_ZONE_ANSWER);
  });

  it("shows no price and puts no Offer in the Service schema until Nayab sets one", () => {
    expect(pagePrices(content)).toEqual([]);
    expect(JSON.stringify(content)).not.toMatch(/\$\s?\d/);
    const graph = pageJsonLd(content)["@graph"];
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({
      serviceType: "GoHighLevel workflows",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study and no result numbers", () => {
    expect(JSON.stringify(block("features", "proof"))).toContain(
      "no approved GoHighLevel workflow case study",
    );
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
  });

  it("has Organization, WebSite, a three-step trail with the hub, Service and FAQPage", () => {
    const graph = pageJsonLd(content)["@graph"];
    expect(graph.map((node) => node["@type"])).toEqual([
      "ProfessionalService",
      "WebSite",
      "BreadcrumbList",
      "Service",
      "FAQPage",
    ]);
    const trail = graph.find((node) => node["@type"] === "BreadcrumbList");
    const names = (trail?.itemListElement as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(["Home", "GoHighLevel agency", "GoHighLevel workflows"]);
    render(<Breadcrumbs current={content.name} parent={content.parent} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "GoHighLevel agency" })).toHaveAttribute(
      "href",
      "/gohighlevel-agency",
    );
  });

  it("links up to the hub and to the AI agent page, and the hub links back down", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of ["/gohighlevel-agency", AI_AGENT_PATH, "/about"]) {
      expect(hrefs, href).toContain(href);
    }
    expect(checkInternalLinks(page, PATH)).toEqual([]);

    const hub = render$(gohighlevelAgency);
    expect(hub.links.find((link) => link.href === PATH)?.text).toBe(
      "GoHighLevel workflows I build",
    );
    // seo.md §4: 3–8 internal targets. The hub must stay at 8 or fewer.
    expect(checkInternalLinks(hub, gohighlevelAgency.path)).toEqual([]);
  });

  it("is in the header GoHighLevel menu and in the footer", () => {
    const services = PRIMARY_NAV.find((item) => isNavGroup(item) && item.label === "GoHighLevel");
    expect(services && isNavGroup(services) ? services.links : []).toContainEqual({
      label: "GoHighLevel workflows",
      href: PATH,
    });
    expect(FOOTER_NAV.flatMap((group) => group.links)).toContainEqual({
      label: "GoHighLevel workflows",
      href: PATH,
    });
  });
});

describe("GoHighLevel workflows sections", () => {
  it("explains a workflow as trigger → actions → result, as one labelled picture", () => {
    const explainer = block("explainer");
    const { container } = render(<ExplainerSection block={explainer} />);
    const figure = screen.getByRole("img", { name: explainer.diagramLabel });
    expect(within(figure).queryAllByRole("listitem")).toHaveLength(0);
    expect(container.querySelectorAll(".agent-map-node")).toHaveLength(3);
    expect(explainer.diagram.map((node) => node.label)).toEqual(["Trigger", "Actions", "Result"]);
  });

  it("shows the six workflows as icon cards with bold titles", () => {
    const workflows = block("features", "workflows");
    render(<FeaturesSection block={workflows} />);
    const titles = [
      "Speed-to-lead text in 60 seconds",
      "Missed-call text back",
      "Appointment reminders",
      "Review requests",
      "Pipeline stage updates",
      "Reactivation of old leads",
    ];
    expect(workflows.items?.map((item) => item.title)).toEqual(titles);
    for (const title of titles) {
      expect(screen.getByText(title, { selector: "strong" })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "AI agent that works with your CRM" })).toHaveAttribute(
      "href",
      AI_AGENT_PATH,
    );
  });

  it("explains A2P 10DLC in one paragraph that defines the term", () => {
    const a2p = block("prose", "a2p-10dlc");
    expect(a2p.paragraphs).toHaveLength(1);
    expect(a2p.paragraphs[0]).toMatch(/^A2P 10DLC is /);
  });

  it("lists the account mistakes as a table: what goes wrong and how I fix it", () => {
    const mistakes = block("compare", "mistakes");
    render(<CompareSection block={mistakes} />);
    const table = screen.getByRole("table", { name: mistakes.heading });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((cell) => cell.textContent),
    ).toEqual(["Mistake", "What goes wrong", "How I fix it"]);
    expect(within(table).getAllByRole("rowheader")).toHaveLength(mistakes.rows.length);
    for (const row of mistakes.rows) expect(row.cells).toHaveLength(2);
  });

  it("numbers the four process steps, with no timelines yet", () => {
    const stepper = block("stepper");
    render(<StepperSection block={stepper} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(stepper.steps.map((step) => step.title)).toEqual([
      "Free call and audit",
      "Written plan",
      "Build and test",
      "Launch and handover",
    ]);
    expect(JSON.stringify(stepper)).not.toMatch(/\b(day|days|week|weeks)\b/i);
  });
});
