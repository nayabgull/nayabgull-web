import type { CollectionConfig } from "payload";

import { isEditor } from "./access.ts";

/** Admin login. The first user is created on the /admin screen; after that only editors add users. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: { maxLoginAttempts: 5, lockTime: 10 * 60 * 1000 },
  admin: { useAsTitle: "email" },
  access: { read: isEditor, create: isEditor, update: isEditor, delete: isEditor },
  fields: [{ name: "name", type: "text" }],
};
