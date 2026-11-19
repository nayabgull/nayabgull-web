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
  expect(body).not.toMatch(/\/(admin|api)\b/);
});
