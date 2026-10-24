export type PageType =
  | "home"
  | "about"
  | "pricing"
  | "hub"
  | "service"
  | "industry"
  | "package"
  | "blog"
  | "case-study"
  | "tool";

/** Minimum body words per page type (seo.md §10). Types not listed there have no minimum. */
export const MIN_WORDS: Partial<Record<PageType, number>> = {
  home: 1200,
  hub: 1500,
  industry: 1500,
  service: 1200,
  package: 600,
  blog: 1500,
  "case-study": 800,
};

/**
 * Minimum Flesch Reading Ease (content.md §2): 55 for blog posts, 60 for service, hub,
 * industry and package pages. The other money pages (home, about, pricing) use the same 60.
 */
export function minReadingEase(type: PageType): number {
  return type === "blog" ? 55 : 60;
}

/** JSON-LD types every page of this type must carry (seo.md §6). */
export function requiredSchemaTypes(type: PageType): string[] {
  const base = ["ProfessionalService", "WebSite", "BreadcrumbList"];
  switch (type) {
    case "home":
    case "about":
      return [...base, "Person"];
    case "hub":
    case "service":
    case "industry":
    case "package":
      return [...base, "Service"];
    case "blog":
      return [...base, "BlogPosting"];
    case "case-study":
      return [...base, "Article"];
    case "tool":
      return [...base, "WebApplication"];
    case "pricing":
      return base;
  }
}
