import { PostAside } from "@/components/blog/PostAside.tsx";
import { getPublishedPost, getPublishedSummaries } from "@/lib/blog/data.ts";
import { relatedPosts } from "@/lib/blog/view.ts";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Author box, topics and related posts of a blog post, outside <main> (app/(site)/layout.tsx). */
export default async function Aside({ params }: Props) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPublishedPost(slug), getPublishedSummaries()]);
  if (!post) return null;
  return <PostAside post={post} related={relatedPosts(post, all)} />;
}
