/**
 * Advisories that `pnpm audit` is told to ignore (see `auditConfig.ignoreGhsas` in pnpm-workspace.yaml).
 *
 * An ignore is only allowed while no patched release exists on npm. `scripts/check-audit-ignores.ts`
 * runs in the CI `deps` job and fails as soon as the patched version is published, so the ignore is
 * replaced with an override instead of being forgotten. Every entry needs Nayab's approval and a line
 * in the "Approved changes log" of docs/rules/quality-gates.md.
 */
export interface AuditIgnore {
  /** GitHub advisory id, exactly as listed in pnpm-workspace.yaml. */
  ghsa: string;
  /** The vulnerable npm package. */
  packageName: string;
  /** First patched version named by the advisory. */
  patchedVersion: string;
  /** Why the ignore is safe for this project. */
  reason: string;
}

export const AUDIT_IGNORES: readonly AuditIgnore[] = [
  {
    ghsa: "GHSA-fc5q-39xc-vjpf",
    packageName: "picomatch",
    patchedVersion: "4.0.8",
    reason:
      "ReDoS through crafted extglob patterns. Reached in production dependencies only via payload > " +
      "json-schema-to-typescript > tinyglobby, which Payload loads only in its generate:types CLI, never in " +
      "the server runtime. All glob patterns are static. Approved by Nayab 2026-11-18.",
  },
];

/** Numeric parts of a plain `x.y.z` version; pre-releases (`-rc.1`) and build tags are not releases. */
function parseRelease(version: string): [number, number, number] | null {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version.trim());
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

/** True when `version` is a stable release at or above `minimum`. */
export function isAtLeast(version: string, minimum: string): boolean {
  const a = parseRelease(version);
  const b = parseRelease(minimum);
  if (!a || !b) return false;
  for (let i = 0; i < 3; i += 1) {
    const left = a[i] ?? 0;
    const right = b[i] ?? 0;
    if (left !== right) return left > right;
  }
  return true;
}

/**
 * Ignores whose patched version is now published. Each one must be removed from pnpm-workspace.yaml
 * and replaced with an override to the patched version.
 */
export function resolvedIgnores(
  ignores: readonly AuditIgnore[],
  publishedVersions: Readonly<Record<string, readonly string[]>>,
): AuditIgnore[] {
  return ignores.filter((entry) =>
    (publishedVersions[entry.packageName] ?? []).some((version) =>
      isAtLeast(version, entry.patchedVersion),
    ),
  );
}

/** GHSA ids listed under `auditConfig.ignoreGhsas` in pnpm-workspace.yaml (simple YAML list). */
export function ignoredGhsasFromWorkspace(yaml: string): string[] {
  const lines = yaml.split(/\r?\n/);
  const start = lines.findIndex((line) => /^\s*ignoreGhsas:\s*$/.test(line));
  if (start === -1) return [];
  const ids: string[] = [];
  for (const line of lines.slice(start + 1)) {
    const item = /^\s*-\s*"?(GHSA-[\w-]+)"?\s*(#.*)?$/.exec(line);
    if (item?.[1]) {
      ids.push(item[1]);
      continue;
    }
    if (line.trim() === "" || line.trim().startsWith("#")) continue;
    break;
  }
  return ids;
}

/** Problems that keep the ignore list honest: every ignore documented here, and nothing extra. */
export function auditIgnoreProblems(
  ignores: readonly AuditIgnore[],
  workspaceGhsas: readonly string[],
  publishedVersions: Readonly<Record<string, readonly string[]>>,
): string[] {
  const problems: string[] = [];
  const documented = new Set(ignores.map((entry) => entry.ghsa));
  const configured = new Set(workspaceGhsas);
  for (const id of configured) {
    if (!documented.has(id))
      problems.push(
        `${id} is ignored in pnpm-workspace.yaml but not documented in lib/security/audit-ignores.ts.`,
      );
  }
  for (const id of documented) {
    if (!configured.has(id))
      problems.push(
        `${id} is documented in lib/security/audit-ignores.ts but not ignored in pnpm-workspace.yaml.`,
      );
  }
  for (const entry of resolvedIgnores(ignores, publishedVersions)) {
    problems.push(
      `${entry.packageName} ${entry.patchedVersion} is now on npm: remove ${entry.ghsa} from auditConfig.ignoreGhsas ` +
        `and add the override "${entry.packageName}@<${entry.patchedVersion}": ${entry.patchedVersion} instead.`,
    );
  }
  return problems;
}
