import { expect, test } from "@playwright/test";

const PATH = "/gohighlevel-agency/custom-crm-development";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("custom CRM development page", () => {
  test("hero: Get a free demo is the primary CTA and jumps to the demo form", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText("Custom CRM Development Services");

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

  test("closing section: a second demo form and the call button", async ({ page }) => {
    await page.goto(PATH);
    const closing = page.locator("#quote");
    const form = closing.getByRole("form", { name: "Request your free demo" });
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(form.getByRole("button", { name: "Get my free demo" })).toBeVisible();
    await expect(page.getByRole("form")).toHaveCount(2);
    await expect(closing.getByRole("link", { name: "Book a free call" })).toBeVisible();
  });

  test("the comparison table stays inside a phone screen", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(PATH);
    await expect(page.locator("#compare table")).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("breadcrumb goes up to the GoHighLevel hub, and the hub links back down", async ({
    page,
  }) => {
    await page.goto(PATH);
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await crumbs.getByRole("link", { name: "GoHighLevel agency" }).click();
    await expect(page).toHaveURL(/\/gohighlevel-agency$/);
    await page
      .locator("main")
      .getByRole("link", { name: "Custom CRM development services" })
      .click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });

  test("structured data: Service for the US with no price, FAQPage and a 3-step trail", async ({
    page,
  }) => {
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
});
