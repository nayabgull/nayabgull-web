import type { CollectionConfig } from "payload";

import { anyone, isEditor } from "./access.ts";
import { slugFieldFrom } from "./fields/slug.ts";
import { revalidateBlogAfterChange, revalidateBlogAfterDelete } from "./hooks/revalidate-blog.ts";

/** Blog categories (one per post). Each gets a /blog/category/<slug> page. */
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Category", plural: "Categories" },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  admin: { useAsTitle: "name", defaultColumns: ["name", "slug", "updatedAt"] },
  hooks: { afterChange: [revalidateBlogAfterChange], afterDelete: [revalidateBlogAfterDelete] },
  fields: [
    { name: "name", type: "text", required: true },
    slugFieldFrom("name"),
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: { description: "1–2 sentences under the category page heading." },
    },
  ],
};
