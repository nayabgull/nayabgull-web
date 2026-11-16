import type { MetadataRoute } from "next";

import { CONTACT_UPDATED } from "@/content/contact.ts";
import { PAGES } from "@/content/pages/index.ts";
import { CONTACT_PATH } from "@/lib/seo/routes.ts";
import { canonicalFor, SITE_URL } from "@/lib/seo/site.ts";
import { isComingSoon } from "@/lib/site-mode.ts";

// Reads SITE_MODE per request, so the sitemap always matches the mode the server runs in.
export const dynamic = "force-dynamic";

/**
 * Indexable public URLs only. /admin, /api and noindex pages never belong here. In coming-soon mode
 * the only indexable URL is the homepage address, which shows the coming-soon page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (isComingSoon(process.env)) return [{ url: SITE_URL, lastModified: new Date() }];
  return [
    { url: SITE_URL, lastModified: new Date() },
    ...PAGES.filter((page) => !page.noindex).map((page) => ({
      url: canonicalFor(page.path),
      lastModified: new Date(page.updated),
    })),
    { url: canonicalFor(CONTACT_PATH), lastModified: new Date(CONTACT_UPDATED) },
  ];
}
