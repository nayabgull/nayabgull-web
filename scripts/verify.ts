import { spawn, spawnSync } from "node:child_process";
import { release } from "node:os";

/**
 * Runs every CI gate in the same order as .github/workflows/ci.yml and prints one summary.
 * All stages run even after a failure so the summary is complete; the exit code is 1 if any failed.
 *
 * Playwright 1.64 has no browser builds for macOS 12, so on that OS the browser stages are reported
 * as SKIPPED (never as passed). They run in full in GitHub CI and Claude Code cloud (Linux).
 */

type Status = "PASS" | "FAIL" | "SKIPPED";

interface Stage {
  name: string;
  command: string[];
  browser?: boolean;
  server?: boolean;
}

// Not 3000: other local projects often hold that port, and auditing them would give false results.
const PORT = Number(process.env.VERIFY_PORT ?? 3100);
const BASE_URL = `http://localhost:${PORT}`;
const MACOS_12_OR_OLDER = process.platform === "darwin" && Number(release().split(".")[0]) <= 21;
const SKIP_NOTICE = "Skipped locally — runs in Claude Code cloud and GitHub CI";

const base = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : "origin/main";

const STAGES: Stage[] = [
  { name: "format", command: ["pnpm", "format:check"] },
  { name: "lint", command: ["pnpm", "lint"] },
  { name: "typecheck", command: ["pnpm", "typecheck"] },
  { name: "commitlint", command: ["pnpm", "exec", "commitlint", "--from", base, "--to", "HEAD"] },
  { name: "secrets", command: ["gitleaks", "git", "--redact", "--no-banner", "."] },
  { name: "deps (audit)", command: ["pnpm", "audit", "--audit-level=high"] },
  { name: "deps (licences)", command: ["pnpm", "audit:licenses"] },
  {
    name: "sast",
    command: [
      "semgrep",
      "scan",
      "--error",
      "--metrics=off",
      "--config=p/ci",
      "--config=p/typescript",
      "--config=p/react",
      "--config=p/nextjs",
      "--config=p/secrets",
    ],
  },
  { name: "unit", command: ["pnpm", "test"] },
  { name: "build", command: ["pnpm", "build:strict"] },
  { name: "bundle", command: ["pnpm", "bundle"], browser: true, server: true },
  { name: "e2e", command: ["pnpm", "test:e2e"], browser: true, server: true },
  { name: "responsive", command: ["pnpm", "test:responsive"], browser: true, server: true },
  { name: "a11y", command: ["pnpm", "test:a11y"], browser: true, server: true },
  { name: "lighthouse", command: ["pnpm", "lhci"], browser: true, server: true },
  { name: "seo-audit", command: ["pnpm", "audit:seo"], server: true },
  { name: "content-audit", command: ["pnpm", "audit:content"], server: true },
  { name: "cannibalization", command: ["pnpm", "audit:cannibalization"], server: true },
  { name: "links", command: ["pnpm", "audit:links"], server: true },
  { name: "structured-data", command: ["pnpm", "audit:structured-data"], server: true },
];

function runStage(stage: Stage): Status {
  console.log(`\n━━━ ${stage.name}: ${stage.command.join(" ")}`);
  const [cmd, ...args] = stage.command;
  if (cmd === undefined) return "FAIL";
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    env: { ...process.env, AUDIT_BASE_URL: BASE_URL, BASE_URL },
  });
  if (result.error) {
    console.error(`✗ ${cmd} could not start (${result.error.message}). Install it, then re-run.`);
    return "FAIL";
  }
  return result.status === 0 ? "PASS" : "FAIL";
}

async function answers(): Promise<boolean> {
  try {
    await fetch(BASE_URL);
    return true;
  } catch {
    return false;
  }
}

/** Starts `pnpm start` on a free port; refuses to run against a server that was already there. */
async function startServer(): Promise<ReturnType<typeof spawn> | undefined> {
  if (await answers()) {
    console.error(`✗ Port ${PORT} is already in use. Stop that server or set VERIFY_PORT.`);
    return undefined;
  }
  const child = spawn("pnpm", ["start", "--port", String(PORT)], {
    stdio: "ignore",
    detached: true,
  });
  for (let i = 0; i < 60; i++) {
    if (await answers()) return child;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.error(`✗ pnpm start did not answer on ${BASE_URL}`);
  if (child.pid) process.kill(-child.pid);
  return undefined;
}

const results: { name: string; status: Status }[] = [];
let server: ReturnType<typeof spawn> | undefined;
let serverTried = false;

try {
  for (const stage of STAGES) {
    if (stage.browser && MACOS_12_OR_OLDER) {
      console.log(`\n━━━ ${stage.name}: ${SKIP_NOTICE}`);
      results.push({ name: stage.name, status: "SKIPPED" });
      continue;
    }
    const buildFailed = results.some((r) => r.name === "build" && r.status === "FAIL");
    if (stage.server && !buildFailed && !serverTried) {
      serverTried = true;
      server = await startServer();
    }
    if (stage.server && !server) {
      const reason = buildFailed ? "the build failed" : `no server on ${BASE_URL}`;
      console.log(`\n━━━ ${stage.name}: cannot run because ${reason}`);
      results.push({ name: stage.name, status: "FAIL" });
      continue;
    }
    results.push({ name: stage.name, status: runStage(stage) });
  }
} finally {
  if (server?.pid) process.kill(-server.pid);
}

const icon: Record<Status, string> = { PASS: "✓", FAIL: "✗", SKIPPED: "–" };
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━ pnpm verify summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
for (const r of results) {
  const note = r.status === "SKIPPED" ? `  (${SKIP_NOTICE})` : "";
  console.log(`${icon[r.status]} ${r.status.padEnd(7)} ${r.name}${note}`);
}
const failed = results.filter((r) => r.status === "FAIL").length;
const skipped = results.filter((r) => r.status === "SKIPPED").length;
console.log(`\n${results.length - failed - skipped} passed, ${failed} failed, ${skipped} skipped.`);
if (skipped > 0)
  console.log("Skipped stages are NOT passed. They must pass in GitHub CI before merge.");
process.exitCode = failed > 0 ? 1 : 0;
