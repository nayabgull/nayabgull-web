import { describe, expect, it } from "vitest";

import { outline } from "@/lib/blog/toc.ts";

import { heading, lexical, paragraph } from "../cms/fixtures.ts";

import { ctaBlock, faqBlock } from "./fixtures.ts";

describe("outline", () => {
  it("gives every heading a unique id and lists the H2s", () => {
    const result = outline(
      lexical(
        heading("h2", "Why it matters"),
        paragraph("Text."),
        heading("h3", "Step one"),
        heading("h2", "Why it matters"),
        heading("h2", "Main"),
        heading("h2", "!!!"),
        heading("h2", " "),
        faqBlock([], "Questions"),
        faqBlock([], " "),
        ctaBlock("Book", "x"),
      ),
    );
    expect(result.entries.map((e) => e.id)).toEqual([
      "why-it-matters",
      "why-it-matters-2",
      "main-2",
      "section",
      "questions",
    ]);
    expect([...result.ids.entries()]).toEqual([
      [0, "why-it-matters"],
      [2, "step-one"],
      [3, "why-it-matters-2"],
      [4, "main-2"],
      [5, "section"],
      [7, "questions"],
    ]);
  });

  it("returns nothing for anything that is not a Lexical state", () => {
    expect(outline(null).entries).toEqual([]);
    expect(outline({ root: "x" }).ids.size).toBe(0);
    expect(
      outline({ root: { children: [{ type: "heading", tag: "hx", children: [] }] } }).entries,
    ).toEqual([]);
  });
});
