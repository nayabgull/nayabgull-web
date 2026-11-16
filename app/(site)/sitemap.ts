import type { MetadataRoute } from "next";

import { PAGES } from "@/content/pages/index.ts";
import { canonicalFor, SITE_URL } from "@/lib/seo/site.ts";

/** Indexable public URLs only. /admin, /api and noindex pages never belong here. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date() },
    ...PAGES.filter((page) => !page.noindex).map((page) => ({
      url: canonicalFor(page.path),
      lastModified: new Date(page.updated),
    })),
  ];
}
