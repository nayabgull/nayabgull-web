import type { Metadata } from "next";

import type { PageContent } from "../../content/pages/types.ts";
import { headlineText } from "../../content/pages/types.ts";

import { pageMetadata } from "./metadata.ts";

/** Metadata for a launch page, built from its content file. */
export function contentMetadata(content: PageContent): Metadata {
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    path: content.path,
    imageAlt: headlineText(content),
    noindex: content.noindex,
  });
}
