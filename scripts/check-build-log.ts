import { spawn } from "node:child_process";

import { findBuildWarnings } from "../lib/build/build-warnings.ts";

/**
 * Runs `next build` and fails when the build fails or prints any warning
 * (missing metadataBase, image problems, deprecated config and so on).
 * The one accepted line is listed in lib/build/build-warnings.ts.
 */
const child = spawn("next", ["build"], { stdio: ["inherit", "pipe", "pipe"], shell: false });
// The whole log is scanned at the end so a line split across two chunks is still one line.
let log = "";

child.stdout.on("data", (chunk: Buffer) => {
  log += chunk.toString();
  process.stdout.write(chunk);
});
child.stderr.on("data", (chunk: Buffer) => {
  log += chunk.toString();
  process.stderr.write(chunk);
});

child.on("close", (code) => {
  if (code !== 0) {
    console.error(`\nBuild failed with exit code ${code ?? "unknown"}.`);
    process.exitCode = code ?? 1;
    return;
  }
  const warnings = findBuildWarnings(log);
  if (warnings.length > 0) {
    console.error(`\nBuild printed ${warnings.length} warning(s); the build gate allows none:`);
    for (const line of warnings) console.error(`  ✗ ${line}`);
    process.exitCode = 1;
    return;
  }
  console.log("\nBuild passed with no warnings.");
});
