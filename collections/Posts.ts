import { pageCollection } from "./page-collection.ts";

export const Posts = pageCollection({
  slug: "posts",
  singular: "Post",
  plural: "Posts",
  fields: [
    { name: "author", type: "relationship", relationTo: "authors", required: true },
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
    { name: "category", type: "text", index: true },
    { name: "tags", type: "text", hasMany: true },
    { name: "heroImage", type: "upload", relationTo: "media" },
  ],
});
