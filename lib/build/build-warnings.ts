/** A line `next build` prints that counts as a warning for the build gate. */
const WARNING = /⚠|\bwarn(ing)?\b/i;

/**
 * The only warning the gate accepts, matched as the whole line (approved by Nayab 2026-10-23).
 * GitHub Actions caches are scoped per PR ref, so the first build of every new PR has no
 * .next/cache. It is about CI caching speed, not about the code.
 */
export const ALLOWED_WARNINGS: readonly string[] = [
  "⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache",
];

// Color codes Next.js adds around the "⚠" prefix when the terminal supports them (ESC [ … m).
const ANSI = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");

/** Every warning line in a build log, except the exact lines in ALLOWED_WARNINGS. */
export function findBuildWarnings(log: string): string[] {
  return log
    .split("\n")
    .map((line) => line.replace(ANSI, "").trim())
    .filter((line) => WARNING.test(line) && !ALLOWED_WARNINGS.includes(line));
}
