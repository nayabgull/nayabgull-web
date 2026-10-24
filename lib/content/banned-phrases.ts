/** content.md §3 — extend this list here; the CI audit and the Payload publish hook both read it. */
export const BANNED_PHRASES: readonly string[] = [
  "delve",
  "in today's fast-paced",
  "in today's digital world",
  "ever-evolving",
  "unlock the power",
  "unleash",
  "elevate your",
  "game-changer",
  "cutting-edge",
  "seamless",
  "seamlessly",
  "robust solution",
  "tapestry",
  "navigate the complexities",
  "look no further",
  "it's important to note",
  "in conclusion",
  "revolutionize",
  "harness the power",
  "take your business to the next level",
  "one-stop shop",
  "world-class",
  "synergy",
  "best-in-class",
  "state-of-the-art",
];

/** Banned only when they open a sentence. */
export const BANNED_OPENERS: readonly string[] = ["furthermore,", "moreover,"];

const escape = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Returns each banned phrase found in the text (case-insensitive, curly apostrophes allowed). */
export function findBannedPhrases(text: string): string[] {
  const normalized = text.replace(/[‘’]/g, "'");
  const hits = BANNED_PHRASES.filter((phrase) =>
    new RegExp(`\\b${escape(phrase)}\\b`, "i").test(normalized),
  );
  for (const opener of BANNED_OPENERS) {
    if (new RegExp(`(^|[.!?]\\s+)${escape(opener)}`, "i").test(normalized)) hits.push(opener);
  }
  return hits;
}
