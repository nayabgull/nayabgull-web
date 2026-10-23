import { describe, expect, it } from "vitest";

import {
  BUNDLE_BUDGET,
  checkRoute,
  frameworkFiles,
  kb,
  manifestPath,
  parseBaseline,
  splitRoute,
} from "@/lib/perf/bundle-budget.ts";

const KB = 1024;
const FRAMEWORK = new Set(["static/chunks/react-dom.js", "static/chunks/turbopack-x.js"]);

describe("bundle budget", () => {
  it("maps script URLs to build-manifest paths", () => {
    expect(manifestPath("http://localhost:3000/_next/static/chunks/a.js?v=1")).toBe(
      "static/chunks/a.js",
    );
    expect(manifestPath("/_next/static/chunks/b.js#x")).toBe("static/chunks/b.js");
  });

  it("reads rootMainFiles from the build manifest", () => {
    expect(frameworkFiles({ rootMainFiles: ["static/chunks/a.js", 3] })).toEqual(
      new Set(["static/chunks/a.js"]),
    );
  });

  it("refuses a manifest without rootMainFiles", () => {
    expect(() => frameworkFiles({ rootMainFiles: [] })).toThrow(/rootMainFiles/);
    expect(() => frameworkFiles(null)).toThrow(/pnpm build/);
  });

  it("splits loaded scripts into framework and app-owned bytes", () => {
    const route = splitRoute(
      [
        { url: "http://localhost:3000/_next/static/chunks/react-dom.js", gzip: 70 * KB },
        { url: "http://localhost:3000/_next/static/chunks/turbopack-x.js", gzip: 4 * KB },
        { url: "http://localhost:3000/_next/static/chunks/page.js", gzip: 6 * KB },
      ],
      FRAMEWORK,
    );
    expect(route).toEqual({ framework: 74 * KB, app: 6 * KB, total: 80 * KB });
  });

  it("passes a route inside every budget", () => {
    expect(checkRoute({ framework: 128 * KB, app: 9 * KB, total: 137 * KB })).toEqual([]);
  });

  it("fails each budget that is missed", () => {
    const rules = checkRoute({ framework: 136 * KB, app: 31 * KB, total: 167 * KB }).map(
      (issue) => issue.rule,
    );
    expect(rules).toEqual(["framework-js", "app-js", "first-load-js"]);
  });

  it("fails growth over 10 KB vs main and allows exactly 10 KB", () => {
    const base = { framework: 128 * KB, app: 5 * KB, total: 133 * KB };
    expect(checkRoute({ framework: 128 * KB, app: 15 * KB, total: 143 * KB }, base)).toEqual([]);
    const issues = checkRoute({ framework: 128 * KB, app: 16 * KB, total: 144 * KB }, base);
    expect(issues).toEqual([
      { rule: "bundle-growth", message: "Grew 11.0 KB vs main (max 10.0 KB)." },
    ]);
  });

  it("keeps the approved limits", () => {
    expect(BUNDLE_BUDGET).toEqual({
      framework: 135 * KB,
      app: 30 * KB,
      total: 165 * KB,
      growth: 10 * KB,
    });
    expect(kb(1536)).toBe("1.5 KB");
  });

  it("reads only well-formed baseline entries", () => {
    expect(
      parseBaseline({ "/": { framework: 1, app: 2, total: 3 }, "/old": 137, "/bad": null }),
    ).toEqual({ "/": { framework: 1, app: 2, total: 3 } });
    expect(parseBaseline("nope")).toEqual({});
  });
});
