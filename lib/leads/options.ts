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
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export const SERVICES = [
  { value: "website", label: "Website" },
  { value: "gohighlevel", label: "GoHighLevel" },
  { value: "ai-automation", label: "AI automation" },
  { value: "full-system", label: "Full system" },
] as const satisfies readonly Option[];

/** What the coming-soon demo form offers. Values match SERVICES where the choice is the same. */
export const DEMO_WANTS = [
  { value: "ai-agent", label: "AI agent" },
  { value: "ai-receptionist", label: "AI receptionist" },
  { value: "ai-automation", label: "Automation" },
  { value: "website", label: "Website" },
] as const satisfies readonly Option[];

/** Every value the Leads collection stores in `service` (quote form choices plus demo choices). */
export const ALL_SERVICES = [
  ...SERVICES,
  ...DEMO_WANTS.filter((want) => !SERVICES.some((service) => service.value === want.value)),
] as const satisfies readonly Option[];

/** "quote" is the normal quote form; "demo" is the coming-soon "Request a custom demo" form. */
export const LEAD_TYPES = [
  { value: "quote", label: "Quote request" },
  { value: "demo", label: "Custom demo request" },
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
export type DemoWant = (typeof DEMO_WANTS)[number]["value"];
export type LeadType = (typeof LEAD_TYPES)[number]["value"];
export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

export const values = <T extends string>(options: readonly Option<T>[]): T[] =>
  options.map((option) => option.value);
