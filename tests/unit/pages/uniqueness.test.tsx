import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { ContactPage } from "@/components/sections/ContactPage.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { HomePage } from "@/components/sections/HomePage.tsx";
import { contact } from "@/content/contact.ts";
import { home } from "@/content/home.ts";
import { PAGES } from "@/content/pages/index.ts";
import { sharedTextRatio } from "@/lib/content/similarity.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

/** Page copy only: the shared lead form is site chrome, so `copyText` leaves out <form> text. */
const bodyText = (element: React.ReactElement): string =>
  snapshot(renderToStaticMarkup(<main>{element}</main>)).copyText;

/** content.md §7: no two pages share more than 20% identical text. */
describe("page uniqueness", () => {
  const pages = [
    { path: "/", text: bodyText(<HomePage content={home} />) },
    { path: "/contact", text: bodyText(<ContactPage content={contact} email={null} />) },
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
