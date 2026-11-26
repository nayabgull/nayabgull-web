import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { FeaturesSection } from "@/components/sections/blocks/FeaturesSection.tsx";
import { StepperSection } from "@/components/sections/blocks/StepperSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { aiAgentDevelopment } from "@/content/pages/ai-agent-development.ts";
import { aiAutomationAgency } from "@/content/pages/ai-automation-agency.ts";
import { aiChatbotDevelopment as content } from "@/content/pages/ai-chatbot-development.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { faqPlainText } from "@/lib/content/faq.ts";
import { readability, words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { sitePath } from "@/lib/seo/site.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/ai-automation-agency/ai-chatbot-development";
const AGENT_PATH = aiAgentDevelopment.path;

const block = (id: string): Block => {
  const found = content.blocks.find((candidate) => candidate.id === id);
  if (!found) throw new Error(`No block "${id}" on the page.`);
  return found;
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
const copy = ` ${page.bodyText.toLowerCase().replace(/\s+/g, " ")} `;

/** Entities from the brief (content/briefs/ai-chatbot-development.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  "AI chatbot": ["ai chatbot"],
  "AI agent (only to compare)": ["ai agent"],
  "large language model": ["large language model"],
  "OpenAI GPT": ["openai gpt"],
  "ChatGPT API": ["chatgpt api"],
  Claude: ["claude"],
  "knowledge base": ["knowledge base"],
  "website chat widget": ["website", "chat bubble"],
  "WhatsApp Business API": ["whatsapp business api"],
  Meta: ["meta"],
  "Facebook Messenger": ["facebook", "messenger"],
  "Instagram DMs": ["instagram"],
  "lead capture": ["lead capture"],
  "calendar booking": ["calendar", "book"],
  "CRM (GoHighLevel, HubSpot)": ["crm", "gohighlevel", "hubspot"],
  "human handoff": ["handoff"],
  "after-hours support": ["after-hours support"],
  testing: ["test"],
  "account ownership": ["own"],
  "US time zones": ["us time zones"],
};

/** The two answers Nayab wrote. They must appear word for word. */
const EXACT_FAQ = [
  {
    question: "Who owns the accounts and the work?",
    answer:
      "My clients do. In most projects, the client buys the tools in their own name, such as the chatbot platform, a WhatsApp Business account or a CRM. I build everything inside those accounts: the chatbot, the prompts and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
  },
  {
    question: "Do you work in US time zones?",
    answer:
      "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
  },
];

describe("AI chatbot development page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page under the AI automation hub", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("ai chatbot development services");
    expect(entry?.secondary).toEqual([
      "chatbot development services",
      "chat bot development",
      "whatsapp business api integration",
      "chatgpt api integration",
    ]);
    expect(content.parent).toEqual({
      name: aiAutomationAgency.name,
      path: aiAutomationAgency.path,
    });
  });

  it("puts the primary keyword in the title, meta, H1, an H2 and the first 100 words", () => {
    const primary = "ai chatbot development services";
    expect(content.meta.title.toLowerCase()).toContain(primary);
    expect(content.meta.description.toLowerCase()).toContain(primary);
    const h1 = page.headings.filter((heading) => heading.level === 1);
    expect(h1.map((heading) => heading.text)).toEqual(["AI Chatbot Development Services"]);
    expect(
      page.headings.some(
        (heading) => heading.level === 2 && heading.text.toLowerCase().includes(primary),
      ),
    ).toBe(true);
    const lede = content.hero.lede.toLowerCase();
    expect(lede).toContain(primary);
  });

  it("is a short, easy service page: 1,200 to 1,500 words of copy, reading ease 65 or more", () => {
    const count = words(page.paragraphs.join(" ")).length;
    expect(count).toBeGreaterThanOrEqual(1200);
    expect(count).toBeLessThanOrEqual(1500);
    expect(words(page.bodyText).length).toBeGreaterThanOrEqual(1200);
    expect(readability(page.paragraphs.join(" ")).readingEase).toBeGreaterThanOrEqual(65);
  });

  it("uses every secondary keyword in the copy", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const covered = Object.values(ENTITIES).filter((terms) =>
      terms.every((term) => copy.includes(term)),
    );
    expect(covered.length / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it("targets no keyword of another page in the title, the meta, the H1 or an H2", () => {
    const targets = [
      content.meta.title,
      content.meta.description,
      ...page.headings.filter((heading) => heading.level <= 2).map((heading) => heading.text),
    ]
      .join(" | ")
      .toLowerCase();
    const agent = keywordFor(AGENT_PATH);
    const reserved = [agent?.primary ?? "", ...(agent?.secondary ?? []), "ai chatbot package"];
    expect(reserved.filter((keyword) => keyword && targets.includes(keyword))).toEqual([]);
  });

  it("shows the two answers Nayab wrote word for word, on the page and in the FAQPage schema", () => {
    const items = content.faq?.items ?? [];
    expect(items.length).toBeGreaterThanOrEqual(6);
    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const schema = faqNode?.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    expect(schema.map((item) => item.name)).toEqual(items.map((item) => item.question));
    for (const exact of EXACT_FAQ) {
      const item = items.find((candidate) => candidate.question === exact.question);
      expect(item, exact.question).toBeDefined();
      const text = faqPlainText(item?.answer ?? "").replace(/\s+/g, " ");
      expect(text).toBe(exact.answer);
      expect(schema.find((node) => node.name === exact.question)?.acceptedAnswer.text).toBe(text);
    }
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
      serviceType: "AI chatbot development services",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study and no results", () => {
    expect(JSON.stringify(block("proof"))).toContain("no approved chatbot case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
  });

  it("has a three-step breadcrumb trail on the page and in the JSON-LD", () => {
    const trail = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    const names = (trail?.itemListElement as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(["Home", "AI automation agency", "AI chatbot development"]);
    render(<Breadcrumbs current={content.name} parent={content.parent} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "AI automation agency" })).toHaveAttribute(
      "href",
      "/ai-automation-agency",
    );
  });

  it("links to the hub and the AI agent page, and the hub links back down with at most 8 pages", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of ["/ai-automation-agency", AGENT_PATH, "/gohighlevel-agency", "/about"]) {
      expect(hrefs, href).toContain(href);
    }
    const hub = render$(aiAutomationAgency);
    expect(hub.links.find((link) => link.href === PATH)?.text).toBe(
      "AI chatbot development services",
    );
    const targets = new Set(
      hub.links.filter((link) => link.href.startsWith("/")).map((link) => sitePath(link.href)),
    );
    targets.delete(aiAutomationAgency.path);
    expect(targets.size).toBeLessThanOrEqual(8);
  });
});

