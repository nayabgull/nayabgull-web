import type { Metadata } from "next";

import { BRAND, canonicalFor } from "./site.ts";

export interface PageMetaInput {
  /** Full <title>, already ending with "| Nayab Gull" (seo.md §2). */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/". */
  path: string;
  type?: "website" | "article";
}

/**
 * Title, description, self-referencing canonical, Open Graph and Twitter card for one page.
 * The 1200×630 og:image comes from the route's opengraph-image / twitter-image files.
 */
export function pageMetadata(input: PageMetaInput): Metadata {
  const url = canonicalFor(input.path);
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
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
