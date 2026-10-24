import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { gzipSync } from "node:zlib";

import { chromium } from "@playwright/test";

import type { LoadedScript, RouteBundle } from "../lib/perf/bundle-budget.ts";
import {
  BUNDLE_BUDGET,
  checkRoute,
  frameworkFiles,
  kb,
  parseBaseline,
  splitRoute,
} from "../lib/perf/bundle-budget.ts";

import type { PageResult } from "./lib/site.ts";
import { BASE_URL, discoverPaths, run } from "./lib/site.ts";

/** Budgets live in lib/perf/bundle-budget.ts and docs/rules/quality-gates.md. */
const { values } = parseArgs({
  options: {
    baseline: { type: "string" },
    out: { type: "string" },
    // The .next folder of the build being served (main's worktree when measuring the baseline).
    "next-dir": { type: "string", default: ".next" },
    // Only record sizes (used to measure main as the baseline for a PR).
    "measure-only": { type: "boolean" },
  },
});

const framework = frameworkFiles(
  JSON.parse(readFileSync(join(values["next-dir"], "build-manifest.json"), "utf8")),
);

await run("Bundle size", async () => {
  const paths = await discoverPaths();
  const browser = await chromium.launch();
  const sizes: Record<string, RouteBundle> = {};
  try {
    for (const path of paths) {
      const page = await browser.newPage();
      const scripts: Promise<LoadedScript>[] = [];
      page.on("response", (response) => {
        const url = response.url();
        if (response.request().resourceType() === "script" && url.startsWith(BASE_URL)) {
          scripts.push(
            response.body().then(
              (body) => ({ url, gzip: gzipSync(body, { level: 9 }).length }),
              () => ({ url, gzip: 0 }),
            ),
          );
        }
      });
      await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
      sizes[path] = splitRoute(await Promise.all(scripts), framework);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  if (values.out) writeFileSync(values.out, `${JSON.stringify(sizes, null, 2)}\n`);
  const baseline = values.baseline
    ? parseBaseline(JSON.parse(readFileSync(values.baseline, "utf8")))
    : {};

  if (values["measure-only"]) return paths.map((path) => ({ path, issues: [] }));

  console.log(
    `Budgets (gzip): framework ≤ ${kb(BUNDLE_BUDGET.framework)}, app ≤ ${kb(BUNDLE_BUDGET.app)}, ` +
      `total ≤ ${kb(BUNDLE_BUDGET.total)}, growth vs main ≤ ${kb(BUNDLE_BUDGET.growth)}`,
  );
  return paths.map((path): PageResult => {
    const size = sizes[path] ?? { framework: 0, app: 0, total: 0 };
    const before = baseline[path];
    const delta = before
      ? `, ${size.total - before.total >= 0 ? "+" : ""}${kb(size.total - before.total)} vs main`
      : "";
    console.log(
      `${path}: framework ${kb(size.framework)} + app ${kb(size.app)} = ${kb(size.total)}${delta}`,
    );
    return { path, issues: checkRoute(size, before) };
  });
});
