import { HUB_OPTIONS } from "../blog/hubs.ts";
import { BLOG_PATH, RESERVED_POST_SLUGS } from "../blog/paths.ts";
import { outline } from "../blog/toc.ts";
import { extractLexical, lexicalBlocks } from "../content/lexical.ts";
import { words } from "../content/readability.ts";
import type { Issue } from "../seo/issue.ts";
import type { KeywordEntry } from "../seo/keywords.ts";
import { ALL_ROUTES } from "../seo/routes.ts";
import { sitePath, SITE_URL } from "../seo/site.ts";

import { validateAlt } from "./alt.ts";

/** seo.md §10: a blog post gives the direct answer in its first 60 words. */
export const DIRECT_ANSWER_MAX_WORDS = 60;
export const EXCERPT_MAX_CHARS = 200;
/** seo.md §4: each page links to 3–8 internal pages (template links included, as CI counts them). */
export const MIN_INTERNAL_LINKS = 3;
export const MAX_INTERNAL_LINKS = 8;
/** content.md §4: at least 60% of the secondary keywords appear on the page. */
export const MIN_SECONDARY_COVERAGE = 0.6;
/** A table of contents needs at least this many H2 sections. */
export const MIN_TOC_HEADINGS = 2;

/** What the post rules need, with relationships already read (the hook loads media and FAQs). */
export interface PostRuleInput {
  path: string;
  slug: string;
  excerpt: string;
  directAnswer: string;
  hub: string | undefined;
  hasAuthor: boolean;
  hasCategory: boolean;
  /** Alt text of the hero image; `null` when no image is set. */
  heroImageAlt: string | null;
  /** Alt text of every image in the body, in order. */
  bodyImageAlts: readonly (string | undefined)[];
  /** Lexical state with FAQ items populated (question and answer). */
  content: unknown;
  secondaryKeywords: readonly string[];
  entry: KeywordEntry | undefined;
}

/**
 * Internal links the post template always renders inside <main>: breadcrumbs (Home, Blog) and the
 * link up to the hub. CI counts these together with the body links, so the publish check does too.
 */
export function postTemplateLinks(hub: string | undefined): string[] {
  return ["/", BLOG_PATH, ...(hub ? [hub] : [])];
}

const isInternal = (href: string): boolean =>
  (href.startsWith("/") && !href.startsWith("//")) || href.startsWith(SITE_URL);

/** A body link must point at a real public page: a launch page or another blog URL. */
function isKnownTarget(path: string): boolean {
  if (/^\/(admin|api)(\/|$)/.test(path)) return false;
  return ALL_ROUTES.includes(path) || path.startsWith(`${BLOG_PATH}/`) || path === BLOG_PATH;
}

function checkLinks(input: PostRuleInput, bodyLinks: readonly string[]): Issue[] {
  const issues: Issue[] = [];
  const internal = bodyLinks.filter(isInternal).map(sitePath);
  for (const path of internal) {
    if (!isKnownTarget(path)) {
      issues.push({
        rule: "internal-link-target",
        message: `Link to ${path} does not match a page on the site. Use the exact path, for example /gohighlevel-agency.`,
      });
    }
  }
  const targets = new Set(
    [...postTemplateLinks(input.hub), ...internal].filter((path) => path !== input.path),
  );
  if (targets.size < MIN_INTERNAL_LINKS || targets.size > MAX_INTERNAL_LINKS) {
    issues.push({
      rule: "internal-links",
      message: `The post links to ${targets.size} internal pages (${MIN_INTERNAL_LINKS}–${MAX_INTERNAL_LINKS}). The template already links Home, the blog and the hub page; adjust the links in the body.`,
    });
  }
  return issues;
}

