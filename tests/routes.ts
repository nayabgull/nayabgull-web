import { INDEXABLE_ROUTES } from "../lib/seo/routes.ts";

/**
 * Public routes every browser test and audit visits. The audits also add every URL from /sitemap.xml.
 * The list comes from content/pages/index.ts, so a new page joins the tests as soon as it is registered.
 */
export const ROUTES: readonly string[] = INDEXABLE_ROUTES;
