import { SERVICE_SECTIONS } from "@/lib/cms/publish-rules.ts";

import { pageCollection } from "./page-collection.ts";

export const Services = pageCollection({
  slug: "services",
  singular: "Service",
  plural: "Services",
  fields: [
    {
      name: "section",
      type: "select",
      required: true,
      defaultValue: "services",
      options: SERVICE_SECTIONS.map((value) => ({ label: `/${value}/…`, value })),
      admin: { position: "sidebar", description: "Which part of the site this page lives in." },
    },
    { name: "summary", type: "textarea" },
    {
      name: "startingPrice",
      type: "number",
      min: 0,
      admin: {
        description: 'US dollars. Powers the "starts at" price signal and the Offer schema.',
      },
    },
    {
      name: "relatedCaseStudies",
      type: "relationship",
      relationTo: "case-studies",
      hasMany: true,
    },
  ],
});
