import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ContentPage } from "@/components/sections/ContentPage.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { CALL_CTA, home, QUOTE_FORM } from "@/content/home.ts";
import type { PageContent } from "@/content/pages/types.ts";

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
  it("renders a centered hero without CTAs, proof, form or FAQ when the page has none", () => {
    render(<ContentPage content={PAGE} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("An example page");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveTextContent(
      "Example page",
    );
    const hero = document.querySelector("section[aria-labelledby='hero-heading']");
    expect(hero?.querySelector("form")).toBeNull();
    expect(hero?.querySelector("a[href^='https://cal.com']")).toBeNull();
    expect(document.querySelector("#faq")).toBeNull();
  });

  it("ends every page with the quote form and the call CTA, using the homepage copy by default", () => {
    render(<ContentPage content={PAGE} />);
    const quote = document.querySelector("#quote");
    expect(quote?.querySelector("form")).not.toBeNull();
    expect(quote?.querySelector(`a[href="${CALL_CTA.href}"]`)).toHaveTextContent(CALL_CTA.label);
    expect(screen.getByRole("heading", { level: 2, name: home.quote.heading })).toBeInTheDocument();
    expect(document.querySelector<HTMLInputElement>("#quote input[name='source']")?.value).toBe(
      "/example",
    );
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

  it("renders the money hero (CTAs, proof, quote form), a flow block, FAQ and its own closing copy", () => {
    render(
      <ContentPage
        content={{
          ...PAGE,
          hero: {
            ...PAGE.hero,
            proof: ["5+ years", "400+ projects delivered"],
            primaryCta: CALL_CTA,
            secondaryCta: { label: "See the steps", href: "#process" },
            form: QUOTE_FORM,
          },
          faq: home.faq,
          closing: { heading: "Closing heading", text: "Closing text." },
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
            {
              ...home.flow,
              kind: "flow",
              id: "example",
              steps: [
                { title: "Rings", detail: "The phone rings.", icon: "phone" },
                { title: "Answered", detail: "AI picks up.", icon: "spark" },
                { title: "Asked", detail: "Questions asked.", icon: "chat" },
                { title: "Booked", detail: "Visit booked." },
                { title: "Extra", detail: "A fifth step." },
              ],
            },
          ],
        }}
      />,
    );
    const hero = document.querySelector("section[aria-labelledby='hero-heading']");
    expect(hero).toHaveAttribute("data-cta-zone");
    expect(hero?.querySelector("form")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: QUOTE_FORM.heading })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: CALL_CTA.label })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "See the steps" })).toHaveAttribute("href", "#process");
    expect(screen.getByText("400+ projects delivered", { exact: false })).toBeInTheDocument();
    expect(document.querySelector("#example ol")?.children).toHaveLength(5);
    expect(document.querySelector("#example-heading")).toHaveTextContent(home.flow.heading);
    expect(document.querySelectorAll("#faq details")).toHaveLength(home.faq.items.length);
    expect(screen.getByRole("heading", { level: 2, name: "Closing heading" })).toBeInTheDocument();
    expect(screen.getByText("Closing text.")).toBeInTheDocument();
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
