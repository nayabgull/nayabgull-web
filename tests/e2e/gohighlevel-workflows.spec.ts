import { expect, test } from "@playwright/test";

const PATH = "/gohighlevel-agency/workflows-automation";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

test.describe("GoHighLevel workflows page", () => {
  test("hero: Get a free demo is the primary CTA and jumps to the demo form", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText("GoHighLevel Workflows That Follow Up for You");

    const form = hero.getByRole("form", { name: "Get a free demo" });
    await expect(form).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("gohighlevel");
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
    await expect(form.getByLabel("What you need")).toHaveValue("gohighlevel");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(closing.getByRole("link", { name: "Book a free call" })).toBeVisible();
    await expect(page.getByRole("form")).toHaveCount(2);
  });

  test("six workflow cards, the trigger → actions → result picture and the A2P paragraph", async ({
    page,
  }) => {
    await page.goto(PATH);
    await expect(page.locator("#workflows li")).toHaveCount(6);
    await expect(
      page.getByRole("img", { name: /a trigger starts it, the actions run in order/ }),
    ).toBeVisible();
    await expect(page.locator("#a2p-10dlc p")).toContainText("A2P 10DLC is the registration");
  });

  test("mistakes: a table on desktop, stacked cards with no sideways scroll on a phone", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const table = page.getByRole("table", { name: /Mistakes I fix/ });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Mistake",
      "What goes wrong",
      "How I fix it",
    ]);
    await expect(table.getByRole("rowheader")).toHaveCount(6);

    await page.setViewportSize({ width: 320, height: 740 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("process is a four-step stepper: horizontal on desktop, vertical on phones", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    const steps = page.locator("#process .stepper-step");
    await expect(steps).toHaveCount(4);
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

  test("FAQ: seven questions, with the ownership and time-zone answers", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#faq summary")).toHaveCount(7);
    await page.getByText("Who owns the accounts and the work?").click();
    await expect(page.getByText("My clients do.", { exact: false })).toBeVisible();
    await page.getByText("Do you work in US time zones?").click();
    await expect(page.getByText(/9 AM to 3 PM Eastern Time/)).toBeVisible();
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

  test("breadcrumb goes up to the GoHighLevel hub, and the hub links back down", async ({
    page,
  }) => {
    await page.goto(PATH);
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await crumbs.getByRole("link", { name: "GoHighLevel agency" }).click();
    await expect(page).toHaveURL(/\/gohighlevel-agency$/);
    await page.locator("main").getByRole("link", { name: "GoHighLevel workflows I build" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });

  test("links to the AI agent page", async ({ page }) => {
    await page.goto(PATH);
    await page.getByRole("link", { name: "AI agent that works with your CRM" }).click();
    await expect(page).toHaveURL(/\/ai-automation-agency\/ai-agent-development$/);
  });

  test("the header Services menu and the footer open the page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.locator("summary", { hasText: "Services" }).click();
    await nav.getByRole("link", { name: "GoHighLevel workflows" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));

    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Footer" })
      .getByRole("link", { name: "GoHighLevel workflows" })
      .click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });
});
