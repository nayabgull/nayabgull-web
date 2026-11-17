import { expect, test } from "@playwright/test";

const PATH = "/ai-automation-agency/ai-agent-development";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("AI agent development page", () => {
  test("hero: Get a free demo is the primary CTA and jumps to the demo form", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText("AI Agent Development Services");

    const form = hero.getByRole("form", { name: "Get a free demo" });
    await expect(form).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("ai-agent");
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
    await expect(form.getByLabel("What you need")).toHaveValue("ai-agent");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(form.getByRole("button", { name: "Get my free demo" })).toBeVisible();
    await expect(page.getByRole("form")).toHaveCount(2);
    await expect(page.getByRole("button", { name: "Get my free quote" })).toHaveCount(0);
  });

  test("the server rejects a bad phone number and keeps the demo request", async ({ page }) => {
    // Only an invalid submission, so nothing is saved (safe for the production smoke test).
    await page.goto(PATH);
    const form = page.getByRole("form", { name: "Get a free demo" });
    await form.getByLabel("Name").fill("Playwright Test");
    await form.getByLabel("Email").fill("test@example.com");
    await form.getByLabel("Phone").fill("abc");
    await form.getByLabel("Business type").selectOption({ label: "Roofing" });
    await form.getByRole("button", { name: "Get my free demo" }).click();
    await expect(form.getByRole("alert")).toContainText("Please fix the marked fields");
    await expect(form.getByText("Please enter a valid phone number.")).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("ai-agent");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
  });

  test("agent flow: one step open at a time, by click and by arrow key", async ({ page }) => {
    await page.goto(PATH);
    const flow = page.getByRole("group", { name: "How does an AI agent work, step by step?" });
    const panels = flow.locator(".agent-panel");
    const radios = flow.getByRole("radio");
    await expect(radios).toHaveCount(5);
    await expect(panels.nth(0)).toBeVisible();
    await expect(panels.nth(0)).toContainText("Something happens");
    for (const index of [1, 2, 3, 4]) await expect(panels.nth(index)).toBeHidden();

    await flow.locator("label", { hasText: "Uses your tools" }).click();
    await expect(radios.nth(2)).toBeChecked();
    await expect(panels.nth(2)).toBeVisible();
    await expect(panels.nth(2)).toContainText("tool calling");
    await expect(panels.nth(0)).toBeHidden();

    await radios.nth(2).focus();
    await page.keyboard.press("ArrowRight");
    await expect(radios.nth(3)).toBeChecked();
    await expect(panels.nth(3)).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(panels.nth(4)).toContainText("hands off to a human");
    await expect(panels.locator("visible=true")).toHaveCount(1);
  });

  test("agent flow works with JavaScript off and stays still with reduced motion", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(PATH);
    const flow = page.getByRole("group", { name: "How does an AI agent work, step by step?" });
    await flow.locator("label", { hasText: "Acts" }).click();
    const panel = flow.locator(".agent-panel").nth(3);
    await expect(panel).toBeVisible();
    const moving = await flow.evaluate(
      (element) =>
        [...element.querySelectorAll("*")].filter((node) => {
          const style = getComputedStyle(node);
          return style.animationName !== "none" || style.transitionDuration !== "0s";
        }).length,
    );
    expect(moving).toBe(0);
    await context.close();
  });

  test("comparison: a table on desktop, stacked cards with no sideways scroll on a phone", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const table = page.getByRole("table", { name: /AI agent vs chatbot vs automation/ });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Question",
      "AI agent",
      "Chatbot",
      "Automation",
    ]);
    await expect(table.getByRole("rowheader")).toHaveCount(6);

    await page.setViewportSize({ width: 320, height: 740 });
    const fits = await page
      .locator("#compare table")
      .evaluate((element) => element.scrollWidth <= element.clientWidth + 1);
    expect(fits).toBe(true);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
    const label = await page
      .locator("#compare td")
      .first()
      .evaluate((cell) => getComputedStyle(cell, "::before").content);
    expect(label).toBe('"AI agent"');
  });

  test("breadcrumb goes up to the AI automation hub, and the hub links back down", async ({
    page,
  }) => {
    await page.goto(PATH);
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await crumbs.getByRole("link", { name: "AI automation agency" }).click();
    await expect(page).toHaveURL(/\/ai-automation-agency$/);
    await page.locator("main").getByRole("link", { name: "AI agent development services" }).click();
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
    expect(service).toHaveProperty("provider");
    expect(service).toMatchObject({ areaServed: { "@type": "Country", name: "United States" } });
    expect(service).not.toHaveProperty("offers");
    const trail = graph.find((node) => node["@type"] === "BreadcrumbList");
    expect(trail?.itemListElement).toHaveLength(3);
    await expect(page.locator("main")).not.toContainText("$");
  });

  test("use-case cards open the full example without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(PATH);
    const cards = page.locator("#use-cases li");
    await expect(cards).toHaveCount(5);
    const first = cards.first();
    await expect(first.getByText("The problem")).toBeVisible();
    await expect(first.getByText("Example: insurance agency")).toBeVisible();
    const example = first.getByText(/an insurance agency may ask customers/);
    await expect(example).toBeHidden();
    await first.getByText("See the full example").click();
    await expect(example).toBeVisible();
    await context.close();
  });

  test("process is a horizontal stepper on desktop and a vertical one on phones", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const steps = page.locator("#process .stepper-step");
    await expect(steps).toHaveCount(5);
    const desktop = await steps.evaluateAll((items) =>
      items.map((item) => Math.round(item.getBoundingClientRect().top)),
    );
    expect(new Set(desktop).size).toBe(1);
    await page.setViewportSize({ width: 375, height: 800 });
    const phone = await steps.evaluateAll((items) =>
      items.map((item) => Math.round(item.getBoundingClientRect().left)),
    );
    expect(new Set(phone).size).toBe(1);
  });

  test("FAQ shows only confirmed answers: the two pending questions are not on the page", async ({
    page,
  }) => {
    await page.goto(PATH);
    await expect(page.locator("#faq summary")).toHaveCount(8);
    await expect(page.getByText("Who owns the agent and the data?")).toHaveCount(0);
    await expect(page.getByText("Do you work in US time zones?")).toHaveCount(0);
  });
});
