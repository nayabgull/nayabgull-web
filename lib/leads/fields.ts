/** Field names shared by the form (client) and the server. No validation library in this file. */

/** Visible form fields, in the order the form shows them. */
export const LEAD_FIELDS = [
  "name",
  "email",
  "phone",
  "businessType",
  "service",
  "message",
] as const;
export type LeadField = (typeof LEAD_FIELDS)[number];

/** Hidden field real visitors never see. Bots fill it in, and the submission is dropped. */
export const HONEYPOT_FIELD = "company_website";
/** Hidden field with the path of the page the form was sent from. */
export const SOURCE_FIELD = "source";
/** Field name the Cloudflare Turnstile widget adds to the form. */
export const TURNSTILE_FIELD = "cf-turnstile-response";

export type LeadValues = Partial<Record<LeadField, string>>;
export type LeadErrors = Partial<Record<LeadField, string>>;

export interface LeadFormState {
  status: "idle" | "success" | "error";
  /** Shown above the form (success or a general error). */
  message: string;
  errors: LeadErrors;
  /** What the visitor typed, so the form can be refilled after an error. */
  values: LeadValues;
}

export const IDLE_STATE: LeadFormState = { status: "idle", message: "", errors: {}, values: {} };
