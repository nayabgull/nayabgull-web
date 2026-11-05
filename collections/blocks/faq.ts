import type { Block } from "payload";

/**
 * Reusable FAQ block. It points at documents in the FAQs collection, so the visible FAQ and the
 * FAQPage JSON-LD are built from the same source and can never drift apart.
 */
export const FAQBlock: Block = {
  slug: "faq",
  interfaceName: "FAQBlock",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    {
      name: "heading",
      type: "text",
      defaultValue: "Frequently asked questions",
      required: true,
    },
    {
      name: "faqs",
      type: "relationship",
      relationTo: "faqs",
      hasMany: true,
      required: true,
      minRows: 1,
    },
  ],
};
