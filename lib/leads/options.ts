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

export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "booked", label: "Booked" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
] as const satisfies readonly Option[];

export type BusinessType = (typeof BUSINESS_TYPES)[number]["value"];
export type ServiceNeed = (typeof SERVICES)[number]["value"];
export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

export const values = <T extends string>(options: readonly Option<T>[]): T[] =>
  options.map((option) => option.value);
