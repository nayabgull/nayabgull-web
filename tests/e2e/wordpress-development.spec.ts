import { expect, test } from "@playwright/test";

const PATH = "/services/wordpress-development";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("WordPress development page", () => {
  test("hero: Book a free call is the primary CTA, next to the quote form", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText(
      "A WordPress development agency for sites you can edit, trust and grow",
    );
    await expect(hero.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
      "href",
      STRATEGY_CALL_URL,
    );
    const form = hero.getByRole("form", { name: "Get a free quote" });
    await expect(form).toBeVisible();
    await expect(form.locator('input[name="source"]')).toHaveValue(PATH);
    await hero.getByRole("link", { name: "See what I build" }).click();
    await expect(page).toHaveURL(/#services$/);
    await expect(page.locator("#services h2")).toBeInViewport();
  });

  test("closing section: a second quote form and the call button", async ({ page }) => {
    await page.goto(PATH);
    const closing = page.locator("#quote");
    await expect(closing.getByRole("form")).toBeVisible();
    await expect(closing.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
      "href",
      STRATEGY_CALL_URL,
    );
    await expect(page.getByRole("form")).toHaveCount(2);
  });

  test("process: five steps, each with a time", async ({ page }) => {
    await page.goto(PATH);
    const process = page.locator("#process");
    await expect(process.getByRole("heading", { level: 2 })).toHaveText(
      "How I build your WordPress site, step by step",
    );
    for (const when of ["30 minutes", "Within 3 days", "2 to 6 weeks", "Launch week"]) {
      await expect(process).toContainText(when);
    }
  });

  test("comparison: a table on desktop, no sideways scroll on a small phone", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const table = page.getByRole("table", { name: /Hire a WordPress developer/ });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Question",
      "Freelance marketplace",
      "Large WordPress agency",
      "Working with me",
    ]);
    await page.setViewportSize({ width: 320, height: 740 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("structured data: Service for the US with no price, and an FAQPage", async ({ page }) => {
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
    await expect(page.locator("main")).not.toContainText("$");
  });

  test("FAQ: eight questions, and the time zone answer opens", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#faq summary")).toHaveCount(8);
    const item = page.locator("#faq details", { hasText: "Do you work in US time zones?" });
    await item.locator("summary").click();
    await expect(item).toContainText("9 AM to 3 PM Eastern Time");
  });

  test("the header Services menu links to the page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.locator("summary", { hasText: "Services" }).click();
    await nav.getByRole("link", { name: "WordPress development" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });
});
