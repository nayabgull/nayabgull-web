import { auditContent } from "../content/audit-rules.ts";
import { extractLexical } from "../content/lexical.ts";
import {
  checkCanonical,
  checkHeadings,
  checkInternalLinks,
  checkMetaDescription,
  checkTitle,
} from "../seo/audit-rules.ts";
import type { Issue } from "../seo/issue.ts";
import { keywordFor } from "../seo/keywords.ts";
import type { KeywordEntry } from "../seo/keywords.ts";
import { canonicalFor } from "../seo/site.ts";
import { checkSlug } from "../seo/slug.ts";
import type { PageSnapshot } from "../seo/snapshot.ts";

/** Collections that become public pages. Drafts are never checked; only a publish is. */
export type PageCollection = "posts" | "services" | "industries" | "case-studies";

export const SERVICE_SECTIONS = [
  "services",
  "gohighlevel-agency",
  "ai-automation-agency",
  "packages",
] as const;
export type ServiceSection = (typeof SERVICE_SECTIONS)[number];

export interface PublishCandidate {
  collection: PageCollection;
  slug: string;
  /** Services only: the URL section the page lives under. Defaults to "services". */
  section?: ServiceSection | undefined;
  /** Visible H1. */
  title: string;
  seo: {
    title?: string | undefined;
    metaDescription?: string | undefined;
    primaryKeyword?: string | undefined;
    canonical?: string | undefined;
  };
  /** Lexical editor state. */
  content: unknown;
  /** Case studies only: Nayab confirmed the result is real and shareable. */
  resultApproved?: boolean | undefined;
}

/** An Issue plus the admin field it belongs to, so the editor sees the error on that field. */
export interface PublishIssue extends Issue {
  field: string;
}

const BASE_PATH: Record<Exclude<PageCollection, "services">, string> = {
  posts: "/blog",
  industries: "/industries",
  "case-studies": "/case-studies",
};

/** Public path of a document. It is the key into lib/seo/keywords.ts. */
export function pathFor(
  candidate: Pick<PublishCandidate, "collection" | "slug" | "section">,
): string {
  const base =
    candidate.collection === "services"
      ? `/${candidate.section ?? "services"}`
      : BASE_PATH[candidate.collection];
  return `${base}/${candidate.slug}`;
}

/** Which admin field an audit rule belongs to. Everything else is about the body copy. */
export function fieldForRule(rule: string): string {
  if (rule.startsWith("title-")) return "seo.title";
  if (rule.startsWith("meta-")) return "seo.metaDescription";
  if (rule.startsWith("canonical-")) return "seo.canonical";
  if (rule.startsWith("slug-")) return "slug";
  if (rule === "h1-keyword" || rule.startsWith("keyword-registered")) return "seo.primaryKeyword";
  if (rule === "h1-single") return "title";
  return "content";
}

const normalize = (value: string | undefined): string => (value ?? "").trim().toLowerCase();

/** Rules that need the page's own keyword entry. Returns the entry, or why there is none. */
function resolveEntry(
  path: string,
  primaryKeyword: string,
): { entry: KeywordEntry; issues: Issue[] } | { entry: undefined; issues: Issue[] } {
  const entry = keywordFor(path);
  if (!entry) {
    return {
      entry: undefined,
      issues: [
        {
          rule: "keyword-registered",
          message: `No primary keyword is registered for ${path}. Add it to docs/seo/keyword-map.md and lib/seo/keywords.ts (Nayab approves new keywords), then publish.`,
        },
      ],
    };
  }
  const issues: Issue[] =
    primaryKeyword === entry.primary
      ? []
      : [
          {
            rule: "keyword-registered-match",
            message: `Primary keyword must be "${entry.primary}" for ${path} (it is "${primaryKeyword}").`,
          },
        ];
  return { entry, issues };
}

function snapshotFor(candidate: PublishCandidate, path: string): PageSnapshot {
  const copy = extractLexical(candidate.content);
  const headings = [{ level: 1, text: candidate.title }, ...copy.headings];
  return {
    lang: "en-US",
    title: candidate.seo.title,
    metaDescription: candidate.seo.metaDescription,
    canonical: candidate.seo.canonical?.trim() ? candidate.seo.canonical : canonicalFor(path),
    robots: undefined,
    meta: {},
    headings,
    jsonLd: [],
    links: copy.links,
    images: [],
    paragraphs: copy.paragraphs,
    bodyText: [...headings.map((h) => h.text), ...copy.paragraphs].join(" "),
  };
}

/**
 * Every hard rule a document must pass before it can be published. Reuses the validators behind
 * `pnpm audit:seo` and `pnpm audit:content`, so the CMS cannot publish what CI would reject.
 * Rules that depend on the rendered template (images, social tags, internal link count) stay in CI.
 */
export function checkPublishRules(candidate: PublishCandidate): PublishIssue[] {
  const path = pathFor(candidate);
  const primary = normalize(candidate.seo.primaryKeyword);
  const { entry, issues: keywordIssues } = resolveEntry(path, primary);
  const page = snapshotFor(candidate, path);

  const issues: Issue[] = [
    ...checkSlug(candidate.slug),
    ...keywordIssues,
    ...checkTitle(page, entry),
    ...checkMetaDescription(page, entry),
    ...checkCanonical(page, path),
    ...checkHeadings(page, entry),
    // Only the anchor-text rule: link counts also depend on the page template.
    ...checkInternalLinks(page, path).filter((issue) => issue.rule === "anchor-text"),
    ...auditContent({ paragraphs: page.paragraphs, bodyText: page.bodyText, entry }),
  ];
  if (candidate.collection === "case-studies" && candidate.resultApproved !== true) {
    issues.push({
      rule: "result-approved",
      message:
        "A case study can only be published after Nayab confirms the result is real and approved.",
    });
  }

  const seen = new Set<string>();
  const keyOf = (issue: Issue): string =>
    issue.rule === "keyword-registered" ? issue.rule : `${issue.rule}|${issue.message}`;
  return issues
    .filter((issue) => {
      const key = keyOf(issue);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((issue) => ({ ...issue, field: fieldForRule(issue.rule) }));
}
