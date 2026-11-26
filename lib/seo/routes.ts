import { PAGES } from "../../content/pages/index.ts";

/** Pages that are built outside content/pages (own component, own content file). */
export const CONTACT_PATH = "/contact";

/** Indexable public routes: the homepage, every launch page that is not `noindex`, and /contact. */
export const INDEXABLE_ROUTES: readonly string[] = [
  "/",
  ...PAGES.filter((page) => !page.noindex).map((page) => page.path),
  CONTACT_PATH,
];

/** Public pages that carry `noindex, follow` (legal pages). Never in the sitemap. */
export const NOINDEX_ROUTES: readonly string[] = PAGES.filter((page) => page.noindex).map(
  (page) => page.path,
);

/** Every public route. Navigation may only link to these. */
export const ALL_ROUTES: readonly string[] = [...INDEXABLE_ROUTES, ...NOINDEX_ROUTES];
