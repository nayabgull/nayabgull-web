import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import sitemap from "@/app/(site)/sitemap.ts";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { FOOTER_NAV, isNavGroup, PRIMARY_NAV } from "@/content/navigation.ts";
import { PAGES } from "@/content/pages/index.ts";
import { industries as content } from "@/content/pages/industries.ts";
import type { Block, PageContent, Rich } from "@/content/pages/types.ts";
import { pagePrices } from "@/content/pages/types.ts";
import { faqPlainText } from "@/lib/content/faq.ts";
import { words } from "@/lib/content/readability.ts";
import { KEYWORDS, keywordFor } from "@/lib/seo/keywords.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";
import { canonicalFor } from "@/lib/seo/site.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

const PATH = "/industries";

const renderPage = (page: PageContent) =>
  snapshot(
    renderToStaticMarkup(
      <main>
        <ContentPage content={page} />
      </main>,
    ),
  );
const page = renderPage(content);
const copy = page.bodyText.toLowerCase();

const block = <K extends Block["kind"]>(id: string, kind: K): Extract<Block, { kind: K }> => {
  const found = content.blocks.find((candidate) => candidate.id === id);
  if (found?.kind !== kind) throw new Error(`No ${kind} block "${id}" on the page.`);
  return found as Extract<Block, { kind: K }>;
};

const plain = (value: Rich): string =>
  typeof value === "string"
    ? value
    : value.map((part) => (typeof part === "string" ? part : part.text)).join("");

/** Every industry page: a live page under /industries/. */
const CHILDREN = PAGES.filter((candidate) => candidate.path.startsWith(`${PATH}/`));

/**
 * What each card promises. Every phrase must appear in the card and on the industry page itself,
 * so the hub never says something its child page does not.
 */
const CARD_FACTS: Record<string, readonly string[]> = {
  "/industries/law-firm-website-design": [
    "court",
    "busy inbox",
    "practice area pages",
    "intake forms that sort cases",
  ],
  "/industries/dental-medical-website-design": [
    "front desk",
    "clipboard",
    "no-shows",
    "online booking",
    "reminders",
  ],
  "/industries/real-estate-website-design": [
    "portal",
    "home search",
    "lead capture on listings",
    "showing requests",
  ],
  "/industries/roofing-hvac-website-design": [
    "storm",
    "half empty",
    "photo quote form",
    "follow-up that answers after hours",
  ],
  "/industries/contractor-website-design": [
    "job site",
    "bid",
    "estimate form",
    "jobs by size",
    "site visit",
  ],
};

/** Entities from the brief (content/briefs/industries.md). content.md §4 asks for 70%. */
const ENTITIES: Record<string, readonly string[]> = {
  "small business": ["small business"],
  "industry-specific website": ["built for your industry"],
  "generic template": ["generic template"],
  "law firm": ["law firm"],
  attorney: ["attorney"],
  intake: ["intake"],
  "dental office": ["dental office"],
  clinic: ["clinic"],
  "patient forms": ["patient forms"],
  "online booking": ["online booking"],
  reminders: ["reminder"],
  "real estate agent": ["agent"],
  brokerage: ["brokerage"],
  IDX: ["idx"],
  MLS: ["mls"],
  roofing: ["roof"],
  HVAC: ["hvac"],
  contractor: ["contractor"],
  "estimate form": ["estimate form"],
  "project gallery": ["project gallery"],
  "photo quote form": ["photo quote form"],
  "call button": ["call button"],
  CRM: ["crm"],
  "follow-up texts": ["follow-up texts"],
  "AI receptionist": ["ai receptionist"],
  GoHighLevel: ["gohighlevel"],
  "Google Business Profile": ["google business profile"],
  "A2P 10DLC": ["a2p 10dlc"],
  "WCAG 2.2 AA": ["wcag 2.2 aa"],
  "fixed quote": ["fixed quote"],
  domain: ["domain"],
  "US time zones": ["us time zones"],
};

describe("Industries hub", () => {
  const entry = keywordFor(PATH);

  it("is registered as a hub with exactly the keywords from the keyword map", () => {
    expect(content.path).toBe(PATH);
    expect(content.parent).toBeUndefined();
    expect(entry).toEqual({
      url: PATH,
      pageType: "hub",
      primary: "industry website design",
      secondary: ["website design for small business"],
    });
  });

  it("reuses no keyword of an industry page", () => {
    const own = [entry?.primary, ...(entry?.secondary ?? [])];
    const children = KEYWORDS.filter((candidate) => candidate.url.startsWith(`${PATH}/`)).flatMap(
      (candidate) => [candidate.primary, ...candidate.secondary],
    );
    expect(own.filter((keyword) => keyword && children.includes(keyword))).toEqual([]);
  });

  it("is a full hub page of 1,500 to 2,000 words", () => {
    const count = words(page.bodyText).length;
    expect(count).toBeGreaterThanOrEqual(1500);
    expect(count).toBeLessThanOrEqual(2000);
  });

  it("puts the primary keyword in the title, meta description, H1 and first 100 words", () => {
    expect(content.meta.title.toLowerCase()).toMatch(/^industry website design/);
    expect(content.meta.description.toLowerCase()).toContain("industry website design");
    expect(content.hero.headline.highlight).toBe("Industry website design");
    expect(page.bodyText.split(/\s+/).slice(0, 100).join(" ").toLowerCase()).toContain(
      "industry website design",
    );
  });

  it("uses the secondary keyword in an H2", () => {
    const h2s = page.headings.filter((h) => h.level === 2).map((h) => h.text.toLowerCase());
    expect(h2s.some((heading) => heading.includes("website design for small business"))).toBe(true);
  });

  it("covers at least 70% of the brief's entities (content.md §4)", () => {
    const missing = Object.entries(ENTITIES)
      .filter(([, terms]) => !terms.every((term) => copy.includes(term)))
      .map(([entity]) => entity);
    const covered = Object.keys(ENTITIES).length - missing.length;
    expect(covered / Object.keys(ENTITIES).length).toBeGreaterThanOrEqual(0.7);
  });
});

