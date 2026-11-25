import { expect, test } from "@playwright/test";

const PATH = "/ai-automation-agency/ai-receptionist-for-small-business";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("AI receptionist for small business page", () => {
  test("hero: Get a free demo is primary, Book a free call is second, demo form on the right", async ({
    page,
  }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText("AI Receptionist for Small Business");

    const form = hero.getByRole("form", { name: "Get a free demo" });
    await expect(form).toBeVisible();
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

  test("closing band: a second demo form and the call button", async ({ page }) => {
    await page.goto(PATH);
    const closing = page.locator("#quote");
    const form = closing.getByRole("form", { name: "Request your free demo" });
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(form.getByRole("button", { name: "Get my free demo" })).toBeVisible();
    await expect(page.getByRole("form")).toHaveCount(2);
    await expect(page.getByRole("button", { name: "Get my free quote" })).toHaveCount(0);
  });

  test("call flow: five steps from the caller to the text summary", async ({ page }) => {
    await page.goto(PATH);
    const flow = page.getByRole("region", { name: "What an AI receptionist does on a real call" });
    await expect(flow.locator(".call-step")).toHaveCount(5);
    await expect(flow.locator(".call-step").first()).toContainText("Caller");
    await expect(flow.locator(".call-step").last()).toContainText("text");
    await expect(flow.locator(".call-sms dt")).toHaveText([
      "Caller:",
      "Problem:",
      "Address:",
      "Status:",
    ]);
  });

  test("comparison: four options in a table, stacked cards with no sideways scroll on a phone", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const table = page.getByRole("table", { name: /AI receptionist vs voicemail/ });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Question",
      "AI receptionist",
      "Voicemail",
      "Answering service",
      "Human receptionist",
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
      .locator("main")
      .getByRole("link", { name: "AI receptionist for small business" })
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
    expect(service).toMatchObject({ areaServed: { "@type": "Country", name: "United States" } });
    expect(service).not.toHaveProperty("offers");
    const trail = graph.find((node) => node["@type"] === "BreadcrumbList");
    expect(trail?.itemListElement).toHaveLength(3);
    await expect(page.locator("main")).not.toContainText("$");
  });

  test("FAQ has the approved answers, and no phone number is published", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#faq summary")).toHaveCount(7);
    const owner = page.locator("#faq details", {
      has: page.locator("summary", { hasText: "Who owns the accounts and the work?" }),
    });
    await owner.locator("summary").click();
    await expect(owner).toContainText("My clients do.");
    const text = (await page.locator("main").textContent()) ?? "";
    expect(text).not.toMatch(/\(?\b\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/);
  });

  test("the AI Automation menu in the header links to the page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const header = page.locator("header");
    await header.getByText("AI Automation", { exact: true }).first().click();
    await header.getByRole("link", { name: "AI receptionist" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });
});
