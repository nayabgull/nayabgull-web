import { pageCollection } from "./page-collection.ts";

export const Industries = pageCollection({
  slug: "industries",
  singular: "Industry",
  plural: "Industries",
  fields: [
    { name: "summary", type: "textarea" },
    { name: "relatedServices", type: "relationship", relationTo: "services", hasMany: true },
    {
      name: "relatedCaseStudies",
      type: "relationship",
      relationTo: "case-studies",
      hasMany: true,
    },
  ],
});
