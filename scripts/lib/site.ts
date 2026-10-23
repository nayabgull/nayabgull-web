import type { Issue } from "../../lib/seo/issue.ts";
import { parseSitemap } from "../../lib/seo/site-rules.ts";
import { ROUTES } from "../../tests/routes.ts";

export const BASE_URL = (process.env.AUDIT_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export interface Fetched {
  status: number;
  headers: Record<string, string>;
  body: string;
}

export async function fetchPath(path: string): Promise<Fetched> {
  const response = await fetch(`${BASE_URL}${path}`, { redirect: "manual" });
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return { status: response.status, headers, body: await response.text() };
}

/** Text of a path, or undefined when it does not answer 200. */
export async function fetchOptional(path: string): Promise<string | undefined> {
  const page = await fetchPath(path);
  return page.status === 200 ? page.body : undefined;
}

/** Routes to audit: the fixed list in tests/routes.ts plus everything in /sitemap.xml. */
export async function discoverPaths(): Promise<string[]> {
  // With no server (or no sitemap yet) the fixed list still gets audited; page fetches report the outage.
  const sitemap = await fetchOptional("/sitemap.xml").catch(() => undefined);
  const { paths } = parseSitemap(sitemap);
  return [...new Set([...ROUTES, ...paths])].sort();
}

export interface PageResult {
  path: string;
  issues: Issue[];
}

/** Prints a per-page report and returns the process exit code (1 when any rule failed). */
export function report(title: string, results: readonly PageResult[]): number {
  const failed = results.filter((r) => r.issues.length > 0);
  console.log(`\n${title}: checked against ${BASE_URL}`);
  for (const result of results) {
    console.log(`\n${result.issues.length === 0 ? "PASS" : "FAIL"}  ${result.path}`);
    for (const issue of result.issues) console.log(`  ✗ [${issue.rule}] ${issue.message}`);
  }
  const total = failed.reduce((sum, r) => sum + r.issues.length, 0);
  console.log(
    `\n${title}: ${results.length - failed.length}/${results.length} passed, ${total} issue(s).`,
  );
  return failed.length === 0 ? 0 : 1;
}

/** Runs an audit and turns a thrown error (for example, no server running) into a clear failure. */
export async function run(title: string, audit: () => Promise<PageResult[]>): Promise<void> {
  try {
    process.exitCode = report(title, await audit());
  } catch (error) {
    console.error(`${title} could not run against ${BASE_URL}: ${String(error)}`);
    console.error("Start the production build first: pnpm build && pnpm start");
    process.exitCode = 1;
  }
}
