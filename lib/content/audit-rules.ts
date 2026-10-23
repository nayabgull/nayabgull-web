import type { Issue } from "../seo/issue.ts";
import type { KeywordEntry } from "../seo/keywords.ts";
import { MIN_WORDS, minReadingEase } from "../seo/page-types.ts";

import { findBannedPhrases } from "./banned-phrases.ts";
import {
  isPassive,
  longestSameOpenerRun,
  readability,
  splitSentences,
  words,
} from "./readability.ts";

export interface ContentInput {
  /** Visible copy blocks in reading order (paragraphs, list items, quotes). */
  paragraphs: readonly string[];
  /** All visible body copy. */
  bodyText: string;
  entry: KeywordEntry | undefined;
}

const round = (n: number): number => Math.round(n * 10) / 10;

function countOccurrences(haystack: string, needle: string): number {
  if (needle === "") return 0;
  return haystack.toLowerCase().split(needle.toLowerCase()).length - 1;
}

export function checkReadability(input: ContentInput): Issue[] {
  const issues: Issue[] = [];
  const stats = readability(input.paragraphs.join(" "));
  const minEase = minReadingEase(input.entry?.pageType ?? "service");
  if (stats.readingEase < minEase) {
    issues.push({
      rule: "reading-ease",
      message: `Flesch Reading Ease ${round(stats.readingEase)} (min ${minEase}).`,
    });
  }
  if (stats.gradeLevel > 9) {
    issues.push({
      rule: "grade-level",
      message: `Flesch-Kincaid grade ${round(stats.gradeLevel)} (max 9).`,
    });
  }
  if (stats.avgSentenceWords > 20) {
    issues.push({
      rule: "sentence-avg",
      message: `Average sentence is ${round(stats.avgSentenceWords)} words (max 20).`,
    });
  }
  if (stats.longestSentenceWords > 35) {
    issues.push({
      rule: "sentence-max",
      message: `Longest sentence is ${stats.longestSentenceWords} words (max 35).`,
    });
  }
  return issues;
}

export function checkParagraphs(input: ContentInput): Issue[] {
  const issues: Issue[] = [];
  input.paragraphs.forEach((paragraph, index) => {
    const sentenceCount = splitSentences(paragraph).length;
    const wordCount = words(paragraph).length;
    if (sentenceCount > 4 || wordCount > 80) {
      issues.push({
        rule: "paragraph-size",
        message: `Paragraph ${index + 1} has ${sentenceCount} sentences / ${wordCount} words (max 4 / 80).`,
      });
    }
  });
  return issues;
}

export function checkStyle(input: ContentInput): Issue[] {
  const issues: Issue[] = [];
  const text = input.paragraphs.join(" ");
  const sentences = splitSentences(text);

  for (const phrase of findBannedPhrases(input.bodyText)) {
    issues.push({ rule: "banned-phrase", message: `Banned phrase "${phrase}".` });
  }
  const passive = sentences.filter(isPassive).length;
  if (sentences.length > 0 && passive / sentences.length > 0.1) {
    issues.push({
      rule: "passive-voice",
      message: `${passive} of ${sentences.length} sentences are passive (max 10%).`,
    });
  }
  const dashes = (input.bodyText.match(/—/g) ?? []).length;
  const allowed = Math.max(2, Math.floor((words(input.bodyText).length / 300) * 2));
  if (dashes > allowed) {
    issues.push({
      rule: "em-dash",
      message: `${dashes} em dashes (max 2 per 300 words, ${allowed} here).`,
    });
  }
  const opener = longestSameOpenerRun(sentences);
  if (opener.run >= 3) {
    issues.push({
      rule: "same-opener",
      message: `${opener.run} sentences in a row start with "${opener.word}".`,
    });
  }
  return issues;
}

export function checkKeywordUse(input: ContentInput): Issue[] {
  const { entry } = input;
  if (!entry)
    return [
      { rule: "keyword-registered", message: "No primary keyword registered for this page." },
    ];
  const issues: Issue[] = [];
  const total = words(input.bodyText).length;
  const minWords = MIN_WORDS[entry.pageType];
  if (minWords !== undefined && total < minWords) {
    issues.push({
      rule: "min-words",
      message: `${total} words (min ${minWords} for a ${entry.pageType} page).`,
    });
  }
  const hits = countOccurrences(input.bodyText, entry.primary);
  const density = total === 0 ? 0 : ((hits * words(entry.primary).length) / total) * 100;
  if (hits === 0)
    issues.push({
      rule: "keyword-present",
      message: `"${entry.primary}" does not appear in the copy.`,
    });
  if (density > 1.5)
    issues.push({
      rule: "keyword-density",
      message: `Keyword density ${round(density)}% (max 1.5%).`,
    });
  return issues;
}

/** Every [CI] content rule from content.md that can be checked from the rendered copy. */
export function auditContent(input: ContentInput): Issue[] {
  return [
    ...checkKeywordUse(input),
    ...checkReadability(input),
    ...checkParagraphs(input),
    ...checkStyle(input),
  ];
}
