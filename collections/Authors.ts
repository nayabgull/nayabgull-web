import type { CollectionConfig } from "payload";

import { anyone, isEditor } from "./access.ts";
import { slugField } from "./fields/slug.ts";

/** Always a real person (content.md §3). Powers the author box and the Person JSON-LD. */
export const Authors: CollectionConfig = {
  slug: "authors",
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    slugField,
    { name: "jobTitle", type: "text" },
    { name: "bio", type: "textarea", required: true },
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "sameAs",
      type: "array",
      labels: { singular: "Profile link", plural: "Profile links" },
      admin: { description: "LinkedIn, GitHub, Upwork. Used for the Person schema." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
  ],
};
