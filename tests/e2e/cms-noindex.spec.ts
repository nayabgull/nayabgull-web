import { expect, test } from "@playwright/test";

// The CMS must never be indexed (seo.md §7). These checks need no database: the headers are set by
// next.config.ts whatever the route answers.
for (const path of ["/admin", "/admin/collections/posts", "/api", "/api/users"]) {
  test(`${path} sends X-Robots-Tag: noindex, nofollow`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  });
}

test("robots.txt blocks /admin and /api and links the sitemap", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toMatch(/^Disallow: \/admin$/m);
  expect(body).toMatch(/^Disallow: \/api$/m);
  expect(body).toMatch(/^Sitemap: https:\/\/nayabgull\.com\/sitemap\.xml$/m);
});

test("the sitemap never lists /admin or /api", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  expect(body).not.toMatch(/\/(admin|api)(\/|<)/);
});
