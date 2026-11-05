import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/site.ts";

// Lives in app/ instead of app/(site)/: Next.js 16.4.2 drops robots.ts from a route group in the build.
// It has no layout, so it serves the whole site either way.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
