import { canonicalFor } from "../seo/site.ts";

import { BLOG_PATH, categoryPath, postPath } from "./paths.ts";
import type { PostSummary } from "./types.ts";
import { categoriesWithPosts, isListIndexable, postsInCategory } from "./view.ts";

export interface SitemapEntry {
  url: string;
  lastModified: Date;
}

const newest = (posts: readonly PostSummary[]): Date =>
  new Date(
    Math.max(...posts.map((post) => new Date(post.dateModified).getTime()).filter(Number.isFinite)),
  );

/**
 * Blog URLs for the sitemap: every published post, plus the hub and category pages once they are
 * indexable. Tag pages, author pages and later list pages are `noindex`, so they never appear.
 */
export function blogSitemapEntries(posts: readonly PostSummary[]): SitemapEntry[] {
  if (posts.length === 0) return [];
  const entries: SitemapEntry[] = [];
  if (isListIndexable(BLOG_PATH, posts.length)) {
    entries.push({ url: canonicalFor(BLOG_PATH), lastModified: newest(posts) });
  }
  for (const { category } of categoriesWithPosts(posts)) {
    const inCategory = postsInCategory(posts, category.slug);
    const path = categoryPath(category.slug);
    if (isListIndexable(path, inCategory.length)) {
      entries.push({ url: canonicalFor(path), lastModified: newest(inCategory) });
    }
  }
  for (const post of posts) {
    entries.push({
      url: canonicalFor(postPath(post.slug)),
      lastModified: new Date(post.dateModified),
    });
  }
  return entries;
}
