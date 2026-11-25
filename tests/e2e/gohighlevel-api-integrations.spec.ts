import { expect, test } from "@playwright/test";

const PATH = "/gohighlevel-agency/api-integrations";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("GoHighLevel API integrations page", () => {
  test("hero: Get a free demo jumps to the demo form, Book a free call opens Cal.com", async ({
    page,
  }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toContainText("GoHighLevel API");

    const form = hero.getByRole("form", { name: "Get a free demo" });
    await expect(form).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("gohighlevel");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(form.locator('input[name="source"]')).toHaveValue(PATH);

    await expect(hero.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
      "href",
      STRATEGY_CALL_URL,
    );
    await hero.getByRole("link", { name: "Get a free demo" }).click();
    await expect(page).toHaveURL(/#hero-quote$/);
    await expect(form).toBeInViewport();
  });

  test("closing band: a second demo form and the call button", async ({ page }) => {
    await page.goto(PATH);
    const closing = page.locator("#quote");
    const form = closing.getByRole("form", { name: "Request your free demo" });
    await expect(form.getByLabel("What you need")).toHaveValue("gohighlevel");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(page.getByRole("form")).toHaveCount(2);
    await expect(closing.getByRole("link", { name: "Book a free call" })).toBeVisible();
  });

  test("API and webhook picture: one labelled image that fits a 280 px phone", async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 700 });
    await page.goto(PATH);
    const picture = page.getByRole("img", { name: /through the API.*through webhooks/ });
    await expect(picture).toBeVisible();
    const fits = await picture.evaluate(
      (element) => element.scrollWidth <= element.clientWidth + 1,
    );
    expect(fits).toBe(true);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("API and webhook picture: lanes run side to side on desktop and stay still with reduced motion", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(PATH);
    const [left, right] = await page
      .locator("#what-it-is .twoway-end")
      .evaluateAll((items) =>
        items.map((item) => item.getBoundingClientRect().toJSON() as DOMRect),
      );
    expect(left && right && right.left > left.right).toBe(true);
    const moving = await page
      .locator("#what-it-is .twoway-dot")
      .evaluateAll((dots) => dots.filter((dot) => getComputedStyle(dot).animationName !== "none"));
    expect(moving).toHaveLength(0);
    await context.close();
  });

  test("comparison: a table on desktop, stacked cards with no sideways scroll on a phone", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const table = page.getByRole("table", { name: /Native integration vs Zapier or Make/ });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Question",
      "Native integration",
      "Zapier or Make",
      "Custom API build",
    ]);
    await page.setViewportSize({ width: 320, height: 740 });
    const fits = await page
      .locator("#options table")
      .evaluate((element) => element.scrollWidth <= element.clientWidth + 1);
    expect(fits).toBe(true);
  });

  test("breadcrumb goes up to the GoHighLevel hub, and the hub links back down", async ({
    page,
  }) => {
    await page.goto(PATH);
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await crumbs.getByRole("link", { name: "GoHighLevel agency" }).click();
    await expect(page).toHaveURL(/\/gohighlevel-agency$/);
    await page.locator("main").getByRole("link", { name: "GoHighLevel API integrations" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });

  test("header GoHighLevel menu and footer link to the page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const footer = page.getByRole("navigation", { name: "Footer" });
    await expect(
      footer.getByRole("link", { name: "GoHighLevel API integrations" }),
    ).toHaveAttribute("href", PATH);
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.locator("summary", { hasText: "GoHighLevel" }).click();
    await nav.getByRole("link", { name: "GoHighLevel API integrations" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });

  test("structured data: Service with no price, FAQPage and a 3-step trail", async ({ page }) => {
    await page.goto(PATH);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = (JSON.parse(raw ?? "{}") as { "@graph": Record<string, unknown>[] })["@graph"];
    const types = graph.map((node) => node["@type"]);
    for (const type of ["ProfessionalService", "WebSite", "BreadcrumbList", "Service", "FAQPage"]) {
      expect(types, type).toContain(type);
    }
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).not.toHaveProperty("offers");
    const trail = graph.find((node) => node["@type"] === "BreadcrumbList");
    expect(trail?.itemListElement).toHaveLength(3);
    await expect(page.locator("main")).not.toContainText("$");
  });

  test("FAQ: 7 questions, the ownership and time zone answers are visible", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#faq summary")).toHaveCount(7);
    await page.getByText("Do you work in US time zones?").click();
    await expect(page.getByText(/9 AM to 3 PM Eastern Time/)).toBeVisible();
  });
});
