import { expect, test } from "@playwright/test";

import { comingSoon } from "../../content/coming-soon.ts";
import { checkParagraphs, checkReadability, checkStyle } from "../../lib/content/audit-rules.ts";
import {
  checkCanonical,
  checkHeadings,
  checkImages,
  checkLang,
  checkMetaDescription,
  checkSocial,
  checkTitle,
} from "../../lib/seo/audit-rules.ts";
import { validateJsonLd } from "../../lib/seo/jsonld-validate.ts";
import { KEYWORDS } from "../../lib/seo/keywords.ts";
import { snapshot } from "../../lib/seo/snapshot.ts";

const H1 = `${comingSoon.headline.before}${comingSoon.headline.highlight}`;
// In coming-soon mode "/" is the homepage address, so it carries the homepage's keyword.
const HOME_ENTRY = KEYWORDS.find((entry) => entry.url === "/");

test.describe("every public route shows the coming-soon page", () => {
  for (const path of [
    "/",
    "/pricing",
    "/about",
    "/contact",
    "/services/web-design-development",
    "/gohighlevel-agency",
    "/some/page/that/never/existed",
  ]) {
    test(path, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(H1);
      await expect(page).toHaveTitle(comingSoon.meta.title);
      // The address bar keeps the path the visitor asked for (it is a rewrite, not a redirect).
      expect(new URL(page.url()).pathname).toBe(path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://nayabgull.com",
      );
    });
  }

  test("/coming-soon redirects to the homepage address", async ({ request }) => {
    const response = await request.get("/coming-soon", { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(new URL(response.headers().location ?? "", "http://x").pathname).toBe("/");
  });
});

test.describe("what keeps working", () => {
  test("/privacy-policy and /terms open their own pages", async ({ page }) => {
    for (const [path, heading] of [
      ["/privacy-policy", "Privacy Policy"],
      ["/terms", "Terms of Service"],
    ] as const) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toContainText(heading);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, follow",
      );
    }
  });

  test("the coming-soon footer links both legal pages", async ({ page }) => {
    await page.goto("/");
    const legal = page.getByRole("navigation", { name: "Legal" });
    await legal.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL(/\/privacy-policy$/);
    await page.goBack();
    await legal.getByRole("link", { name: "Terms of Service" }).click();
    await expect(page).toHaveURL(/\/terms$/);
  });

  test("the header and footer do not link to hidden pages", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("header a[href], footer a[href]")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    for (const href of hrefs) {
      expect(["/", "#main", "/privacy-policy", "/terms"]).toContain(href);
    }
  });

  test("/admin and /api are not rewritten and stay noindex", async ({ request }) => {
    for (const path of ["/admin", "/admin/login", "/api/users"]) {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.headers()["x-robots-tag"]).toBe("noindex, nofollow");
      expect(await response.text()).not.toContain(H1);
    }
  });

  test("robots.txt is unchanged and the sitemap lists only the homepage", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/^Allow: \/$/m);
    expect(robots).toMatch(/^Disallow: \/admin$/m);
    expect(robots).toMatch(/^Disallow: \/api$/m);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])).toEqual([
      "https://nayabgull.com",
    ]);
  });

  test("the Open Graph image and static files are served, not rewritten", async ({ request }) => {
    const page = snapshot(await (await request.get("/")).text());
    const image = new URL(page.meta["og:image"] ?? "").pathname;
    for (const path of ["/favicon.ico", image]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      expect(response.headers()["content-type"], path).toMatch(/^image\//);
    }
  });
});

test.describe("the coming-soon page follows the SEO and content rules", () => {
  test("title, description, canonical, headings, social tags and structured data", async ({
    request,
  }) => {
    const html = await (await request.get("/")).text();
    const page = snapshot(html);
    expect(HOME_ENTRY).toBeDefined();
    expect([
      ...checkTitle(page, HOME_ENTRY),
      ...checkMetaDescription(page, HOME_ENTRY),
      ...checkCanonical(page, "/"),
      ...checkHeadings(page, HOME_ENTRY),
      ...checkLang(page),
      ...checkSocial(page),
      ...checkImages(page),
      ...validateJsonLd(page.jsonLd, "home"),
    ]).toEqual([]);
    // Indexable: no robots meta tag at all.
    expect(page.robots).toBeUndefined();
    const types = page.jsonLd.flatMap((raw) =>
      (JSON.parse(raw) as { "@graph": { "@type": string }[] })["@graph"].map(
        (node) => node["@type"],
      ),
    );
    expect(types).toEqual(
      expect.arrayContaining(["ProfessionalService", "WebSite", "BreadcrumbList"]),
    );
  });

  test("copy is easy to read and free of banned phrases", async ({ request }) => {
    const page = snapshot(await (await request.get("/")).text());
    const input = { paragraphs: page.paragraphs, bodyText: page.bodyText, entry: HOME_ENTRY };
    expect([...checkReadability(input), ...checkParagraphs(input), ...checkStyle(input)]).toEqual(
      [],
    );
  });

  test("has one primary call to action above the fold and a secondary one", async ({ page }) => {
    await page.goto("/");
    const primary = page.getByRole("link", { name: comingSoon.primaryCta.label });
    await expect(primary).toBeInViewport();
    await expect(page.getByRole("link", { name: "Book a free call" }).first()).toHaveAttribute(
      "href",
      "https://cal.com/nayab-gull/strategy-call",
    );
  });
});

test.describe("the demo form", () => {
  test("has the agreed fields and options", async ({ page }) => {
    await page.goto("/");
    const form = page.getByRole("form", { name: "Request a custom demo" });
    await expect(form).toBeVisible();
    for (const label of [
      "Name",
      "Email",
      "Business name",
      "Website (optional)",
      "Industry",
      "What you want",
    ]) {
      await expect(form.getByLabel(label, { exact: true })).toBeVisible();
    }
    await expect(form.getByLabel("What you want").locator("option")).toHaveText([
      "Choose one",
      "AI agent",
      "AI receptionist",
      "Automation",
      "Website",
    ]);
  });

  test("the server rejects a bad website and keeps what was typed", async ({ page }) => {
    // Only a submission the server rejects, so the test never saves a lead.
    await page.goto("/pricing");
    const form = page.getByRole("form", { name: "Request a custom demo" });
    await form.getByLabel("Name", { exact: true }).fill("Playwright Test");
    await form.getByLabel("Email").fill("test@example.com");
    await form.getByLabel("Business name").fill("Test Roofing");
    await form.getByLabel("Website").fill("not a url");
    await form.getByLabel("Industry").selectOption({ label: "Roofing" });
    await form.getByLabel("What you want").selectOption({ label: "AI agent" });
    await form.getByRole("button", { name: "Send my demo request" }).click();
    await expect(form.getByRole("alert")).toContainText("Please fix the marked fields");
    await expect(form.getByText("Please enter a valid website")).toBeVisible();
    await expect(form.getByLabel("Business name")).toHaveValue("Test Roofing");
  });
});
