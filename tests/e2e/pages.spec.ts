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
      test("primary CTA is above the fold", async ({ page }) => {
        await page.goto(content.path);
        const hero = page.locator("section", { has: page.locator("h1") });
        const primary = content.hero.primaryCta ?? { label: "", href: "" };
        const top = hero.getByRole("link", { name: primary.label });
        await expect(top).toBeInViewport();
        await expect(top).toHaveAttribute("href", primary.href);
        // Every hero also offers the call (the primary CTA everywhere except on a demo page).
        const call = hero.getByRole("link", { name: "Book a free call" });
        await expect(call).toBeInViewport();
        await expect(call).toHaveAttribute("href", STRATEGY_CALL_URL);
        await expect(call).toHaveAttribute("rel", /noopener/);
      });
    }

    test("ends with the quote form section and a Book a free call button", async ({ page }) => {
      await page.goto(content.path);
      const closing = page.locator("main > section").last();
      await expect(closing).toHaveAttribute("id", "quote");
      await expect(closing.getByRole("form")).toBeVisible();
      await expect(closing.locator('input[name="source"]')).toHaveValue(content.path);
      await expect(closing.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
        "href",
        STRATEGY_CALL_URL,
      );
    });

    test(`hero ${content.hero.form ? "has" : "has no"} quote form card`, async ({ page }) => {
      await page.goto(content.path);
      const hero = page.locator("section", { has: page.locator("h1") });
      await expect(hero.getByRole("form")).toHaveCount(content.hero.form ? 1 : 0);
      if (!content.hero.form) return;
      await expect(hero.getByRole("form", { name: content.hero.form.heading })).toBeVisible();
      await expect(hero.locator('input[name="source"]')).toHaveValue(content.path);
    });

    test("section headers are centered, with the content below them", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(content.path);
      const offsets = await page.locator("main > section[id] h2").evaluateAll((headings) =>
        headings
          .filter((heading) => heading.id.endsWith("-heading") && !heading.closest(".glass"))
          .map((heading) => {
            const box = heading.getBoundingClientRect();
            return Math.abs(box.left + box.width / 2 - window.innerWidth / 2);
          }),
      );
      expect(offsets.length).toBeGreaterThan(0);
      expect(offsets.filter((offset) => offset > 2)).toEqual([]);
      const container = await page
        .locator("main > section[id] > div")
        .first()
        .evaluate((el) => el.getBoundingClientRect().width);
      expect(container).toBeLessThanOrEqual(1200);
    });

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

const ALL_PUBLIC = ["/", "/contact", ...PAGES.map((page) => page.path)];

test.describe("site navigation", () => {
  for (const path of ALL_PUBLIC) {
    test(`every header and footer link on ${path} resolves`, async ({ page, request }) => {
      await page.goto(path);
      const hrefs = await page
        .locator("header a[href], footer a[href]")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
      const internal = [...new Set(hrefs.filter((href) => href.startsWith("/")))];
      // Real pages only: no "/#section" links.
      expect(internal.filter((href) => href.includes("#"))).toEqual([]);
      expect(internal.length).toBeGreaterThanOrEqual(ALL_PUBLIC.length);
      for (const href of internal) expect((await request.get(href)).status(), href).toBe(200);
    });
  }

  test("the footer links every public page", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("footer nav a[href]")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    for (const path of ALL_PUBLIC) expect(hrefs, path).toContain(path);
  });

  test("desktop: the Services dropdown opens, closes on Escape and leads to its pages", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const services = nav.locator("summary", { hasText: "Services" });
    const pricing = nav.getByRole("link", { name: "Pricing" });
    await expect(pricing).toBeHidden();

    await services.focus();
    await page.keyboard.press("Enter");
    await expect(pricing).toBeVisible();
    await expect(nav.getByRole("link", { name: "AI agent development" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "n8n automation agency" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Custom CRM development" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Web design and development" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Hire a full stack developer" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(pricing).toBeHidden();
    await expect(services).toBeFocused();

    await services.click();
    await pricing.click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(pricing).toBeHidden();
  });

  test("desktop: every top-level header link opens its page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const links = [
      ["AI Automation", "/ai-automation-agency"],
      ["GoHighLevel", "/gohighlevel-agency"],
      ["About", "/about"],
      ["Contact", "/contact"],
    ] as const;
    for (const [name, path] of links) {
      await page.goto("/");
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.locator("h1")).toHaveCount(1);
    }
  });

  test("mobile: the menu button opens the menu, and a link closes it", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    const button = page.locator('header summary[aria-label="Menu"]');
    const menu = page.getByRole("navigation", { name: "Menu" });
    await expect(menu).toBeHidden();

    await button.click();
    await expect(menu).toBeVisible();
    for (const name of ["Pricing", "AI Automation", "GoHighLevel", "About", "Contact"]) {
      await expect(menu.getByRole("link", { name, exact: true })).toBeVisible();
    }
    await expect(menu.getByRole("link", { name: "Book a free call" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await button.click();
    await menu.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(menu).toBeHidden();
  });

  test("the sticky header button and the mobile bottom bar are on every page", async ({ page }) => {
    for (const path of ALL_PUBLIC) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);
      const header = page.locator("header");
      await expect(header.getByRole("link", { name: "Book a free call" }).first()).toBeVisible();
      await expect(header).toHaveCSS("position", "sticky");

      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      const bar = page.locator("body > div.fixed");
      await expect(bar).toBeAttached();
      await expect(bar.locator('a[href="#quote"]')).toHaveCount(1);
      await expect(page.locator("#quote")).toHaveCount(1);
    }
  });
});
