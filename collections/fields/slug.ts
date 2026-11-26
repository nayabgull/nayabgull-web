import type { Field } from "payload";

import { slugify } from "@/lib/cms/slugify.ts";

/** URL slug: filled from `source` (the title by default) when empty, always lowercase with hyphens. */
export function slugFieldFrom(source: string): Field {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description:
        "Lowercase, hyphens, at most 5 words, no dates. Changing it needs a 301 redirect.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const fallback: unknown = (data as Record<string, unknown> | undefined)?.[source];
          const text =
            typeof value === "string" && value !== ""
              ? value
              : typeof fallback === "string"
                ? fallback
                : "";
          return slugify(text);
        },
      ],
    },
  };
}

/** Slug filled from the title. */
export const slugField: Field = slugFieldFrom("title");
