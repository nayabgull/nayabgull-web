import type { Metadata } from "next";

import { pageMetadata } from "../seo/metadata.ts";
import { TITLE_SUFFIX } from "../seo/site.ts";

import { postImagePath } from "./jsonld.ts";
import { postPath } from "./paths.ts";
import type { BlogPost } from "./types.ts";

const MIN_TITLE = 30;
const MAX_TITLE = 60;

/**
 * A 30–60 character `<title>` ending in "| Nayab Gull" (seo.md §2) for list pages whose label comes
 * from the CMS: the first candidate that fits, else the label shortened to fit.
 */
export function fitTitle(label: string, extras: readonly string[]): string {
  const make = (text: string): string => `${text} ${TITLE_SUFFIX}`;
  for (const extra of ["", ...extras]) {
    const title = make(extra === "" ? label : `${label}${extra}`);
    if (title.length >= MIN_TITLE && title.length <= MAX_TITLE) return title;
  }
  const room = MAX_TITLE - make("").length;
  return make(label.length > room ? `${label.slice(0, room - 1).trimEnd()}…` : label);
}

/** A list page's Open Graph image: /og/blog/<kind>/<slug>. */
export const listImagePath = (kind: "hub" | "category" | "tag" | "author", slug: string): string =>
  `/og/blog/${kind}/${slug}`;

/** Post metadata from the SEO fields the publish hook checked. Article type with both dates. */
export function postMetadata(post: BlogPost): Metadata {
  return pageMetadata({
    title: post.seo.title,
    description: post.seo.metaDescription,
    path: postPath(post.slug),
    type: "article",
    image: { url: postImagePath(post.slug), alt: post.title },
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: post.author ? [post.author.name] : [],
    },
  });
}

export function listMetadata(input: {
  title: string;
  description: string;
  path: string;
  indexable: boolean;
  image: { url: string; alt: string };
}): Metadata {
  return pageMetadata({
    title: input.title,
    description: input.description,
    path: input.path,
    image: input.image,
    noindex: !input.indexable,
  });
}
