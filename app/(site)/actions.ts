"use server";

import { getPayload } from "payload";

import { getEnv } from "@/lib/env.ts";
import type { DemoFormState, LeadFormState } from "@/lib/leads/fields.ts";
import { notifyNewLead } from "@/lib/leads/notify.ts";
import type { DemoInput, LeadInput } from "@/lib/leads/schema.ts";
import { submitDemo, submitLead } from "@/lib/leads/submit.ts";
import { verifyTurnstile } from "@/lib/leads/turnstile.ts";
import config from "@payload-config";

/** Saves one lead through the Payload Local API (the public API can never create leads). */
async function saveLead(lead: LeadInput): Promise<void> {
  const payload = await getPayload({ config });
  await payload.create({
    collection: "leads",
    data: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      businessType: lead.businessType,
      service: lead.service,
      message: lead.message,
      sourcePage: lead.source,
      leadType: "quote",
      status: "new",
    },
  });
}

/** Saves one coming-soon demo request in the same Leads collection (leadType "demo"). */
async function saveDemo(lead: DemoInput): Promise<void> {
  const payload = await getPayload({ config });
  await payload.create({
    collection: "leads",
    data: {
      name: lead.name,
      email: lead.email,
      businessName: lead.businessName,
      website: lead.website,
      businessType: lead.businessType,
      service: lead.service,
      sourcePage: lead.source,
      leadType: "demo",
      status: "new",
    },
  });
}

/** Server-side log only (Vercel logs); the visitor sees a friendly message. */
function logError(error: unknown): void {
  process.stderr.write(`Lead form submission failed: ${String(error)}\n`);
}

/** Server Action behind every quote form. Works as a plain form post when JavaScript is off. */
export async function submitLeadAction(
  _previous: LeadFormState,
  form: FormData,
): Promise<LeadFormState> {
  const secret = getEnv().TURNSTILE_SECRET_KEY;
  return submitLead(form, {
    save: saveLead,
    notify: notifyNewLead,
    verifySpamCheck: secret ? (token) => verifyTurnstile(token, secret) : undefined,
    logError,
  });
}

/** Server Action behind the coming-soon "Request a custom demo" form. */
export async function submitDemoAction(
  _previous: DemoFormState,
  form: FormData,
): Promise<DemoFormState> {
  const secret = getEnv().TURNSTILE_SECRET_KEY;
  return submitDemo(form, {
    save: saveDemo,
    notify: notifyNewLead,
    verifySpamCheck: secret ? (token) => verifyTurnstile(token, secret) : undefined,
    logError,
  });
}
