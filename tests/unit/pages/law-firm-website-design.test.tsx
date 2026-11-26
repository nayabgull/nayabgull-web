import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AgentFlow } from "@/components/sections/blocks/AgentFlow.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { lawFirmWebsiteDesign as content } from "@/content/pages/law-firm-website-design.ts";
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

const PATH = "/industries/law-firm-website-design";

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
const copy = page.bodyText.toLowerCase();

/** Entities from the brief (content/briefs/law-firm-website-design.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  "law firm": ["law firm"],
  attorney: ["attorney"],
  "practice area pages": ["practice area pages"],
  "attorney bios": ["attorney bio"],
  "bar admissions": ["bar admissions"],
  "mobile speed": ["phone", "weak signal"],
  "consultation booking": ["consultation booking"],
  calendar: ["calendar"],
  "legal intake": ["intake"],
  "intake questions": ["intake questions"],
  "conflict check": ["conflict check"],
  CRM: ["crm"],
  "follow-up texts": ["follow-up texts"],
  "AI receptionist": ["ai receptionist"],
  "voice agent": ["voice agent"],
  "legal advice (never given)": ["legal advice"],
  "WCAG 2.2 AA": ["wcag 2.2 aa"],
  "state bar advertising rules": ["state bar's advertising rules"],
  "Google reviews": ["google reviews"],
  redirects: ["redirect"],
  confidentiality: ["confidential"],
  "US time zones": ["us time zones"],
};

describe("Law firm website design page", () => {
  const entry = keywordFor(PATH);

  it("is registered as an industry page with the keywords from the keyword map", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("industry");
    expect(entry?.primary).toBe("law firm website design");
    expect(entry?.secondary).toHaveLength(7);
    // The breadcrumb goes Home › Industries › this page.
    expect(content.parent).toEqual({ name: "Industries", path: "/industries" });
  });

  it("is a full industry page of 1,500 to 1,800 words", () => {
    const count = words(page.bodyText).length;
    expect(count).toBeGreaterThanOrEqual(1500);
    expect(count).toBeLessThanOrEqual(1800);
  });

  it("puts the primary keyword in the title, the meta description and the H1", () => {
    expect(content.meta.title.toLowerCase()).toMatch(/^law firm website design/);
    expect(content.meta.description.toLowerCase()).toContain("law firm website design");
    expect(content.hero.headline.highlight).toBe("Law firm website design");
  });

  it("uses every secondary keyword in the copy, and secondary keywords in H2s", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
    const h2s = page.headings
      .filter((heading) => heading.level === 2)
      .map((heading) => heading.text.toLowerCase());
    for (const keyword of [
      "law firm web design",
      "legal workflow automation",
      "website development for law firms",
    ]) {
      expect(
        h2s.some((heading) => heading.includes(keyword)),
        keyword,
      ).toBe(true);
    }
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    const covered = Object.keys(ENTITIES).length - missing.length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });

  it("makes no compliance claim and gives no legal advice", () => {
    const text = JSON.stringify(content).toLowerCase();
    expect(text).not.toMatch(/\b(ada|hipaa|gdpr|wcag[^"]*?) compliant\b/);
    expect(text).not.toMatch(/\bcompliant\b/);
    expect(copy).toContain("i follow accessibility best practices (wcag 2.2 aa)");
    expect(copy).toContain("your state bar's advertising rules are your call");
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

  it("answers the objections an attorney raises before hiring", () => {
    const questions = content.faq?.items.map((item) => item.question) ?? [];
    expect(questions.length).toBeGreaterThanOrEqual(6);
    for (const topic of [/how long/i, /redesign/i, /edit the site myself/i, /confidential/i]) {
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
      serviceType: "Law firm website design",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).not.toHaveProperty("offers");
    expect(JSON.stringify(graph)).not.toMatch(/"(price|minPrice|Offer)"/);
  });

  it("invents no case study, firm or result", () => {
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("no approved law firm case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
  });

  it("links to the web design service, the AI automation hub, the roofing page, pricing and up to /industries", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/services/web-design-development",
      "/ai-automation-agency",
      "/industries/roofing-hvac-website-design",
      "/pricing",
      "/industries",
    ]) {
      expect(hrefs, href).toContain(href);
    }
  });

  it("is in the header Industries menu and the footer", () => {
    const industries = PRIMARY_NAV.find((item) => item.label === "Industries");
    expect(industries && isNavGroup(industries) ? industries.links : []).toContainEqual({
      label: "Law firm websites",
      href: PATH,
    });
    const footer = FOOTER_NAV.find((group) => group.title === "Industries");
    expect(footer?.links).toContainEqual({ label: "Law firm websites", href: PATH });
  });

  it("shares almost no text with the roofing page", () => {
    // Only the page copy counts: the forms and the closing section are shared on every page.
    const own = (blocks: readonly Block[]) => JSON.stringify(blocks);
    expect(sharedTextRatio(own(content.blocks), own(roofingHvacWebsiteDesign.blocks))).toBeLessThan(
      0.05,
    );
  });
});

describe("Intake automation flow", () => {
  const flow = block("agent-flow");

  it("walks form or call, intake questions, conflict check, booked consult, CRM and texts", () => {
    expect(flow.steps.map((step) => step.label)).toEqual([
      "Form or call",
      "Intake questions",
      "Conflict check",
      "Booked consult",
      "CRM and texts",
    ]);
    expect(flow.steps.map((step) => step.icon)).toEqual([
      "phone",
      "chat",
      "shield",
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
