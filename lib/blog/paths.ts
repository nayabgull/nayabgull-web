import { slugify } from "../cms/slugify.ts";

/** Blog URLs and limits. Every blog link on the site is built here. */
export const BLOG_PATH = "/blog";

/** Cache tag for every blog query. Publishing, unpublishing or deleting revalidates it. */
export const BLOG_CACHE_TAG = "blog";

/** Posts per list page. Keeps a list page inside the 3–8 internal-link budget (seo.md §4). */
export const POSTS_PER_PAGE = 6;

/** A list page (hub or category) stays `noindex, follow` until it has this many posts. */
export const MIN_POSTS_TO_INDEX = 3;

/** First path segments under /blog that belong to list pages, so no post may use them as a slug. */
export const RESERVED_POST_SLUGS: readonly string[] = ["page", "category", "tag", "author"];

export const postPath = (slug: string): string => `${BLOG_PATH}/${slug}`;
export const categoryPath = (slug: string): string => `${BLOG_PATH}/category/${slug}`;
export const authorPath = (slug: string): string => `${BLOG_PATH}/author/${slug}`;
/** Tags are free text in the CMS; their URL uses the slugified form. */
export const tagSlug = (tag: string): string => slugify(tag);
export const tagPath = (tag: string): string => `${BLOG_PATH}/tag/${tagSlug(tag)}`;

/** Page 1 of a list lives at the list's own URL; later pages at `<base>/page/<n>`. */
export function listPagePath(base: string, page: number): string {
  return page <= 1 ? base : `${base}/page/${page}`;
}

/**
 * Reads the `[page]` route segment. Only whole numbers from 2 up are valid: page 1 is the list's own
 * URL, so `/page/1` (and anything else) is a 404.
 */
export function parsePageParam(value: string): number | undefined {
  if (!/^[1-9]\d{0,3}$/.test(value)) return undefined;
  const page = Number(value);
  return page >= 2 ? page : undefined;
}

export function pageCount(total: number, perPage: number = POSTS_PER_PAGE): number {
  return Math.max(1, Math.ceil(total / perPage));
}
