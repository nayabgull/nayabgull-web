import { describe, expect, it } from "vitest";

import { extractLexical, lexicalBlocks, lexicalUploads } from "@/lib/content/lexical.ts";

const text = (value: string) => ({ type: "text", text: value });

describe("extractLexical", () => {
  it("returns empty copy for anything that is not an editor state", () => {
    const empty = { headings: [], paragraphs: [], links: [] };
    expect(extractLexical(undefined)).toEqual(empty);
    expect(extractLexical(null)).toEqual(empty);
    expect(extractLexical("text")).toEqual(empty);
    expect(extractLexical({ root: "x" })).toEqual(empty);
  });

  it("reads headings, paragraphs, quotes, nested lists and links in order", () => {
    const link = {
      type: "link",
      fields: { url: "/pricing" },
      children: [text("see pricing")],
    };
    const state = {
      root: {
        type: "root",
        children: [
          { type: "heading", tag: "h2", children: [text("Why "), text("us")] },
          {
            type: "paragraph",
            children: [text("Hello  "), { type: "linebreak" }, text("world "), link],
          },
          { type: "quote", children: [text("A quote.")] },
          {
            type: "list",
            children: [
              {
                type: "listitem",
                children: [
                  text("One"),
                  { type: "list", children: [{ type: "listitem", children: [text("Nested")] }] },
                ],
              },
              { type: "listitem", children: [text("Two")] },
            ],
          },
          { type: "block", fields: { blockType: "faq" } },
          { type: "paragraph", children: [] },
          { type: "heading", tag: "h2", children: [] },
        ],
      },
    };
    expect(extractLexical(state)).toEqual({
      headings: [{ level: 2, text: "Why us" }],
      paragraphs: ["Hello world see pricing", "A quote.", "One", "Nested", "Two"],
      links: [{ href: "/pricing", text: "see pricing" }],
    });
  });

  it("ignores links with no URL and bad heading tags", () => {
    const state = {
      root: {
        type: "root",
        children: [
          { type: "heading", tag: "nope", children: [text("Bad")] },
          {
            type: "heading",
            tag: "h3",
            children: [
              { type: "link", fields: { url: "https://nayabgull.com/a" }, children: [text("A")] },
            ],
          },
          {
            type: "paragraph",
            children: [
              { type: "link", fields: { doc: 1 }, children: [text("internal")] },
              { type: "autolink", fields: { url: "" }, children: [text("empty")] },
              { type: "link", children: [text("no fields")] },
              { type: "text" },
            ],
          },
        ],
      },
    };
    const copy = extractLexical(state);
    expect(copy.headings).toEqual([{ level: 3, text: "A" }]);
    expect(copy.links).toEqual([{ href: "https://nayabgull.com/a", text: "A" }]);
    expect(copy.paragraphs).toEqual(["internalemptyno fields"]);
  });
});

describe("blocks and uploads", () => {
  it("reads FAQ and CTA block copy as an H2 plus paragraphs", () => {
    const copy = extractLexical({
      root: {
        type: "root",
        children: [
          {
            type: "block",
            fields: {
              blockType: "faq",
              heading: "Questions",
              faqs: [{ question: "Q?", answer: "One.\n\nTwo." }, 4, { answer: 5 }],
            },
          },
          { type: "block", fields: { blockType: "cta", heading: "Book", text: "Get a plan." } },
          { type: "block", fields: { blockType: "cta", heading: " ", text: " " } },
          { type: "block", fields: { blockType: "faq", heading: "No items" } },
        ],
      },
    });
    expect(copy.headings).toEqual([
      { level: 2, text: "Questions" },
      { level: 2, text: "Book" },
      { level: 2, text: "No items" },
    ]);
    expect(copy.paragraphs).toEqual(["One.", "Two.", "Get a plan."]);
  });

  it("lists blocks and upload values in reading order", () => {
    const state = {
      root: {
        type: "root",
        children: [
          { type: "upload", value: 3 },
          { type: "block", fields: { blockType: "cta" } },
          { type: "block", fields: {} },
          { type: "upload", value: { id: 4 } },
        ],
      },
    };
    expect(lexicalBlocks(state).map((block) => block.blockType)).toEqual(["cta", ""]);
    expect(lexicalUploads(state)).toEqual([3, { id: 4 }]);
    expect(lexicalUploads(null)).toEqual([]);
  });
});
