import type { CollectionConfig } from "payload";

import { BUSINESS_TYPES, LEAD_STATUSES, SERVICES } from "@/lib/leads/options.ts";

import { isEditor } from "./access.ts";

/**
 * Every quote-form submission. The website creates leads through the Local API in a Server Action
 * (after Zod validation and the spam checks), so the public REST and GraphQL APIs can never create
 * one. Only logged-in editors can read or change them.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Lead", plural: "Leads" },
  access: { read: isEditor, create: () => false, update: isEditor, delete: isEditor },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "businessType", "service", "status", "createdAt"],
  },
  defaultSort: "-createdAt",
  timestamps: true,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true, index: true },
    { name: "phone", type: "text" },
    { name: "businessType", type: "select", required: true, options: [...BUSINESS_TYPES] },
    { name: "service", type: "select", required: true, options: [...SERVICES] },
    { name: "message", type: "textarea" },
    {
      name: "sourcePage",
      type: "text",
      admin: { readOnly: true, description: "The page the form was sent from." },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      index: true,
      options: [...LEAD_STATUSES],
    },
    {
      name: "notes",
      type: "textarea",
      admin: { description: "Private notes. Never shown on the site." },
    },
  ],
};
