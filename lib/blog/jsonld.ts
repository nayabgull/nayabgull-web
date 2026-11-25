import { home } from "../../content/home.ts";
import { faqPlainText } from "../content/faq.ts";
import { lexicalBlocks } from "../content/lexical.ts";
import type { Crumb, JsonLdGraph, JsonLdNode } from "../seo/jsonld.ts";
import { blogPosting, breadcrumbs, faqPage, graph, organization, website } from "../seo/jsonld.ts";

import { authorPath, BLOG_PATH, postPath } from "./paths.ts";
import type { BlogPost } from "./types.ts";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  heading: string;
  items: FaqItem[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/** Visible FAQ sections from the post's FAQ blocks (populated FAQ documents only). */
export function faqSections(content: unknown): FaqSection[] {
  return lexicalBlocks(content)
    .filter((block) => block.blockType === "faq")
    .map((block) => ({
      heading: typeof block.fields.heading === "string" ? block.fields.heading : "",
      items: (Array.isArray(block.fields.faqs) ? block.fields.faqs : []).flatMap((faq) =>
        isRecord(faq) && typeof faq.question === "string" && typeof faq.answer === "string"
          ? [{ question: faq.question, answer: faq.answer }]
          : [],
      ),
    }))
    .filter((section) => section.items.length > 0);
}

/** The 1200×630 Open Graph image of a post: crawlable (not under /api), so it is also the schema image. */
export const postImagePath = (slug: string): string => `/og/blog/post/${slug}`;

export const BLOG_CRUMB: Crumb = { name: "Blog", path: BLOG_PATH };

/** Organization, WebSite, BreadcrumbList, BlogPosting, and FAQPage when the post shows an FAQ. */
export function postJsonLd(post: BlogPost): JsonLdGraph {
  const path = postPath(post.slug);
  const author = post.authorProfile;
  const nodes: JsonLdNode[] = [
    organization({ description: home.meta.description }),
    website(),
    breadcrumbs([{ name: "Home", path: "/" }, BLOG_CRUMB, { name: post.title, path }]),
    blogPosting({
      headline: post.title,
      description: post.excerpt,
      path,
      image: postImagePath(post.slug),
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: {
        name: author?.name ?? post.author?.name ?? "",
        path: authorPath(author?.slug ?? post.author?.slug ?? ""),
        jobTitle: author?.jobTitle,
        sameAs: author?.profiles.map((profile) => profile.url) ?? [],
      },
      section: post.category?.name,
      keywords: post.tags,
    }),
  ];
  const faqs = faqSections(post.content).flatMap((section) => section.items);
  if (faqs.length > 0) {
    nodes.push(
      faqPage(faqs.map((item) => ({ question: item.question, answer: faqPlainText(item.answer) }))),
    );
  }
  return graph(nodes);
}

/** List pages: Organization, WebSite and the breadcrumb trail. */
export function listJsonLd(crumbs: readonly Crumb[]): JsonLdGraph {
  return graph([
    organization({ description: home.meta.description }),
    website(),
    breadcrumbs([{ name: "Home", path: "/" }, ...crumbs]),
  ]);
}
