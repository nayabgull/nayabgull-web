import { spawnSync } from "node:child_process";

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
    return result.status !== 0;
  })
  .map(({ preset, routeSet }) => `${preset} (${routeSet})`);

if (failed.length > 0) {
  console.error(`\nLighthouse budgets missed in: ${failed.join(", ")}`);
  process.exitCode = 1;
}
