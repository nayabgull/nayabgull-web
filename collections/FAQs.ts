import type { CollectionConfig } from "payload";

import { anyone, isEditor } from "./access.ts";

/** One question and answer. Pages pull these in through the FAQ block. */
export const FAQs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  admin: { useAsTitle: "question" },
  fields: [
    { name: "question", type: "text", required: true },
    {
      name: "answer",
      type: "textarea",
      required: true,
      admin: {
        description: "Plain text. It also feeds the FAQPage schema, so it must match the page.",
      },
    },
  ],
};
