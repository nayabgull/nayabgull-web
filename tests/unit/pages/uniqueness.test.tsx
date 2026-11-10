import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { HomePage } from "@/components/sections/HomePage.tsx";
import { home } from "@/content/home.ts";
import { PAGES } from "@/content/pages/index.ts";
import { sharedTextRatio } from "@/lib/content/similarity.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

const bodyText = (element: React.ReactElement): string =>
  snapshot(renderToStaticMarkup(<main>{element}</main>)).bodyText;

/** content.md §7: no two pages share more than 20% identical text. */
describe("page uniqueness", () => {
  const pages = [
    { path: "/", text: bodyText(<HomePage content={home} />) },
    ...PAGES.map((page) => ({ path: page.path, text: bodyText(<ContentPage content={page} />) })),
  ];

  it("keeps shared text between any two pages at or under 20%", () => {
    const tooSimilar: string[] = [];
    for (const [index, first] of pages.entries()) {
      for (const second of pages.slice(index + 1)) {
        const ratio = sharedTextRatio(first.text, second.text);
        if (ratio > 0.2) {
          tooSimilar.push(`${first.path} ↔ ${second.path}: ${Math.round(ratio * 100)}%`);
        }
      }
    }
    expect(tooSimilar).toEqual([]);
  });
});
