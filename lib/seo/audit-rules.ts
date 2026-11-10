import type { Issue } from "./issue.ts";
import type { KeywordEntry } from "./keywords.ts";
import { canonicalFor, SITE_URL, sitePath, TITLE_SUFFIX } from "./site.ts";
import type { PageSnapshot } from "./snapshot.ts";

const has = (text: string | undefined, keyword: string): boolean =>
  text?.toLowerCase().includes(keyword.toLowerCase()) ?? false;

const firstWords = (text: string, count: number): string =>
  text.split(/\s+/).slice(0, count).join(" ");

const VAGUE_ANCHORS = ["click here", "read more", "learn more", "here", "more"];
const REQUIRED_SOCIAL = [
  "og:title",
  "og:description",
  "og:image",
  "og:url",
  "og:type",
  "twitter:card",
];

export function checkTitle(page: PageSnapshot, entry?: KeywordEntry): Issue[] {
  const title = page.title?.trim();
  if (!title) return [{ rule: "title-present", message: "Page has no <title>." }];
  const issues: Issue[] = [];
  if (title.length < 30 || title.length > 60) {
    issues.push({
      rule: "title-length",
      message: `Title is ${title.length} chars (30–60): "${title}".`,
    });
  }
  if (!title.endsWith(TITLE_SUFFIX)) {
    issues.push({ rule: "title-brand", message: `Title must end with "${TITLE_SUFFIX}".` });
  }
  const keywordAt = entry ? title.toLowerCase().indexOf(entry.primary.toLowerCase()) : 0;
  if (entry && (keywordAt === -1 || keywordAt > title.length / 2)) {
    issues.push({
      rule: "title-keyword",
      message: `Primary keyword "${entry.primary}" not in the first half of the title.`,
    });
  }
  return issues;
}

export function checkMetaDescription(page: PageSnapshot, entry?: KeywordEntry): Issue[] {
  const description = page.metaDescription?.trim();
  if (!description) return [{ rule: "meta-present", message: "Page has no meta description." }];
  const issues: Issue[] = [];
  if (description.length < 120 || description.length > 155) {
    issues.push({
      rule: "meta-length",
      message: `Meta description is ${description.length} chars (120–155).`,
    });
  }
  if (entry && !has(description, entry.primary)) {
    issues.push({
      rule: "meta-keyword",
      message: `Meta description does not contain "${entry.primary}".`,
    });
  }
  return issues;
}

export function checkCanonical(page: PageSnapshot, path: string): Issue[] {
  if (!page.canonical)
    return [{ rule: "canonical-present", message: "Page has no canonical link." }];
  const expected = canonicalFor(path);
  const actual = page.canonical === `${SITE_URL}/` ? SITE_URL : page.canonical;
  return actual === expected
    ? []
    : [
        {
          rule: "canonical-self",
          message: `Canonical is "${page.canonical}", expected "${expected}".`,
        },
      ];
}

export function checkHeadings(page: PageSnapshot, entry?: KeywordEntry): Issue[] {
  const issues: Issue[] = [];
  const h1s = page.headings.filter((h) => h.level === 1);
  if (h1s.length !== 1) {
    issues.push({
      rule: "h1-single",
      message: `Page has ${h1s.length} <h1> elements (exactly 1 required).`,
    });
  }
  let previous = 0;
  for (const heading of page.headings) {
    if (heading.level > previous + 1 && previous !== 0) {
      issues.push({
        rule: "heading-order",
        message: `Heading skips from H${previous} to H${heading.level}: "${heading.text}".`,
      });
    }
    previous = heading.level;
  }
  if (entry) {
    const h1 = h1s[0];
    if (h1 && !has(h1.text, entry.primary)) {
      issues.push({ rule: "h1-keyword", message: `<h1> does not contain "${entry.primary}".` });
    }
    const targets = [entry.primary, ...entry.secondary];
    const h2Hit = page.headings.some((h) => h.level === 2 && targets.some((k) => has(h.text, k)));
    if (!h2Hit)
      issues.push({
        rule: "h2-keyword",
        message: "No <h2> contains the primary or a secondary keyword.",
      });
    if (!has(firstWords(page.bodyText, 100), entry.primary)) {
      issues.push({
        rule: "keyword-first-100",
        message: `"${entry.primary}" is not in the first 100 words.`,
      });
    }
  }
  return issues;
}

