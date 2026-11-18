import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  AUDIT_IGNORES,
  auditIgnoreProblems,
  ignoredGhsasFromWorkspace,
  isAtLeast,
  resolvedIgnores,
  type AuditIgnore,
} from "@/lib/security/audit-ignores.ts";

const PICOMATCH: AuditIgnore = {
  ghsa: "GHSA-fc5q-39xc-vjpf",
  packageName: "picomatch",
  patchedVersion: "4.0.8",
  reason: "test",
};

describe("audit ignores (quality-gates.md, deps job)", () => {
  it("compares stable releases and ignores pre-releases", () => {
    expect(isAtLeast("4.0.8", "4.0.8")).toBe(true);
    expect(isAtLeast("4.1.0", "4.0.8")).toBe(true);
    expect(isAtLeast("5.0.0", "4.0.8")).toBe(true);
    expect(isAtLeast("4.0.7", "4.0.8")).toBe(false);
    expect(isAtLeast("3.9.9", "4.0.8")).toBe(false);
    expect(isAtLeast("4.0.8-rc.1", "4.0.8")).toBe(false);
    expect(isAtLeast("4.0.8", "not-a-version")).toBe(false);
  });

  it("keeps the ignore while no patched release is published", () => {
    expect(resolvedIgnores([PICOMATCH], { picomatch: ["2.3.1", "4.0.6", "4.0.7"] })).toEqual([]);
    expect(resolvedIgnores([PICOMATCH], {})).toEqual([]);
  });

  it("fails once the patched release is on npm", () => {
    const problems = auditIgnoreProblems([PICOMATCH], ["GHSA-fc5q-39xc-vjpf"], {
      picomatch: ["4.0.7", "4.0.8"],
    });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("picomatch 4.0.8 is now on npm");
    expect(problems[0]).toContain('"picomatch@<4.0.8": 4.0.8');
  });

  it("requires every ignore to be documented and configured", () => {
    expect(auditIgnoreProblems([PICOMATCH], [], {})).toEqual([
      "GHSA-fc5q-39xc-vjpf is documented in lib/security/audit-ignores.ts but not ignored in pnpm-workspace.yaml.",
    ]);
    expect(auditIgnoreProblems([], ["GHSA-aaaa-bbbb-cccc"], {})).toEqual([
      "GHSA-aaaa-bbbb-cccc is ignored in pnpm-workspace.yaml but not documented in lib/security/audit-ignores.ts.",
    ]);
  });

  it("reads ignoreGhsas from pnpm-workspace.yaml", () => {
    const yaml = [
      "overrides:",
      "  tmp@<0.2.6: 0.2.7",
      "auditConfig:",
      "  ignoreGhsas:",
      "    # comment",
      '    - "GHSA-fc5q-39xc-vjpf" # picomatch',
      "    - GHSA-aaaa-bbbb-cccc",
      "",
      "other: true",
    ].join("\n");
    expect(ignoredGhsasFromWorkspace(yaml)).toEqual(["GHSA-fc5q-39xc-vjpf", "GHSA-aaaa-bbbb-cccc"]);
    expect(ignoredGhsasFromWorkspace("overrides: {}")).toEqual([]);
  });

  it("matches the real pnpm-workspace.yaml", () => {
    // Vitest runs from the repo root; jsdom gives import.meta.url a non-file scheme.
    const workspace = readFileSync(join(process.cwd(), "pnpm-workspace.yaml"), "utf8");
    expect(auditIgnoreProblems(AUDIT_IGNORES, ignoredGhsasFromWorkspace(workspace), {})).toEqual(
      [],
    );
  });
});
