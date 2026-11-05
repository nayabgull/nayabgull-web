import type { Field } from "payload";

/** SEO group shared by every page collection. The publish hook checks it with lib/seo validators. */
export const seoField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  fields: [
    {
      name: "title",
      type: "text",
      label: "SEO title",
      admin: {
        description:
          "30 to 60 characters. Primary keyword in the first half. End with | Nayab Gull.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      admin: {
        description:
          "120 to 155 characters. Include the primary keyword. End with a benefit or a call to action.",
      },
    },
    {
      name: "primaryKeyword",
      type: "text",
      index: true,
      admin: {
        description:
          "Must match docs/seo/keyword-map.md for this URL. New keywords need Nayab's approval first.",
      },
    },
    {
      name: "canonical",
      type: "text",
      admin: {
        description:
          "Leave empty. It fills in as https://nayabgull.com plus the page path on save.",
      },
    },
  ],
};
