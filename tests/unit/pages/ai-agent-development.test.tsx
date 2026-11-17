import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AgentFlow } from "@/components/sections/blocks/AgentFlow.tsx";
import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { ExplainerSection } from "@/components/sections/blocks/ExplainerSection.tsx";
import { FeaturesSection } from "@/components/sections/blocks/FeaturesSection.tsx";
import { StepperSection } from "@/components/sections/blocks/StepperSection.tsx";
import { UseCasesSection } from "@/components/sections/blocks/UseCasesSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import {
  aiAgentDevelopment as content,
  PENDING_FAQ,
} from "@/content/pages/ai-agent-development.ts";
import { aiAutomationAgency } from "@/content/pages/ai-automation-agency.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/ai-automation-agency/ai-agent-development";

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
/** Lowercase copy without articles, so "hire an AI agent developer" counts for "hire ai agent developer". */
const plain = (text: string): string =>
  ` ${text.toLowerCase()} `.replace(/\s+(?:a|an|the)(?=\s)/g, "").replace(/\s+/g, " ");
const copy = plain(page.bodyText);

/** Entities from the brief (content/briefs/ai-agent-development.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  "AI agent": ["ai agent"],
  "large language model (LLM)": ["large language model", "llm"],
  "OpenAI GPT": ["openai gpt"],
  Claude: ["claude"],
  "tool calling": ["tool calling"],
  "knowledge base (RAG)": ["knowledge base", "rag"],
  memory: ["memory"],
  // The approved copy says "CRM and API integrations" and names both CRMs.
  "CRM integration (HubSpot, GoHighLevel)": ["crm and api integrations", "hubspot", "gohighlevel"],
  "n8n / Make / Zapier": ["n8n", "make", "zapier"],
  "webhooks and APIs": ["webhooks and apis"],
  "voice agent (Vapi)": ["voice agent", "vapi"],
  "human handoff": ["human handoff"],
  guardrails: ["guardrails"],
  "multi-agent systems": ["multi-agent systems"],
  LangChain: ["langchain"],
  "testing and monitoring": ["test", "monitor"],
  "data privacy": ["data privacy"],
  "US business hours and time zones": ["us business hours", "time zone"],
};

describe("AI agent development page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page under the AI automation hub", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("ai agent development services");
    expect(entry?.secondary).toHaveLength(12);
    expect(content.parent).toEqual({
      name: aiAutomationAgency.name,
      path: aiAutomationAgency.path,
    });
  });

  it("is a full service page: at least 1,500 words", () => {
    expect(words(page.bodyText).length).toBeGreaterThanOrEqual(1500);
  });

  it("uses every approved secondary keyword in the copy", () => {
    const missing = (entry?.secondary ?? []).filter(
      (keyword) => !copy.includes(plain(keyword).trim()),
    );
    expect(missing).toEqual([]);
  });

  it("covers at least 70% of the topical-map entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    const covered = Object.keys(ENTITIES).length - missing.length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it("never targets the reserved keywords in the title, the meta, the H1 or an H2", () => {
    const reserved = [
      "ai sales agent",
      "ai lead generation agent",
      "ai agent development cost",
      "best ai agents for small business",
      "ai receptionist",
    ];
    const targets = [
      content.meta.title,
      content.meta.description,
      // H3s may name a use case (the approved copy has "AI receptionist and voice agent").
      ...page.headings.filter((heading) => heading.level <= 2).map((heading) => heading.text),
    ]
      .join(" | ")
      .toLowerCase();
    expect(reserved.filter((keyword) => targets.includes(keyword))).toEqual([]);
  });

  it("shows the approved FAQ and keeps the two unconfirmed answers off the page and out of the schema", () => {
    expect(content.faq?.items).toHaveLength(8);
    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const names = (faqNode?.mainEntity as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(content.faq?.items.map((item) => item.question));
    for (const pending of PENDING_FAQ) {
      expect(names).not.toContain(pending.question);
      expect(page.bodyText).not.toContain(pending.question);
      expect(page.bodyText).not.toContain(pending.draft);
    }
  });

  it("shows no price and puts no Offer in the Service schema until Nayab sets one", () => {
    expect(pagePrices(content)).toEqual([]);
    expect(JSON.stringify(content)).not.toMatch(/\$\s?\d/);
    const graph = pageJsonLd(content)["@graph"];
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({
      serviceType: "AI agent development services",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study: the proof section says none is approved yet", () => {
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("no approved AI agent case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
  });

  it("has a three-step breadcrumb trail on the page and in the JSON-LD", () => {
    const trail = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    const names = (trail?.itemListElement as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(["Home", "AI automation agency", "AI agent development"]);
    render(<Breadcrumbs current={content.name} parent={content.parent} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "AI automation agency" })).toHaveAttribute(
      "href",
      "/ai-automation-agency",
    );
    expect(within(nav).getByText("AI agent development")).toHaveAttribute("aria-current", "page");
  });

  it("links to the hub, GoHighLevel, roofing, contact and about pages, and the hub links back down", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/ai-automation-agency",
      "/gohighlevel-agency",
      "/industries/roofing-hvac-website-design",
      "/contact",
      "/about",
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
    expect(hub.links.find((link) => link.href === PATH)?.text).toBe(
      "AI agent development services",
    );
  });
});

describe("AgentFlow", () => {
  const flow = block("agent-flow");

  it("walks trigger, understands, uses your tools, acts and human handoff", () => {
    expect(flow.steps.map((step) => step.label)).toEqual([
      "Trigger",
      "Understands",
      "Uses your tools",
      "Acts",
      "Human handoff",
    ]);
  });

  it("is one radio group with the first step open, a panel per step and no script", () => {
    const { container } = render(<AgentFlow block={flow} />);
    const group = screen.getByRole("group", { name: flow.heading });
    const radios = within(group).getAllByRole("radio");
    expect(radios).toHaveLength(5);
    expect(new Set(radios.map((radio) => radio.getAttribute("name")))).toEqual(
      new Set([`${flow.id}-step`]),
    );
    expect(radios.map((radio) => (radio as HTMLInputElement).checked)).toEqual([
      true,
      false,
      false,
      false,
      false,
    ]);
    for (const step of flow.steps) {
      expect(
        within(group).getByRole("radio", { name: new RegExp(step.label) }),
      ).toBeInTheDocument();
      expect(
        within(group).getByRole("heading", { level: 3, name: step.title }),
      ).toBeInTheDocument();
      expect(within(group).getByText(step.example)).toBeInTheDocument();
    }
    expect(container.querySelectorAll(".agent-line")).toHaveLength(4);
    expect(container.querySelector("script")).toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: flow.heading })).toBeInTheDocument();
  });
});

describe("CompareSection", () => {
  const compare = block("compare");

  it("is a real table: column headers, a header cell per row and a labelled cell per column", () => {
    render(<CompareSection block={compare} />);
    const table = screen.getByRole("table", { name: compare.heading });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((cell) => cell.textContent),
    ).toEqual(["Question", "AI agent", "Chatbot", "Automation"]);
    expect(within(table).getAllByRole("rowheader")).toHaveLength(compare.rows.length);
    const cells = within(table).getAllByRole("cell");
    expect(cells).toHaveLength(compare.rows.length * 3);
    expect(cells.slice(0, 3).map((cell) => cell.getAttribute("data-label"))).toEqual(
      compare.columns,
    );
    for (const row of compare.rows) expect(row.cells).toHaveLength(compare.columns.length);
    expect(screen.getByRole("link", { name: "AI automation agency page" })).toHaveAttribute(
      "href",
      "/ai-automation-agency",
    );
  });

  it("renders without a note or an intro", () => {
    const { container } = render(
      <CompareSection block={{ ...compare, id: "bare", note: undefined, intro: undefined }} />,
    );
    expect(container.querySelector("#bare table")).not.toBeNull();
    expect(container.querySelector("#bare a")).toBeNull();
  });
});

describe("ExplainerSection", () => {
  const explainer = block("explainer");

  it("shows the definition beside a one-image picture of request, model, tools and action", () => {
    const { container } = render(<ExplainerSection block={explainer} />);
    const figure = screen.getByRole("img", { name: explainer.diagramLabel });
    expect(within(figure).queryAllByRole("listitem")).toHaveLength(0);
    expect(container.querySelectorAll(".agent-map-node")).toHaveLength(4);
    expect(explainer.diagram.map((node) => node.label)).toEqual([
      "Request",
      "AI model",
      "Tools",
      "Action",
    ]);
    expect(screen.getByText(explainer.callout)).toBeInTheDocument();
    for (const note of explainer.notes) expect(screen.getByText(note.text)).toBeInTheDocument();
  });
});

describe("FeaturesSection", () => {
  const features = content.blocks.filter((candidate) => candidate.kind === "features");

  it("renders icon cards with bold lead-ins, a list heading, the example and the closing line", () => {
    const custom = features.find((candidate) => candidate.id === "custom-agents");
    if (!custom) throw new Error("No custom-agents block.");
    render(<FeaturesSection block={custom} />);
    expect(
      screen.getByRole("heading", { level: 3, name: custom.listIntro ?? "" }),
    ).toBeInTheDocument();
    for (const item of custom.items ?? []) {
      expect(screen.getByText(item.title ?? "", { selector: "strong" })).toBeInTheDocument();
    }
    expect(screen.getByText("Example")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
  });

  it("renders the hire section as a check list and the integrations with text names only", () => {
    const hire = features.find((candidate) => candidate.id === "hire");
    const integrations = features.find((candidate) => candidate.id === "integrations");
    if (!hire || !integrations) throw new Error("Missing features blocks.");
    const first = render(<FeaturesSection block={hire} />);
    expect(first.container.querySelectorAll("li strong")).toHaveLength(0);
    expect(screen.getAllByRole("listitem")).toHaveLength(7);
    first.unmount();
    const second = render(<FeaturesSection block={integrations} />);
    expect(second.container.querySelector("img")).toBeNull();
    for (const name of ["CRM systems", "Websites", "WhatsApp", "Voice", "Email", "Calendars"]) {
      expect(screen.getByText(name, { selector: "strong" })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "GoHighLevel" })).toHaveAttribute(
      "href",
      "/gohighlevel-agency",
    );
  });

  it("renders a block with only paragraphs and an outro", () => {
    const { container } = render(
      <FeaturesSection
        block={{
          kind: "features",
          id: "bare-features",
          eyebrow: "E",
          heading: "H",
          layout: "cards",
          paragraphs: ["One short line."],
          outro: "The end.",
        }}
      />,
    );
    expect(container.querySelectorAll("p")).toHaveLength(2);
    expect(container.querySelector("ul")).toBeNull();
  });
});

describe("UseCasesSection", () => {
  const useCases = block("use-cases");

  it("shows five cards: problem, what the agent does, result, the example business and the full example", () => {
    render(<UseCasesSection block={useCases} />);
    expect(useCases.items).toHaveLength(5);
    expect(screen.getAllByText("The problem")).toHaveLength(5);
    expect(screen.getAllByText("What the agent does")).toHaveLength(5);
    expect(screen.getAllByText("Result")).toHaveLength(5);
    for (const item of useCases.items) {
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
      expect(screen.getByText(`Example: ${item.business}`)).toBeInTheDocument();
    }
    expect(screen.getAllByText("See the full example")).toHaveLength(5);
  });
});

describe("StepperSection", () => {
  it("numbers the five process steps without timelines", () => {
    const stepper = block("stepper");
    const { container } = render(<StepperSection block={stepper} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(container.querySelector("ol")?.getAttribute("style")).toContain("--stepper-count: 5");
    expect(stepper.steps.map((step) => step.title)).toEqual([
      "Discovery and Planning",
      "AI Agent Design",
      "Development and Integration",
      "Testing and Review",
      "Deployment and Support",
    ]);
  });
});
