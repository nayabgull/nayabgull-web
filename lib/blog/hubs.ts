import { PAGES } from "../../content/pages/index.ts";

export interface HubOption {
  label: string;
  value: string;
}

/** Pages that are never a cluster hub for a post. */
const NOT_HUBS = new Set(["/about", "/contact"]);

/**
 * Pages a post can link up to (seo.md §4: "Blog posts link up to their hub page"). Only live,
 * indexable pages, so the link can never break. A new hub or service page joins automatically.
 */
export const HUB_OPTIONS: readonly HubOption[] = PAGES.filter(
  (page) => !page.noindex && !NOT_HUBS.has(page.path),
).map((page) => ({ label: page.name, value: page.path }));

export function hubFor(path: string | null | undefined): HubOption | undefined {
  return HUB_OPTIONS.find((hub) => hub.value === path);
}

/** Field validation for a post's hub. Empty passes here; the publish rules require it. */
export function validateHub(value: unknown): string | true {
  if (value === null || value === undefined || value === "") return true;
  return hubFor(typeof value === "string" ? value.trim() : undefined)
    ? true
    : `Use one of these paths: ${HUB_OPTIONS.map((hub) => hub.value).join(", ")}`;
}
