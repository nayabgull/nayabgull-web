import { spawn } from "node:child_process";

/**
 * Runs `next build` and fails when the build fails or prints any warning
 * (missing metadataBase, image problems, deprecated config and so on).
 */
const WARNING = /⚠|\bwarn(ing)?\b/i;

const child = spawn("next", ["build"], { stdio: ["inherit", "pipe", "pipe"], shell: false });
const warnings: string[] = [];

function scan(chunk: Buffer, write: (text: string) => void): void {
  const text = chunk.toString();
  write(text);
  for (const line of text.split("\n")) if (WARNING.test(line)) warnings.push(line.trim());
}

child.stdout.on("data", (chunk: Buffer) => {
  scan(chunk, (t) => process.stdout.write(t));
});
child.stderr.on("data", (chunk: Buffer) => {
  scan(chunk, (t) => process.stderr.write(t));
});

child.on("close", (code) => {
  if (code !== 0) {
    console.error(`\nBuild failed with exit code ${code ?? "unknown"}.`);
    process.exitCode = code ?? 1;
    return;
  }
  if (warnings.length > 0) {
    console.error(`\nBuild printed ${warnings.length} warning(s); the build gate allows none:`);
    for (const line of warnings) console.error(`  ✗ ${line}`);
    process.exitCode = 1;
    return;
  }
  console.log("\nBuild passed with no warnings.");
});
