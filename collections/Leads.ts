import type { CollectionConfig } from "payload";

import { ALL_SERVICES, BUSINESS_TYPES, LEAD_STATUSES, LEAD_TYPES } from "@/lib/leads/options.ts";

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
    defaultColumns: ["name", "leadType", "businessType", "service", "status", "createdAt"],
  },
  defaultSort: "-createdAt",
  timestamps: true,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true, index: true },
    { name: "phone", type: "text" },
    { name: "businessType", type: "select", required: true, options: [...BUSINESS_TYPES] },
    { name: "service", type: "select", required: true, options: [...ALL_SERVICES] },
    { name: "message", type: "textarea" },
    {
      name: "leadType",
      type: "select",
      required: true,
      defaultValue: "quote",
      index: true,
      options: [...LEAD_TYPES],
      admin: { description: "Which form sent it. Demo requests come from the coming-soon page." },
    },
    {
      name: "businessName",
      type: "text",
      admin: { description: "Demo requests only." },
    },
    {
      name: "website",
      type: "text",
      admin: { description: "Demo requests only. Their current website, if they have one." },
    },
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
