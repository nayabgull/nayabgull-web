export const SITE_URL = "https://nayabgull.com";
export const BRAND = "Nayab Gull";
export const TITLE_SUFFIX = `| ${BRAND}`;

/** Site-relative path of a link or URL on this site: no origin, fragment or trailing slash. */
export function sitePath(href: string): string {
  const path = (href.replace(SITE_URL, "").split("#")[0] ?? "").replace(/\/$/, "");
  return path === "" ? "/" : path;
}

/** Absolute canonical URL for a path: no trailing slash, homepage is the bare origin. */
export function canonicalFor(path: string): string {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? SITE_URL : `${SITE_URL}${clean}`;
}
