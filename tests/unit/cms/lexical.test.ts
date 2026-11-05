import { describe, expect, it } from "vitest";

import { extractLexical } from "@/lib/content/lexical.ts";

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
