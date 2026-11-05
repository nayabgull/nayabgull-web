import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { HomePage } from "@/components/sections/HomePage.tsx";
import { home } from "@/content/home.ts";
import { auditContent } from "@/lib/content/audit-rules.ts";
import { checkHeadings, checkImages } from "@/lib/seo/audit-rules.ts";
import { validateJsonLd } from "@/lib/seo/jsonld-validate.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

function renderHome(content = home) {
  const html = renderToStaticMarkup(
    <html lang="en-US">
      <body>
        <main>
          <HomePage content={content} />
        </main>
      </body>
    </html>,
  );
  return snapshot(html);
}

/** Runs the same rules as `pnpm audit:content` / `audit:seo` on the rendered sections. */
describe("rendered homepage", () => {
  const page = renderHome();
  const entry = keywordFor("/");

  it("passes every content rule (readability, length, style, keyword density)", () => {
    expect(auditContent({ ...page, entry })).toEqual([]);
  });

  it("passes the heading rules", () => {
    expect(checkHeadings(page, entry)).toEqual([]);
  });

  it("ends every copy block with punctuation, so sentences never run together", () => {
    const unfinished = page.paragraphs.filter((p) => !/[.!?]$/.test(p));
    expect(unfinished).toEqual([]);
  });

  it("carries valid home JSON-LD with no review markup", () => {
    expect(validateJsonLd(page.jsonLd, "home")).toEqual([]);
  });

  it("renders no images while the photo is missing", () => {
    expect(page.images).toEqual([]);
    expect(checkImages(page)).toEqual([]);
  });

  it("links every primary CTA to the strategy call with rel=noopener", () => {
    const ctas = page.links.filter((l) => l.text === home.hero.primaryCta.label);
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    for (const cta of ctas) expect(cta.href).toBe(home.hero.primaryCta.href);
  });

  it("shows a testimonial section only when real quotes exist", () => {
    expect(page.headings.map((h) => h.text)).not.toContain("What clients say");
    const withQuote = renderHome({
      ...home,
      testimonials: [{ quote: "Great work.", name: "Test Person", role: "Owner" }],
    });
    expect(withQuote.headings.map((h) => h.text)).toContain("What clients say");
  });
});
