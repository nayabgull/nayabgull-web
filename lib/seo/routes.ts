import { PAGES } from "../../content/pages/index.ts";

/** Indexable public routes: the homepage plus every launch page that is not `noindex`. */
export const INDEXABLE_ROUTES: readonly string[] = [
  "/",
  ...PAGES.filter((page) => !page.noindex).map((page) => page.path),
];

/** Public pages that carry `noindex, follow` (legal pages). Never in the sitemap. */
export const NOINDEX_ROUTES: readonly string[] = PAGES.filter((page) => page.noindex).map(
  (page) => page.path,
);
