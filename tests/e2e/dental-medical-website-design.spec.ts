import { expect, test } from "@playwright/test";

const PATH = "/industries/dental-medical-website-design";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("Dental and medical website design page", () => {
  test("hero: Get a free demo is the primary CTA, Book a free call sits next to it", async ({
    page,
  }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText(
      "Medical website design company for dental offices and clinics",
    );
    const form = hero.getByRole("form", { name: "Get a free demo" });
    await expect(form).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("website");
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
    await expect(form.getByLabel("What you need")).toHaveValue("website");
    await expect(form.getByRole("button", { name: "Get my free demo" })).toBeVisible();
    await expect(page.getByRole("form")).toHaveCount(2);
  });

  test("patient flow: one step open at a time, by click and by arrow key", async ({ page }) => {
    await page.goto(PATH);
    const flow = page.getByRole("group", {
      name: "How healthcare workflow automation books and reminds patients",
    });
    const panels = flow.locator(".agent-panel");
    const radios = flow.getByRole("radio");
    await expect(radios).toHaveCount(5);
    await expect(panels.nth(0)).toBeVisible();
    await flow.locator("label", { hasText: "Reminders" }).click();
    await expect(panels.nth(2)).toBeVisible();
    await expect(panels.nth(2)).toContainText("confirms or asks for a new time");
    await expect(panels.nth(0)).toBeHidden();
    await radios.nth(2).focus();
    await page.keyboard.press("ArrowRight");
    await expect(panels.nth(3)).toContainText("recall reminder");
    await expect(panels.locator("visible=true")).toHaveCount(1);
  });

  test("no sideways scroll on a small phone", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(PATH);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("pricing: the starting prices from /pricing, with an Offer in the Service schema", async ({
    page,
  }) => {
    await page.goto(PATH);
    const prices = page.locator("#pricing");
    await expect(prices).toContainText("Starts at $1,500.");
    await expect(prices).toContainText("Starts at $2,500.");
    await expect(prices.getByRole("link", { name: "website pricing page" })).toHaveAttribute(
      "href",
      "/pricing",
    );
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = (JSON.parse(raw ?? "{}") as { "@graph": Record<string, unknown>[] })["@graph"];
    const types = graph.map((node) => node["@type"]);
    for (const type of ["ProfessionalService", "WebSite", "BreadcrumbList", "Service", "FAQPage"]) {
      expect(types, type).toContain(type);
    }
    const service = graph.find((node) => node["@type"] === "Service");
    expect(service).toMatchObject({ areaServed: { "@type": "Country", name: "United States" } });
    expect(service).toHaveProperty("offers");
  });

  test("FAQ: the HIPAA answer makes no claim and the items open and close", async ({ page }) => {
    await page.goto(PATH);
    const item = page.locator("#faq details", { hasText: "HIPAA compliant or ADA compliant" });
    await item.locator("summary").click();
    await expect(item).toContainText("I make no compliance claims");
    await expect(page.locator("#faq summary")).toHaveCount(7);
  });

  test("the header Industries menu links to the page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.locator("summary", { hasText: "Industries" }).click();
    await nav.getByRole("link", { name: "Dental and medical websites" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });
});
