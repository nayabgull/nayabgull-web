import { describe, expect, it } from "vitest";

import { sharedTextRatio, shingles } from "@/lib/content/similarity.ts";

describe("shared text between pages", () => {
  it("splits text into lowercase five-word shingles", () => {
    expect([...shingles("One two three, FOUR five six.")]).toEqual([
      "one two three four five",
      "two three four five six",
    ]);
    expect(shingles("too short").size).toBe(0);
  });

  it("is 1 for a copy, 0 for different text and 0 for text too short to compare", () => {
    const text = "I build fast websites for roofing companies in Texas every single week.";
    expect(sharedTextRatio(text, text)).toBe(1);
    expect(
      sharedTextRatio(text, "A dentist needs online booking and reminders that patients read."),
    ).toBe(0);
    expect(sharedTextRatio(text, "short")).toBe(0);
  });

  it("measures against the shorter page", () => {
    const short = "one two three four five six";
    const long = `${short} seven eight nine ten eleven twelve thirteen`;
    expect(sharedTextRatio(short, long)).toBe(1);
    expect(sharedTextRatio(long, short, 3)).toBe(1);
  });
});
