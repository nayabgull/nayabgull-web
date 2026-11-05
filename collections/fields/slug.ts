import type { Field } from "payload";

import { slugify } from "@/lib/cms/slugify.ts";

/** URL slug: filled from the title when empty, always lowercase with hyphens. */
export const slugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Lowercase, hyphens, at most 5 words, no dates. Changing it needs a 301 redirect.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source =
          typeof value === "string" && value !== ""
            ? value
            : typeof data?.title === "string"
              ? data.title
              : "";
        return slugify(source);
      },
    ],
  },
};
