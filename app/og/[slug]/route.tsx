import { renderOgImage } from "@/app/(site)/_og/render.tsx";
import { PAGES } from "@/content/pages/index.ts";
import { headlineText } from "@/content/pages/types.ts";
import { ogSlug } from "@/lib/seo/metadata.ts";

// One 1200×630 image per launch page, rendered at build time. A page that sets its own Open Graph
// data does not inherit the homepage's opengraph-image file, so lib/seo/metadata.ts points each page
// at its image here. Lives outside app/(site)/ so the URL is stable (no route-group hash suffix).
export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES.map((page) => ({ slug: ogSlug(page.path) }));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[slug]">) {
  const { slug } = await params;
  const page = PAGES.find((candidate) => ogSlug(candidate.path) === slug);
  if (!page) return new Response("Not found", { status: 404 });
  return renderOgImage(headlineText(page));
}
