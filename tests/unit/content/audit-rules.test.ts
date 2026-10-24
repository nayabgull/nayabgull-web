import { describe, expect, it } from "vitest";

import {
  auditContent,
  checkKeywordUse,
  checkParagraphs,
  checkReadability,
  checkStyle,
} from "@/lib/content/audit-rules.ts";
import type { KeywordEntry } from "@/lib/seo/keywords.ts";

const entry: KeywordEntry = { url: "/x", pageType: "package", primary: "speed fix", secondary: [] };

const sentence = "You get a speed fix for your site this week and your pages load fast.";
const filler = "I check every page and send you a short plan.";

function input(paragraphs: string[], e: KeywordEntry | null = entry) {
  return { paragraphs, bodyText: paragraphs.join(" "), entry: e ?? undefined };
}

const rules = (issues: { rule: string }[]) => issues.map((i) => i.rule);

describe("auditContent", () => {
  it("passes long, plain, well-structured copy", () => {
    const paragraphs = [sentence, ...Array.from({ length: 70 }, () => `${filler} It takes a day.`)];
    expect(auditContent(input(paragraphs))).toEqual([]);
  });

  it("fails thin copy without the keyword", () => {
    expect(rules(checkKeywordUse(input(["Hello there."])))).toEqual([
      "min-words",
      "keyword-present",
    ]);
  });

  it("fails keyword stuffing and unregistered pages", () => {
    expect(rules(checkKeywordUse(input(Array.from({ length: 700 }, () => "speed fix"))))).toEqual([
      "keyword-density",
    ]);
    expect(rules(checkKeywordUse(input([""], null)))).toEqual(["keyword-registered"]);
  });

  it("applies no word minimum to page types without one", () => {
    expect(
      checkKeywordUse(
        input([`A speed fix. ${filler.repeat(20)}`], { ...entry, pageType: "pricing" }),
      ),
    ).toEqual([]);
  });
});

describe("rule groups", () => {
  it("flags hard, long sentences", () => {
    const hard =
      "Comprehensive organizational infrastructure modernization necessitates considerable institutional deliberation, " +
      "interdepartmental coordination, sophisticated technological implementation, and continuous performance evaluation " +
      "throughout every operational dimension imaginable, particularly regarding interoperability, " +
      "accountability, sustainability, scalability, observability and regulatory compliance documentation obligations everywhere for every single client.";
    expect(rules(checkReadability(input([hard])))).toEqual([
      "reading-ease",
      "grade-level",
      "sentence-avg",
      "sentence-max",
    ]);
    expect(rules(checkReadability(input([hard], null)))).toContain("reading-ease");
  });

  it("flags long paragraphs", () => {
    expect(
      rules(checkParagraphs(input([Array.from({ length: 5 }, () => "I help.").join(" ")]))),
    ).toEqual(["paragraph-size"]);
  });

  it("flags banned phrases, passive voice, em dashes and repeated openers", () => {
    const text = [
      "You get a seamless build.",
      "You get leads — fast.",
      "You get calls — daily.",
      "The site was built — quickly.",
    ];
    expect(rules(checkStyle(input(text)))).toEqual([
      "banned-phrase",
      "passive-voice",
      "em-dash",
      "same-opener",
    ]);
    expect(checkStyle(input([]))).toEqual([]);
  });
});
