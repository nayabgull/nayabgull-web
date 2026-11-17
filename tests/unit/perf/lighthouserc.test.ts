import { execFileSync } from "node:child_process";

import { describe, expect, it } from "vitest";

import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from "@/lib/seo/routes.ts";

const BASE = "http://localhost:3000";

interface Collect {
  url: string[];
  settings: { skipAudits?: string[]; preset?: string; throttlingMethod?: string };
}

/** Loads lighthouserc.cjs in a fresh Node process, the way lhci does, for one route set. */
function load(routeSet: "indexable" | "noindex", formFactor = "mobile"): Collect {
  const json = execFileSync(
    process.execPath,
    ["-e", 'process.stdout.write(JSON.stringify(require("./lighthouserc.cjs").ci.collect))'],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        AUDIT_BASE_URL: BASE,
        LIGHTHOUSE_ROUTE_SET: routeSet,
        LIGHTHOUSE_FORM_FACTOR: formFactor,
      },
    },
  );
  return JSON.parse(json) as Collect;
}

const paths = (collect: Collect) => collect.url.map((url) => url.slice(BASE.length));

describe("lighthouserc.cjs", () => {
  it("audits every indexable route with no skipped audits", () => {
    const collect = load("indexable");
    expect(paths(collect)).toEqual([...INDEXABLE_ROUTES]);
    expect(collect.settings).toEqual({ throttlingMethod: "devtools" });
  });

  it("audits every noindex route and skips only is-crawlable there", () => {
    const collect = load("noindex");
    expect(paths(collect)).toEqual([...NOINDEX_ROUTES]);
    expect(collect.settings).toEqual({
      throttlingMethod: "devtools",
      skipAudits: ["is-crawlable"],
    });
  });

  it("keeps the desktop preset and devtools throttling for both route sets", () => {
    expect(load("indexable", "desktop").settings).toEqual({
      throttlingMethod: "devtools",
      preset: "desktop",
    });
    expect(load("noindex", "desktop").settings).toEqual({
      throttlingMethod: "devtools",
      preset: "desktop",
      skipAudits: ["is-crawlable"],
    });
  });
});
