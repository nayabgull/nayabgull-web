import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { AgentFlow } from "@/components/sections/blocks/AgentFlow.tsx";
import { CompareSection } from "@/components/sections/blocks/CompareSection.tsx";
import { StackSection } from "@/components/sections/blocks/StackSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { Process } from "@/components/sections/Process.tsx";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { aiAgentDevelopment as content } from "@/content/pages/ai-agent-development.ts";
import { aiAutomationAgency } from "@/content/pages/ai-automation-agency.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

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
  "CRM integration (HubSpot, GoHighLevel)": ["crm integration", "hubspot", "gohighlevel"],
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

  it("covers every entity of the topical map", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    expect(missing).toEqual([]);
  });

  it("never targets the keywords reserved for future pages in a heading, the title or the meta", () => {
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
      ...page.headings.map((heading) => heading.text),
    ]
      .join(" | ")
      .toLowerCase();
    expect(reserved.filter((keyword) => targets.includes(keyword))).toEqual([]);
  });

  it("answers the brief's questions in question-style headings or the FAQ", () => {
    const questions = [
      ...page.headings.filter((heading) => heading.text.endsWith("?")).map((h) => h.text),
      ...(content.faq?.items.map((item) => item.question) ?? []),
    ]
      .join(" | ")
      .toLowerCase();
    for (const topic of [
      "what is an ai agent",
      "chatbot",
      "cost of an ai agent",
      "how long",
      "connect to my crm",
      "not sure",
      "data safe",
      "who owns",
      "technical team",
    ]) {
      expect(questions, topic).toContain(topic);
    }
    expect(content.faq?.items.length).toBeGreaterThanOrEqual(8);
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

  it("links to the six pages the brief names, and the hub links back down", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/ai-automation-agency",
      "/gohighlevel-agency",
      "/industries/roofing-hvac-website-design",
      "/pricing",
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

describe("StackSection", () => {
  const stack = block("stack");

  it("shows each tool group as a card with text badges and no images", () => {
    const { container } = render(<StackSection block={stack} />);
    for (const group of stack.groups) {
      expect(screen.getByRole("heading", { level: 3, name: group.title })).toBeInTheDocument();
      for (const tag of group.tags) expect(screen.getByText(tag)).toBeInTheDocument();
    }
    expect(container.querySelector("img, svg")).toBeNull();
    expect(screen.getByRole("link", { name: "how I set up GoHighLevel" })).toHaveAttribute(
      "href",
      "/gohighlevel-agency",
    );
  });

  it("renders without an intro", () => {
    render(<StackSection block={{ ...stack, id: "bare-stack", intro: undefined }} />);
    expect(screen.getAllByRole("list").length).toBeGreaterThan(0);
  });
});

describe("Process", () => {
  it("gives five steps their own five-column layout and keeps four steps on four columns", () => {
    const steps = block("steps");
    expect(steps.steps).toHaveLength(5);
    const five = render(<Process process={steps} />);
    expect(five.container.querySelector("ol")?.className).toContain("xl:grid-cols-5");
    five.unmount();
    const four = render(<Process process={{ ...steps, steps: steps.steps.slice(0, 4) }} />);
    expect(four.container.querySelector("ol")?.className).toContain("lg:grid-cols-4");
  });
});
