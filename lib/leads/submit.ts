import type { LeadFormState } from "./fields.ts";
import type { LeadInput } from "./schema.ts";
import { isHoneypotFilled, leadValues, parseLead, turnstileToken } from "./schema.ts";

export const MESSAGES = {
  success: "Thanks! Your request is in. I will reply within one business day.",
  invalid: "Please fix the marked fields and send the form again.",
  spamCheck:
    "The spam check did not finish. Please wait for it to load and try again, or book a call instead.",
  failed: "Something went wrong on my side. Please try again, or book a call instead.",
} as const;

export interface SubmitDeps {
  /** Saves the lead (Payload "leads" collection). */
  save: (lead: LeadInput) => Promise<void>;
  /** Email notification hook. Its errors are ignored: the lead is already saved. */
  notify: (lead: LeadInput) => Promise<void>;
  /** Present only when Turnstile is configured. Then every submission needs a valid token. */
  verifySpamCheck?: (token: string) => Promise<boolean>;
  logError: (error: unknown) => void;
}

const success: LeadFormState = {
  status: "success",
  message: MESSAGES.success,
  errors: {},
  values: {},
};

/** Validates, spam-checks and saves one form submission. Pure: every side effect comes in as a dep. */
export async function submitLead(form: FormData, deps: SubmitDeps): Promise<LeadFormState> {
  // A filled honeypot is a bot. Answer "thanks" so it learns nothing, and save nothing.
  if (isHoneypotFilled(form)) return success;

  const values = leadValues(form);
  const parsed = parseLead(form);
  if (!parsed.ok) {
    return { status: "error", message: MESSAGES.invalid, errors: parsed.errors, values };
  }
  if (deps.verifySpamCheck && !(await deps.verifySpamCheck(turnstileToken(form)))) {
    return { status: "error", message: MESSAGES.spamCheck, errors: {}, values };
  }
  try {
    await deps.save(parsed.lead);
  } catch (error) {
    deps.logError(error);
    return { status: "error", message: MESSAGES.failed, errors: {}, values };
  }
  try {
    await deps.notify(parsed.lead);
  } catch (error) {
    deps.logError(error);
  }
  return success;
}