describe("Industry cards", () => {
  const cards = block("industries", "cards");

  it("has one card per live industry page, each with a descriptive link to it", () => {
    expect(CHILDREN).toHaveLength(5);
    expect(cards.items.map((card) => card.link?.href).sort()).toEqual(
      CHILDREN.map((child) => child.path).sort(),
    );
    for (const card of cards.items) {
      const label = card.link?.label.toLowerCase() ?? "";
      expect(label.split(" ").length, label).toBeGreaterThanOrEqual(3);
      expect(["learn more", "read more", "click here", "more", "here"]).not.toContain(label);
    }
  });

  it("keeps each card to two or three sentences", () => {
    for (const card of cards.items) {
      const sentences = plain(card.text).match(/[.!?](\s|$)/g) ?? [];
      expect(sentences.length, card.title).toBeGreaterThanOrEqual(2);
      expect(sentences.length, card.title).toBeLessThanOrEqual(3);
    }
  });

  it.each(Object.entries(CARD_FACTS))("says only what %s says", (path, facts) => {
    const card = cards.items.find((item) => item.link?.href === path);
    const child = PAGES.find((candidate) => candidate.path === path);
    if (!card || !child) throw new Error(`No card or page for ${path}.`);
    const cardText = plain(card.text).toLowerCase();
    const childText = renderPage(child).bodyText.toLowerCase();
    for (const fact of facts) {
      expect(cardText, `card: ${fact}`).toContain(fact);
      expect(childText, `${path}: ${fact}`).toContain(fact);
    }
  });

  it("is the parent of every industry page, so each breadcrumb goes back up", () => {
    for (const child of CHILDREN) {
      expect(child.parent, child.path).toEqual({ name: "Industries", path: PATH });
      const breadcrumb = pageJsonLd(child)["@graph"].find(
        (node) => node["@type"] === "BreadcrumbList",
      );
      expect(JSON.stringify(breadcrumb), child.path).toContain(canonicalFor(PATH));
      expect(
        renderPage(child).links.map((link) => link.href),
        child.path,
      ).toContain(PATH);
    }
  });
});

describe("Links, navigation and sitemap", () => {
  it("links to every industry page, pricing, home and contact, and nothing else", () => {
    const targets = new Set(
      page.links.map((link) => link.href).filter((href) => href.startsWith("/")),
    );
    expect([...targets].sort()).toEqual(
      ["/", "/contact", "/pricing", ...CHILDREN.map((child) => child.path)].sort(),
    );
  });

  it("is the first link in the header Industries menu and in the footer", () => {
    const link = { label: "All industries", href: PATH };
    const menu = PRIMARY_NAV.find((item) => item.label === "Industries");
    expect(menu && isNavGroup(menu) ? menu.links[0] : undefined).toEqual(link);
    expect(FOOTER_NAV.find((group) => group.title === "Industries")?.links[0]).toEqual(link);
  });

  it("is in the sitemap with its review date", () => {
    const item = sitemap().find((url) => url.url === canonicalFor(PATH));
    expect(item?.lastModified).toEqual(new Date(content.updated));
  });
});

describe("Truth rules", () => {
  it("shows only the general starting prices from /pricing, with an Offer for each", () => {
    expect(pagePrices(content).map((price) => price.from)).toEqual([1500, 2500]);
    const service = pageJsonLd(content)["@graph"].find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({
      serviceType: "Industry website design",
      areaServed: { "@type": "Country", name: "United States" },
    });
    expect(JSON.stringify(service)).toContain('"minPrice":1500');
    expect(JSON.stringify(service)).toContain('"minPrice":2500');
  });

  it("invents no case study, client, statistic or compliance claim", () => {
    const proof = block("proof", "features");
    expect(JSON.stringify(proof)).toContain("no approved case study");
    const text = JSON.stringify(content);
    expect(text).not.toMatch(/\b\d+(\.\d+)?\s?(%|percent|x)\b/i);
    expect(text).not.toMatch(/\bcompliant\b|\bhipaa\b|\bguaranteed\b/i);
    expect(JSON.stringify(content.blocks)).not.toMatch(/https?:\/\//);
  });

  it("shows the approved ownership and time zone answers word for word", () => {
    const approved = {
      "Who owns the accounts and the work?":
        "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a CRM. I build everything inside those accounts: the website, the intake flows and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      "Do you work in US time zones?":
        "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
    };
    for (const [question, answer] of Object.entries(approved)) {
      const item = content.faq?.items.find((candidate) => candidate.question === question);
      expect(faqPlainText(item?.answer ?? ""), question).toBe(answer);
    }
  });

  it("answers the objections an owner raises before hiring, in 8 or more questions", () => {
    const questions = content.faq?.items.map((item) => item.question) ?? [];
    expect(questions.length).toBeGreaterThanOrEqual(8);
    for (const topic of [/cost/i, /how long/i, /owns/i, /time zones/i, /redesign/i, /rules/i]) {
      expect(
        questions.some((question) => topic.test(question)),
        String(topic),
      ).toBe(true);
    }
  });
});
