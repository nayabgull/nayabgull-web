import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { SiteFooter } from "@/components/sections/SiteFooter.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { home } from "@/content/home.ts";
import { FOOTER_NAV, PRIMARY_NAV } from "@/content/navigation.ts";
import type { PageContent } from "@/content/pages/types.ts";
import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from "@/lib/seo/routes.ts";
import { sitePath } from "@/lib/seo/site.ts";

const PAGE: PageContent = {
  path: "/example",
  name: "Example page",
  updated: "2026-11-10",
  meta: { title: "Example | Nayab Gull", description: "An example page." },
  hero: {
    eyebrow: "Example",
    headline: { before: "An ", highlight: "example", after: " page" },
    lede: "A short lede.",
    proof: [],
  },
  blocks: [
    {
      kind: "prose",
      id: "prose",
      eyebrow: "Prose",
      heading: "Prose heading",
      intro: "Prose intro.",
      paragraphs: ["Plain paragraph.", ["See ", { text: "the homepage", href: "/" }, "."]],
      bullets: ["First bullet."],
    },
    {
      kind: "cards",
      id: "cards",
      eyebrow: "Cards",
      heading: "Cards heading",
      intro: "Cards intro.",
      columns: 2,
      items: [
        { title: "Card one", text: "Card text.", link: { label: "Card link", href: "/" } },
        { title: "Card two", text: "More card text." },
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "Steps heading",
      intro: "Steps intro.",
      steps: [{ title: "Step one", when: "Day 1", text: "Step text." }],
    },
    {
      kind: "prices",
      id: "prices",
      eyebrow: "Pricing",
      heading: "Prices heading",
      intro: "Prices intro.",
      note: "These are starting prices.",
      items: [
        {
          name: "Landing page",
          from: 600,
          label: "Starts at $600.",
          text: "One page.",
          includes: ["One round of edits."],
        },
      ],
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "Links heading",
      intro: "Links intro.",
      items: [{ label: "Homepage link", href: "/", text: "Back to the start." }],
    },
    { kind: "profile", id: "about", about: home.about },
  ],
};

afterEach(cleanup);

describe("ContentPage", () => {
  it("renders a hero without CTAs, proof, FAQ or final CTA when the page has none", () => {
    render(<ContentPage content={PAGE} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("An example page");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveTextContent(
      "Example page",
    );
    expect(screen.queryByRole("link", { name: "Book a free strategy call" })).toBeNull();
    expect(document.querySelector("#faq")).toBeNull();
    expect(document.querySelector("#book")).toBeNull();
  });

  it("renders every block kind with its heading", () => {
    render(<ContentPage content={PAGE} />);
    for (const heading of [
      "Prose heading",
      "Cards heading",
      "Steps heading",
      "Prices heading",
      "Links heading",
      home.about.heading,
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    }
    expect(screen.getByText("Starts at $600.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Card link" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Homepage link" })).toHaveAttribute("href", "/");
  });

  it("renders CTAs, proof, the flow figure, FAQ and final CTA when the page has them", () => {
    const cta = home.hero.primaryCta;
    render(
      <ContentPage
        content={{
          ...PAGE,
          hero: {
            ...PAGE.hero,
            proof: ["5+ years", "400+ projects delivered"],
            primaryCta: cta,
            secondaryCta: { label: "See the steps", href: "#process" },
          },
          flow: home.flow,
          faq: home.faq,
          finalCta: home.finalCta,
          blocks: [
            { kind: "prose", id: "plain", eyebrow: "E", heading: "No extras", paragraphs: ["P."] },
            {
              kind: "cards",
              id: "three",
              eyebrow: "E",
              heading: "Three columns",
              columns: 3,
              items: [],
            },
            {
              kind: "prices",
              id: "none",
              eyebrow: "E",
              heading: "No intro",
              note: "These are starting prices.",
              items: [],
            },
            { kind: "links", id: "bare", eyebrow: "E", heading: "No intro links", items: [] },
          ],
        }}
      />,
    );
    expect(screen.getAllByRole("link", { name: cta.label })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "See the steps" })).toHaveAttribute("href", "#process");
    expect(screen.getByText("400+ projects delivered", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(home.flow.caption)).toBeInTheDocument();
    expect(document.querySelectorAll("#faq details")).toHaveLength(home.faq.items.length);
  });
});

describe("RichText", () => {
  it("adds rel=noopener to external links only", () => {
    render(
      <p>
        <RichText
          value={[
            { text: "Inside", href: "/" },
            " and ",
            { text: "outside", href: "https://example.com" },
          ]}
        />
      </p>,
    );
    expect(screen.getByRole("link", { name: "Inside" })).not.toHaveAttribute("rel");
    expect(screen.getByRole("link", { name: "outside" })).toHaveAttribute("rel", "noopener");
  });
});

describe("site navigation", () => {
  const known = new Set([...INDEXABLE_ROUTES, ...NOINDEX_ROUTES]);

  it("links only to pages that exist", () => {
    const links = [...PRIMARY_NAV, ...FOOTER_NAV.flatMap((group) => group.links)];
    expect(links.filter((link) => !known.has(sitePath(link.href)))).toEqual([]);
  });

  it("shows every footer group and link", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("navigation", { name: "Footer" });
    for (const group of FOOTER_NAV) {
      expect(footer).toHaveTextContent(group.title);
      for (const link of group.links) {
        expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
      }
    }
  });
});
