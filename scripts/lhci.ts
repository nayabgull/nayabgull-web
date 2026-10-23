import { spawnSync } from "node:child_process";

/** Runs Lighthouse CI for mobile and desktop; both always run so the report shows every failure. */
const failed = ["mobile", "desktop"].filter((preset) => {
  console.log(`\n▶ Lighthouse CI (${preset})`);
  const result = spawnSync("lhci", ["autorun", "--config=lighthouserc.cjs"], {
    stdio: "inherit",
    env: {
      ...process.env, // Not LHCI_*: lhci reads every LHCI_<option> variable as a CLI flag.
      LIGHTHOUSE_FORM_FACTOR: preset,
    },
  });
  return result.status !== 0;
});

if (failed.length > 0) {
  console.error(`\nLighthouse budgets missed in: ${failed.join(", ")}`);
  process.exitCode = 1;
}
