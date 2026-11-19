import type { MetadataRoute } from "next";

import { CONTACT_UPDATED } from "@/content/contact.ts";
import { PAGES } from "@/content/pages/index.ts";
import { getPublishedSummaries } from "@/lib/blog/data.ts";
import { blogSitemapEntries } from "@/lib/blog/sitemap.ts";
import { CONTACT_PATH } from "@/lib/seo/routes.ts";
import { canonicalFor, SITE_URL } from "@/lib/seo/site.ts";

// Published posts change without a deploy, so the sitemap renders per request from cached data
// (revalidated on publish and unpublish, lib/blog/data.ts).
export const dynamic = "force-dynamic";

/** Indexable public URLs only. /admin, /api, drafts and noindex pages never belong here. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: SITE_URL, lastModified: new Date() },
    ...PAGES.filter((page) => !page.noindex).map((page) => ({
      url: canonicalFor(page.path),
      lastModified: new Date(page.updated),
    })),
    { url: canonicalFor(CONTACT_PATH), lastModified: new Date(CONTACT_UPDATED) },
    ...blogSitemapEntries(await getPublishedSummaries()),
  ];
}
