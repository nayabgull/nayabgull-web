import { z } from "zod";

import type { LeadErrors, LeadField, LeadValues } from "./fields.ts";
import { HONEYPOT_FIELD, LEAD_FIELDS, SOURCE_FIELD, TURNSTILE_FIELD } from "./fields.ts";
import { BUSINESS_TYPES, SERVICES, values } from "./options.ts";

const trimmed = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters.`);

export const leadSchema = z.object({
  name: trimmed(80).min(2, "Please enter your name."),
  email: trimmed(120).pipe(z.email("Please enter a valid email address.")),
  phone: trimmed(30).regex(/^$|^[+()\d][\d\s().-]{6,}$/, "Please enter a valid phone number."),
  businessType: z.enum(values(BUSINESS_TYPES), "Please pick your business type."),
  service: z.enum(values(SERVICES), "Please pick what you need."),
  message: trimmed(1000),
  source: z
    .string()
    .trim()
    .max(200)
    .regex(/^\/[\w\-/]*$/)
    .catch("/"),
});

export type LeadInput = z.infer<typeof leadSchema>;

const text = (form: FormData, key: string): string => {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
};

/** The visible fields as plain strings, so a failed submission can refill the form. */
export function leadValues(form: FormData): LeadValues {
  return Object.fromEntries(LEAD_FIELDS.map((field) => [field, text(form, field)]));
}

export type ParsedLead = { ok: true; lead: LeadInput } | { ok: false; errors: LeadErrors };

/** Validates a submitted form on the server. Never trust what the browser checked. */
export function parseLead(form: FormData): ParsedLead {
  const result = leadSchema.safeParse({
    ...leadValues(form),
    source: text(form, SOURCE_FIELD),
  });
  if (result.success) return { ok: true, lead: result.data };
  const errors: LeadErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as LeadField;
    errors[field] ??= issue.message;
  }
  return { ok: false, errors };
}

export const isHoneypotFilled = (form: FormData): boolean => text(form, HONEYPOT_FIELD) !== "";
export const turnstileToken = (form: FormData): string => text(form, TURNSTILE_FIELD);
