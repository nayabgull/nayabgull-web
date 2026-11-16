"use server";

import { getPayload } from "payload";

import { getEnv } from "@/lib/env.ts";
import type { LeadFormState } from "@/lib/leads/fields.ts";
import { notifyNewLead } from "@/lib/leads/notify.ts";
import type { LeadInput } from "@/lib/leads/schema.ts";
import { submitLead } from "@/lib/leads/submit.ts";
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
      status: "new",
    },
  });
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
    // Server-side log only (Vercel logs); the visitor sees a friendly message.
    logError: (error) => {
      process.stderr.write(`Lead form submission failed: ${String(error)}\n`);
    },
  });
}
