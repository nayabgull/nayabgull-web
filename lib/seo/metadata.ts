import type { Metadata } from "next";

import { BRAND, canonicalFor } from "./site.ts";

/** File name of a page's Open Graph image under /og: "/services/x" → "services-x". */
export function ogSlug(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
}

export interface PageMetaInput {
  /** Full <title>, already ending with "| Nayab Gull" (seo.md §2). */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/". */
  path: string;
  type?: "website" | "article";
  /**
   * Alt text of the page's own 1200×630 image at /og/<slug>. Leave it out on the homepage, which gets
   * its image from app/(site)/opengraph-image.tsx.
   */
  imageAlt?: string;
  /** Legal pages only: `noindex, follow` (they stay out of the sitemap). */
  noindex?: boolean;
  /** A 1200×630 image served somewhere other than /og/<slug> (blog pages). Wins over `imageAlt`. */
  image?: { url: string; alt: string };
  /** Blog posts: Open Graph article times (ISO 8601) and author names. */
  article?: { publishedTime: string; modifiedTime: string; authors: readonly string[] };
}

/**
 * Title, description, self-referencing canonical, Open Graph and Twitter card for one page.
 * The 1200×630 og:image comes from the route's opengraph-image / twitter-image files.
 */
export function pageMetadata(input: PageMetaInput): Metadata {
  const url = canonicalFor(input.path);
  const image =
    input.image ??
    (input.imageAlt === undefined
      ? undefined
      : { url: `/og/${ogSlug(input.path)}`, alt: input.imageAlt });
  const images = image
    ? { images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }] }
    : {};
  const article = input.article
    ? {
        publishedTime: input.article.publishedTime,
        modifiedTime: input.article.modifiedTime,
        authors: [...input.article.authors],
      }
    : {};
  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: BRAND,
      locale: "en_US",
      type: input.type ?? "website",
      ...images,
      ...article,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...images,
    },
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
