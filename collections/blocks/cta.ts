import type { Block } from "payload";

/**
 * Call-to-action block for blog posts. The button is always the site's one primary CTA
 * ("Book a free call"), so a post can never add a competing CTA (content.md §5).
 */
export const CTABlock: Block = {
  slug: "cta",
  interfaceName: "CTABlock",
  labels: { singular: "Call to action", plural: "Calls to action" },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      admin: { description: "Short and specific. Shown as an H2." },
    },
    {
      name: "text",
      type: "textarea",
      required: true,
      admin: {
        description:
          'One or two sentences. The button is always "Book a free call", the primary CTA of the site.',
      },
    },
  ],
};
