import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CallFlowSection } from "@/components/sections/blocks/CallFlowSection.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { aiAutomationAgency } from "@/content/pages/ai-automation-agency.ts";
import { aiReceptionistForSmallBusiness as content } from "@/content/pages/ai-receptionist-for-small-business.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { faqPlainText } from "@/lib/content/faq.ts";
import { words } from "@/lib/content/readability.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/ai-automation-agency/ai-receptionist-for-small-business";

const block = <K extends Block["kind"]>(kind: K): Extract<Block, { kind: K }> => {
  const found = content.blocks.find((candidate) => candidate.kind === kind);
  if (!found) throw new Error(`No ${kind} block on the page.`);
  return found as Extract<Block, { kind: K }>;
};

const render$ = (value: typeof content) =>
  snapshot(
    renderToStaticMarkup(
      <main>
        <ContentPage content={value} />
      </main>,
    ),
  );
const page = render$(content);
const copy = ` ${page.bodyText.toLowerCase().replace(/\s+/g, " ")} `;

/** Entities from the brief (content/briefs/ai-receptionist-for-small-business.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  "AI receptionist": ["ai receptionist"],
  "AI voice agent": ["ai voice agent"],
  Vapi: ["vapi"],
  "language model (GPT)": ["language model", "gpt"],
  "phone number and call forwarding": ["phone number", "forward"],
  "calendar booking": ["calendar", "book"],
  "CRM (GoHighLevel, HubSpot)": ["crm", "gohighlevel", "hubspot"],
  "emergency flagging": ["emergency", "urgent"],
  "text message call summary": ["summary", "text"],
  "human handoff and call transfer": ["handoff", "transfer"],
  "after-hours and overflow calls": ["after-hours", "overflow"],
  voicemail: ["voicemail"],
  "answering service": ["answering service"],
  "human receptionist": ["human receptionist"],
  "virtual assistant disclosure": ["virtual assistant"],
  "call recording consent": ["record", "consent"],
  "US time zones": ["eastern time", "time zones"],
};

/** Approved word for word by Nayab (task of 2026-11-19). */
const OWNERSHIP_ANSWER =
  "My clients do. In most projects, the client buys the tools in their own name, such as Vapi, a phone number or a CRM. I build everything inside those accounts: the call flows, the prompts and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.";
const TIME_ZONE_ANSWER =
  "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.";

