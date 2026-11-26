import { words } from "./readability.ts";

/** Every run of `size` consecutive words in the text, lowercased. */
export function shingles(text: string, size = 5): Set<string> {
  const tokens = words(text).map((word) => word.toLowerCase());
  const result = new Set<string>();
  for (let i = 0; i + size <= tokens.length; i++) {
    result.add(tokens.slice(i, i + size).join(" "));
  }
  return result;
}

/**
 * Share of identical text between two pages (content.md §7): the shingles both pages contain,
 * divided by the shingles of the shorter page. 0 = nothing shared, 1 = one page repeats the other.
 */
export function sharedTextRatio(a: string, b: string, size = 5): number {
  const first = shingles(a, size);
  const second = shingles(b, size);
  const smaller = Math.min(first.size, second.size);
  if (smaller === 0) return 0;
  let shared = 0;
  for (const shingle of first) if (second.has(shingle)) shared++;
  return shared / smaller;
}
