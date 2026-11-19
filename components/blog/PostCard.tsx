import Link from "next/link";

import { postPath } from "@/lib/blog/paths.ts";
import type { PostSummary } from "@/lib/blog/types.ts";
import { formatDate } from "@/lib/blog/view.ts";

/** One post in a list: title link, date, category and excerpt. No image, so lists stay light. */
export function PostCard({ post, headingLevel = 2 }: { post: PostSummary; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="rounded-lg border border-border bg-surface p-5 sm:p-6">
      <p className="text-small text-text-muted">
        {post.category ? <>{post.category.name} · </> : null}
        <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
      </p>
      <Heading className="mt-2 text-h3 leading-snug font-bold">
        <Link href={postPath(post.slug)} prefetch={false} className="text-link">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-2 text-text-muted">{post.excerpt}</p>
    </article>
  );
}
