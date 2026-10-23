import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { gzipSync } from "node:zlib";

import { chromium } from "@playwright/test";

import type { PageResult } from "./lib/site.ts";
import { BASE_URL, discoverPaths, run } from "./lib/site.ts";

/** quality-gates.md: first-load JS ≤ 120 KB gzip per route, and no route may grow > 10 KB vs main. */
const MAX_FIRST_LOAD = 120 * 1024;
const MAX_GROWTH = 10 * 1024;

const { values } = parseArgs({
  options: {
    baseline: { type: "string" },
    out: { type: "string" },
    // Only record sizes (used to measure main as the baseline for a PR).
    "measure-only": { type: "boolean" },
  },
});

const kb = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KB`;

await run("Bundle size", async () => {
  const paths = await discoverPaths();
  const browser = await chromium.launch();
  const sizes: Record<string, number> = {};
  try {
    for (const path of paths) {
      const page = await browser.newPage();
      const scripts: Promise<number>[] = [];
      page.on("response", (response) => {
        if (response.request().resourceType() === "script" && response.url().startsWith(BASE_URL)) {
          scripts.push(
            response.body().then(
              (body) => gzipSync(body, { level: 9 }).length,
              () => 0,
            ),
          );
        }
      });
      await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
      sizes[path] = (await Promise.all(scripts)).reduce((a, b) => a + b, 0);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  if (values.out) writeFileSync(values.out, `${JSON.stringify(sizes, null, 2)}\n`);
  const baseline = values.baseline
    ? (JSON.parse(readFileSync(values.baseline, "utf8")) as Record<string, number>)
    : {};

  if (values["measure-only"]) return paths.map((path) => ({ path, issues: [] }));

  return paths.map((path): PageResult => {
    const size = sizes[path] ?? 0;
    const issues = [];
    console.log(`${path}: ${kb(size)} first-load JS (gzip)`);
    if (size > MAX_FIRST_LOAD) {
      issues.push({
        rule: "first-load-js",
        message: `${kb(size)} first-load JS (max ${kb(MAX_FIRST_LOAD)}).`,
      });
    }
    const before = baseline[path];
    if (before !== undefined && size - before > MAX_GROWTH) {
      issues.push({
        rule: "bundle-growth",
        message: `Grew ${kb(size - before)} vs main (max ${kb(MAX_GROWTH)}).`,
      });
    }
    return { path, issues };
  });
});
