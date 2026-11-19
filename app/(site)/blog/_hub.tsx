import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostList } from "@/components/blog/PostList.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { BLOG_COPY } from "@/lib/blog/copy.ts";
import { getPublishedSummaries } from "@/lib/blog/data.ts";
import { BLOG_CRUMB, listJsonLd } from "@/lib/blog/jsonld.ts";
import { listImagePath, listMetadata } from "@/lib/blog/metadata.ts";
import { BLOG_PATH, listPagePath } from "@/lib/blog/paths.ts";
import { isListIndexable, paginate } from "@/lib/blog/view.ts";

/**
 * The blog hub, page `page`. With no published post it is a 404 (no empty pages). Page 1 is
 * indexable once it lists 3+ posts and its keyword is registered; later pages are always noindex.
 */
export async function hubMetadata(page: number): Promise<Metadata> {
  const posts = await getPublishedSummaries();
  return listMetadata({
    title: page === 1 ? BLOG_COPY.hub.title : BLOG_COPY.pageTitle(page),
    description: BLOG_COPY.hub.description,
    path: listPagePath(BLOG_PATH, page),
    indexable: page === 1 && isListIndexable(BLOG_PATH, posts.length),
    image: { url: listImagePath("hub", "index"), alt: BLOG_COPY.hub.name },
  });
}

export async function BlogHub({ page }: { page: number }) {
  const list = paginate(await getPublishedSummaries(), page);
  if (!list) notFound();
  return (
    <>
      <JsonLd data={listJsonLd([BLOG_CRUMB])} />
      <PostList
        title={page === 1 ? BLOG_COPY.hub.name : `${BLOG_COPY.hub.name}, page ${page}`}
        crumb={page === 1 ? undefined : BLOG_CRUMB}
        intro={<p>{BLOG_COPY.hub.intro}</p>}
        list={list}
        base={BLOG_PATH}
      />
    </>
  );
}
