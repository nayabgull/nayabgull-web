import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs.tsx";
import { Container } from "@/components/ui/Container.tsx";
import type { PostSummary } from "@/lib/blog/types.ts";
import type { PageOf } from "@/lib/blog/view.ts";

import { Pagination } from "./Pagination.tsx";
import { PostCard } from "./PostCard.tsx";

/** Shared layout of every blog list (hub, category, tag, author): heading, intro, posts, pages. */
export function PostList({
  title,
  crumb,
  intro,
  list,
  base,
  children,
}: {
  title: string;
  /** Parent crumb; the hub itself has none (Home › Blog). */
  crumb?: { name: string; path: string };
  intro: ReactNode;
  list: PageOf<PostSummary>;
  /** Path of page 1, for pagination links. */
  base: string;
  /** Extra content under the intro (an author box). */
  children?: ReactNode;
}) {
  return (
    <Container className="max-w-3xl! pt-2 pb-section sm:pt-4">
      <Breadcrumbs current={title} parent={crumb} />
      <h1 className="mt-4 text-display leading-[1.08] font-bold break-words">{title}</h1>
      <div className="mt-4 text-lead text-text-muted">{intro}</div>
      {children}
      <ul className="mt-10 grid gap-5">
        {list.items.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      <Pagination base={base} page={list.page} totalPages={list.totalPages} />
    </Container>
  );
}