describe("AI receptionist for small business page", () => {
  const entry = keywordFor(PATH);

  it("is registered as a service page under the AI automation hub", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("service");
    expect(entry?.primary).toBe("ai receptionist for small business");
    expect(entry?.secondary).toHaveLength(10);
    expect(content.parent).toEqual({
      name: aiAutomationAgency.name,
      path: aiAutomationAgency.path,
    });
    expect(page.headings.filter((heading) => heading.level === 1).map((h) => h.text)).toEqual([
      "AI Receptionist for Small Business",
    ]);
  });

  it("keeps the page copy between 1,200 and 1,500 words (shared form and closing text excluded)", () => {
    const shared = words(render$({ ...content, blocks: [], faq: undefined }).bodyText).length;
    const own = words(page.bodyText).length - shared + words(content.hero.lede).length;
    expect(own).toBeGreaterThanOrEqual(1200);
    expect(own).toBeLessThanOrEqual(1500);
  });

  it("uses every approved secondary keyword in the copy", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    expect(missing).toEqual([]);
  });

  it("never uses the keywords reserved for blog posts", () => {
    const text = [copy, content.meta.title, content.meta.description].join(" ").toLowerCase();
    for (const reserved of [
      "ai receptionist cost",
      "ai receptionist pricing",
      "best ai receptionist",
      "best ai answering service",
    ]) {
      expect(text, reserved).not.toContain(reserved);
    }
  });

  it("shows the two approved FAQ answers word for word, on the page and in the schema", () => {
    const items = content.faq?.items ?? [];
    expect(items.length).toBeGreaterThanOrEqual(6);
    const answer = (question: string) =>
      faqPlainText(items.find((item) => item.question === question)?.answer ?? "");
    expect(answer("Who owns the accounts and the work?")).toBe(OWNERSHIP_ANSWER);
    expect(answer("Do you work in US time zones?")).toBe(TIME_ZONE_ANSWER);
    const faqNode = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "FAQPage");
    const schemaAnswers = (faqNode?.mainEntity as { acceptedAnswer: { text: string } }[]).map(
      (item) => item.acceptedAnswer.text,
    );
    expect(schemaAnswers).toContain(OWNERSHIP_ANSWER);
    expect(schemaAnswers).toContain(TIME_ZONE_ANSWER);
    for (const question of [
      "Does an AI receptionist sound like a robot?",
      "What if it can't answer a question?",
      "Is it legal to use AI on business calls?",
      "How long does setup take?",
    ]) {
      expect(items.map((item) => item.question)).toContain(question);
    }
  });

  it("says the AI discloses it is a virtual assistant", () => {
    expect(copy).toContain("virtual assistant at the start");
  });

  it("publishes no phone number, no price and no Offer", () => {
    const text = JSON.stringify(content);
    expect(text).not.toMatch(/\(?\b\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/);
    expect(text).not.toMatch(/\$\s?\d/);
    expect(pagePrices(content)).toEqual([]);
    const graph = pageJsonLd(content)["@graph"];
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({
      serviceType: "AI receptionist for small business",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study or statistic", () => {
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("no approved AI receptionist case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent)/i);
  });

  it("has a three-step breadcrumb trail on the page and in the JSON-LD", () => {
    const trail = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    const names = (trail?.itemListElement as { name: string }[]).map((item) => item.name);
    expect(names).toEqual(["Home", "AI automation agency", "AI receptionist"]);
    render(<Breadcrumbs current={content.name} parent={content.parent} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByText("AI receptionist")).toHaveAttribute("aria-current", "page");
  });

  it("links to the hub, the AI agent page, GoHighLevel and roofing, and the hub links back down", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/ai-automation-agency",
      "/ai-automation-agency/ai-agent-development",
      "/gohighlevel-agency",
      "/industries/roofing-hvac-website-design",
    ]) {
      expect(hrefs, href).toContain(href);
    }
    const hub = render$(aiAutomationAgency);
    expect(hub.links.find((link) => link.href === PATH)?.text).toBe(
      "AI receptionist for small business",
    );
  });

  it("is in the header Services menu and the footer", () => {
    const services = PRIMARY_NAV.find((item) => isNavGroup(item) && item.label === "Services");
    const header = services && isNavGroup(services) ? services.links : [];
    expect(header.map((link) => link.href)).toContain(PATH);
    const footer = FOOTER_NAV.find((group) => group.title === "Services")?.links ?? [];
    expect(footer.map((link) => link.href)).toContain(PATH);
  });
});

describe("CallFlowSection", () => {
  const flow = block("call-flow");

  it("walks caller → answer in your name → problem and address → book or flag → text summary", () => {
    expect(flow.steps.map((step) => step.who)).toEqual([
      "Caller",
      "AI receptionist",
      "AI receptionist",
      "AI receptionist",
      "You",
    ]);
    expect(flow.steps[1]?.title).toMatch(/company name/);
    expect(flow.steps[2]?.title).toMatch(/problem and the address/);
    expect(flow.steps[3]?.title).toMatch(/books the visit or flags it as urgent/);
    expect(flow.steps[4]?.title).toMatch(/text/);
  });

  it("renders an ordered list of steps with speech bubbles and the text summary as a list", () => {
    const { container } = render(<CallFlowSection block={flow} />);
    const section = screen.getByRole("region", { name: flow.heading });
    const steps = within(section).getAllByRole("listitem");
    expect(steps).toHaveLength(flow.steps.length);
    expect(container.querySelectorAll(".call-bubble")).toHaveLength(flow.steps.length);
    expect(container.querySelectorAll(".call-bubble-caller")).toHaveLength(1);
    expect(within(section).getAllByRole("heading", { level: 3 })).toHaveLength(5);
    const terms = within(section)
      .getAllByRole("term")
      .map((term) => term.textContent);
    expect(terms).toEqual(flow.summary.lines.map((line) => `${line.name}:`));
    // The step number is decorative: the <ol> already numbers the steps.
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it("does not animate (no animation classes)", () => {
    const { container } = render(<CallFlowSection block={flow} />);
    expect(container.innerHTML).not.toMatch(/animate-|flow-ring|transition/);
  });
});
