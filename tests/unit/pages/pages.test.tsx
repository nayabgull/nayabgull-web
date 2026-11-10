import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { STRATEGY_CALL_URL } from "@/content/home.ts";
import { PAGES } from "@/content/pages/index.ts";
import type { PageContent } from "@/content/pages/types.ts";
import { auditContent } from "@/lib/content/audit-rules.ts";
import {
  checkHeadings,
  checkImages,
  checkMetaDescription,
  checkTitle,
} from "@/lib/seo/audit-rules.ts";
import { validateJsonLd } from "@/lib/seo/jsonld-validate.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from "@/lib/seo/routes.ts";
import { sitePath } from "@/lib/seo/site.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

/** Starting prices Nayab approved (USD). No other dollar amount may appear on any page. */
const APPROVED_PRICES = ["$1,500", "$600", "$750", "$149", "$2,500"];

/** Minimum visible FAQ items per page type (seo.md §10). */
const MIN_FAQ: Record<string, number> = { hub: 8, industry: 6, service: 6 };

function render(content: PageContent) {
  const html = renderToStaticMarkup(
    <html lang="en-US">
      <body>
        <main>
          <ContentPage content={content} />
        </main>
      </body>
    </html>,
  );
  // The <title> and meta description come from generateMetadata in the route file.
  return {
    ...snapshot(html),
    title: content.meta.title,
    metaDescription: content.meta.description,
  };
}

const KNOWN_ROUTES = new Set([...INDEXABLE_ROUTES, ...NOINDEX_ROUTES]);

/** Runs the same rules as `pnpm audit:content`, `audit:seo` and `audit:structured-data` on each page. */
describe.each(PAGES.filter((page) => !page.noindex))("rendered page $path", (content) => {
  const page = render(content);
  const entry = keywordFor(content.path);

  it("has a registered primary keyword", () => {
    expect(entry).toBeDefined();
  });

  it("passes every content rule (readability, length, style, keyword density)", () => {
    expect(auditContent({ ...page, entry })).toEqual([]);
  });

  it("passes the title, meta description, heading and image rules", () => {
    expect(checkTitle(page, entry)).toEqual([]);
    expect(checkMetaDescription(page, entry)).toEqual([]);
    expect(checkHeadings(page, entry)).toEqual([]);
    expect(checkImages(page)).toEqual([]);
  });

  it("ends every copy block with punctuation, so sentences never run together", () => {
    expect(page.paragraphs.filter((p) => !/[.!?]$/.test(p))).toEqual([]);
  });

  it("carries the JSON-LD its page type requires, with no review markup", () => {
    expect(validateJsonLd(page.jsonLd, entry?.pageType ?? "service")).toEqual([]);
  });

  it("links to 3 to 8 pages that exist, with descriptive anchors", () => {
    const internal = page.links.filter((link) => link.href.startsWith("/"));
    const targets = new Set(internal.map((link) => sitePath(link.href)));
    targets.delete(content.path);
    expect([...targets].filter((target) => !KNOWN_ROUTES.has(target))).toEqual([]);
    expect(targets.size).toBeGreaterThanOrEqual(3);
    expect(targets.size).toBeLessThanOrEqual(8);
    for (const link of page.links) {
      expect(["click here", "read more", "learn more", "here", "more"]).not.toContain(
        link.text.toLowerCase(),
      );
    }
  });

  it("opens and closes with the same primary CTA", () => {
    const ctas = page.links.filter((link) => link.href === STRATEGY_CALL_URL);
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    expect(new Set(ctas.map((cta) => cta.text)).size).toBe(1);
    expect(content.finalCta?.cta).toEqual(content.hero.primaryCta);
  });

  it("shows enough FAQ items for its page type, each one in the FAQPage JSON-LD", () => {
    const min = MIN_FAQ[entry?.pageType ?? ""] ?? 0;
    expect(content.faq?.items.length ?? 0).toBeGreaterThanOrEqual(min);
    if (!content.faq) return;
    const graph = JSON.parse(page.jsonLd[0] ?? "{}") as {
      "@graph": { "@type": string; mainEntity?: { name: string }[] }[];
    };
    const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
    expect(faq?.mainEntity?.map((q) => q.name)).toEqual(content.faq.items.map((q) => q.question));
  });

  it("shows only the approved starting prices, each one as a starting price", () => {
    const amounts = JSON.stringify(content).match(/\$\d+(?:,\d{3})*/g) ?? [];
    expect(amounts.filter((amount) => !APPROVED_PRICES.includes(amount))).toEqual([]);
    for (const block of content.blocks) {
      if (block.kind !== "prices") continue;
      for (const price of block.items) expect(price.label).toMatch(/^Starts at \$/);
      expect(block.note).toMatch(/starting prices/);
    }
  });

  it("makes no ranking, revenue or review claims", () => {
    expect(JSON.stringify(content)).not.toMatch(/\b(guaranteed?|rating|stars?|testimonial)\b/i);
  });
});

describe("launch page registry", () => {
  it("gives every page a unique path, title and meta description", () => {
    for (const key of ["path", "title", "description"] as const) {
      const values = PAGES.map((page) => (key === "path" ? page.path : page.meta[key]));
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("lists every indexable page in the routes the audits visit", () => {
    expect(INDEXABLE_ROUTES[0]).toBe("/");
    expect(INDEXABLE_ROUTES).toHaveLength(PAGES.filter((page) => !page.noindex).length + 1);
  });
});
