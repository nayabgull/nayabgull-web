import { BUSINESS_TYPES, LEAD_TYPES, SERVICES, labelFor } from "./options.ts";
import type { LeadInput } from "./schema.ts";

/**
 * A lead with readable labels ("Shopify store", not "shopify"). The GoHighLevel webhook and the
 * Resend email must both build their text from this, never from the raw saved values.
 */
export interface LeadSummary {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  service: string;
  type: string;
  message: string;
  source: string;
}

export function describeLead(lead: LeadInput): LeadSummary {
  return {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    businessType: labelFor(BUSINESS_TYPES, lead.businessType),
    service: labelFor(SERVICES, lead.service),
    type: labelFor(LEAD_TYPES, lead.type),
    message: lead.message,
    source: lead.source,
  };
}

/**
 * ─────────────────────────── EMAIL NOTIFICATION HOOK ───────────────────────────
 * TODO(nayab): this is where "a new lead arrived" notifications go. It does nothing yet, on purpose:
 * no paid service is connected. When you pick one (the stack plans Resend plus a GoHighLevel
 * webhook), send the message from here and read its key from lib/env.ts. A failure here must never
 * lose the lead: submitLead saves to Payload first and ignores errors from this hook.
 * ────────────────────────────────────────────────────────────────────────────────
 */
export function notifyNewLead(_lead: LeadInput): Promise<void> {
  return Promise.resolve();
}
