import { INDEXABLE_ROUTES, NOINDEX_ROUTES } from "../lib/seo/routes.ts";

/**
 * Indexable public routes: every on-page SEO and content audit visits these (plus every URL from
 * /sitemap.xml). The list comes from content/pages/index.ts, so a new page joins as soon as it is
 * registered.
 */
export const ROUTES: readonly string[] = INDEXABLE_ROUTES;

/** Legal pages: `noindex, follow`, never in the sitemap. `audit:seo` checks exactly that. */
export { NOINDEX_ROUTES };

/** Every public route. The browser tests (a11y, responsive) visit all of them. */
export const ALL_ROUTES: readonly string[] = [...INDEXABLE_ROUTES, ...NOINDEX_ROUTES];
