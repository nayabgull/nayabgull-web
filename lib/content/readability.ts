/** Splits text into sentences on ., ! and ? followed by whitespace (or the end of the text). */
export function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/)
    .map((s) => s.trim())
    .filter((s) => /[A-Za-z0-9]/.test(s));
}

export function words(text: string): string[] {
  return text.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? [];
}

/** Heuristic English syllable count, accurate enough for Flesch scoring. */
export function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;
  const trimmed = w.replace(/(?:[^laeiouy]es|[^laeiouy]ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const groups = trimmed.match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups?.length ?? 1);
}

export interface ReadabilityStats {
  words: number;
  sentences: number;
  syllables: number;
  avgSentenceWords: number;
  longestSentenceWords: number;
  readingEase: number;
  gradeLevel: number;
}

export function readability(text: string): ReadabilityStats {
  const sentences = splitSentences(text);
  const allWords = words(text);
  const syllables = allWords.reduce((sum, w) => sum + countSyllables(w), 0);
  const sentenceCount = Math.max(1, sentences.length);
  const wordCount = Math.max(1, allWords.length);
  const wps = allWords.length / sentenceCount;
  const spw = syllables / wordCount;
  return {
    words: allWords.length,
    sentences: sentences.length,
    syllables,
    avgSentenceWords: wps,
    longestSentenceWords: Math.max(0, ...sentences.map((s) => words(s).length)),
    readingEase: 206.835 - 1.015 * wps - 84.6 * spw,
    gradeLevel: 0.39 * wps + 11.8 * spw - 15.59,
  };
}

const BE_VERBS = /\b(am|is|are|was|were|be|been|being|get|gets|got|gotten)\b/i;
const IRREGULAR_PARTICIPLES =
  "built|done|made|given|taken|written|sent|shown|known|seen|found|paid|sold|told|held|kept|left|lost|run|set|put|read|brought|bought|caught|taught|thought|chosen|driven|eaten|fallen|forgotten|hidden|spoken|stolen|worn|won";
const PASSIVE = new RegExp(
  `\\b(am|is|are|was|were|be|been|being|get|gets|got|gotten)\\s+(?:\\w+ly\\s+)?(\\w+ed|${IRREGULAR_PARTICIPLES})\\b`,
  "i",
);

/** True when the sentence looks passive ("was built", "is sent", "were quickly approved"). */
export function isPassive(sentence: string): boolean {
  return BE_VERBS.test(sentence) && PASSIVE.test(sentence);
}

/** Longest run of consecutive sentences that open with the same word. */
export function longestSameOpenerRun(sentences: readonly string[]): { word: string; run: number } {
  let best = { word: "", run: 0 };
  let current = { word: "", run: 0 };
  for (const sentence of sentences) {
    const first = words(sentence)[0]?.toLowerCase() ?? "";
    current =
      first !== "" && first === current.word
        ? { word: first, run: current.run + 1 }
        : { word: first, run: 1 };
    if (current.run > best.run) best = { ...current };
  }
  return best;
}
