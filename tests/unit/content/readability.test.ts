import { describe, expect, it } from "vitest";

import { findBannedPhrases } from "@/lib/content/banned-phrases.ts";
import {
  countSyllables,
  isPassive,
  longestSameOpenerRun,
  readability,
  splitSentences,
  words,
} from "@/lib/content/readability.ts";

describe("text helpers", () => {
  it("splits sentences and words", () => {
    expect(splitSentences("I build sites. You get leads! Does it work? Yes.")).toHaveLength(4);
    expect(splitSentences("  ")).toEqual([]);
    expect(words("Your lead's text arrives in 60 seconds — self-serve.")).toEqual([
      "Your",
      "lead's",
      "text",
      "arrives",
      "in",
      "60",
      "seconds",
      "self-serve",
    ]);
    expect(words("")).toEqual([]);
  });

  it("counts syllables with a sensible heuristic", () => {
    expect(countSyllables("cat")).toBe(1);
    expect(countSyllables("website")).toBe(2);
    expect(countSyllables("automation")).toBe(4);
    expect(countSyllables("123")).toBe(0);
  });
});

describe("readability", () => {
  it("scores plain short sentences as easy", () => {
    const stats = readability("I build fast sites. You get more calls. We start this week.");
    expect(stats.sentences).toBe(3);
    expect(stats.words).toBe(12);
    expect(stats.readingEase).toBeGreaterThan(80);
    expect(stats.gradeLevel).toBeLessThan(5);
    expect(stats.longestSentenceWords).toBe(4);
  });

  it("handles empty text", () => {
    expect(readability("")).toMatchObject({ words: 0, sentences: 0, longestSentenceWords: 0 });
  });
});

describe("style helpers", () => {
  it("detects passive voice", () => {
    expect(isPassive("The site was built in two weeks.")).toBe(true);
    expect(isPassive("Leads are quickly routed to your CRM.")).toBe(true);
    expect(isPassive("I built the site in two weeks.")).toBe(false);
    expect(isPassive("This is great.")).toBe(false);
  });

  it("finds the longest run of identical sentence openers", () => {
    expect(longestSameOpenerRun(["You win.", "You save.", "You grow.", "I help."])).toEqual({
      word: "you",
      run: 3,
    });
    expect(longestSameOpenerRun([])).toEqual({ word: "", run: 0 });
  });

  it("finds banned phrases and banned openers", () => {
    expect(findBannedPhrases("We deliver a seamless, cutting-edge build.")).toEqual([
      "cutting-edge",
      "seamless",
    ]);
    expect(findBannedPhrases("It’s important to note this. Moreover, it works.")).toEqual([
      "it's important to note",
      "moreover,",
    ]);
    expect(findBannedPhrases("I add more over time.")).toEqual([]);
  });
});
