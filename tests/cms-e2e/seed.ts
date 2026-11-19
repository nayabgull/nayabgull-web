/**
 * Seeds the throwaway e2e database with one published test post, one draft, and what they point
 * to. Run with `pnpm test:e2e:cms:seed` (payload run). It refuses to touch any database that is not
 * a local test database, so a test post can never reach Neon.
 *
 * The post is created through the Local API as a draft, then marked published with SQL: its
 * keyword is not (and must never be) in docs/seo/keyword-map.md, so the publish hook would block
 * it. The hook itself is covered by tests/unit/cms/enforce-post-rules.test.ts.
 */
import { sql } from "@payloadcms/db-postgres";
import { getPayload, type Payload } from "payload";
import sharp from "sharp";

import type { Post } from "@/payload-types.ts";
import config from "@payload-config";

import { E2E } from "./fixtures.ts";

function assertTestDatabase(uri: string | undefined): void {
  const url = new URL(uri ?? "");
  const localHost = ["localhost", "127.0.0.1", "postgres"].includes(url.hostname);
  const testName = /(test|e2e)/i.test(url.pathname);
  if (!localHost || !testName) {
    throw new Error(
      "Refusing to seed: DATABASE_URI must be a local test database (host localhost/postgres, name containing test or e2e).",
    );
  }
}

const text = (value: string) => ({
  type: "text",
  text: value,
  format: 0,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});
const element = { format: "", indent: 0, version: 1, direction: "ltr" as const };
const paragraph = (...children: unknown[]) => ({
  ...element,
  type: "paragraph",
  textFormat: 0,
  children,
});
const heading = (tag: string, value: string) => ({
  ...element,
  type: "heading",
  tag,
  children: [text(value)],
});
const link = (url: string, label: string) => ({
  ...element,
  type: "link",
  version: 3,
  fields: { linkType: "custom", url, newTab: false },
  children: [text(label)],
});

async function clean(payload: Payload): Promise<void> {
  for (const collection of ["posts", "faqs", "categories", "authors", "media"] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }
}

async function seed(): Promise<void> {
  assertTestDatabase(process.env.DATABASE_URI);
  const payload = await getPayload({ config });
  await clean(payload);

  const png = await sharp({
    create: { width: 1600, height: 900, channels: 3, background: { r: 6, g: 12, b: 31 } },
  })
    .png()
    .toBuffer();
  const media = await payload.create({
    collection: "media",
    data: { alt: "Dark blue test image for the e2e test post" },
    file: { data: png, mimetype: "image/png", name: "e2e-test-image.png", size: png.length },
  });
  const faq = await payload.create({
    collection: "faqs",
    data: { question: E2E.faqQuestion, answer: "Yes. It is created by tests/cms-e2e/seed.ts." },
  });
  const category = await payload.create({
    collection: "categories",
    data: { name: "E2E Test Category", slug: E2E.category, description: "Test category for e2e." },
  });
  const author = await payload.create({
    collection: "authors",
    data: {
      name: "E2E Test Author",
      slug: E2E.author,
      bio: "Test author that exists only in the e2e database.",
      jobTitle: "Test role",
      photo: media.id,
      linkedinUrl: "https://www.linkedin.com/in/e2e-test",
    },
  });

  const content = {
    root: {
      ...element,
      type: "root",
      children: [
        heading("h2", "First test section"),
        paragraph(
          text("This paragraph links to "),
          link(E2E.hub, "GoHighLevel agency services"),
          text("."),
        ),
        heading("h2", "Second test section"),
        paragraph(text("This paragraph links to "), link("/pricing", "website pricing"), text(".")),
        {
          type: "upload",
          version: 3,
          format: "",
          relationTo: "media",
          value: media.id,
          fields: null,
          id: "e2eupload1",
        },
        {
          type: "block",
          version: 2,
          format: "",
          fields: {
            id: "e2efaq1",
            blockName: "",
            blockType: "faq",
            heading: "Test questions",
            faqs: [faq.id],
          },
        },
        {
          type: "block",
          version: 2,
          format: "",
          fields: {
            id: "e2ecta1",
            blockName: "",
            blockType: "cta",
            heading: "Test call to action",
            text: "Test CTA text.",
          },
        },
      ],
    },
  };

  const base = {
    excerpt: "Test excerpt for the e2e test post.",
    directAnswer: E2E.directAnswer,
    heroImage: media.id,
    hub: E2E.hub,
    category: category.id,
    tags: ["E2E Test Tag"],
    author: author.id,
    content: content as unknown as Post["content"],
    seo: {
      title: "E2E Test Post About Automation | Nayab Gull",
      metaDescription:
        "Test post for the e2e suite. It checks the blog post template, the table of contents, the FAQ and the JSON-LD on a real database.",
      primaryKeyword: "e2e test post",
    },
  };
  await payload.create({
    collection: "posts",
    data: { ...base, title: E2E.title, slug: E2E.post },
    draft: true,
  });
  await payload.create({
    collection: "posts",
    data: { ...base, title: "E2E Draft Post", slug: E2E.draft },
    draft: true,
  });

  await payload.db.drizzle.execute(sql`
    UPDATE "posts" SET "_status" = 'published',
      "date_published" = '2026-11-02T10:00:00Z', "date_modified" = '2026-11-10T10:00:00Z'
    WHERE "slug" = ${E2E.post}`);
  process.stdout.write(
    `Seeded the e2e test database: /blog/${E2E.post} (published), /blog/${E2E.draft} (draft).\n`,
  );
}

await seed();
process.exit(0);
