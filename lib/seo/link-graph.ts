import { load } from "cheerio";

import type { Issue } from "./issue.ts";
import { sitePath } from "./site.ts";

/** Most clicks from the homepage to any page (seo.md §4). */
export const MAX_CLICK_DEPTH = 3;

/** Every link on the page, header, menu and footer included (a visitor can click all of them). */
export function allHrefs(html: string): string[] {
  const $ = load(html);
  return $("a[href]")
    .toArray()
    .map((el) => $(el).attr("href") ?? "");
}

/**
 * Internal link targets of one page as site paths: no query, no fragment, no self-link.
 * External links, mail and phone links are ignored.
 */
export function internalTargets(path: string, hrefs: readonly string[]): string[] {
  const targets = new Set<string>();
  for (const href of hrefs) {
    const internal = href.startsWith("/") || href.startsWith("https://nayabgull.com");
    if (!internal || href.startsWith("//")) continue;
    const target = sitePath(href.split("?")[0] ?? href);
    if (target !== path) targets.add(target);
  }
  return [...targets];
}

/**
 * Clicks from the homepage to every page in `graph` (path → link targets), by breadth-first
 * search. Pages the homepage cannot reach are missing from the result.
 */
export function clickDepths(graph: ReadonlyMap<string, readonly string[]>): Map<string, number> {
  const depth = new Map<string, number>([["/", 0]]);
  const queue = ["/"];
  for (let path = queue.shift(); path !== undefined; path = queue.shift()) {
    const next = (depth.get(path) ?? 0) + 1;
    for (const target of graph.get(path) ?? []) {
      if (!depth.has(target)) {
        depth.set(target, next);
        queue.push(target);
      }
    }
  }
  return depth;
}

/**
 * seo.md §4: every page is reachable within 3 clicks of the homepage and has at least one
 * incoming internal link from another page (no orphans).
 */
export function checkLinkGraph(graph: ReadonlyMap<string, readonly string[]>): Issue[] {
  const depths = clickDepths(graph);
  const incoming = new Set([...graph.values()].flat());
  const issues: Issue[] = [];
  for (const path of graph.keys()) {
    if (path === "/") continue;
    if (!incoming.has(path)) {
      issues.push({ rule: "orphan-page", message: `${path} has no incoming internal link.` });
    }
    const depth = depths.get(path);
    if (depth === undefined || depth > MAX_CLICK_DEPTH) {
      issues.push({
        rule: "click-depth",
        message: `${path} is ${depth === undefined ? "not reachable" : `${depth} clicks`} from the homepage (max ${MAX_CLICK_DEPTH}).`,
      });
    }
  }
  return issues;
}
