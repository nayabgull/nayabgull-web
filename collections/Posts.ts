import { HUB_OPTIONS, validateHub } from "@/lib/blog/hubs.ts";
import { DIRECT_ANSWER_MAX_WORDS, EXCERPT_MAX_CHARS } from "@/lib/cms/post-rules.ts";

import { postEditor } from "./editor.ts";
import { enforcePostPublishRules } from "./hooks/enforce-post-rules.ts";
import { revalidatePostAfterChange, revalidateBlogAfterDelete } from "./hooks/revalidate-blog.ts";
import { pageCollection } from "./page-collection.ts";

/**
 * Blog posts. Nayab writes and publishes them from the admin. A draft always saves; publishing
 * runs every hard rule from docs/rules (seo.md, content.md) and shows the editor what to fix.
 */
export const Posts = pageCollection({
  slug: "posts",
  singular: "Post",
  plural: "Posts",
  defaultColumns: ["title", "slug", "category", "_status", "datePublished", "updatedAt"],
  beforeChange: [enforcePostPublishRules],
  afterChange: [revalidatePostAfterChange],
  afterDelete: [revalidateBlogAfterDelete],
  content: {
    editor: postEditor,
    admin: {
      description:
        "Start at H2. Add at least one FAQ block, link 3–8 site pages in total (paths like /gohighlevel-agency), and let the CTA block do the selling.",
    },
  },
  seoFields: [
    {
      name: "secondaryKeywords",
      type: "text",
      hasMany: true,
      admin: {
        description:
          "Only secondary keywords registered for this URL in docs/seo/keyword-map.md. At least 60% must appear in the copy.",
      },
    },
  ],
  fields: [
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: EXCERPT_MAX_CHARS,
      admin: { description: "One or two sentences for post cards and llms.txt." },
    },
    {
      name: "directAnswer",
      type: "textarea",
      required: true,
      admin: {
        description: `Answers the post's main question in ${DIRECT_ANSWER_MAX_WORDS} words or fewer. Shown first, above the table of contents.`,
      },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "The media item's alt text is checked when you publish." },
    },
    {
      // Plain text, not a select: a select is a database enum, and a new hub page would then need a
      // migration. The list of valid paths comes from the live pages, so it grows on its own.
      name: "hub",
      type: "text",
      required: true,
      validate: (value: unknown) => validateHub(value),
      admin: {
        position: "sidebar",
        description: `The page this post links up to. One of: ${HUB_OPTIONS.map((hub) => hub.value).join(", ")}`,
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "Tag pages are noindex. Keep tags few and reuse them.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "datePublished",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Filled in on the first publish if empty.",
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "dateModified",
      type: "date",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Set automatically every time the post is published.",
      },
    },
  ],
});
