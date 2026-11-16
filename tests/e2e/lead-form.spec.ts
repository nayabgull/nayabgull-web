import type { Locator } from "@playwright/test";
import { expect, test } from "@playwright/test";

/**
 * These tests only send submissions the server rejects (a bad phone number), so they never save a
 * lead. That keeps them safe for the post-deploy smoke test against production.
 */
async function fillInvalid(form: Locator) {
  await form.getByLabel("Name").fill("Playwright Test");
  await form.getByLabel("Email").fill("test@example.com");
  await form.getByLabel("Phone").fill("abc");
  await form.getByLabel("Business type").selectOption({ label: "Roofing" });
  await form.getByLabel("What you need").selectOption({ label: "Full system" });
}

test.describe("homepage quote forms", () => {
  test("the hero shows the form next to the H1, which stays the largest text", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section", { has: page.locator("h1") });
    const form = hero.getByRole("form", { name: "Get a free quote" });
    await expect(form).toBeVisible();
    await expect(form.getByRole("button", { name: "Get my free quote" })).toBeVisible();
    await expect(form.getByLabel("Business type").locator("option")).toHaveText([
      "Choose one",
      "Roofing",
      "HVAC",
      "Law firm",
      "Dental/Medical",
      "Real estate",
      "Contractor",
      "Other",
    ]);
    await expect(form.getByLabel("What you need").locator("option")).toHaveText([
      "Choose one",
      "Website",
      "GoHighLevel",
      "AI automation",
      "Full system",
    ]);
  });

  test("the page ends with a second quote form", async ({ page }) => {
    await page.goto("/");
    const closing = page.locator("main > section").last();
    await expect(closing).toHaveAttribute("id", "quote");
    await expect(closing.getByRole("form")).toBeVisible();
    await expect(page.getByRole("form")).toHaveCount(2);
  });

  test("the server rejects a bad phone number and keeps what was typed", async ({ page }) => {
    await page.goto("/");
    const form = page.getByRole("form", { name: "Get a free quote" });
    await fillInvalid(form);
    await form.getByRole("button", { name: "Get my free quote" }).click();
    await expect(form.getByRole("alert")).toContainText("Please fix the marked fields");
    await expect(form.getByLabel("Phone")).toHaveAttribute("aria-invalid", "true");
    await expect(form.getByText("Please enter a valid phone number.")).toBeVisible();
    await expect(form.getByLabel("Name")).toHaveValue("Playwright Test");
  });

  test("loads no Turnstile script before the form is focused", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator('script[src*="challenges.cloudflare.com"]')).toHaveCount(0);
  });
});

test.describe("quote form without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("renders on the server and posts to the Server Action", async ({ page }) => {
    await page.goto("/contact");
    const form = page.getByRole("form", { name: "Get a free quote" });
    await expect(form.getByRole("button", { name: "Get my free quote" })).toBeVisible();
    await fillInvalid(form);
    await form.getByRole("button", { name: "Get my free quote" }).click();
    await expect(page.getByRole("alert")).toContainText("Please fix the marked fields");
    await expect(page.getByText("Please enter a valid phone number.")).toBeVisible();
    await expect(page.getByLabel("Name")).toHaveValue("Playwright Test");
  });
});

test.describe("contact page", () => {
  test("loads with its h1, the form, the call link and no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    const response = await page.goto("/contact", { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Contact Nayab Gull for a free quote");
    await expect(page.getByRole("form", { name: "Get a free quote" })).toBeInViewport();
    await expect(
      page.locator("#other-ways").getByRole("link", { name: "Book a free strategy call" }),
    ).toHaveAttribute("href", "https://cal.com/nayab-gull/strategy-call");
    expect(consoleErrors).toEqual([]);
  });

  test("header links lead back to homepage sections", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/contact");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "FAQ" })
      .click();
    await expect(page).toHaveURL(/\/#faq$/);
  });
});

test.describe("lead flow animation", () => {
  test("starts when the section scrolls into view", async ({ page }) => {
    await page.goto("/");
    const flow = page.locator("#how-it-works .flow");
    await expect(flow).toHaveAttribute("data-inview", "false");
    await flow.scrollIntoViewIfNeeded();
    await expect(flow).toHaveAttribute("data-inview", "true");
    await expect(flow.locator("li")).toHaveCount(4);
  });

  test("shows every step in its finished state with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const flow = page.locator("#how-it-works .flow");
    await flow.scrollIntoViewIfNeeded();
    const animated = await flow.evaluate(
      (element) =>
        [...element.querySelectorAll("*")].filter(
          (node) => getComputedStyle(node).animationName !== "none",
        ).length,
    );
    expect(animated).toBe(0);
  });
});

test.describe("sticky calls to action", () => {
  test("the header keeps a Book a free call button", async ({ page }) => {
    await page.goto("/");
    const button = page.locator("header").getByRole("link", { name: "Book a free call" });
    await page.mouse.wheel(0, 3000);
    await expect(button).toBeInViewport();
  });

  test("phones get a bottom bar once the hero is out of view", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const quote = page.getByRole("link", { name: "Get a quote" });
    await expect(quote).toBeHidden();
    await page.locator("#industries").scrollIntoViewIfNeeded();
    await expect(quote).toBeVisible();
    await expect(page.getByRole("link", { name: "Book a call", exact: true })).toHaveAttribute(
      "href",
      "https://cal.com/nayab-gull/strategy-call",
    );
    await page.locator("#quote").scrollIntoViewIfNeeded();
    await expect(quote).toBeHidden();
  });
});
