import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { ContactPage } from "@/components/sections/ContactPage.tsx";
import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { HomePage } from "@/components/sections/HomePage.tsx";
import { contact } from "@/content/contact.ts";
import { DIRECT_BENEFIT, home, IDENTITY_LINE, TRUSTED_TEAM_LINE } from "@/content/home.ts";
import { PAGES } from "@/content/pages/index.ts";
import { snapshot } from "@/lib/seo/snapshot.ts";

vi.mock("next/image", () => ({ default: () => null }));

function page(element: React.ReactElement) {
  const html = renderToStaticMarkup(<main>{element}</main>);
  const hero = /<section[^>]*aria-labelledby="hero-heading"[\s\S]*?<\/section>/.exec(html)?.[0];
  return { body: snapshot(html).bodyText, hero: snapshot(hero ?? "").bodyText };
}

const ALL = [
  { path: "/", ...page(<HomePage content={home} />) },
  { path: "/contact", ...page(<ContactPage content={contact} email={null} />) },
  ...PAGES.map((content) => ({ path: content.path, ...page(<ContentPage content={content} />) })),
];

/** One identity everywhere: a small web development agency run by Nayab Gull. */
describe.each(ALL)("brand voice on $path", ({ body, hero }) => {
  it("opens the hero subline with the same identity line", () => {
    expect(hero).toContain(IDENTITY_LINE);
  });

  it("repeats the direct-contact benefit word for word", () => {
    expect(body).toContain(DIRECT_BENEFIT);
  });

  it('says "we" only in the sentence about trusted developers on bigger projects', () => {
    const rest = body.split(TRUSTED_TEAM_LINE).join(" ");
    expect(rest).not.toMatch(/\b(we|we're|we'll|we've|our|ours|let's)\b/i);
    expect(rest).not.toMatch(/\bus\b/);
  });

  it("never describes the business as a solo act or invents a team", () => {
    expect(body).not.toMatch(
      /\b(one-person|of one|one person|single developer|solo|our team|team of \d+)\b/i,
    );
  });
});

describe("brand identity constants", () => {
  it("are the agreed sentences", () => {
    expect(IDENTITY_LINE).toBe("I run a small web development agency for US businesses.");
    expect(DIRECT_BENEFIT).toBe(
      "You work directly with the person who builds your system. No account managers, no handoffs.",
    );
    expect(TRUSTED_TEAM_LINE).toMatch(/trusted developers/);
    expect(TRUSTED_TEAM_LINE).toMatch(/\bwe\b/);
  });

  it("tells the trusted-developers story on the homepage and the About page", () => {
    for (const path of ["/", "/about"]) {
      expect(ALL.find((entry) => entry.path === path)?.body).toContain(TRUSTED_TEAM_LINE);
    }
  });
});
