import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorBox } from "@/components/blog/AuthorBox.tsx";
import { PostList } from "@/components/blog/PostList.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { authorDescription, BLOG_COPY } from "@/lib/blog/copy.ts";
import { getAuthor, getPublishedSummaries } from "@/lib/blog/data.ts";
import { BLOG_CRUMB, listJsonLd } from "@/lib/blog/jsonld.ts";
import { fitTitle, listImagePath, listMetadata } from "@/lib/blog/metadata.ts";
import { authorPath } from "@/lib/blog/paths.ts";
import { paginate, postsByAuthor } from "@/lib/blog/view.ts";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * The author's bio page that every post links to (content.md §6). `noindex, follow`: the About
 * page owns the "nayab gull" keyword, so this page must not compete with it.
 */
async function load(slug: string) {
  const [author, all] = await Promise.all([getAuthor(slug), getPublishedSummaries()]);
  const posts = postsByAuthor(all, slug);
  return author && posts.length > 0 ? { author, posts } : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = await load(slug);
  if (!found) return {};
  return listMetadata({
    title: fitTitle(found.author.name, BLOG_COPY.authorExtras),
    description: authorDescription(found.author.name),
    path: authorPath(slug),
    indexable: false,
    image: { url: listImagePath("author", slug), alt: found.author.name },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const found = await load(slug);
  const list = found ? paginate(found.posts, 1, Math.max(found.posts.length, 1)) : undefined;
  if (!found || !list) notFound();
  const path = authorPath(slug);
  return (
    <>
      <JsonLd data={listJsonLd([BLOG_CRUMB, { name: found.author.name, path }])} />
      <PostList
        title={found.author.name}
        crumb={BLOG_CRUMB}
        intro={found.author.jobTitle ? <p>{found.author.jobTitle}</p> : null}
        list={list}
        base={path}
      >
        <div className="mt-8">
          <AuthorBox author={found.author} headingId="author-heading" linkToAuthorPage={false} />
        </div>
      </PostList>
    </>
  );
}
