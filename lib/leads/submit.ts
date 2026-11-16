import type { DemoFormState, FieldValues, FormState, LeadFormState } from "./fields.ts";
import type { DemoInput, LeadInput, Parsed } from "./schema.ts";
import {
  demoValues,
  isHoneypotFilled,
  leadValues,
  parseDemo,
  parseLead,
  turnstileToken,
} from "./schema.ts";

export const MESSAGES = {
  success: "Thanks! Your request is in. I will reply within one business day.",
  invalid: "Please fix the marked fields and send the form again.",
  spamCheck:
    "The spam check did not finish. Please wait for it to load and try again, or book a call instead.",
  failed: "Something went wrong on my side. Please try again, or book a call instead.",
} as const;

export interface SubmitDeps<T = LeadInput> {
  /** Saves the lead (Payload "leads" collection). */
  save: (lead: T) => Promise<void>;
  /** Email notification hook. Its errors are ignored: the lead is already saved. */
  notify: (lead: T) => Promise<void>;
  /** Present only when Turnstile is configured. Then every submission needs a valid token. */
  verifySpamCheck?: (token: string) => Promise<boolean>;
  logError: (error: unknown) => void;
}

/** What a form needs to say about itself: how to read its fields and how to validate them. */
interface FormSpec<T, F extends string> {
  values: (form: FormData) => FieldValues<F>;
  parse: (form: FormData) => Parsed<T, F>;
}

/** Validates, spam-checks and saves one form submission. Pure: every side effect comes in as a dep. */
async function submitForm<T, F extends string>(
  form: FormData,
  deps: SubmitDeps<T>,
  spec: FormSpec<T, F>,
): Promise<FormState<F>> {
  const success: FormState<F> = {
    status: "success",
    message: MESSAGES.success,
    errors: {},
    values: {},
  };
  // A filled honeypot is a bot. Answer "thanks" so it learns nothing, and save nothing.
  if (isHoneypotFilled(form)) return success;

  const values = spec.values(form);
  const parsed = spec.parse(form);
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

/** The quote form (hero, closing section and /contact). */
export function submitLead(form: FormData, deps: SubmitDeps): Promise<LeadFormState> {
  return submitForm(form, deps, { values: leadValues, parse: parseLead });
}

/** The coming-soon "Request a custom demo" form. */
export function submitDemo(form: FormData, deps: SubmitDeps<DemoInput>): Promise<DemoFormState> {
  return submitForm(form, deps, { values: demoValues, parse: parseDemo });
}
