import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site.ts";

/** Indexable public URLs only. /admin and /api never belong here. CMS pages join as their routes ship. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date() }];
}
