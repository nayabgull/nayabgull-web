import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HubLink } from "@/components/blog/HubLink.tsx";
import { PostBody } from "@/components/blog/PostBody.tsx";
import { PostCta } from "@/components/blog/PostCta.tsx";
import { PostHeader } from "@/components/blog/PostHeader.tsx";
import { TableOfContents } from "@/components/blog/TableOfContents.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { getPublishedPost } from "@/lib/blog/data.ts";
import { postJsonLd } from "@/lib/blog/jsonld.ts";
import { postMetadata } from "@/lib/blog/metadata.ts";
import { outline } from "@/lib/blog/toc.ts";

interface Props {
  params: Promise<{ slug: string }>;
}

/** The closing CTA of every post (the same primary CTA as the rest of the site). */
const CLOSING_CTA = {
  heading: "Want this set up for your business?",
  text: "Book a free strategy call. You get a clear plan, a price range and a timeline for your project.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  return post ? postMetadata(post) : {};
}

/**
 * A published blog post. Drafts are never served (404). The author box, topics and related posts
 * render outside <main> through the @aside slot.
 */
export default async function Page({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  const sections = outline(post.content);
  return (
    <article>
      <JsonLd data={postJsonLd(post)} />
      <Container className="max-w-3xl! pb-section">
        <PostHeader post={post} />
        <TableOfContents entries={sections.entries} />
        <PostBody content={post.content} outline={sections} />
        <HubLink hub={post.hub} />
        <PostCta fields={CLOSING_CTA} />
      </Container>
    </article>
  );
}
