import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AgentFlow } from "@/components/sections/blocks/AgentFlow.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { dentalMedicalWebsiteDesign as content } from "@/content/pages/dental-medical-website-design.ts";
import { pricing } from "@/content/pages/pricing.ts";
import { roofingHvacWebsiteDesign } from "@/content/pages/roofing-hvac-website-design.ts";
import type { Block } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { words } from "@/lib/content/readability.ts";
import { sharedTextRatio } from "@/lib/content/similarity.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

const PATH = "/industries/dental-medical-website-design";

const block = <K extends Block["kind"]>(kind: K): Extract<Block, { kind: K }> => {
  const found = content.blocks.find((candidate) => candidate.kind === kind);
  if (!found) throw new Error(`No ${kind} block on the page.`);
  return found as Extract<Block, { kind: K }>;
};

const page = snapshot(
  renderToStaticMarkup(
    <main>
      <ContentPage content={content} />
    </main>,
  ),
);
const copy = page.bodyText.toLowerCase();

/** Entities from the brief (content/briefs/dental-medical-website-design.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  "dental practice": ["dental office"],
  dentist: ["dentist"],
  "medical clinic": ["clinic"],
  doctor: ["doctor"],
  "front desk": ["front desk"],
  "new patients": ["new patient"],
  "online booking": ["online booking"],
  "visit types": ["visit type"],
  "new patient forms": ["new patient forms"],
  "insurance plans": ["insurance plans"],
  "missed calls": ["missed call"],
  "missed-call text back": ["missed-call text back"],
  "after hours": ["after hours"],
  "AI receptionist": ["ai receptionist"],
  "voice agent": ["voice agent"],
  emergencies: ["emergency", "911"],
  "medical advice (never given)": ["never give medical advice"],
  reminders: ["reminder"],
  "no-shows": ["no-shows"],
  "recall reminders": ["recall reminder"],
  "review requests": ["review request"],
  "Google reviews": ["google review"],
  "Google Business Profile": ["google business profile"],
  "local SEO": ["local seo"],
  "name, address and phone": ["name, address and phone"],
  "mobile speed": ["phone view", "weak signal"],
  "WCAG 2.2 AA": ["wcag 2.2 aa"],
  "screen reader": ["screen reader"],
  ADA: ["ada"],
  HIPAA: ["hipaa"],
  "business associate agreement": ["business associate agreement (baa)"],
  CRM: ["crm"],
  "A2P 10DLC": ["a2p 10dlc"],
  "practice management software": ["practice management software"],
  "healthcare workflow automation": ["healthcare workflow automation"],
};

describe("Dental and medical website design page", () => {
  const entry = keywordFor(PATH);

  it("is registered as an industry page with the keywords from the keyword map", () => {
    expect(content.path).toBe(PATH);
    expect(entry?.pageType).toBe("industry");
    expect(entry?.primary).toBe("medical website design company");
    expect(entry?.secondary).toEqual([
      "dental website design agency",
      "dental web design company",
      "healthcare website design agency",
      "doctor website design",
      "healthcare workflow automation",
    ]);
    // The breadcrumb goes Home › Industries › this page.
    expect(content.parent).toEqual({ name: "Industries", path: "/industries" });
  });

  it("is a full industry page of 1,500 to 2,000 words", () => {
    const count = words(page.bodyText).length;
    expect(count).toBeGreaterThanOrEqual(1500);
    expect(count).toBeLessThanOrEqual(2000);
  });

  it("puts the primary keyword in the title, the meta description, the H1 and the first 100 words", () => {
    expect(content.meta.title.toLowerCase()).toMatch(/^medical website design company/);
    expect(content.meta.description.toLowerCase()).toContain("medical website design company");
    expect(content.hero.headline.highlight).toBe("Medical website design company");
    expect(copy.split(/\s+/).slice(0, 100).join(" ")).toContain("medical website design company");
  });

  it("uses every secondary keyword in the copy, and secondary keywords in H2s", () => {
    const missing = (entry?.secondary ?? []).filter((keyword) => !copy.includes(keyword));
    expect(missing).toEqual([]);
    const h2s = page.headings
      .filter((heading) => heading.level === 2)
      .map((heading) => heading.text.toLowerCase());
    for (const keyword of [
      "doctor website design",
      "healthcare workflow automation",
      "dental website design agency",
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

  it("makes no HIPAA, ADA or other compliance claim and gives no medical advice", () => {
    const faqQuestion = "Is the website HIPAA compliant or ADA compliant?";
    // The only place the word may appear is the question patients' owners actually ask.
    const text = JSON.stringify({ ...content, faq: undefined }).toLowerCase();
    expect(text).not.toMatch(/\bcompliant\b/);
    expect(text).not.toMatch(/\b(hipaa|ada|wcag)[- ](certified|approved|guaranteed)\b/);
    const answer = content.faq?.items.find((item) => item.question === faqQuestion)?.answer ?? "";
    expect(answer).toMatch(/^I make no compliance claims/);
    expect(answer.toLowerCase()).not.toMatch(/\bcompliant\b/);
    expect(copy).toContain("my work alone does not make a site meet hipaa");
    expect(copy).toContain(
      "whether your site meets the ada is a legal question for your own advisor",
    );
    expect(copy).toContain("never give medical advice");
  });

  it("answers the objections a practice owner raises before hiring", () => {
    const questions = content.faq?.items.map((item) => item.question) ?? [];
    expect(questions.length).toBeGreaterThanOrEqual(6);
    for (const topic of [
      /hipaa/i,
      /how long/i,
      /how much/i,
      /owns/i,
      /time zones/i,
      /practice management software/i,
      /reviews/i,
    ]) {
      expect(
        questions.some((question) => topic.test(question)),
        String(topic),
      ).toBe(true);
    }
  });

  it("shows only starting prices that already exist on /pricing, and the Service schema offers them", () => {
    const approved = new Map(pagePrices(pricing).map((price) => [price.name, price]));
    const prices = pagePrices(content);
    expect(prices.map((price) => price.name)).toEqual([
      "Business website (5 pages)",
      "Full system",
    ]);
    for (const price of prices) {
      expect(price.from, price.name).toBe(approved.get(price.name)?.from);
      expect(price.label, price.name).toBe(approved.get(price.name)?.label);
    }
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
      serviceType: "Medical website design",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(service).toHaveProperty("provider");
    expect(service).toHaveProperty("offers");
  });

  it("invents no case study, practice, statistic or result", () => {
    const proof = content.blocks.find((candidate) => candidate.id === "proof");
    expect(JSON.stringify(proof)).toContain("do not have an approved dental or medical case study");
    expect(JSON.stringify(content)).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
    // No outside sources: the page uses no outside statistic.
    expect(JSON.stringify(content.blocks)).not.toMatch(/https?:\/\//);
  });

  it("links to the web design service, the AI pages, the GoHighLevel hub, pricing and up to /industries", () => {
    const hrefs = new Set(page.links.map((link) => link.href));
    for (const href of [
      "/services/web-design-development",
      "/ai-automation-agency",
      "/ai-automation-agency/ai-agent-development",
      "/gohighlevel-agency",
      "/pricing",
      "/industries",
    ]) {
      expect(hrefs, href).toContain(href);
    }
  });

  it("is in the header Industries menu and the footer", () => {
    const link = { label: "Dental and medical websites", href: PATH };
    const industries = PRIMARY_NAV.find((item) => item.label === "Industries");
    expect(industries && isNavGroup(industries) ? industries.links : []).toContainEqual(link);
    const footer = FOOTER_NAV.find((group) => group.title === "Industries");
    expect(footer?.links).toContainEqual(link);
  });

  it("shares almost no text with the roofing page", () => {
    // Only the page copy counts: the forms and the closing section are shared on every page.
    const own = (blocks: readonly Block[]) => JSON.stringify(blocks);
    expect(sharedTextRatio(own(content.blocks), own(roofingHvacWebsiteDesign.blocks))).toBeLessThan(
      0.1,
    );
  });
});

describe("Patient flow", () => {
  const flow = block("agent-flow");

  it("walks booking, forms, reminders, recall and the review request", () => {
    expect(flow.steps.map((step) => step.label)).toEqual([
      "Book online",
      "Forms at home",
      "Reminders",
      "Recall",
      "Review request",
    ]);
    expect(flow.steps.map((step) => step.icon)).toEqual([
      "calendar",
      "rules",
      "chat",
      "crm",
      "check",
    ]);
  });

  it("asks every patient for a review, never only the happy ones", () => {
    const review = flow.steps.at(-1);
    expect(review?.text).toContain("Everyone gets it");
    expect(review?.text).toContain("do not allow asking only happy patients");
  });

  it("renders as a CSS-only radio group with a panel and an icon per step", () => {
    const { container } = render(<AgentFlow block={flow} />);
    const group = screen.getByRole("group", { name: flow.heading });
    expect(within(group).getAllByRole("radio")).toHaveLength(5);
    expect(container.querySelectorAll(".agent-node svg")).toHaveLength(5);
    expect(container.querySelector("script")).toBeNull();
  });
});
