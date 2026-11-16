import { z } from "zod";

/**
 * Coming-soon mode lets the site go live on Vercel before launch. SITE_MODE is "live" (default) or
 * "coming-soon". In coming-soon mode proxy.ts rewrites every public route to the holding page.
 * This file has no Node-only imports, so proxy.ts, the layout and lib/env.ts can all use it.
 */
export const SITE_MODES = ["live", "coming-soon"] as const;
export type SiteMode = (typeof SITE_MODES)[number];

/** An unset or empty variable means "live", so a missing key can never hide the finished site. */
export const siteModeSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.enum(SITE_MODES, 'must be "live" or "coming-soon"').default("live"),
);

/** Route that holds the coming-soon page. It only exists in coming-soon mode (404 in live mode). */
export const COMING_SOON_PATH = "/coming-soon";

/** Reads SITE_MODE and fails loudly on a typo, so a bad value never silently exposes the site. */
export function readSiteMode(source: Readonly<Record<string, string | undefined>>): SiteMode {
  const result = siteModeSchema.safeParse(source.SITE_MODE);
  if (!result.success) {
    throw new Error(`Invalid SITE_MODE "${source.SITE_MODE}": must be "live" or "coming-soon".`);
  }
  return result.data;
}

export const isComingSoon = (source: Readonly<Record<string, string | undefined>>): boolean =>
  readSiteMode(source) === "coming-soon";

/** Pages that stay reachable in coming-soon mode: the lead form links to both. */
export const COMING_SOON_OPEN_PATHS: readonly string[] = ["/privacy-policy", "/terms"];

/**
 * Paths that are never rewritten: the CMS, framework files, generated images (the homepage's and the
 * coming-soon page's own) and static files.
 */
const PASS_THROUGH =
  /^\/(?:admin|api|_next|og)(?:\/|$)|^\/(?:coming-soon\/)?(?:opengraph|twitter)-image(?:[-/.]|$)/;
const STATIC_FILE = /\.[a-z0-9]+$/i;

export type ComingSoonDecision =
  | { action: "next" }
  | { action: "rewrite"; to: typeof COMING_SOON_PATH }
  | { action: "redirect"; to: "/" };

/** What proxy.ts does with a request in coming-soon mode. Pure, so it is easy to test. */
export function comingSoonDecision(pathname: string): ComingSoonDecision {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (PASS_THROUGH.test(path) || STATIC_FILE.test(path)) return { action: "next" };
  if (COMING_SOON_OPEN_PATHS.includes(path)) return { action: "next" };
  // The holding page lives at "/" only: its own route would be a duplicate URL.
  if (path === COMING_SOON_PATH) return { action: "redirect", to: "/" };
  return { action: "rewrite", to: COMING_SOON_PATH };
}
