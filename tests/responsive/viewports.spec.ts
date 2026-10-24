import { expect, test } from "@playwright/test";

import { ROUTES } from "../routes.ts";

import { findLayoutProblems } from "./layout-checks.ts";
import { viewportMatrix } from "./viewports.ts";

const slug = (route: string): string =>
  route === "/" ? "home" : route.slice(1).replace(/\//g, "_");

for (const route of ROUTES) {
  for (const colorScheme of ["light", "dark"] as const) {
    for (const viewport of viewportMatrix()) {
      test.describe(`${route} @ ${viewport.label} (${colorScheme})`, () => {
        test.use({ viewport: { width: viewport.width, height: viewport.height }, colorScheme });

        test("has no layout problems and matches the approved snapshot", async ({ page }) => {
          await page.goto(route, { waitUntil: "networkidle" });
          await page.evaluate(() => document.fonts.ready);

          const problems = await findLayoutProblems(page);
          expect.soft(problems.horizontalOverflow, "horizontal scroll").toBe(false);
          expect.soft(problems.overlapping, "overlapping interactive elements").toEqual([]);
          expect.soft(problems.clipped, "clipped text").toEqual([]);
          expect.soft(problems.smallTargets, "tap targets under 44 × 44 px").toEqual([]);

          await expect(page).toHaveScreenshot(
            `${slug(route)}-${viewport.label}-${colorScheme}.png`,
            {
              fullPage: true,
            },
          );
        });
      });
    }
  }
}
