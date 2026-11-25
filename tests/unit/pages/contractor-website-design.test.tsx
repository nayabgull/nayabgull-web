import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { FOOTER_NAV, PRIMARY_NAV, isNavGroup } from "@/content/navigation.ts";
import { contractorWebsiteDesign as content } from "@/content/pages/contractor-website-design.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { keywordFor, KEYWORDS } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

const PATH = "/industries/contractor-website-design";
const html = renderToStaticMarkup(
  <main>
    <ContentPage content={content} />
  </main>,
);
const page = snapshot(html);
const copy = page.bodyText.toLowerCase();

/** Entities from the brief (content/briefs/contractor-website-design.md). content.md §4 asks for 70%. */
const ENTITIES: readonly (readonly string[])[] = [
  ["general contractor"],
  ["remodeler"],
  ["construction compan"],
  ["estimate request", "estimate form"],
  ["site visit", "walkthrough"],
  ["project gallery", "gallery"],
  ["before and after"],
  ["service-area", "service area"],
  ["license"],
  ["insurance"],
  ["google reviews", "reviews from google"],
  ["google business profile"],
  ["google maps"],
  ["crm"],
  ["follow-up texts", "texts"],
  ["ai receptionist"],
  ["phone"],
  ["angi"],
  ["homeadvisor"],
  ["budget range"],
  ["domain", "hosting"],
  ["time zones"],
];

const OWNERSHIP =
  "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a CRM. I build everything inside those accounts: the website, the lead flows and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.";
const TIME_ZONES =
  "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.";

const answer = (question: string): string | undefined =>
  content.faq?.items.find((item) => item.question === question)?.answer;

describe("contractor website design page", () => {
  const entry = keywordFor(PATH);

  it("is registered as an industry page with the keyword-map row", () => {
    expect(entry?.pageType).toBe("industry");
    expect(entry?.primary).toBe("contractor website design");
    expect(entry?.secondary).toEqual([
      "general contractor website design",
      "website design for construction company",
      "lead generation website design",
    ]);
  });

  it("uses every secondary keyword in the copy", () => {
    for (const keyword of entry?.secondary ?? []) expect(copy).toContain(keyword);
  });

  it("covers at least 70% of the brief's entities", () => {
    const missing = ENTITIES.filter((names) => !names.some((name) => copy.includes(name)));
    expect(missing.length / ENTITIES.length).toBeLessThanOrEqual(0.3);
  });

  it("never targets a keyword another page owns in its title, meta, H1 or H2s", () => {
    // The brand ("nayab gull") ends every title, so only service keywords count here.
    const others = KEYWORDS.filter((other) => other.url !== PATH && other.url !== "/about").flatMap(
      (other) => [other.primary, ...other.secondary],
    );
    const targets = [
      content.meta.title,
      content.meta.description,
      ...page.headings.map((h) => h.text),
    ]
      .join(" ")
      .toLowerCase();
    expect(others.filter((keyword) => targets.includes(keyword))).toEqual([]);
  });

  it("keeps the two approved FAQ answers word for word (paragraph breaks aside)", () => {
    expect(answer("Who owns the accounts and the work?")?.replace(/\n\n/g, " ")).toBe(OWNERSHIP);
    expect(answer("Do you work in US time zones?")).toBe(TIME_ZONES);
    for (const question of [
      "How long does it take to build my site?",
      "Can I add my own project photos?",
      "Will my business show on Google Maps?",
      "Can you redesign my current site?",
    ]) {
      expect(answer(question)).toBeDefined();
    }
  });

  it("shows no price and no Offer until Nayab approves one", () => {
    expect(pagePrices(content)).toEqual([]);
    expect(JSON.stringify(content)).not.toMatch(/\$\d/);
    expect(JSON.stringify(pageJsonLd(content))).not.toContain('"Offer"');
  });

  it("carries the Service schema for the US with the FAQPage", () => {
    const graph = JSON.stringify(pageJsonLd(content));
    expect(graph).toContain('"Service"');
    expect(graph).toContain('"FAQPage"');
    expect(graph).toContain('"BreadcrumbList"');
    expect(graph).toMatch(/"areaServed":\{[^}]*"United States"|"areaServed":"US"/);
  });

  it("links to its sibling, the web design service, the AI hub, pricing and up to /industries", () => {
    const hrefs = page.links.map((link) => link.href);
    for (const href of [
      "/industries/roofing-hvac-website-design",
      "/services/web-design-development",
      "/ai-automation-agency",
      "/pricing",
      "/industries",
    ]) {
      expect(hrefs).toContain(href);
    }
    expect(content.parent).toEqual({ name: "Industries", path: "/industries" });
  });

  it("is in the header Industries menu and the footer", () => {
    const industries = PRIMARY_NAV.find((item) => isNavGroup(item) && item.label === "Industries");
    expect(
      industries && isNavGroup(industries) ? industries.links.map((l) => l.href) : [],
    ).toContain(PATH);
    expect(FOOTER_NAV.flatMap((group) => group.links.map((l) => l.href))).toContain(PATH);
  });
});
