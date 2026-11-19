import { expect, test } from "@playwright/test";

const PATH = "/services/nextjs-react-development";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("Next.js and React development page", () => {
  test("hero: H1, demo form with Website preselected, and the call button", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText(
      "A React development company for fast sites you can update",
    );
    const form = hero.getByRole("form", { name: "Request a custom demo" });
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
    const form = closing.getByRole("form", { name: "Request your custom demo" });
    await expect(form.getByLabel("What you need")).toHaveValue("website");
    await expect(closing.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
      "href",
      STRATEGY_CALL_URL,
    );
    await expect(page.getByRole("form")).toHaveCount(2);
  });

  test("comparison: a table on desktop, no sideways scroll on a small phone", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const table = page.getByRole("table", { name: /Next.js vs WordPress vs page builders/ });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Question",
      "Next.js and React",
      "WordPress",
      "Page builders",
    ]);
    await expect(table.getByRole("rowheader")).toHaveCount(6);
    await page.setViewportSize({ width: 320, height: 740 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("header Services menu and footer link to the page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("footer").getByRole("link", { name: "Next.js and React development" }),
    ).toHaveAttribute("href", PATH);
    await expect(
      page
        .getByRole("navigation", { name: "Primary" })
        .locator(`a[href="${PATH}"]`, { hasText: "Next.js and React development" }),
    ).toHaveCount(1);
  });

  test("structured data: Service for the US with no price, FAQPage and a 2-step trail", async ({
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
    expect(graph.find((node) => node["@type"] === "BreadcrumbList")?.itemListElement).toHaveLength(
      2,
    );
    await expect(page.locator("main")).not.toContainText("$");
    await expect(page.locator("#faq summary")).toHaveCount(7);
  });
});
