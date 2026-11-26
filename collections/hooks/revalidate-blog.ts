import { revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { BLOG_CACHE_TAG } from "@/lib/blog/paths.ts";
import { postChangeIsPublic } from "@/lib/blog/revalidate.ts";

/**
 * On-demand revalidation of every blog query (post pages, lists, header link, sitemap, llms.txt).
 * `expire: 0` means the next visitor gets fresh data, not a stale copy. Outside a Next.js request
 * (a migration or a script) there is no cache to clear, so the call is skipped.
 */
export function revalidateBlog(): void {
  try {
    revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  } catch {
    // Not inside Next.js (CLI, seed script): nothing is cached, so there is nothing to clear.
  }
}

/** Authors, categories, media and FAQs: any change can show on a published post. */
type Doc = Record<string, unknown>;

export const revalidateBlogAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateBlog();
  return doc as Doc;
};

export const revalidateBlogAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateBlog();
  return doc as Doc;
};

/** Posts: only a publish or an unpublish changes the site. */
export const revalidatePostAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  if (postChangeIsPublic(doc as Doc, previousDoc as Doc)) revalidateBlog();
  return doc as Doc;
};
