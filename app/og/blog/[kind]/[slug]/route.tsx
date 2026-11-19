import { renderOgImage } from "@/app/(site)/_og/render.tsx";
import { BLOG_COPY } from "@/lib/blog/copy.ts";
import { getAuthor, getPublishedPost, getPublishedSummaries } from "@/lib/blog/data.ts";
import { postsInCategory, tagLabel } from "@/lib/blog/view.ts";

/** Title shown on a blog page's 1200×630 Open Graph image, or undefined for an unknown page. */
async function titleFor(kind: string, slug: string): Promise<string | undefined> {
  switch (kind) {
    case "post":
      return (await getPublishedPost(slug))?.title;
    case "hub":
      return slug === "index" && (await getPublishedSummaries()).length > 0
        ? BLOG_COPY.hub.title.replace(/ \| .*$/, "")
        : undefined;
    case "category":
      return postsInCategory(await getPublishedSummaries(), slug)[0]?.category?.name;
    case "tag": {
      const label = tagLabel(await getPublishedSummaries(), slug);
      return label ? `Posts tagged #${label}` : undefined;
    }
    case "author":
      return (await getAuthor(slug))?.name;
    default:
      return undefined;
  }
}

/**
 * Open Graph images of blog pages, rendered on request from published data only. Outside /api, so
 * crawlers may fetch them: the post image is also the BlogPosting `image`.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kind: string; slug: string }> },
) {
  const { kind, slug } = await params;
  const title = await titleFor(kind, slug);
  if (!title) return new Response("Not found", { status: 404 });
  return renderOgImage(title);
}
