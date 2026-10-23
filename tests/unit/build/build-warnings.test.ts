import { describe, expect, it } from "vitest";

import { ALLOWED_WARNINGS, findBuildWarnings } from "@/lib/build/build-warnings.ts";

const NO_CACHE =
  "⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache";
const ESC = String.fromCharCode(27);

describe("build warning gate", () => {
  it("accepts only the exact Next.js no-cache line", () => {
    expect(ALLOWED_WARNINGS).toEqual([NO_CACHE]);
    expect(findBuildWarnings(`Creating an optimized production build ...\n${NO_CACHE}\n`)).toEqual(
      [],
    );
  });

  it("accepts the no-cache line with color codes and indentation", () => {
    const colored = `   ${ESC}[33m${ESC}[1m⚠${ESC}[22m${ESC}[39m${NO_CACHE.slice(1)}`;
    expect(findBuildWarnings(colored)).toEqual([]);
  });

  it("still fails every other ⚠ line", () => {
    const log = [
      NO_CACHE,
      "⚠ metadataBase property in metadata export is not set",
      "⚠ No build cache found.",
      `${NO_CACHE} extra`,
    ].join("\n");
    expect(findBuildWarnings(log)).toEqual([
      "⚠ metadataBase property in metadata export is not set",
      "⚠ No build cache found.",
      `${NO_CACHE} extra`,
    ]);
  });

  it("fails warn/warning words without the ⚠ prefix", () => {
    expect(findBuildWarnings("Warning: image is missing width\nok line")).toEqual([
      "Warning: image is missing width",
    ]);
  });
});
