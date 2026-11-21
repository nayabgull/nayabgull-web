import { expect, test } from "@playwright/test";

const PATH = "/industries";
const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

const CHILDREN = [
  { label: "Law firm website design for attorneys", path: "/industries/law-firm-website-design" },
  {
    label: "Dental and medical website design",
    path: "/industries/dental-medical-website-design",
  },
  {
    label: "Real estate website design for agents",
    path: "/industries/real-estate-website-design",
  },
  { label: "Roofing and HVAC website design", path: "/industries/roofing-hvac-website-design" },
  {
    label: "Contractor website design for builders",
    path: "/industries/contractor-website-design",
  },
];

test.describe("Industries hub", () => {
  test("hero: Get a free demo is the primary CTA, Book a free call sits next to it", async ({
    page,
  }) => {
    await page.goto(PATH);
    const hero = page.locator("section", { has: page.locator("h1") });
    await expect(page.locator("h1")).toHaveText("Industry website design for small businesses");
    const form = hero.getByRole("form", { name: "Get a free demo" });
    await expect(form).toBeVisible();
    await expect(form.getByLabel("What you need")).toHaveValue("website");
    await expect(form.locator('input[name="type"]')).toHaveValue("demo");
    await expect(form.locator('input[name="source"]')).toHaveValue(PATH);
    await expect(hero.getByRole("link", { name: "Book a free call" })).toHaveAttribute(
      "href",
      STRATEGY_CALL_URL,
    );
  });

  test("one card per industry, each linking to its page", async ({ page }) => {
    await page.goto(PATH);
    const cards = page.locator("#industries li");
    await expect(cards).toHaveCount(CHILDREN.length);
    for (const child of CHILDREN) {
      await expect(
        page.locator("#industries").getByRole("link", { name: child.label }),
      ).toHaveAttribute("href", child.path);
    }
    await page
      .locator("#industries")
      .getByRole("link", { name: CHILDREN[0]?.label ?? "" })
      .click();
    await expect(page).toHaveURL(new RegExp(`${CHILDREN[0]?.path ?? ""}$`));
  });

  test("every industry page has a breadcrumb back up to the hub", async ({ page }) => {
    for (const child of CHILDREN) {
      await page.goto(child.path);
      const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
      await expect(breadcrumb.getByRole("link", { name: "Industries" })).toHaveAttribute(
        "href",
        PATH,
      );
    }
    await page
      .getByRole("navigation", { name: "Breadcrumb" })
      .getByRole("link", { name: "Industries" })
      .click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });

  test("the header Industries menu opens the hub", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.locator("summary", { hasText: "Industries" }).click();
    await nav.getByRole("link", { name: "All industries" }).click();
    await expect(page).toHaveURL(new RegExp(`${PATH}$`));
  });

  test("no sideways scroll on a small phone", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(PATH);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("structured data: Service for the US with starting-price offers, and an FAQPage", async ({
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
    expect(service?.offers).toHaveLength(2);
    await expect(page.locator("#pricing")).toContainText("Starts at $1,500.");
  });

  test("FAQ: ten questions, and the time zone answer opens", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#faq summary")).toHaveCount(10);
    const item = page.locator("#faq details", { hasText: "Do you work in US time zones?" });
    await item.locator("summary").click();
    await expect(item).toContainText("9 AM to 3 PM Eastern Time");
  });
});
