"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";

import { submitLeadAction } from "@/app/(site)/actions.ts";
import { CheckIcon } from "@/components/ui/icons.tsx";
import { HONEYPOT_FIELD, IDLE_STATE, SOURCE_FIELD } from "@/lib/leads/fields.ts";
import { BUSINESS_TYPES, SERVICES } from "@/lib/leads/options.ts";

import { SelectField, TextAreaField, TextField } from "./Field.tsx";
import { Turnstile } from "./Turnstile.tsx";

export interface LeadFormProps {
  /** Path of the page the form sits on. Saved with the lead as its source. */
  source: string;
  /** Id of the element that names the form (its heading). */
  labelledBy: string;
  /** Cloudflare Turnstile site key. Without one the widget is left out. */
  turnstileSiteKey?: string;
}

/**
 * Quote form. Rendered on the server and posted to a Server Action, so it works with JavaScript off.
 * With JavaScript on, errors and the thank-you message appear in place without a page reload.
 */
export function LeadForm({ source, labelledBy, turnstileSiteKey }: LeadFormProps) {
  const [state, action, pending] = useActionState(submitLeadAction, IDLE_STATE);
  const [touched, setTouched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // The spam check loads on the first focus inside the form, never on page load.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onFocus = () => {
      setTouched(true);
    };
    form.addEventListener("focusin", onFocus, { once: true });
    return () => {
      form.removeEventListener("focusin", onFocus);
    };
  }, [state.status]);
  const id = useId();
  const field = (name: keyof typeof state.values) => ({
    id: `${id}-${name}`,
    name,
    error: state.errors[name],
    defaultValue: state.values[name],
  });

  if (state.status === "success") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-md bg-lime-soft p-5">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-lime text-on-lime"
        >
          <CheckIcon className="size-4" />
        </span>
        <p className="font-semibold">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      ref={formRef}
      aria-labelledby={labelledBy}
      className="grid gap-4 sm:grid-cols-2"
    >
      {state.status === "error" ? (
        <p role="alert" className="rounded-md bg-danger-soft p-3 font-medium sm:col-span-2">
          {state.message}
        </p>
      ) : null}
      <TextField {...field("name")} label="Name" autoComplete="name" required />
      <TextField
        {...field("email")}
        label="Email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
      />
      <TextField
        {...field("phone")}
        label="Phone"
        hint="optional"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
      />
      <SelectField
        {...field("businessType")}
        label="Business type"
        placeholder="Choose one"
        options={BUSINESS_TYPES}
        required
      />
      <SelectField
        {...field("service")}
        label="What you need"
        placeholder="Choose one"
        options={SERVICES}
        required
        className="sm:col-span-2"
      />
      <TextAreaField
        {...field("message")}
        label="Short message"
        hint="optional"
        className="sm:col-span-2"
      />
      {/* Honeypot: hidden from people and screen readers, tempting for bots. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Leave this field empty
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name={SOURCE_FIELD} value={source} />
      {turnstileSiteKey ? (
        <div className="sm:col-span-2">
          <Turnstile siteKey={turnstileSiteKey} active={touched} />
        </div>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary inline-flex min-h-12 cursor-pointer items-center justify-center rounded-pill px-6 py-3 font-semibold disabled:opacity-70 sm:col-span-2"
      >
        {pending ? "Sending…" : "Get my free quote"}
      </button>
      <p className="text-small text-text-muted sm:col-span-2">
        I use your details only to reply to you. No spam, ever.
      </p>
    </form>
  );
}
