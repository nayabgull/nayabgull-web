import { expect, test } from "@playwright/test";

const PATH = "/services/shopify-development";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("Shopify development page", () => {
  test("hero: Book a free call is the primary CTA, next to the quote form", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText(
      "A Shopify development agency for US store owners who want more sales",
    );
    await expect(hero.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
      "href",
      STRATEGY_CALL_URL,
    );
    const form = hero.getByRole("form", { name: "Get a free quote" });
    await expect(form).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("website");
    await expect(form.locator('input[name="type"]')).toHaveValue("quote");
    await expect(form.locator('input[name="source"]')).toHaveValue(PATH);
    await hero.getByRole("link", { name: "See what I build" }).click();
    await expect(page).toHaveURL(/#services$/);
    await expect(page.locator("#services h2")).toBeInViewport();
  });

  test("closing: a second quote form and the call button", async ({ page }) => {
    await page.goto(PATH);
    const closing = page.locator("#quote");
    await expect(closing).toContainText("free audit");
    await expect(closing.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
      "href",
      STRATEGY_CALL_URL,
    );
    await expect(page.getByRole("form")).toHaveCount(2);
  });

  test("covers setup, migration, headless, Plus and the free audit", async ({ page }) => {
    await page.goto(PATH);
    for (const heading of [
      "Shopify development services for your store",
      "Moving your store to Shopify",
      "Headless Shopify, in plain words",
      "Do you need a Shopify Plus development agency?",
      "Start with a free Shopify store audit",
      "What does a Shopify development company cost?",
    ]) {
      await expect(page.getByRole("heading", { level: 2, name: heading })).toBeVisible();
    }
  });

  test("comparison: a table on desktop, no sideways scroll on a small phone", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const table = page.getByRole("table", { name: /Where to hire Shopify developer help/ });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Question",
      "Marketplace freelancer",
      "Large Shopify agency",
      "Working with me",
    ]);
    await page.setViewportSize({ width: 320, height: 740 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("structured data: Service for the US with the $1,500 Offer, and an FAQPage", async ({
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
    expect(service).toMatchObject({
      areaServed: { "@type": "Country", name: "United States" },
      offers: [
        {
          "@type": "Offer",
          name: "Shopify store build",
          priceSpecification: { minPrice: 1500, priceCurrency: "USD" },
        },
      ],
    });
    await expect(page.locator("#pricing")).toContainText("Starts at $1,500.");
  });

  test("FAQ: the ownership answer opens and closes", async ({ page }) => {
    await page.goto(PATH);
    const item = page.locator("#faq details", { hasText: "Who owns the store and the code?" });
    await item.locator("summary").click();
    await expect(item).toContainText("You never share your password");
    await item.locator("summary").click();
    await expect(item).not.toHaveAttribute("open");
    await expect(page.locator("#faq summary")).toHaveCount(7);
  });

  test("the header Services menu links to the page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.locator("summary", { hasText: "Services" }).click();
    await nav.getByRole("link", { name: "Shopify development" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });
});