describe("chatbot sections", () => {
  it("compares a chatbot and an AI agent in one short table that links to the agent page", () => {
    const compare = block("chatbot-vs-agent");
    if (compare.kind !== "compare") throw new Error("Not a compare block.");
    render(<CompareSection block={compare} />);
    const table = screen.getByRole("table", { name: compare.heading });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((cell) => cell.textContent),
    ).toEqual(["Question", "AI chatbot", "AI agent"]);
    expect(within(table).getAllByRole("rowheader").length).toBeLessThanOrEqual(5);
    expect(
      screen.getByRole("link", { name: "how I build AI agents for business tasks" }),
    ).toHaveAttribute("href", AGENT_PATH);
  });

  it("shows six use-case cards", () => {
    const useCases = block("use-cases");
    if (useCases.kind !== "features") throw new Error("Not a features block.");
    render(<FeaturesSection block={useCases} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    for (const title of [
      "Website FAQ bot",
      "Lead capture and booking",
      "WhatsApp Business replies",
      "Order and status questions",
      "After-hours support",
      "Handoff to a person",
    ]) {
      expect(screen.getByText(title, { selector: "strong" })).toBeInTheDocument();
    }
  });

  it("names the three channels and what the bot learns", () => {
    const channels = block("channels");
    const knowledge = block("knowledge");
    if (channels.kind !== "features" || knowledge.kind !== "features") {
      throw new Error("Not features blocks.");
    }
    expect(channels.items?.map((item) => item.title)).toEqual([
      "Your website",
      "WhatsApp",
      "Facebook and Instagram DMs",
    ]);
    const { container } = render(<FeaturesSection block={knowledge} />);
    expect(container.querySelectorAll("li strong")).toHaveLength(0);
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
  });

  it("numbers four process steps with no timeline yet", () => {
    const process = block("process");
    if (process.kind !== "stepper") throw new Error("Not a stepper block.");
    const { container } = render(<StepperSection block={process} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(container.querySelector("ol")?.getAttribute("style")).toContain("--stepper-count: 4");
    expect(JSON.stringify(process)).not.toMatch(/\b(day|week|month)s?\b/i);
  });
});
