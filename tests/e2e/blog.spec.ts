import { expect, test } from "@playwright/test";

// Safe on every server, production included: these URLs never exist, published posts or not.
// Full blog coverage runs against a seeded test database in tests/cms-e2e.
for (const path of [
  "/blog/this-post-does-not-exist-e2e",
  "/blog/page/1",
  "/blog/category/this-category-does-not-exist-e2e",
  "/blog/tag/this-tag-does-not-exist-e2e",
  "/blog/author/this-author-does-not-exist-e2e",
  "/og/blog/post/this-post-does-not-exist-e2e",
]) {
  test(`${path} answers 404`, async ({ request }) => {
    expect((await request.get(path)).status()).toBe(404);
  });
}

test("llms.txt lists the key pages", async ({ request }) => {
  const response = await request.get("/llms.txt");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  const body = await response.text();
  expect(body).toMatch(/^# Nayab Gull\n/);
  expect(body).toContain("(https://nayabgull.com/gohighlevel-agency)");
  // No admin or API URL (a page such as /gohighlevel-agency/api-integrations is fine).
  expect(body).not.toMatch(/nayabgull\.com\/(admin|api)(\/|\)|\s|$)/m);
});

// Launch rule: the blog stays hidden until the first post is published, then appears by itself.
// Reads the published state from /llms.txt, so it holds on every server, before and after launch.
test("the blog shows in the sitemap, llms.txt and the header only once a post is published", async ({
  page,
  request,
}) => {
  const llms = await (await request.get("/llms.txt")).text();
  const published = llms.includes("## Blog");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.includes("https://nayabgull.com/blog/")).toBe(published);
  await page.goto("/");
  const header = page.getByRole("navigation", { name: "Primary" });
  await expect(header.getByRole("link", { name: "Blog", exact: true })).toHaveCount(
    published ? 1 : 0,
  );
  if (!published) {
    const hub = await page.goto("/blog");
    expect(hub?.status()).toBe(404);
    const robots = await page
      .locator('meta[name="robots"]')
      .evaluateAll((tags) => tags.map((tag) => tag.getAttribute("content") ?? ""));
    expect(robots.length).toBeGreaterThan(0);
    for (const content of robots) expect(content).toContain("noindex");
  }
});
