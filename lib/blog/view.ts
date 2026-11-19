import { keywordFor } from "../seo/keywords.ts";

import { MIN_POSTS_TO_INDEX, pageCount, POSTS_PER_PAGE, tagSlug } from "./paths.ts";
import type { BlogCategory, PostSummary } from "./types.ts";

export interface PageOf<T> {
  items: T[];
  page: number;
  totalPages: number;
}

/** One page of a list, or undefined when the page does not exist (a 404). */
export function paginate<T>(
  items: readonly T[],
  page: number,
  perPage: number = POSTS_PER_PAGE,
): PageOf<T> | undefined {
  const totalPages = pageCount(items.length, perPage);
  if (items.length === 0 || page < 1 || page > totalPages) return undefined;
  return { items: items.slice((page - 1) * perPage, page * perPage), page, totalPages };
}

/**
 * A list page (the blog hub or a category) is indexable only with at least 3 posts (no thin pages)
 * and once Nayab has registered its keyword in docs/seo/keyword-map.md. Until then it is
 * `noindex, follow` and stays out of the sitemap.
 */
export function isListIndexable(path: string, postCount: number): boolean {
  return postCount >= MIN_POSTS_TO_INDEX && keywordFor(path) !== undefined;
}

export function postsInCategory(posts: readonly PostSummary[], slug: string): PostSummary[] {
  return posts.filter((post) => post.category?.slug === slug);
}

export function postsByAuthor(posts: readonly PostSummary[], slug: string): PostSummary[] {
  return posts.filter((post) => post.author?.slug === slug);
}

export function postsWithTag(posts: readonly PostSummary[], slug: string): PostSummary[] {
  return posts.filter((post) => post.tags.some((tag) => tagSlug(tag) === slug));
}

/** Display name of a tag from its URL slug (the first spelling used on a published post). */
export function tagLabel(posts: readonly PostSummary[], slug: string): string | undefined {
  for (const post of posts) {
    const tag = post.tags.find((candidate) => tagSlug(candidate) === slug);
    if (tag) return tag;
  }
  return undefined;
}

export interface CategoryCount {
  category: BlogCategory;
  count: number;
}

/** Categories that have published posts, by name. Empty categories get no page and no link. */
export function categoriesWithPosts(posts: readonly PostSummary[]): CategoryCount[] {
  const counts = new Map<string, CategoryCount>();
  for (const post of posts) {
    if (!post.category) continue;
    const entry = counts.get(post.category.slug) ?? { category: post.category, count: 0 };
    entry.count += 1;
    counts.set(post.category.slug, entry);
  }
  return [...counts.values()].sort((a, b) => a.category.name.localeCompare(b.category.name));
}

/**
 * Up to `limit` other posts: same category first, then most shared tags, then newest. The input
 * is already newest first, and the sort is stable.
 */
export function relatedPosts(
  post: Pick<PostSummary, "slug" | "category" | "tags">,
  posts: readonly PostSummary[],
  limit = 3,
): PostSummary[] {
  const tags = new Set(post.tags.map(tagSlug));
  const score = (other: PostSummary): number =>
    (other.category && other.category.slug === post.category?.slug ? 100 : 0) +
    other.tags.filter((tag) => tags.has(tagSlug(tag))).length;
  return posts
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({ other, score: score(other) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ other }) => other);
}

/** "November 19, 2026" (content.md §1: US dates). Invalid input gives an empty string. */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** True when the post was changed on a later day than it was published. */
export function wasUpdated(post: Pick<PostSummary, "datePublished" | "dateModified">): boolean {
  return post.dateModified.slice(0, 10) > post.datePublished.slice(0, 10);
}
