import { SITE_URL } from "../seo/site.ts";

export const REDIRECT_TYPES = ["301", "410"] as const;
export type RedirectType = (typeof REDIRECT_TYPES)[number];

const RESERVED = /^\/(admin|api)(\/|$)/;

/** The old URL: a site path, no origin, query, fragment or trailing slash. Returns an error or true. */
export function validateRedirectFrom(from: string | null | undefined): string | true {
  const value = (from ?? "").trim();
  if (!value.startsWith("/") || value.startsWith("//"))
    return 'Must be a site path starting with "/".';
  if (/[?#\s]/.test(value)) return "Must not contain a query string, fragment or spaces.";
  if (value.length > 1 && value.endsWith("/")) return "Must not end with a trailing slash.";
  if (RESERVED.test(value)) return "/admin and /api cannot be redirected.";
  return true;
}

/** The new URL for a 301: a site path, or an absolute URL on nayabgull.com. 410 needs none. */
export function validateRedirectTo(
  to: string | null | undefined,
  type: string | null | undefined,
  from: string | null | undefined,
): string | true {
  if (type === "410") return true;
  const value = (to ?? "").trim();
  if (value === "") return "A 301 redirect needs a destination.";
  const path = value.startsWith(SITE_URL) ? value.slice(SITE_URL.length) || "/" : value;
  if (!path.startsWith("/") || path.startsWith("//")) {
    return `Must be a site path or a ${SITE_URL} URL.`;
  }
  if (RESERVED.test(path)) return "Cannot redirect to /admin or /api.";
  if (path === (from ?? "").trim()) return "A redirect cannot point to itself.";
  return true;
}
