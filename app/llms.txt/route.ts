import { home } from "@/content/home.ts";
import { PAGES } from "@/content/pages/index.ts";
import { getPublishedSummaries } from "@/lib/blog/data.ts";
import { buildLlmsTxt } from "@/lib/seo/llms.ts";

// Lives in app/ like robots.ts, so the URL is exactly /llms.txt. Rendered per request from cached
// data: publishing or unpublishing a post revalidates it (lib/blog/data.ts).
export const dynamic = "force-dynamic";

/** /llms.txt: key pages with one-line descriptions, plus published blog posts (seo.md §7). */
export async function GET() {
  const body = buildLlmsTxt({
    title: "Nayab Gull",
    summary: home.meta.description,
    pages: [
      { name: "Home", path: "/", description: home.meta.description },
      ...PAGES.filter((page) => !page.noindex).map((page) => ({
        name: page.name,
        path: page.path,
        description: page.meta.description,
      })),
    ],
    posts: await getPublishedSummaries(),
  });
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
