import { expect, test } from "@playwright/test";

const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("homepage smoke", () => {
  test("loads with one visible h1, no console errors and no failed requests", async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    page.on("requestfailed", (request) => failedRequests.push(request.url()));

    const response = await page.goto("/", { waitUntil: "networkidle" });

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText(
      "The web development agency that turns your leads into booked calls",
    );
    await expect(page).toHaveTitle(/\S/);
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });

  test("answers a real 404 for a missing page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});

test.describe("hero calls to action", () => {
  test("primary CTA books a strategy call and is visible above the fold", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section", { has: page.locator("h1") });
    const cta = hero.getByRole("link", { name: "Book a free strategy call" });
    await expect(cta).toBeInViewport();
    await expect(cta).toHaveAttribute("href", STRATEGY_CALL_URL);
    await expect(cta).toHaveAttribute("rel", /noopener/);
  });

  test("the same primary CTA closes the page", async ({ page }) => {
    await page.goto("/");
    const final = page.locator("#book").getByRole("link", { name: "Book a free strategy call" });
    await expect(final).toHaveAttribute("href", STRATEGY_CALL_URL);
  });

  test("secondary CTA scrolls to the services section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "See services" }).click();
    await expect(page).toHaveURL(/#services$/);
    await expect(page.locator("#services h2")).toBeInViewport();
  });
});

test.describe("theme toggle", () => {
  test.use({ colorScheme: "dark" });

  test("follows the system, switches on click and remembers the choice", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveAttribute("data-theme", /.+/);

    const toggle = page.getByRole("button", { name: "Switch between light and dark theme" });
    await toggle.click();
    await expect(html).toHaveAttribute("data-theme", "light");
    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(background).toBe("rgb(244, 247, 252)");

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");

    await toggle.click();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");
  });

  test("works from the keyboard", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Switch between light and dark theme" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});

test.describe("FAQ", () => {
  test("shows 6 to 8 questions that open and close", async ({ page }) => {
    await page.goto("/");
    const items = page.locator("#faq details");
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(6);
    expect(count).toBeLessThanOrEqual(8);

    const first = items.first();
    const answer = first.locator("p").first();
    await expect(answer).toBeHidden();
    await first.locator("summary").click();
    await expect(answer).toBeVisible();
    await first.locator("summary").click();
    await expect(answer).toBeHidden();
  });

  test("every visible question is in the FAQPage JSON-LD", async ({ page }) => {
    await page.goto("/");
    const questions = await page.locator("#faq summary").allInnerTexts();
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw ?? "{}") as {
      "@graph": { "@type": string; mainEntity?: { name: string }[] }[];
    };
    const faq = data["@graph"].find((node) => node["@type"] === "FAQPage");
    expect(faq?.mainEntity?.map((q) => q.name)).toEqual(questions.map((q) => q.trim()));
  });
});

test.describe("page structure", () => {
  test("sections appear in the agreed order", async ({ page }) => {
    await page.goto("/");
    const ids = await page
      .locator("main > section[id]")
      .evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual([
      "services",
      "how-it-works",
      "industries",
      "process",
      "work",
      "about",
      "faq",
      "book",
    ]);
  });

  test("only the hero carries the grid background", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hero-bg")).toHaveCount(1);
    await expect(page.locator(".hero-bg h1")).toHaveCount(1);
  });
});
