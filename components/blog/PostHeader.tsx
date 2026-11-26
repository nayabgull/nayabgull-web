import Image from "next/image";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { BLOG_CRUMB } from "@/lib/blog/jsonld.ts";
import type { BlogPost } from "@/lib/blog/types.ts";
import { formatDate, wasUpdated } from "@/lib/blog/view.ts";

/**
 * Top of a post: breadcrumbs, category, H1, byline with dates, hero image (the LCP element, so it
 * loads with priority) and the direct answer to the post's main question (seo.md §10).
 */
export function PostHeader({ post }: { post: BlogPost }) {
  const updated = wasUpdated(post);
  return (
    <div className="pt-2 sm:pt-4">
      <Breadcrumbs current={post.title} parent={BLOG_CRUMB} />
      {post.category ? (
        <p className="mt-4 text-small font-semibold tracking-[0.16em] text-accent uppercase">
          {post.category.name}
        </p>
      ) : null}
      <h1 className="mt-3 text-display leading-[1.08] font-bold break-words">{post.title}</h1>
      <p className="mt-4 text-small text-text-muted">
        {post.author ? <>By {post.author.name} · </> : null}
        {updated ? (
          <>
            Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time> ·
            Published <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          </>
        ) : (
          <>
            Published <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          </>
        )}
      </p>
      {post.heroImage ? (
        <Image
          src={post.heroImage.url}
          alt={post.heroImage.alt}
          width={post.heroImage.width}
          height={post.heroImage.height}
          priority
          sizes="(min-width: 768px) 720px, 100vw"
          className="mt-6 h-auto w-full rounded-lg border border-border"
        />
      ) : null}
      <div className="mt-6 rounded-lg border-l-4 border-accent bg-surface p-5">
        <p className="text-small font-semibold tracking-[0.12em] text-accent uppercase">
          Short answer
        </p>
        <p className="mt-2 text-lead">{post.directAnswer}</p>
      </div>
    </div>
  );
}
