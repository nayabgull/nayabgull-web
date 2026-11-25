import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionConfig,
  Field,
  RichTextField,
} from "payload";

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
  /** Extra fields inside the SEO group. */
  seoFields?: Field[];
  /** Overrides for the rich-text body (for example its own editor). */
  content?: Partial<Pick<RichTextField, "editor" | "admin">>;
  /** Replaces the default publish-rules hook. */
  beforeChange?: CollectionBeforeChangeHook[];
  afterChange?: CollectionAfterChangeHook[];
  afterDelete?: CollectionAfterDeleteHook[];
  defaultColumns?: string[];
}

/** Common shape of every public-page collection: title, slug, body, SEO, drafts and publish rules. */
export function pageCollection({
  slug,
  singular,
  plural,
  fields,
  seoFields = [],
  content = {},
  beforeChange,
  afterChange = [],
  afterDelete = [],
  defaultColumns = ["title", "slug", "_status", "updatedAt"],
}: PageCollectionArgs): CollectionConfig {
  const seo: Field =
    seoFields.length > 0 && seoField.type === "group"
      ? { ...seoField, fields: [...seoField.fields, ...seoFields] }
      : seoField;
  return {
    slug,
    labels: { singular, plural },
    access: { read: publishedOrEditor, create: isEditor, update: isEditor, delete: isEditor },
    admin: { useAsTitle: "title", defaultColumns },
    versions: { maxPerDoc: 25, drafts: true },
    hooks: {
      beforeChange: beforeChange ?? [enforcePublishRules(slug)],
      afterChange,
      afterDelete,
    },
    fields: [
      {
        name: "title",
        type: "text",
        required: true,
        admin: { description: "Shown as the page H1. Include the primary keyword." },
      },
      slugField,
      ...fields,
      { name: "content", type: "richText", required: true, ...content },
      seo,
    ],
  };
}
