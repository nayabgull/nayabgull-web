// Budgets from docs/rules/quality-gates.md. Every assertion is "error" — never "warn".
const base = (process.env.AUDIT_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
// Keep in sync with lib/seo/routes.ts (this CommonJS file cannot import TypeScript).
const routes = ["/", "/gohighlevel-agency"];

const MB = 1024 * 1024;

function assertions(minPerformance) {
  return {
    "categories:performance": [
      "error",
      { minScore: minPerformance, aggregationMethod: "median-run" },
    ],
    "categories:accessibility": ["error", { minScore: 1, aggregationMethod: "median-run" }],
    "categories:best-practices": ["error", { minScore: 1, aggregationMethod: "median-run" }],
    "categories:seo": ["error", { minScore: 1, aggregationMethod: "median-run" }],
    "largest-contentful-paint": [
      "error",
      { maxNumericValue: 2000, aggregationMethod: "median-run" },
    ],
    "cumulative-layout-shift": [
      "error",
      { maxNumericValue: 0.05, aggregationMethod: "median-run" },
    ],
    "total-blocking-time": ["error", { maxNumericValue: 150, aggregationMethod: "median-run" }],
    "first-contentful-paint": ["error", { maxNumericValue: 1500, aggregationMethod: "median-run" }],
  };
}

/** Homepage may weigh 1.2 MB, every other page 1 MB. */
function weight(maxBytes) {
  return {
    "total-byte-weight": ["error", { maxNumericValue: maxBytes, aggregationMethod: "median-run" }],
  };
}

// LIGHTHOUSE_FORM_FACTOR selects the form factor: "mobile" (default) or "desktop". scripts/lhci.ts runs both.
const preset = process.env.LIGHTHOUSE_FORM_FACTOR === "desktop" ? "desktop" : "mobile";
const minPerformance = preset === "desktop" ? 0.98 : 0.95;
const outputDir = `reports/lighthouse/${preset}`;

module.exports = {
  ci: {
    collect: {
      url: routes.map((route) => `${base}${route}`),
      numberOfRuns: 3,
      settings: preset === "desktop" ? { preset: "desktop" } : {},
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: `^${base}/?$`,
          assertions: { ...assertions(minPerformance), ...weight(1.2 * MB) },
        },
        {
          matchingUrlPattern: `^${base}/.+`,
          assertions: { ...assertions(minPerformance), ...weight(1 * MB) },
        },
      ],
    },
    upload: { target: "filesystem", outputDir },
  },
};