function checkKeywords(input: PostRuleInput, copy: string): Issue[] {
  const { entry } = input;
  if (!entry) return [];
  const issues: Issue[] = [];
  const chosen = input.secondaryKeywords.map((k) => k.trim().toLowerCase()).filter((k) => k !== "");
  const unregistered = chosen.filter((k) => !entry.secondary.includes(k));
  if (unregistered.length > 0) {
    issues.push({
      rule: "secondary-registered",
      message: `Not registered for ${input.path} in docs/seo/keyword-map.md: ${unregistered.join(", ")}.`,
    });
  }
  if (chosen.length > 0) {
    const text = copy.toLowerCase();
    const found = chosen.filter((k) => text.includes(k)).length;
    if (found / chosen.length < MIN_SECONDARY_COVERAGE) {
      issues.push({
        rule: "secondary-coverage",
        message: `${found} of ${chosen.length} secondary keywords appear in the copy (at least 60%).`,
      });
    }
  }
  return issues;
}

const faqHeadingCount = (content: unknown): number =>
  lexicalBlocks(content).filter(
    (block) =>
      block.blockType === "faq" &&
      typeof block.fields.heading === "string" &&
      block.fields.heading.trim() !== "",
  ).length;

function checkStructure(input: PostRuleInput, h2Count: number): Issue[] {
  const issues: Issue[] = [];
  const faqItems = lexicalBlocks(input.content)
    .filter((block) => block.blockType === "faq")
    .reduce(
      (sum, block) => sum + (Array.isArray(block.fields.faqs) ? block.fields.faqs.length : 0),
      0,
    );
  if (faqItems === 0) {
    issues.push({ rule: "faq-block", message: "Add an FAQ block with at least one question." });
  }
  if (h2Count < MIN_TOC_HEADINGS) {
    issues.push({
      rule: "toc-headings",
      message: `The table of contents needs at least ${MIN_TOC_HEADINGS} H2 sections (found ${h2Count}).`,
    });
  }
  return issues;
}

function checkFields(input: PostRuleInput): Issue[] {
  const issues: Issue[] = [];
  if (RESERVED_POST_SLUGS.includes(input.slug)) {
    issues.push({
      rule: "slug-reserved",
      message: `"${input.slug}" is reserved for blog list pages. Pick another slug.`,
    });
  }
  const answerWords = words(input.directAnswer).length;
  if (answerWords === 0) {
    issues.push({
      rule: "direct-answer",
      message: "Write the direct answer to the main question.",
    });
  } else if (answerWords > DIRECT_ANSWER_MAX_WORDS) {
    issues.push({
      rule: "direct-answer",
      message: `The direct answer is ${answerWords} words (max ${DIRECT_ANSWER_MAX_WORDS}).`,
    });
  }
  if (input.excerpt.trim() === "") {
    issues.push({ rule: "excerpt", message: "Write a short excerpt for post cards." });
  }
  if (!HUB_OPTIONS.some((hub) => hub.value === input.hub)) {
    issues.push({ rule: "hub", message: "Choose the hub page this post links up to." });
  }
  if (!input.hasAuthor) issues.push({ rule: "author", message: "Choose the author." });
  if (!input.hasCategory) issues.push({ rule: "category", message: "Choose a category." });
  if (input.heroImageAlt === null) {
    issues.push({ rule: "hero-image", message: "Add a hero image." });
  } else {
    const alt = validateAlt(input.heroImageAlt);
    if (alt !== true) issues.push({ rule: "hero-image", message: `Hero image: ${alt}` });
  }
  input.bodyImageAlts.forEach((value, index) => {
    const alt = validateAlt(value);
    if (alt !== true) {
      issues.push({ rule: "image-alt", message: `Image ${index + 1} in the body: ${alt}` });
    }
  });
  return issues;
}

/**
 * Blog-only publish rules, on top of the shared ones in publish-rules.ts: direct answer, hub link,
 * author, category, hero and body image alt text, FAQ block, table of contents, internal links
 * 3–8 and registered secondary keywords.
 */
export function checkPostRules(input: PostRuleInput): Issue[] {
  const copy = extractLexical(input.content);
  // H2 sections the editor wrote; block headings (FAQ, CTA) do not count for the contents list.
  const h2Count = outline(input.content).entries.length - faqHeadingCount(input.content);
  const text = [input.directAnswer, ...copy.headings.map((h) => h.text), ...copy.paragraphs].join(
    " ",
  );
  return [
    ...checkFields(input),
    ...checkStructure(input, h2Count),
    ...checkLinks(
      input,
      copy.links.map((link) => link.href),
    ),
    ...checkKeywords(input, text),
  ];
}
