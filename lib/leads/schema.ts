import { z } from "zod";

import type {
  DemoField,
  FieldErrors,
  FieldValues,
  LeadErrors,
  LeadField,
  LeadValues,
} from "./fields.ts";
import {
  DEMO_FIELDS,
  HONEYPOT_FIELD,
  LEAD_FIELDS,
  SOURCE_FIELD,
  TURNSTILE_FIELD,
} from "./fields.ts";
import { BUSINESS_TYPES, DEMO_WANTS, SERVICES, values } from "./options.ts";

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

export type Parsed<T, F extends string> =
  { ok: true; lead: T } | { ok: false; errors: FieldErrors<F> };
export type ParsedLead = Parsed<LeadInput, LeadField>;

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

/** `source` the demo form always saves, so the Leads list shows where the request came from. */
export const DEMO_SOURCE = "coming-soon";

/** Visitors type "example.com"; store a full https:// address. Anything else stays invalid. */
const websiteUrl = z
  .string()
  .trim()
  .max(200, "Keep this under 200 characters.")
  .transform((value) => (value === "" || /^https?:\/\//i.test(value) ? value : `https://${value}`))
  .refine((value) => {
    if (value === "") return true;
    try {
      const url = new URL(value);
      return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".");
    } catch {
      return false;
    }
  }, "Please enter a valid website, like example.com.");

export const demoSchema = z.object({
  name: trimmed(80).min(2, "Please enter your name."),
  email: trimmed(120).pipe(z.email("Please enter a valid email address.")),
  businessName: trimmed(120).min(2, "Please enter your business name."),
  website: websiteUrl,
  businessType: z.enum(values(BUSINESS_TYPES), "Please pick your industry."),
  service: z.enum(values(DEMO_WANTS), "Please pick what you want."),
});

/** A demo request, shaped like a lead plus the demo-only fields. */
export type DemoInput = z.infer<typeof demoSchema> & { source: typeof DEMO_SOURCE };

/** The demo form's visible fields as plain strings, so a failed submission can refill the form. */
export function demoValues(form: FormData): FieldValues<DemoField> {
  return Object.fromEntries(DEMO_FIELDS.map((field) => [field, text(form, field)]));
}

/** Validates a demo request on the server. The source is fixed here, never read from the browser. */
export function parseDemo(form: FormData): Parsed<DemoInput, DemoField> {
  const result = demoSchema.safeParse(demoValues(form));
  if (result.success) return { ok: true, lead: { ...result.data, source: DEMO_SOURCE } };
  const errors: FieldErrors<DemoField> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as DemoField;
    errors[field] ??= issue.message;
  }
  return { ok: false, errors };
}

export const isHoneypotFilled = (form: FormData): boolean => text(form, HONEYPOT_FIELD) !== "";
export const turnstileToken = (form: FormData): string => text(form, TURNSTILE_FIELD);
