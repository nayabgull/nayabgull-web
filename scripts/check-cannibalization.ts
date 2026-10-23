import { readFileSync } from "node:fs";

import type { Issue } from "../lib/seo/issue.ts";
import { findConflicts, parseKeywordMap } from "../lib/seo/keyword-map.ts";
import { KEYWORDS, keywordFor } from "../lib/seo/keywords.ts";

import { discoverPaths, run } from "./lib/site.ts";

const MAP_FILE = "docs/seo/keyword-map.md";

function compareRegistry(): Issue[] {
  const mapped = parseKeywordMap(readFileSync(MAP_FILE, "utf8"));
  const issues: Issue[] = [];
  const key = (p: { url: string; primary: string; secondary: readonly string[] }) =>
    JSON.stringify([p.url, p.primary, [...p.secondary].sort()]);
  const inMap = new Set(mapped.map(key));
  const inRegistry = new Set(KEYWORDS.map(key));
  for (const page of mapped) {
    if (!inRegistry.has(key(page))) {
      issues.push({
        rule: "registry-sync",
        message: `${page.url} in ${MAP_FILE} differs from lib/seo/keywords.ts.`,
      });
    }
  }
  for (const page of KEYWORDS) {
    if (!inMap.has(key(page))) {
      issues.push({
        rule: "registry-sync",
        message: `${page.url} in lib/seo/keywords.ts differs from ${MAP_FILE}.`,
      });
    }
  }
  for (const conflict of findConflicts(mapped)) {
    issues.push({
      rule: "keyword-conflict",
      message: `"${conflict.keyword}" is targeted by ${conflict.urls.join(" and ")}.`,
    });
  }
  return issues;
}

await run("Cannibalization", async () => {
  const pages = (await discoverPaths()).map((path) => ({
    path,
    issues: keywordFor(path)
      ? []
      : [{ rule: "keyword-registered", message: `No primary keyword registered for ${path}.` }],
  }));
  return [{ path: "(keyword map)", issues: compareRegistry() }, ...pages];
});
