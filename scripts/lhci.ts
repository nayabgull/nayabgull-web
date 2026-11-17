import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

import { type Lhr, lcpReport } from "../lib/perf/lcp-report.ts";

interface ManifestEntry {
  isRepresentativeRun: boolean;
  jsonPath: string;
}

/** Prints why mobile LCP is what it is, for the median run of every URL (lib/perf/lcp-report.ts). */
function printLcpReports(outputDir: string): void {
  const manifestFile = `${outputDir}/manifest.json`;
  if (!existsSync(manifestFile)) return;
  const manifest = JSON.parse(readFileSync(manifestFile, "utf8")) as ManifestEntry[];
  for (const entry of manifest.filter((item) => item.isRepresentativeRun)) {
    const lhr = JSON.parse(readFileSync(entry.jsonPath, "utf8")) as Lhr;
    console.log(lcpReport(lhr).join("\n"));
  }
}

/**
 * Runs Lighthouse CI for mobile and desktop, each for the indexable routes and for the noindex
 * routes (which skip only "is-crawlable", see lighthouserc.cjs). Every run always happens so the
 * report shows every failure.
 */
const runs = ["mobile", "desktop"].flatMap((preset) =>
  ["indexable", "noindex"].map((routeSet) => ({ preset, routeSet })),
);

const failed = runs
  .filter(({ preset, routeSet }) => {
    console.log(`\n▶ Lighthouse CI (${preset}, ${routeSet} routes)`);
    const result = spawnSync("lhci", ["autorun", "--config=lighthouserc.cjs"], {
      stdio: "inherit",
      env: {
        ...process.env, // Not LHCI_*: lhci reads every LHCI_<option> variable as a CLI flag.
        LIGHTHOUSE_FORM_FACTOR: preset,
        LIGHTHOUSE_ROUTE_SET: routeSet,
      },
    });
    if (preset === "mobile") {
      printLcpReports(`reports/lighthouse/mobile${routeSet === "noindex" ? "-noindex" : ""}`);
    }
    return result.status !== 0;
  })
  .map(({ preset, routeSet }) => `${preset} (${routeSet})`);

if (failed.length > 0) {
  console.error(`\nLighthouse budgets missed in: ${failed.join(", ")}`);
  process.exitCode = 1;
}
