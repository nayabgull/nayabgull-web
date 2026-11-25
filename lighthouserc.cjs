// Budgets from docs/rules/quality-gates.md. Every assertion is "error" — never "warn".
const base = (process.env.AUDIT_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
// Keep in sync with INDEXABLE_ROUTES and NOINDEX_ROUTES in lib/seo/routes.ts (this CommonJS file
// cannot import TypeScript; tests/unit/perf/lighthouserc.test.ts checks it).
const indexableRoutes = [
  "/",
  "/gohighlevel-agency",
  "/gohighlevel-agency/workflows-automation",
  "/gohighlevel-agency/custom-crm-development",
  "/gohighlevel-agency/api-integrations",
  "/ai-automation-agency",
  "/ai-automation-agency/ai-agent-development",
  "/ai-automation-agency/n8n-automation-agency",
  "/ai-automation-agency/ai-receptionist-for-small-business",
  "/ai-automation-agency/business-process-automation-services",
  "/ai-automation-agency/ai-chatbot-development",
  "/industries/roofing-hvac-website-design",
  "/industries/contractor-website-design",
  "/industries/law-firm-website-design",
  "/industries/real-estate-website-design",
  "/industries/dental-medical-website-design",
  "/industries",
  "/services/web-design-development",
  "/services/nextjs-react-development",
  "/services/wordpress-development",
  "/hire-full-stack-developer",
  "/pricing",
  "/about",
  "/contact",
];
// Legal pages carry `noindex, follow` on purpose (seo.md §7), so Lighthouse's "is-crawlable" audit
// can never pass on them. They run separately with only that audit skipped; every other audit and
// budget is the same (approved by Nayab 2026-11-17, quality-gates.md).
const noindexRoutes = ["/privacy-policy", "/terms"];

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
// LIGHTHOUSE_ROUTE_SET selects the routes: "indexable" (default) or "noindex". scripts/lhci.ts runs both.
const noindex = process.env.LIGHTHOUSE_ROUTE_SET === "noindex";
const routes = noindex ? noindexRoutes : indexableRoutes;
const outputDir = `reports/lighthouse/${preset}${noindex ? "-noindex" : ""}`;

module.exports = {
  ci: {
    collect: {
      url: routes.map((route) => `${base}${route}`),
      numberOfRuns: 3,
      settings: {
        // Real (DevTools) network and CPU throttling instead of the Lantern simulation, which
        // counts every script that loaded before the first paint into LCP (quality-gates.md).
        throttlingMethod: "devtools",
        ...(preset === "desktop" ? { preset: "desktop" } : {}),
        ...(noindex ? { skipAudits: ["is-crawlable"] } : {}),
      },
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
