import { expect, test } from "@playwright/test";

const PATH = "/ai-automation-agency/business-process-automation-services";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("Business process automation services page", () => {
  test("hero: Get a free demo is the primary CTA and jumps to the demo form", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText("Business Process Automation Services");

    const form = hero.getByRole("form", { name: "Get a free demo" });
    await expect(form).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("ai-automation");
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
    await expect(form.getByLabel("What you need")).toHaveValue("ai-automation");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(closing.getByRole("link", { name: "Book a free call" })).toBeVisible();
    await expect(page.getByRole("form")).toHaveCount(2);
  });

  test("six workflow cards, a before/after table that stacks on phones, four steps", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    await expect(page.locator("#workflows li")).toHaveCount(6);
    await expect(page.locator("#workflows details")).toHaveCount(0);
    const table = page.getByRole("table", { name: /Manual vs automated/ });
    await expect(table.getByRole("columnheader")).toHaveText(["Task", "Done by hand", "Automated"]);
    await expect(table.getByRole("rowheader")).toHaveCount(6);
    await expect(page.locator("#process .stepper-step")).toHaveCount(4);

    await page.setViewportSize({ width: 320, height: 740 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("FAQ shows the ownership and time zone answers", async ({ page }) => {
    await page.goto(PATH);
    const faq = page.locator("#faq");
    await faq.getByText("Who owns the accounts and the work?").click();
    await expect(faq.getByText(/My clients do\. In most projects/)).toBeVisible();
    await faq.getByText("Do you work in US time zones?").click();
    await expect(faq.getByText(/9 AM to 3 PM Eastern Time/)).toBeVisible();
  });

  test("breadcrumb goes up to the AI automation hub, and the hub links back down", async ({
    page,
  }) => {
    await page.goto(PATH);
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await crumbs.getByRole("link", { name: "AI automation agency" }).click();
    await expect(page).toHaveURL(/\/ai-automation-agency$/);
    await page
      .locator("main")
      .getByRole("link", { name: "Business process automation services" })
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