export function checkLang(page: PageSnapshot): Issue[] {
  return page.lang === "en-US"
    ? []
    : [{ rule: "html-lang", message: `<html lang> is "${page.lang ?? ""}", expected "en-US".` }];
}

export function checkSocial(page: PageSnapshot): Issue[] {
  return REQUIRED_SOCIAL.filter((key) => !page.meta[key]).map((key) => ({
    rule: "social-tags",
    message: `Missing <meta> "${key}".`,
  }));
}

export function checkImages(page: PageSnapshot): Issue[] {
  const issues: Issue[] = [];
  page.images.forEach((img, index) => {
    const label = `Image ${index + 1}`;
    if (!img.fromNextImage)
      issues.push({ rule: "img-next", message: `${label} is not rendered by next/image.` });
    if (img.alt === undefined)
      issues.push({ rule: "img-alt", message: `${label} has no alt attribute.` });
    else if (img.alt.length > 125)
      issues.push({ rule: "img-alt", message: `${label} alt is over 125 chars.` });
    else if (/^(image|picture|photo) of\b/i.test(img.alt)) {
      issues.push({ rule: "img-alt", message: `${label} alt starts with "image of".` });
    }
    if (!img.width || !img.height)
      issues.push({ rule: "img-size", message: `${label} has no width/height.` });
  });
  return issues;
}

/** Internal links inside the main content: 3–8 unique targets, descriptive anchor text. */
export function checkInternalLinks(page: PageSnapshot, path: string): Issue[] {
  const issues: Issue[] = [];
  const internal = page.links.filter((l) => l.href.startsWith("/") || l.href.startsWith(SITE_URL));
  const targets = new Set(internal.map((l) => sitePath(l.href)).filter((href) => href !== path));
  if (targets.size < 3 || targets.size > 8) {
    issues.push({
      rule: "internal-links",
      message: `Main content links to ${targets.size} internal pages (3–8).`,
    });
  }
  for (const link of page.links) {
    if (VAGUE_ANCHORS.includes(link.text.toLowerCase())) {
      issues.push({
        rule: "anchor-text",
        message: `Vague anchor text "${link.text}" → ${link.href}.`,
      });
    }
  }
  return issues;
}

/** Every [CI] on-page SEO rule for one page. */
export function auditSeoPage(page: PageSnapshot, path: string, entry?: KeywordEntry): Issue[] {
  const issues = [
    ...checkTitle(page, entry),
    ...checkMetaDescription(page, entry),
    ...checkCanonical(page, path),
    ...checkHeadings(page, entry),
    ...checkLang(page),
    ...checkSocial(page),
    ...checkImages(page),
    ...checkInternalLinks(page, path),
  ];
  if (!entry)
    issues.push({
      rule: "keyword-registered",
      message: `No primary keyword registered for ${path}.`,
    });
  return issues;
}

/**
 * Rules for a legal page that is `noindex, follow` on purpose (seo.md §7): it must really carry the
 * robots tag, stay out of the sitemap and still have a sound title, canonical, language and headings.
 * Keyword rules do not apply, because the page targets no keyword.
 */
export function auditNoindexPage(
  page: PageSnapshot,
  path: string,
  sitemapPaths: readonly string[],
): Issue[] {
  const issues = [
    ...checkTitle(page),
    ...checkCanonical(page, path),
    ...checkHeadings(page),
    ...checkLang(page),
    ...checkImages(page),
  ];
  const robots = page.robots ?? "";
  if (!robots.includes("noindex") || robots.includes("nofollow")) {
    issues.push({
      rule: "noindex-follow",
      message: `Robots meta is "${robots}", expected "noindex, follow".`,
    });
  }
  if (sitemapPaths.includes(path)) {
    issues.push({ rule: "sitemap", message: `Sitemap must not list the noindex page ${path}.` });
  }
  return issues;
}
