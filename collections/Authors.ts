import type { CollectionConfig } from "payload";

import { PROFILE_SITES, validateProfileUrl } from "@/lib/blog/profiles.ts";

import { anyone, isEditor } from "./access.ts";
import { slugFieldFrom } from "./fields/slug.ts";
import { revalidateBlogAfterChange, revalidateBlogAfterDelete } from "./hooks/revalidate-blog.ts";

/**
 * Always a real person (content.md §3, §6). Powers the author box, the author page and the Person
 * in the BlogPosting schema. No value is filled in by code: Nayab enters every field herself.
 */
export const Authors: CollectionConfig = {
  slug: "authors",
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  admin: { useAsTitle: "name", defaultColumns: ["name", "slug", "updatedAt"] },
  hooks: { afterChange: [revalidateBlogAfterChange], afterDelete: [revalidateBlogAfterDelete] },
  fields: [
    { name: "name", type: "text", required: true },
    slugFieldFrom("name"),
    {
      name: "jobTitle",
      type: "text",
      admin: { description: "Shown under the name in the author box." },
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
      admin: { description: "2–4 sentences about real experience. Shown on every post." },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: { description: "A real photo. The alt text comes from the media item." },
    },
    ...PROFILE_SITES.map((site) => ({
      name: site.field,
      type: "text" as const,
      label: `${site.label} profile URL`,
      validate: (value: unknown) => validateProfileUrl(value, site),
      admin: {
        description: `Full https:// link to the real ${site.label} profile. Used for the Person sameAs. Leave empty if there is none.`,
      },
    })),
  ],
};
