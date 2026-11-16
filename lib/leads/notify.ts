import type { LeadInput } from "./schema.ts";

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
