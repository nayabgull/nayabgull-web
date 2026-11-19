import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostList } from "@/components/blog/PostList.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { BLOG_COPY } from "@/lib/blog/copy.ts";
import { getPublishedSummaries } from "@/lib/blog/data.ts";
import { BLOG_CRUMB, listJsonLd } from "@/lib/blog/jsonld.ts";
import { fitTitle, listImagePath, listMetadata } from "@/lib/blog/metadata.ts";
import { categoryPath, listPagePath } from "@/lib/blog/paths.ts";
import { isListIndexable, paginate, postsInCategory } from "@/lib/blog/view.ts";

/** Posts of one category. 404 when the category has no published post. */
async function load(slug: string) {
  const posts = postsInCategory(await getPublishedSummaries(), slug);
  const category = posts[0]?.category;
  return category ? { category, posts } : undefined;
}

export async function categoryMetadata(slug: string, page: number): Promise<Metadata> {
  const found = await load(slug);
  if (!found) return {};
  const path = categoryPath(slug);
  return listMetadata({
    title: fitTitle(
      page === 1 ? found.category.name : `${found.category.name}, Page ${page}`,
      BLOG_COPY.categoryExtras,
    ),
    description: found.category.description,
    path: listPagePath(path, page),
    indexable: page === 1 && isListIndexable(path, found.posts.length),
    image: { url: listImagePath("category", slug), alt: found.category.name },
  });
}

export async function CategoryPage({ slug, page }: { slug: string; page: number }) {
  const found = await load(slug);
  const list = found ? paginate(found.posts, page) : undefined;
  if (!found || !list) notFound();
  const path = categoryPath(slug);
  return (
    <>
      <JsonLd data={listJsonLd([BLOG_CRUMB, { name: found.category.name, path }])} />
      <PostList
        title={page === 1 ? found.category.name : `${found.category.name}, page ${page}`}
        crumb={BLOG_CRUMB}
        intro={<p>{found.category.description}</p>}
        list={list}
        base={path}
      />
    </>
  );
}
