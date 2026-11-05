import type { Issue } from "./issue.ts";

/** URL slug rules from seo.md §2: lowercase, hyphens, at most 5 words, no dates. */
export function checkSlug(slug: string): Issue[] {
  const issues: Issue[] = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    issues.push({
      rule: "slug-format",
      message: `Slug "${slug}" must be lowercase letters, numbers and single hyphens.`,
    });
  }
  const wordCount = slug.split("-").filter((part) => part !== "").length;
  if (wordCount > 5) {
    issues.push({ rule: "slug-length", message: `Slug has ${wordCount} words (max 5).` });
  }
  if (/(^|-)(19|20)\d{2}(-|$)/.test(slug)) {
    issues.push({ rule: "slug-date", message: "Slug must not contain a year or date." });
  }
  return issues;
}
