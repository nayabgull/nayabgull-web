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

/** Visible fields of the coming-soon "Request a custom demo" form. */
export const DEMO_FIELDS = [
  "name",
  "email",
  "businessName",
  "website",
  "businessType",
  "service",
] as const;
export type DemoField = (typeof DEMO_FIELDS)[number];

export type FieldValues<F extends string> = Partial<Record<F, string>>;
export type FieldErrors<F extends string> = Partial<Record<F, string>>;
export type LeadValues = FieldValues<LeadField>;
export type LeadErrors = FieldErrors<LeadField>;

/** State of a form after a submission, for any form built on submitForm. */
export interface FormState<F extends string> {
  status: "idle" | "success" | "error";
  /** Shown above the form (success or a general error). */
  message: string;
  errors: FieldErrors<F>;
  /** What the visitor typed, so the form can be refilled after an error. */
  values: FieldValues<F>;
}

export type LeadFormState = FormState<LeadField>;
export type DemoFormState = FormState<DemoField>;

export const IDLE_STATE: LeadFormState = { status: "idle", message: "", errors: {}, values: {} };
export const DEMO_IDLE_STATE: DemoFormState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
