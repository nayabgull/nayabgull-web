import { readFileSync } from "node:fs";

import {
  AUDIT_IGNORES,
  auditIgnoreProblems,
  ignoredGhsasFromWorkspace,
} from "../lib/security/audit-ignores.ts";

/** Fails the `deps` job when an ignored advisory is undocumented or its patched release is now on npm. */
async function publishedVersions(packageName: string): Promise<string[]> {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`, {
    headers: { accept: "application/vnd.npm.install-v1+json" },
  });
  if (!response.ok) throw new Error(`npm registry returned ${response.status} for ${packageName}`);
  const body = (await response.json()) as { versions?: Record<string, unknown> };
  return Object.keys(body.versions ?? {});
}

async function main(): Promise<void> {
  const workspace = readFileSync(new URL("../pnpm-workspace.yaml", import.meta.url), "utf8");
  const versions: Record<string, string[]> = {};
  for (const entry of AUDIT_IGNORES) {
    versions[entry.packageName] ??= await publishedVersions(entry.packageName);
  }
  const problems = auditIgnoreProblems(
    AUDIT_IGNORES,
    ignoredGhsasFromWorkspace(workspace),
    versions,
  );
  if (problems.length > 0) {
    for (const problem of problems) console.error(`✗ ${problem}`);
    process.exitCode = 1;
    return;
  }
  for (const entry of AUDIT_IGNORES) {
    console.log(
      `✓ ${entry.ghsa} (${entry.packageName}): no patched ${entry.patchedVersion} on npm yet. ${entry.reason}`,
    );
  }
}

main().catch((error: unknown) => {
  console.error(
    `Audit ignore check failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
});
