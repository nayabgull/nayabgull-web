import { describe, expect, it } from "vitest";

import { lcpReport, shortName } from "@/lib/perf/lcp-report.ts";

const lhr = {
  requestedUrl: "http://localhost:3000/about",
  audits: {
    "largest-contentful-paint": { numericValue: 2519.8 },
    metrics: {
      details: {
        items: [{ observedFirstContentfulPaint: 180, observedLargestContentfulPaint: 190 }],
      },
    },
    "largest-contentful-paint-element": {
      details: {
        items: [
          { items: [{ node: { snippet: '<p class="lede">' } }] },
          {
            items: [
              { phase: "TTFB", timing: 455.4 },
              { phase: "Render Delay", timing: 2064.4 },
            ],
          },
        ],
      },
    },
    "network-requests": {
      details: {
        items: [
          { url: "http://localhost:3000/about", resourceType: "Document", networkEndTime: 40 },
          {
            url: "http://localhost:3000/_next/static/chunks/a.js?v=1",
            resourceType: "Script",
            networkEndTime: 120,
          },
          {
            url: "http://localhost:3000/_next/static/chunks/b.js",
            resourceType: "Script",
            networkEndTime: 230,
          },
        ],
      },
    },
    "cumulative-layout-shift": { numericValue: 0.1124 },
    "layout-shifts": {
      details: {
        items: [
          {
            node: { snippet: '<h1 id="hero-heading">' },
            score: 0.0912,
            subItems: {
              items: [
                {
                  cause: "Web font loaded",
                  extra: { type: "url", value: "http://x/media/sora.woff2" },
                },
                { cause: "Media element lacking an explicit size", extra: { snippet: "<img>" } },
              ],
            },
          },
          { score: 0.021 },
        ],
      },
    },
    "main-thread-tasks": {
      details: {
        items: [
          { startTime: 50, duration: 12 },
          { startTime: 100, duration: 4 },
          { startTime: 400, duration: 60 },
        ],
      },
    },
  },
};

describe("lcp report", () => {
  it("names a script by its last path segment", () => {
    expect(shortName("http://x/_next/static/chunks/a.js?v=1")).toBe("a.js");
    expect(shortName("http://x/")).toBe("http://x/");
  });

  it("prints the element, phases, observed timings, scripts and long tasks", () => {
    expect(lcpReport(lhr)).toEqual([
      "LCP http://localhost:3000/about: 2520 ms",
      '  element <p class="lede">',
      "  phases TTFB 455, Render Delay 2064",
      "  observed FCP 180 ms, LCP 190 ms",
      "  scripts end (ms) a.js 120 (before LCP), b.js 230",
      "  main-thread tasks >= 10 ms near LCP (start+duration) 50+12",
      "  CLS 0.112" +
        '\n    shift 0.091 <h1 id="hero-heading"> (Web font loaded sora.woff2; Media element lacking an explicit size)' +
        "\n    shift 0.021 ?",
    ]);
  });

  it("copes with a result that has none of the audits", () => {
    expect(lcpReport({})).toEqual([
      "LCP ?: ? ms",
      "  element ?",
      "  phases ?",
      "  observed FCP ? ms, LCP ? ms",
      "  scripts end (ms) none",
      "  main-thread tasks >= 10 ms near LCP (start+duration) none",
      "  CLS ?",
    ]);
  });
});
