import { describe, expect, it } from "vitest";

import { faqParagraphs, faqPlainText } from "@/lib/content/faq.ts";

describe("FAQ answer helpers", () => {
  it("splits answers on blank lines and trims them", () => {
    expect(faqParagraphs("One.\n\n  Two.\n \nThree.")).toEqual(["One.", "Two.", "Three."]);
    expect(faqParagraphs("Only one.")).toEqual(["Only one."]);
    expect(faqParagraphs("\n\n")).toEqual([]);
  });

  it("joins paragraphs into one line for JSON-LD", () => {
    expect(faqPlainText("One.\n\nTwo.")).toBe("One. Two.");
  });
});
