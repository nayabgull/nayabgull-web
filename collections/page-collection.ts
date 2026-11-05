import type { CollectionConfig, Field } from "payload";

import type { PageCollection } from "@/lib/cms/publish-rules.ts";

import { isEditor, publishedOrEditor } from "./access.ts";
import { seoField } from "./fields/seo.ts";
import { slugField } from "./fields/slug.ts";
import { enforcePublishRules } from "./hooks/enforce-publish-rules.ts";

interface PageCollectionArgs {
  slug: PageCollection;
  singular: string;
  plural: string;
  /** Collection-specific fields, placed after the title and slug. */
  fields: Field[];
}

/** Common shape of every public-page collection: title, slug, body, SEO, drafts and publish rules. */
export function pageCollection({
  slug,
  singular,
  plural,
  fields,
}: PageCollectionArgs): CollectionConfig {
  return {
    slug,
    labels: { singular, plural },
    access: { read: publishedOrEditor, create: isEditor, update: isEditor, delete: isEditor },
    admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "_status", "updatedAt"] },
    versions: { maxPerDoc: 25, drafts: true },
    hooks: { beforeChange: [enforcePublishRules(slug)] },
    fields: [
      {
        name: "title",
        type: "text",
        required: true,
        admin: { description: "Shown as the page H1. Include the primary keyword." },
      },
      slugField,
      ...fields,
      { name: "content", type: "richText", required: true },
      seoField,
    ],
  };
}
