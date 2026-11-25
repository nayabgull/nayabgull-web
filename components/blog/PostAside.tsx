import Link from "next/link";

import { Container } from "@/components/ui/Container.tsx";
import { categoryPath, tagPath } from "@/lib/blog/paths.ts";
import type { BlogPost, PostSummary } from "@/lib/blog/types.ts";

import { AuthorBox } from "./AuthorBox.tsx";
import { PostCard } from "./PostCard.tsx";

const CHIP =
  "inline-flex min-h-11 items-center rounded-pill border border-border px-4 text-small hover:border-border-strong";

/**
 * Complementary content of a post, rendered outside <main> as a top-level <aside>: author box,
 * category and tags, related posts. Keeping it out of <main> keeps the post's own internal links
 * inside the 3–8 budget that CI counts (seo.md §4).
 */
export function PostAside({ post, related }: { post: BlogPost; related: readonly PostSummary[] }) {
  return (
    <aside aria-label="About this post" className="pb-section">
      <Container className="max-w-3xl! space-y-10">
        {post.authorProfile ? (
          <AuthorBox author={post.authorProfile} headingId="author-heading" />
        ) : null}
        {post.category || post.tags.length > 0 ? (
          <section aria-labelledby="topics-heading">
            <h2 id="topics-heading" className="text-h3 font-bold">
              Topics
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {post.category ? (
                <li>
                  <Link href={categoryPath(post.category.slug)} prefetch={false} className={CHIP}>
                    {post.category.name}
                  </Link>
                </li>
              ) : null}
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={tagPath(tag)} prefetch={false} className={CHIP}>
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {related.length > 0 ? (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-h3 font-bold">
              Related posts
            </h2>
            <ul className="mt-4 grid gap-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <PostCard post={item} headingLevel={3} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </aside>
  );
}
