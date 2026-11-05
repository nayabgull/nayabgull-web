import type { CollectionConfig } from "payload";

import { validateAlt } from "@/lib/cms/alt.ts";

import { anyone, isEditor } from "./access.ts";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  admin: { useAsTitle: "alt" },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 768 },
      { name: "hero", width: 1600 },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      validate: (value: string | null | undefined) => validateAlt(value),
      admin: { description: "Describe the image in 125 characters or less. Say what it shows." },
    },
  ],
};
