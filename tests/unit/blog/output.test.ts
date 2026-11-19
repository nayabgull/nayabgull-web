import { describe, expect, it } from "vitest";

import { faqSections, listJsonLd, postJsonLd } from "@/lib/blog/jsonld.ts";
import { fitTitle, listMetadata, postMetadata } from "@/lib/blog/metadata.ts";
import { toPost, toSummary } from "@/lib/blog/normalize.ts";
import { blogSitemapEntries } from "@/lib/blog/sitemap.ts";
import type { PostSummary } from "@/lib/blog/types.ts";
import { validateJsonLd } from "@/lib/seo/jsonld-validate.ts";
import { blogPosting, serializeJsonLd } from "@/lib/seo/jsonld.ts";
import { buildLlmsTxt } from "@/lib/seo/llms.ts";

import { POST_DOC } from "./fixtures.ts";

const POST = toPost(POST_DOC);

describe("post JSON-LD", () => {
  it("has BlogPosting, BreadcrumbList and FAQPage, and passes the CI validator", () => {
    const data = postJsonLd(POST);
    const types = data["@graph"].map((node) => node["@type"]);
    expect(types).toEqual([
      "ProfessionalService",
      "WebSite",
      "BreadcrumbList",
      "BlogPosting",
      "FAQPage",
    ]);
    expect(validateJsonLd([serializeJsonLd(data)], "blog")).toEqual([]);
    const posting = data["@graph"][3];
    expect(posting).toMatchObject({
      image: "https://nayabgull.com/og/blog/post/gohighlevel-workflow-examples",
      datePublished: POST.datePublished,
      dateModified: POST.dateModified,
      author: { "@type": "Person", name: "Test Author", jobTitle: "Developer" },
      articleSection: "GoHighLevel",
      keywords: "GoHighLevel, Workflows",
    });
  });

  it("leaves FAQPage out when the post has no FAQ", () => {
    const data = postJsonLd({
      ...POST,
      content: { root: { children: [] } },
      tags: [],
      category: undefined,
      authorProfile: undefined,
    });
    expect(data["@graph"].map((node) => node["@type"])).not.toContain("FAQPage");
    expect(data["@graph"][3]).toMatchObject({
      author: { name: "Test Author", url: "https://nayabgull.com/blog/author/test-author" },
    });
  });

  it("keeps absolute image URLs as they are", () => {
    const node = blogPosting({
      headline: "h",
      description: "d",
      path: "/blog/x",
      image: "https://cdn.example.com/x.png",
      datePublished: "2026-01-01",
      dateModified: "2026-01-02",
      author: { name: "A", path: "/blog/author/a" },
    });
    expect(node.image).toBe("https://cdn.example.com/x.png");
    expect(node).not.toHaveProperty("keywords");
  });

  it("reads FAQ sections from populated FAQ blocks only", () => {
    expect(
      faqSections({
        root: {
          children: [
            {
              type: "block",
              fields: { blockType: "faq", faqs: [3, { question: "Q?", answer: "A." }] },
            },
          ],
        },
      }),
    ).toEqual([{ heading: "", items: [{ question: "Q?", answer: "A." }] }]);
    expect(
      faqSections({ root: { children: [{ type: "block", fields: { blockType: "faq" } }] } }),
    ).toEqual([]);
  });

  it("builds list JSON-LD with the breadcrumb trail", () => {
    const data = listJsonLd([{ name: "Blog", path: "/blog" }]);
    expect(validateJsonLd([serializeJsonLd(data)], "contact")).toEqual([]);
  });
});

describe("blog metadata", () => {
  it("uses the checked SEO fields, the post image and article times", () => {
    const meta = postMetadata(POST);
    expect(meta.title).toEqual({ absolute: POST.seo.title });
    expect(meta.alternates?.canonical).toBe(
      "https://nayabgull.com/blog/gohighlevel-workflow-examples",
    );
    expect(meta.openGraph).toMatchObject({
      type: "article",
      publishedTime: POST.datePublished,
      modifiedTime: POST.dateModified,
      authors: ["Test Author"],
      images: [{ url: "/og/blog/post/gohighlevel-workflow-examples", width: 1200, height: 630 }],
    });
    expect(postMetadata({ ...POST, author: undefined }).openGraph).toMatchObject({ authors: [] });
  });

  it("marks list pages noindex, follow until they are indexable", () => {
    const base = {
      title: "t",
      description: "d",
      path: "/blog",
      image: { url: "/og/blog/hub/index", alt: "Blog" },
    };
    expect(listMetadata({ ...base, indexable: false }).robots).toEqual({
      index: false,
      follow: true,
    });
    expect(listMetadata({ ...base, indexable: true }).robots).toBeUndefined();
  });

  it("fits list titles into 30–60 characters", () => {
    expect(fitTitle("GoHighLevel", [": Guides and Articles"])).toBe(
      "GoHighLevel: Guides and Articles | Nayab Gull",
    );
    expect(fitTitle("A very long category name about automation", [])).toBe(
      "A very long category name about automation | Nayab Gull",
    );
    const long = fitTitle("x".repeat(80), []);
    expect(long.length).toBe(60);
    expect(long.endsWith("… | Nayab Gull")).toBe(true);
    expect(fitTitle("AI", [])).toBe("AI | Nayab Gull");
  });
});

const summary = (slug: string, extra: Partial<PostSummary> = {}): PostSummary => ({
  ...toSummary(POST_DOC),
  slug,
  ...extra,
});

describe("blog sitemap", () => {
  it("lists published posts; list pages only once indexable", () => {
    const posts = [
      summary("a"),
      summary("b", { dateModified: "2026-12-01T00:00:00.000Z" }),
      summary("c"),
    ];
    expect(blogSitemapEntries([])).toEqual([]);
    const urls = blogSitemapEntries(posts).map((entry) => entry.url);
    // /blog and the category have 3 posts but no registered keyword yet, so they stay out.
    expect(urls).toEqual([
      "https://nayabgull.com/blog/a",
      "https://nayabgull.com/blog/b",
      "https://nayabgull.com/blog/c",
    ]);
    expect(blogSitemapEntries(posts)[1]?.lastModified.toISOString()).toBe(
      "2026-12-01T00:00:00.000Z",
    );
  });
});

describe("llms.txt", () => {
  it("lists key pages and published posts", () => {
    const text = buildLlmsTxt({
      title: "Nayab Gull",
      summary: "Summary.",
      pages: [{ name: "Home", path: "/", description: "Home  page." }],
      posts: [summary("a")],
    });
    expect(text).toBe(
      [
        "# Nayab Gull",
        "",
        "> Summary.",
        "",
        "## Pages",
        "- [Home](https://nayabgull.com): Home page.",
        "",
        "## Blog",
        `- [${POST_DOC.title}](https://nayabgull.com/blog/a): ${POST_DOC.excerpt}`,
        "",
      ].join("\n"),
    );
    expect(buildLlmsTxt({ title: "T", summary: "S", pages: [], posts: [] })).not.toContain(
      "## Blog",
    );
  });
});
