import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import config from "@payload-config";

import { usesPlaceholderDatabase } from "../env.ts";

import { BLOG_CACHE_TAG } from "./paths.ts";
import { findAuthor, findPublishedPost, findPublishedSummaries } from "./source.ts";
import type { BlogAuthor, BlogPost, PostSummary } from "./types.ts";

/**
 * Cached blog reads for the public site. Every query is tagged with BLOG_CACHE_TAG; the Payload
 * hooks revalidate the tag on publish, unpublish and delete (collections/hooks/revalidate-blog.ts).
 * The hourly revalidate is only a safety net.
 */
const cacheOptions = { tags: [BLOG_CACHE_TAG], revalidate: 3600 };

const client = () => getPayload({ config });

const cachedSummaries = unstable_cache(
  async () => findPublishedSummaries(await client()),
  ["blog", "summaries"],
  cacheOptions,
);
const cachedPost = unstable_cache(
  async (slug: string) => (await findPublishedPost(await client(), slug)) ?? null,
  ["blog", "post"],
  cacheOptions,
);
const cachedAuthor = unstable_cache(
  async (slug: string) => (await findAuthor(await client(), slug)) ?? null,
  ["blog", "author"],
  cacheOptions,
);

/**
 * Runs a read, or returns `fallback` when there is no database (CI placeholder) or it fails. The
 * public site must never go down because the CMS is unreachable: the blog then just looks empty.
 * Errors are not cached, so the next request tries again.
 */
export async function readSafely<T>(read: () => Promise<T>, fallback: T): Promise<T> {
  if (usesPlaceholderDatabase(process.env)) return fallback;
  try {
    return await read();
  } catch (error) {
    // Server log only (Vercel logs), like the lead form.
    process.stderr.write(`Blog query failed: ${String(error)}\n`);
    return fallback;
  }
}

export const getPublishedSummaries = (): Promise<PostSummary[]> => readSafely(cachedSummaries, []);

export async function getPublishedPost(slug: string): Promise<BlogPost | undefined> {
  return (await readSafely(() => cachedPost(slug), null)) ?? undefined;
}

export async function getAuthor(slug: string): Promise<BlogAuthor | undefined> {
  return (await readSafely(() => cachedAuthor(slug), null)) ?? undefined;
}

/** The header and footer show "Blog" only when at least one post is published. */
export async function hasPublishedPosts(): Promise<boolean> {
  return (await getPublishedSummaries()).length > 0;
}
