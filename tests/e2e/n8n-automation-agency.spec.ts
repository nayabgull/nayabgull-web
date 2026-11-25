import { expect, test } from "@playwright/test";

const PATH = "/ai-automation-agency/n8n-automation-agency";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("n8n automation agency page", () => {
  test("hero: Get a free demo jumps to the demo form, Book a free call opens Cal.com", async ({
    page,
  }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toContainText("n8n automation agency");

    const form = hero.getByRole("form", { name: "Get a free demo" });
    await expect(form).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("ai-automation");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(form.locator('input[name="source"]')).toHaveValue(PATH);
    await expect(form.getByRole("button", { name: "Get my free demo" })).toBeVisible();

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
    const form = closing.getByRole("form", { name: "Request your custom demo" });
    await expect(form.getByLabel("What you need")).toHaveValue("ai-automation");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(closing.getByRole("link", { name: "Book a free call" })).toBeVisible();
    await expect(page.getByRole("form")).toHaveCount(2);
  });

  test("comparison: n8n, Make and Zapier side by side, no sideways scroll on a phone", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const table = page.getByRole("table", { name: /n8n vs Make vs Zapier/ });
    await expect(table.getByRole("columnheader")).toHaveText(["Question", "n8n", "Make", "Zapier"]);
    await expect(table.getByRole("rowheader")).toHaveText([
      "Cost",
      "Self-hosting",
      "Flexibility",
      "Ease of use",
    ]);

    await page.setViewportSize({ width: 320, height: 740 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("breadcrumb goes up to the AI automation hub, and the hub links back down", async ({
    page,
  }) => {
    await page.goto(PATH);
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await crumbs.getByRole("link", { name: "AI automation agency" }).click();
    await expect(page).toHaveURL(/\/ai-automation-agency$/);
    await page
      .locator("#related")
      .getByRole("link", { name: "n8n automation agency", exact: true })
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
