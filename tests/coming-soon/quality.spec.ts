import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { findLayoutProblems } from "../responsive/layout-checks.ts";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];
const WIDTHS = [280, 375, 768, 1440, 2560];

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`coming-soon page (${colorScheme})`, () => {
    test.use({ colorScheme });

    test("has no axe-core violations at any impact level", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      expect(
        results.violations.map(
          (v) => `${v.impact ?? "unknown"} · ${v.id}: ${v.help} (${v.nodes.length})`,
        ),
      ).toEqual([]);
    });

    for (const width of WIDTHS) {
      test(`has no layout problems at ${width} px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/", { waitUntil: "networkidle" });
        const problems = await findLayoutProblems(page);
        expect.soft(problems.horizontalOverflow, "horizontal scroll").toBe(false);
        expect.soft(problems.overlapping, "overlapping interactive elements").toEqual([]);
        expect.soft(problems.clipped, "clipped text").toEqual([]);
        expect.soft(problems.smallTargets, "tap targets under 44 × 44 px").toEqual([]);
      });
    }
  });
}
