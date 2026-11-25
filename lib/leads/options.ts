/** Choices shared by the lead form, the Zod schema and the Payload "Leads" collection. */

export interface Option<T extends string = string> {
  value: T;
  label: string;
}

export const BUSINESS_TYPES = [
  { value: "roofing", label: "Roofing" },
  { value: "hvac", label: "HVAC" },
  { value: "law-firm", label: "Law firm" },
  { value: "dental-medical", label: "Dental/Medical" },
  { value: "real-estate", label: "Real estate" },
  { value: "contractor", label: "Contractor" },
  { value: "ecommerce", label: "Online store" },
  { value: "saas", label: "SaaS or startup" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export const SERVICES = [
  { value: "website", label: "Website (WordPress or custom)" },
  { value: "shopify", label: "Shopify store" },
  { value: "web-app", label: "Web app or SaaS" },
  { value: "gohighlevel", label: "GoHighLevel or CRM" },
  { value: "ai-receptionist", label: "AI receptionist" },
  { value: "ai-chatbot", label: "AI chatbot" },
  { value: "ai-agent", label: "AI agent" },
  { value: "ai-automation", label: "Automation (n8n, Zapier, workflows)" },
  { value: "full-system", label: "Full system" },
  { value: "not-sure", label: "Not sure yet" },
] as const satisfies readonly Option[];

/** What the visitor asked for: a written quote (default) or a custom demo. */
export const LEAD_TYPES = [
  { value: "quote", label: "Quote" },
  { value: "demo", label: "Demo" },
] as const satisfies readonly Option[];

export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "booked", label: "Booked" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
] as const satisfies readonly Option[];

export type BusinessType = (typeof BUSINESS_TYPES)[number]["value"];
export type ServiceNeed = (typeof SERVICES)[number]["value"];
export type LeadType = (typeof LEAD_TYPES)[number]["value"];
export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

export const values = <T extends string>(options: readonly Option<T>[]): T[] =>
  options.map((option) => option.value);

/** Readable label for a saved value, for emails and the GoHighLevel webhook. Unknown values pass through. */
export const labelFor = (options: readonly Option[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? value;
