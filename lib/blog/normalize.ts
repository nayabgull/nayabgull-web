import type { Author, Category, Media, Post } from "../../payload-types.ts";

import { profileLinks } from "./profiles.ts";
import type { BlogAuthor, BlogCategory, BlogImage, BlogPost, PostSummary } from "./types.ts";

/** A relationship is an id until it is populated; only populated documents are used. */
const populated = <T extends object>(value: number | T | null | undefined): T | undefined =>
  typeof value === "object" && value !== null ? value : undefined;

export function toImage(media: number | Media | null | undefined): BlogImage | undefined {
  const doc = populated(media);
  if (!doc?.url || !doc.width || !doc.height) return undefined;
  return { url: doc.url, alt: doc.alt, width: doc.width, height: doc.height };
}

export function toCategory(
  category: number | Category | null | undefined,
): BlogCategory | undefined {
  const doc = populated(category);
  return doc ? { name: doc.name, slug: doc.slug, description: doc.description } : undefined;
}

export function toAuthor(author: number | Author | null | undefined): BlogAuthor | undefined {
  const doc = populated(author);
  if (!doc) return undefined;
  return {
    name: doc.name,
    slug: doc.slug,
    jobTitle: doc.jobTitle ?? undefined,
    bio: doc.bio,
    photo: toImage(doc.photo),
    profiles: profileLinks(doc),
  };
}

/** The post fields a list query selects (no body). */
export type SummarySource = Pick<
  Post,
  | "title"
  | "slug"
  | "excerpt"
  | "datePublished"
  | "dateModified"
  | "createdAt"
  | "updatedAt"
  | "category"
  | "tags"
  | "author"
>;

/** List fields of a post. Dates fall back to Payload's own timestamps for older documents. */
export function toSummary(post: SummarySource): PostSummary {
  const author = populated(post.author);
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    datePublished: post.datePublished ?? post.createdAt,
    dateModified: post.dateModified ?? post.updatedAt,
    category: toCategory(post.category),
    tags: (post.tags ?? []).filter((tag) => tag.trim() !== ""),
    author: author ? { name: author.name, slug: author.slug } : undefined,
  };
}

export function toPost(post: Post): BlogPost {
  return {
    ...toSummary(post),
    directAnswer: post.directAnswer,
    hub: post.hub,
    heroImage: toImage(post.heroImage),
    authorProfile: toAuthor(post.author),
    content: post.content,
    seo: { title: post.seo?.title ?? "", metaDescription: post.seo?.metaDescription ?? "" },
  };
}
