import { describe, expect, it } from "vitest";

import { allHrefs, checkLinkGraph, clickDepths, internalTargets } from "@/lib/seo/link-graph.ts";

const graph = (entries: Record<string, string[]>) => new Map(Object.entries(entries));

describe("allHrefs", () => {
  it("reads links in the header, main and footer", () => {
    const html =
      '<header><a href="/a">A</a></header><main><a href="/b">B</a><a>none</a></main><footer><a href="/c">C</a></footer>';
    expect(allHrefs(html)).toEqual(["/a", "/b", "/c"]);
  });
});

describe("internalTargets", () => {
  it("keeps internal paths only, without query, fragment, trailing slash or self-links", () => {
    expect(
      internalTargets("/pricing", [
        "/about",
        "/about/",
        "/about#team",
        "https://nayabgull.com/contact?from=pricing",
        "/pricing",
        "https://cal.com/nayab-gull/strategy-call",
        "//cdn.example.com/x.js",
        "mailto:hello@example.com",
      ]),
    ).toEqual(["/about", "/contact"]);
  });
});

describe("clickDepths", () => {
  it("counts the shortest number of clicks from the homepage", () => {
    const depths = clickDepths(
      graph({ "/": ["/a", "/b"], "/a": ["/c"], "/b": ["/a"], "/c": ["/d"], "/d": [] }),
    );
    expect(Object.fromEntries(depths)).toEqual({ "/": 0, "/a": 1, "/b": 1, "/c": 2, "/d": 3 });
  });
});

describe("checkLinkGraph", () => {
  it("passes when every page is linked and within 3 clicks", () => {
    expect(checkLinkGraph(graph({ "/": ["/a"], "/a": ["/", "/b"], "/b": ["/a"] }))).toEqual([]);
  });

  it("fails a page 4 clicks deep", () => {
    const issues = checkLinkGraph(
      graph({ "/": ["/a"], "/a": ["/b"], "/b": ["/c"], "/c": ["/d"], "/d": [] }),
    );
    expect(issues).toEqual([
      { rule: "click-depth", message: "/d is 4 clicks from the homepage (max 3)." },
    ]);
  });

  it("fails an orphan page that nothing links to", () => {
    const issues = checkLinkGraph(graph({ "/": ["/a"], "/a": [], "/lost": ["/"] }));
    expect(issues.map((issue) => issue.rule)).toEqual(["orphan-page", "click-depth"]);
    expect(issues[1]?.message).toBe("/lost is not reachable from the homepage (max 3).");
  });
});
