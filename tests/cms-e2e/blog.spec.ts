import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

import { E2E } from "./fixtures.ts";

/**
 * Blog routes against the throwaway e2e database seeded by tests/cms-e2e/seed.ts (one published
 * post, one draft). CI runs this in the e2e job with a Postgres service; it never runs against
 * production, where the test post does not exist.
 */
const POST = `/blog/${E2E.post}`;
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const jsonLdTypes = async (page: Page): Promise<string[]> => {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocks.flatMap((raw) =>
    (JSON.parse(raw) as { "@graph": { "@type": string }[] })["@graph"].map((node) => node["@type"]),
  );
};

test.describe("published post", () => {
  test("renders the full post template", async ({ page }) => {
    const response = await page.goto(POST);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(E2E.title);
    await expect(page.getByText(E2E.directAnswer)).toBeVisible();
    await expect(page.getByText(/Updated November 10, 2026/)).toBeVisible();

    const toc = page.getByRole("navigation", { name: "Table of contents" });
    await expect(toc.getByRole("link", { name: "Second test section" })).toHaveAttribute(
      "href",
      "#second-test-section",
    );
    await expect(page.locator("#second-test-section")).toHaveText("Second test section");

    await page.getByText(E2E.faqQuestion).click();
    await expect(page.getByText("It is created by tests/cms-e2e/seed.ts.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Test call to action" })).toBeVisible();

    const main = page.locator("main");
    await expect(main.getByRole("link", { name: "GoHighLevel agency" }).last()).toHaveAttribute(
      "href",
      E2E.hub,
    );
    await expect(main.getByRole("img", { name: /Dark blue test image/ }).first()).toBeVisible();
  });

  test("puts author, topics and related posts in a top-level aside", async ({ page }) => {
    await page.goto(POST);
    const aside = page.getByRole("complementary", { name: "About this post" });
    await expect(aside.getByRole("link", { name: "E2E Test Author" }).first()).toHaveAttribute(
      "href",
      `/blog/author/${E2E.author}`,
    );
    await expect(aside.getByRole("link", { name: "E2E Test Category" })).toHaveAttribute(
      "href",
      `/blog/category/${E2E.category}`,
    );
    await expect(aside.getByRole("link", { name: "#E2E Test Tag" })).toHaveAttribute(
      "href",
      `/blog/tag/${E2E.tag}`,
    );
    expect(await page.locator("main aside").count()).toBe(0);
  });

  test("has SEO metadata and BlogPosting, BreadcrumbList and FAQPage JSON-LD", async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://nayabgull.com${POST}`,
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    expect(await jsonLdTypes(page)).toEqual(
      expect.arrayContaining(["BlogPosting", "BreadcrumbList", "FAQPage"]),
    );
  });

  test("serves its Open Graph image", async ({ request }) => {
    const response = await request.get(`/og/blog/post/${E2E.post}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  for (const colorScheme of ["light", "dark"] as const) {
    test(`has no axe-core violations (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(POST, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
      expect(results.violations.map((v) => `${v.id} (${v.nodes.length})`)).toEqual([]);
    });
  }
});

test.describe("drafts and unknown URLs", () => {
  for (const path of [
    `/blog/${E2E.draft}`,
    "/blog/no-such-post",
    "/blog/page/2",
    "/blog/page/1",
    "/blog/category/no-such-category",
    "/blog/tag/no-such-tag",
    "/blog/author/no-such-author",
    "/og/blog/post/e2e-draft-post",
  ]) {
    test(`${path} is a 404`, async ({ request }) => {
      expect((await request.get(path)).status()).toBe(404);
    });
  }
});

test.describe("list pages", () => {
  for (const path of [
    "/blog",
    `/blog/category/${E2E.category}`,
    `/blog/tag/${E2E.tag}`,
    `/blog/author/${E2E.author}`,
  ]) {
    test(`${path} lists the post and is noindex, follow (fewer than 3 posts)`, async ({ page }) => {
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, follow",
      );
      await expect(page.locator("main").getByRole("link", { name: E2E.title })).toHaveAttribute(
        "href",
        POST,
      );
      const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
      expect(results.violations.map((v) => v.id)).toEqual([]);
    });
  }
});

test.describe("site-wide", () => {
  test("header and footer link the blog once a post is published", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Blog" }),
    ).toHaveAttribute("href", "/blog");
    await expect(
      page.getByRole("navigation", { name: "Footer" }).getByRole("link", { name: "Blog" }),
    ).toHaveAttribute("href", "/blog");
  });

  test("the sitemap lists the published post only", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body).toContain(`<loc>https://nayabgull.com${POST}</loc>`);
    expect(body).not.toContain(E2E.draft);
    expect(body).not.toMatch(/<loc>https:\/\/nayabgull\.com\/blog<\/loc>/);
    expect(body).not.toContain("/blog/tag/");
  });

  test("llms.txt lists the published post only", async ({ request }) => {
    const body = await (await request.get("/llms.txt")).text();
    expect(body).toContain(`(https://nayabgull.com${POST})`);
    expect(body).not.toContain(E2E.draft);
  });
});

test.describe("responsive", () => {
  for (const width of [375, 768, 1440]) {
    test(`post has no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(POST);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow).toBe(false);
    });
  }
});
