import type { PostSummary } from "../blog/types.ts";

import { canonicalFor } from "./site.ts";

export interface LlmsPage {
  name: string;
  path: string;
  description: string;
}

const line = (name: string, path: string, description: string): string =>
  `- [${name}](${canonicalFor(path)}): ${description.replace(/\s+/g, " ").trim()}`;

/**
 * /llms.txt (llmstxt.org format): the key pages with a one-line description each, then the
 * published blog posts (seo.md §7). Drafts never reach it: the caller passes published posts only.
 */
export function buildLlmsTxt(input: {
  title: string;
  summary: string;
  pages: readonly LlmsPage[];
  posts: readonly PostSummary[];
}): string {
  const sections = [
    `# ${input.title}`,
    `> ${input.summary}`,
    ["## Pages", ...input.pages.map((page) => line(page.name, page.path, page.description))].join(
      "\n",
    ),
  ];
  if (input.posts.length > 0) {
    sections.push(
      [
        "## Blog",
        ...input.posts.map((post) => line(post.title, `/blog/${post.slug}`, post.excerpt)),
      ].join("\n"),
    );
  }
  return `${sections.join("\n\n")}\n`;
}
