import type { BasePayload, Where } from "payload";

import { toAuthor, toPost, toSummary } from "./normalize.ts";
import type { BlogAuthor, BlogPost, PostSummary } from "./types.ts";

/** The part of the Payload Local API the blog reads with. Tests pass a fake. */
export type BlogClient = Pick<BasePayload, "find">;

const PUBLISHED: Where = { _status: { equals: "published" } };

/**
 * Every published post, newest first, without the body. The blog is small, so list pages, tags,
 * related posts, the sitemap and llms.txt all work from this one cached query.
 */
export async function findPublishedSummaries(client: BlogClient): Promise<PostSummary[]> {
  const result = await client.find({
    collection: "posts",
    where: PUBLISHED,
    sort: "-datePublished",
    depth: 1,
    pagination: false,
    draft: false,
    overrideAccess: false,
    select: { content: false, directAnswer: false, seo: false },
  });
  return result.docs.map(toSummary);
}

/** One published post with everything the post page shows. Drafts are never returned. */
export async function findPublishedPost(
  client: BlogClient,
  slug: string,
): Promise<BlogPost | undefined> {
  const result = await client.find({
    collection: "posts",
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    depth: 2,
    limit: 1,
    draft: false,
    overrideAccess: false,
  });
  const doc = result.docs[0];
  return doc ? toPost(doc) : undefined;
}

export async function findAuthor(
  client: BlogClient,
  slug: string,
): Promise<BlogAuthor | undefined> {
  const result = await client.find({
    collection: "authors",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
    overrideAccess: false,
  });
  return toAuthor(result.docs[0]);
}
