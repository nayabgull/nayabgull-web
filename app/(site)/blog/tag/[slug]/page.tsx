import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostList } from "@/components/blog/PostList.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { BLOG_COPY, tagDescription } from "@/lib/blog/copy.ts";
import { getPublishedSummaries } from "@/lib/blog/data.ts";
import { BLOG_CRUMB, listJsonLd } from "@/lib/blog/jsonld.ts";
import { fitTitle, listImagePath, listMetadata } from "@/lib/blog/metadata.ts";
import { BLOG_PATH } from "@/lib/blog/paths.ts";
import { paginate, postsWithTag, tagLabel } from "@/lib/blog/view.ts";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Tag pages are thin by nature: always `noindex, follow` and never in the sitemap (seo.md §7). */
async function load(slug: string) {
  const all = await getPublishedSummaries();
  const label = tagLabel(all, slug);
  return label ? { label, posts: postsWithTag(all, slug) } : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = await load(slug);
  if (!found) return {};
  return listMetadata({
    title: fitTitle(`#${found.label}`, BLOG_COPY.tagExtras),
    description: tagDescription(found.label),
    path: `${BLOG_PATH}/tag/${slug}`,
    indexable: false,
    image: { url: listImagePath("tag", slug), alt: `Posts tagged ${found.label}` },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const found = await load(slug);
  // Every tagged post on one page: tag pages are not paginated.
  const list = found ? paginate(found.posts, 1, Math.max(found.posts.length, 1)) : undefined;
  if (!found || !list) notFound();
  const path = `${BLOG_PATH}/tag/${slug}`;
  return (
    <>
      <JsonLd data={listJsonLd([BLOG_CRUMB, { name: `#${found.label}`, path }])} />
      <PostList
        title={`Posts tagged #${found.label}`}
        crumb={BLOG_CRUMB}
        intro={<p>{tagDescription(found.label)}</p>}
        list={list}
        base={path}
      />
    </>
  );
}
