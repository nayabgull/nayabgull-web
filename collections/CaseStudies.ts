import { pageCollection } from "./page-collection.ts";

export const CaseStudies = pageCollection({
  slug: "case-studies",
  singular: "Case study",
  plural: "Case studies",
  fields: [
    { name: "author", type: "relationship", relationTo: "authors", required: true },
    {
      name: "client",
      type: "text",
      admin: { description: "Only a client who approved being named." },
    },
    { name: "stack", type: "text", hasMany: true },
    {
      name: "result",
      type: "textarea",
      required: true,
      admin: { description: "A measurable result Nayab confirmed. Never an estimate." },
    },
    {
      name: "resultApproved",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Tick only when the result is real and the client approved sharing it.",
      },
    },
  ],
});
