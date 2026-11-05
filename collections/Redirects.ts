import type { CollectionConfig } from "payload";

import { REDIRECT_TYPES, validateRedirectFrom, validateRedirectTo } from "@/lib/cms/redirects.ts";

import { anyone, isEditor } from "./access.ts";

/** 301 when a slug changes, 410 when content is removed for good (seo.md §7). */
export const Redirects: CollectionConfig = {
  slug: "redirects",
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  admin: { useAsTitle: "from", defaultColumns: ["from", "type", "to"] },
  fields: [
    {
      name: "from",
      type: "text",
      required: true,
      unique: true,
      index: true,
      validate: (value: string | null | undefined) => validateRedirectFrom(value),
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "301",
      options: REDIRECT_TYPES.map((value) => ({ label: value, value })),
    },
    {
      name: "to",
      type: "text",
      admin: { condition: (_, siblingData: { type?: string }) => siblingData.type !== "410" },
      validate: (
        value: string | null | undefined,
        { siblingData }: { siblingData: { type?: string; from?: string } },
      ) => validateRedirectTo(value, siblingData.type, siblingData.from),
    },
  ],
};
