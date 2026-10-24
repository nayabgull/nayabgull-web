import type { Issue } from "../seo/issue.ts";

/**
 * First-load JS budgets from docs/rules/quality-gates.md (gzip bytes).
 * Framework = the chunks Next.js loads on every route (`rootMainFiles` in .next/build-manifest.json:
 * react-dom, the Next.js runtime, the Turbopack runtime). App = every other script the route loads.
 */
export const BUNDLE_BUDGET = {
  framework: 135 * 1024,
  app: 30 * 1024,
  total: 165 * 1024,
  growth: 10 * 1024,
} as const;

export interface RouteBundle {
  framework: number;
  app: number;
  total: number;
}

export interface LoadedScript {
  /** Request URL or path, e.g. http://localhost:3000/_next/static/chunks/abc.js */
  url: string;
  gzip: number;
}

/** Turns a script URL into the form used by the build manifest ("static/chunks/abc.js"). */
export function manifestPath(url: string): string {
  const path = url.replace(/^[a-z]+:\/\/[^/]+/i, "").replace(/[?#].*$/, "");
  return path.replace(/^\/_next\//, "");
}

/** Framework chunk paths from the parsed contents of .next/build-manifest.json. */
export function frameworkFiles(buildManifest: unknown): Set<string> {
  const files =
    typeof buildManifest === "object" && buildManifest !== null
      ? (buildManifest as { rootMainFiles?: unknown }).rootMainFiles
      : undefined;
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("build-manifest.json has no rootMainFiles; run `pnpm build` first.");
  }
  return new Set(files.filter((file): file is string => typeof file === "string"));
}

/** Splits the scripts one route loaded into framework and app-owned bytes. */
export function splitRoute(
  scripts: readonly LoadedScript[],
  framework: ReadonlySet<string>,
): RouteBundle {
  let frameworkBytes = 0;
  let appBytes = 0;
  for (const script of scripts) {
    if (framework.has(manifestPath(script.url))) frameworkBytes += script.gzip;
    else appBytes += script.gzip;
  }
  return { framework: frameworkBytes, app: appBytes, total: frameworkBytes + appBytes };
}

export const kb = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KB`;

/** Every budget the route misses; `baseline` is the same route measured on main. */
export function checkRoute(current: RouteBundle, baseline?: RouteBundle): Issue[] {
  const issues: Issue[] = [];
  const limits = [
    ["framework-js", "framework", "framework JS"],
    ["app-js", "app", "app-owned first-load JS"],
    ["first-load-js", "total", "total first-load JS"],
  ] as const;
  for (const [rule, key, label] of limits) {
    if (current[key] > BUNDLE_BUDGET[key]) {
      issues.push({
        rule,
        message: `${kb(current[key])} ${label} (max ${kb(BUNDLE_BUDGET[key])}).`,
      });
    }
  }
  if (baseline && current.total - baseline.total > BUNDLE_BUDGET.growth) {
    issues.push({
      rule: "bundle-growth",
      message: `Grew ${kb(current.total - baseline.total)} vs main (max ${kb(BUNDLE_BUDGET.growth)}).`,
    });
  }
  return issues;
}

/** Reads a baseline written by `check-bundle --out`; anything else counts as no baseline. */
export function parseBaseline(json: unknown): Record<string, RouteBundle> {
  if (typeof json !== "object" || json === null) return {};
  const result: Record<string, RouteBundle> = {};
  for (const [path, value] of Object.entries(json)) {
    const entry = value as Partial<RouteBundle> | null;
    if (
      typeof entry?.framework === "number" &&
      typeof entry.app === "number" &&
      typeof entry.total === "number"
    ) {
      result[path] = { framework: entry.framework, app: entry.app, total: entry.total };
    }
  }
  return result;
}
