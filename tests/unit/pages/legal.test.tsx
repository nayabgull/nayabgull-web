import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { PAGES } from "@/content/pages/index.ts";
import { privacyPolicy, terms } from "@/content/pages/legal.ts";
import type { PageContent } from "@/content/pages/types.ts";
import { findBannedPhrases } from "@/lib/content/banned-phrases.ts";
import { auditNoindexPage } from "@/lib/seo/audit-rules.ts";
import { validateJsonLd } from "@/lib/seo/jsonld-validate.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { contentMetadata } from "@/lib/seo/page-metadata.ts";
import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from "@/lib/seo/routes.ts";
import { sitePath } from "@/lib/seo/site.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

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
  // <title>, canonical and robots come from generateMetadata (contentMetadata) in the route file.
  return {
    ...snapshot(html),
    title: content.meta.title,
    canonical: `https://nayabgull.com${content.path}`,
    robots: "noindex, follow",
  };
}

const LEGAL = [privacyPolicy, terms];

describe.each(LEGAL)("legal page $path", (content) => {
  const page = render(content);

  it("is noindex, follow, out of the sitemap list and has no keyword entry", () => {
    expect(content.noindex).toBe(true);
    expect(contentMetadata(content).robots).toEqual({ index: false, follow: true });
    expect(NOINDEX_ROUTES).toContain(content.path);
    expect(INDEXABLE_ROUTES).not.toContain(content.path);
    expect(keywordFor(content.path)).toBeUndefined();
  });

  it("passes the rules that apply to a noindex page", () => {
    expect(auditNoindexPage(page, content.path, [...INDEXABLE_ROUTES])).toEqual([]);
    expect(validateJsonLd(page.jsonLd, "pricing")).toEqual([]);
  });

  it("is plain text with full sentences, no banned phrases and no sales CTA", () => {
    expect(page.paragraphs.filter((p) => !/[.!?]$/.test(p))).toEqual([]);
    expect(findBannedPhrases(page.bodyText)).toEqual([]);
    expect(content.hero.primaryCta).toBeUndefined();
    expect(content.finalCta).toBeUndefined();
    expect(page.bodyText).toContain("Last updated: November 10, 2026.");
  });

  it("links only to pages that exist", () => {
    const known = new Set([...INDEXABLE_ROUTES, ...NOINDEX_ROUTES]);
    const internal = page.links.filter((link) => link.href.startsWith("/"));
    expect(internal.filter((link) => !known.has(sitePath(link.href)))).toEqual([]);
  });

  it("carries the SMS wording carriers require for A2P 10DLC", () => {
    const text = page.bodyText;
    for (const phrase of [
      "Reply STOP",
      "HELP",
      "Message frequency varies",
      "Message and data rates may apply",
    ]) {
      expect(text.toLowerCase()).toContain(phrase.toLowerCase());
    }
    expect(text).toMatch(/not a condition of (any purchase|buying)|never a condition of buying/);
  });
});

describe("legal pages together", () => {
  it("promise that mobile opt-in data is never shared for marketing", () => {
    const privacy = render(privacyPolicy).bodyText;
    expect(privacy).toContain(
      "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.",
    );
    expect(privacy).toContain("Text messaging opt-in data and consent are never shared");
    expect(render(terms).bodyText).toContain("Phone carriers are not liable");
  });

  it("link to each other and are the only noindex pages", () => {
    const hrefs = (content: PageContent) => render(content).links.map((link) => link.href);
    expect(hrefs(privacyPolicy)).toContain("/terms");
    expect(hrefs(terms)).toContain("/privacy-policy");
    expect(PAGES.filter((page) => page.noindex).map((page) => page.path)).toEqual([
      "/privacy-policy",
      "/terms",
    ]);
  });
});

describe("auditNoindexPage", () => {
  const good = render(privacyPolicy);

  it("fails when the robots tag is missing or says nofollow", () => {
    for (const robots of [undefined, "index, follow", "noindex, nofollow"]) {
      const rules = auditNoindexPage({ ...good, robots }, "/privacy-policy", []).map((i) => i.rule);
      expect(rules).toEqual(["noindex-follow"]);
    }
  });

  it("fails when the sitemap lists the page", () => {
    const issues = auditNoindexPage(good, "/privacy-policy", ["/", "/privacy-policy"]);
    expect(issues.map((issue) => issue.rule)).toEqual(["sitemap"]);
  });

  it("still checks the title, canonical, language and headings", () => {
    const broken = { ...good, title: "Short", canonical: undefined, lang: "en", headings: [] };
    const rules = auditNoindexPage(broken, "/privacy-policy", []).map((issue) => issue.rule);
    expect(rules).toEqual(
      expect.arrayContaining(["title-length", "canonical-present", "h1-single", "html-lang"]),
    );
  });
});
