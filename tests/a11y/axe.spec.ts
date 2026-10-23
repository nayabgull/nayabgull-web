import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { ROUTES } from "../routes.ts";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

for (const route of ROUTES) {
  for (const colorScheme of ["light", "dark"] as const) {
    test.describe(`${route} (${colorScheme})`, () => {
      test.use({ colorScheme });

      test("has no axe-core violations at any impact level", async ({ page }) => {
        await page.goto(route, { waitUntil: "networkidle" });
        const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        const summary = results.violations.map(
          (v) => `${v.impact ?? "unknown"} · ${v.id}: ${v.help} (${v.nodes.length})`,
        );
        expect(summary).toEqual([]);
      });
    });
  }
}
