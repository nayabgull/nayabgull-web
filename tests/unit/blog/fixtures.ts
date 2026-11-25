import type { KeywordEntry } from "@/lib/seo/keywords.ts";
import type { Author, Category, Media, Post } from "@/payload-types.ts";

import { heading, lexical, paragraph } from "../cms/fixtures.ts";

/**
 * Test-only keyword entry for a test post. Real posts get their keyword from
 * docs/seo/keyword-map.md (Nayab approves it); tests mock lib/seo/keywords.ts to add this one.
 */
export const TEST_POST_PATH = "/blog/gohighlevel-workflow-examples";
export const TEST_ENTRY: KeywordEntry = {
  url: TEST_POST_PATH,
  pageType: "blog",
  primary: "gohighlevel workflow examples",
  secondary: ["ghl workflow ideas", "crm follow up automation"],
};

const linkNode = (url: string, label: string) => ({
  type: "link",
  version: 1,
  fields: { url, linkType: "custom" },
  children: [{ type: "text", text: label, version: 1 }],
});

export const linksParagraph = (...links: [string, string][]) => ({
  type: "paragraph",
  version: 1,
  children: links.flatMap(([url, label]) => [
    { type: "text", text: "See ", version: 1 },
    linkNode(url, label),
    { type: "text", text: ". ", version: 1 },
  ]),
});

export const faqBlock = (faqs: unknown[], headingText = "Frequently asked questions") => ({
  type: "block",
  version: 2,
  fields: { id: "f1", blockType: "faq", heading: headingText, faqs },
});

export const ctaBlock = (headingText: string, text: string) => ({
  type: "block",
  version: 2,
  fields: { id: "c1", blockType: "cta", heading: headingText, text },
});

export const uploadNode = (value: unknown) => ({ type: "upload", version: 3, value });

/** About 1,550 words of plain copy: enough for a blog post. */
const PADDING = Array.from({ length: 103 }, () =>
  paragraph("I check every step and send you a short plan. It takes a day."),
);

export const FAQ_DOC = {
  id: 7,
  question: "How long does a workflow take to build?",
  answer: "Most take one to three days.\n\nA bigger system takes a week.",
};

/** The body of a post that passes every publish rule (FAQ block populated). */
export const GOOD_CONTENT = lexical(
  paragraph("These gohighlevel workflow examples show you what to automate first."),
  heading("h2", "GoHighLevel workflow examples for a small team"),
  linksParagraph(
    ["/gohighlevel-agency", "GoHighLevel agency services"],
    ["/ai-automation-agency", "AI automation for small businesses"],
  ),
  heading("h2", "Ghl workflow ideas you can copy"),
  ...PADDING,
  faqBlock([FAQ_DOC]),
  ctaBlock("Want these workflows in your account?", "Book a call and get a plan."),
);

/** A post document (as the publish hook sees it) that passes every rule. */
export const GOOD_POST_DATA = {
  _status: "published",
  title: "GoHighLevel Workflow Examples That Save Hours",
  slug: "gohighlevel-workflow-examples",
  excerpt: "Five workflows that answer leads fast and keep your pipeline moving.",
  directAnswer:
    "The best gohighlevel workflow examples answer new leads in seconds, remind people about calls and chase unpaid invoices.",
  heroImage: 11,
  hub: "/gohighlevel-agency",
  category: 3,
  tags: ["GoHighLevel", "Workflows"],
  author: 1,
  content: lexical(
    paragraph("These gohighlevel workflow examples show you what to automate first."),
    heading("h2", "GoHighLevel workflow examples for a small team"),
    linksParagraph(
      ["/gohighlevel-agency", "GoHighLevel agency services"],
      ["/ai-automation-agency", "AI automation for small businesses"],
    ),
    heading("h2", "Ghl workflow ideas you can copy"),
    ...PADDING,
    faqBlock([FAQ_DOC.id]),
    ctaBlock("Want these workflows in your account?", "Book a call and get a plan."),
  ),
  seo: {
    title: "GoHighLevel Workflow Examples for Small Teams | Nayab Gull",
    metaDescription:
      "GoHighLevel workflow examples for US small businesses: answer leads fast, cut no-shows and get paid sooner. Book a free strategy call to set them up.",
    primaryKeyword: "gohighlevel workflow examples",
    secondaryKeywords: ["ghl workflow ideas"],
  },
};

export const MEDIA: Media = {
  id: 11,
  alt: "GoHighLevel workflow builder with three automation steps",
  url: "/api/media/file/workflow.png",
  width: 1600,
  height: 900,
  updatedAt: "2026-11-01T00:00:00.000Z",
  createdAt: "2026-11-01T00:00:00.000Z",
};

export const CATEGORY: Category = {
  id: 3,
  name: "GoHighLevel",
  slug: "gohighlevel",
  description: "Guides on GoHighLevel setup and automation.",
  updatedAt: "2026-11-01T00:00:00.000Z",
  createdAt: "2026-11-01T00:00:00.000Z",
};

export const AUTHOR: Author = {
  id: 1,
  name: "Test Author",
  slug: "test-author",
  jobTitle: "Developer",
  bio: "Builds automations for small businesses.",
  photo: MEDIA,
  linkedinUrl: "https://www.linkedin.com/in/test-author",
  githubUrl: null,
  upworkUrl: "https://www.upwork.com/freelancers/test",
  updatedAt: "2026-11-01T00:00:00.000Z",
  createdAt: "2026-11-01T00:00:00.000Z",
};

/** A published post as the site reads it (depth 2). */
export const POST_DOC: Post = {
  id: 21,
  title: GOOD_POST_DATA.title,
  slug: GOOD_POST_DATA.slug,
  excerpt: GOOD_POST_DATA.excerpt,
  directAnswer: GOOD_POST_DATA.directAnswer,
  heroImage: MEDIA,
  hub: "/gohighlevel-agency",
  category: CATEGORY,
  tags: ["GoHighLevel", "Workflows"],
  author: AUTHOR,
  datePublished: "2026-11-02T10:00:00.000Z",
  dateModified: "2026-11-10T10:00:00.000Z",
  content: GOOD_CONTENT as Post["content"],
  seo: {
    title: GOOD_POST_DATA.seo.title,
    metaDescription: GOOD_POST_DATA.seo.metaDescription,
    primaryKeyword: GOOD_POST_DATA.seo.primaryKeyword,
  },
  updatedAt: "2026-11-10T10:00:00.000Z",
  createdAt: "2026-11-02T10:00:00.000Z",
  _status: "published",
};
