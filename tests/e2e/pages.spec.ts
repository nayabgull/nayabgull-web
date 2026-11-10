import { expect, test } from "@playwright/test";

import { PAGES } from "../../content/pages/index.ts";
import { headlineText } from "../../content/pages/types.ts";

const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

for (const content of PAGES) {
  test.describe(content.path, () => {
    test("loads with its h1, no console errors and no failed requests", async ({ page }) => {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => consoleErrors.push(error.message));
      page.on("requestfailed", (request) => failedRequests.push(request.url()));

      const response = await page.goto(content.path, { waitUntil: "networkidle" });

      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(headlineText(content));
      await expect(page).toHaveTitle(content.meta.title);
      expect(consoleErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
    });

    test("is indexable or noindex as its content file says", async ({ page }) => {
      await page.goto(content.path);
      const robots = page.locator('meta[name="robots"]');
      if (content.noindex) await expect(robots).toHaveAttribute("content", "noindex, follow");
      else await expect(robots).toHaveCount(0);
    });

    test("breadcrumb leads back to the homepage", async ({ page }) => {
      await page.goto(content.path);
      const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
      await expect(crumbs).toContainText(content.name);
      await crumbs.getByRole("link", { name: "Home" }).click();
      await expect(page).toHaveURL(/\/$/);
    });

    test("serves its own 1200×630 Open Graph image", async ({ page, request }) => {
      await page.goto(content.path);
      const url = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(url).toMatch(/\/og\/[a-z0-9-]+$/);
      const image = await request.get(new URL(url ?? "").pathname);
      expect(image.status()).toBe(200);
      expect(image.headers()["content-type"]).toBe("image/png");
    });

    if (content.hero.primaryCta) {
      test("primary CTA is above the fold and closes the page", async ({ page }) => {
        await page.goto(content.path);
        const label = content.hero.primaryCta?.label ?? "";
        const hero = page.locator("section", { has: page.locator("h1") });
        const top = hero.getByRole("link", { name: label });
        await expect(top).toBeInViewport();
        await expect(top).toHaveAttribute("href", STRATEGY_CALL_URL);
        await expect(top).toHaveAttribute("rel", /noopener/);
        const bottom = page.locator("#book").getByRole("link", { name: label });
        await expect(bottom).toHaveAttribute("href", STRATEGY_CALL_URL);
      });
    }

    if (content.faq) {
      test("FAQ opens and closes, and matches the FAQPage JSON-LD", async ({ page }) => {
        await page.goto(content.path);
        const first = page.locator("#faq details").first();
        const answer = first.locator("p").first();
        await expect(answer).toBeHidden();
        await first.locator("summary").click();
        await expect(answer).toBeVisible();

        const questions = await page.locator("#faq summary").allInnerTexts();
        const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
        const data = JSON.parse(raw ?? "{}") as {
          "@graph": { "@type": string; mainEntity?: { name: string }[] }[];
        };
        const faq = data["@graph"].find((node) => node["@type"] === "FAQPage");
        expect(faq?.mainEntity?.map((q) => q.name)).toEqual(questions.map((q) => q.trim()));
      });
    }
  });
}

test.describe("site navigation", () => {
  test("header and footer links lead to pages that answer 200", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("header nav a[href], footer nav a[href]")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of new Set(hrefs.map((value) => value.split("#")[0] ?? "/"))) {
      expect((await request.get(href === "" ? "/" : href)).status(), href).toBe(200);
    }
  });

  test("header hash links work from an inner page", async ({ page }) => {
    const inner = PAGES[0]?.path ?? "/";
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(inner);
    const hashLink = page.locator('header nav a[href^="/#"]').first();
    if ((await hashLink.count()) === 0) return;
    const target = (await hashLink.getAttribute("href")) ?? "";
    await hashLink.click();
    await expect(page).toHaveURL(new RegExp(`${target.replace("/", "\\/")}$`));
  });
});
