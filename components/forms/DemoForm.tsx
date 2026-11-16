"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";

import { submitDemoAction } from "@/app/(site)/actions.ts";
import { CheckIcon } from "@/components/ui/icons.tsx";
import { CALL_CTA } from "@/content/home.ts";
import type { DemoField } from "@/lib/leads/fields.ts";
import { DEMO_IDLE_STATE, HONEYPOT_FIELD } from "@/lib/leads/fields.ts";
import { BUSINESS_TYPES, DEMO_WANTS } from "@/lib/leads/options.ts";

import { SelectField, TextField } from "./Field.tsx";
import { Turnstile } from "./Turnstile.tsx";

export interface DemoFormProps {
  /** Id of the element that names the form (its heading). */
  labelledBy: string;
  /** Cloudflare Turnstile site key. Without one the widget is left out. */
  turnstileSiteKey?: string;
}

/**
 * "Request a custom demo" form of the coming-soon page. Same pattern as LeadForm: rendered on the
 * server, posted to a Server Action (works with JavaScript off), saved as a lead of type "demo".
 * The server fixes the source page to "coming-soon", so there is no hidden source field.
 */
export function DemoForm({ labelledBy, turnstileSiteKey }: DemoFormProps) {
  const [state, action, pending] = useActionState(submitDemoAction, DEMO_IDLE_STATE);
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
  const field = (name: DemoField) => ({
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
      className="grid gap-4 text-left sm:grid-cols-2"
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
        {...field("businessName")}
        label="Business name"
        autoComplete="organization"
        required
      />
      <TextField
        {...field("website")}
        label="Website"
        hint="optional"
        inputMode="text"
        autoComplete="url"
      />
      <SelectField
        {...field("businessType")}
        label="Industry"
        placeholder="Choose one"
        options={BUSINESS_TYPES}
        required
      />
      <SelectField
        {...field("service")}
        label="What you want"
        placeholder="Choose one"
        options={DEMO_WANTS}
        required
      />
      {/* Honeypot: hidden from people and screen readers, tempting for bots. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Leave this field empty
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {turnstileSiteKey ? (
        <div className="sm:col-span-2">
          <Turnstile siteKey={turnstileSiteKey} active={touched} />
          {/* The spam check cannot run without JavaScript, so say so and offer the call instead. */}
          <noscript>
            <p className="rounded-md bg-danger-soft p-3 font-medium">
              The spam check on this form needs JavaScript. Please turn it on, or{" "}
              <a href={CALL_CTA.href} rel="noopener" className="text-link">
                book a free call
              </a>{" "}
              instead.
            </p>
          </noscript>
        </div>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary inline-flex min-h-12 cursor-pointer items-center justify-center rounded-pill px-6 py-3 font-semibold disabled:opacity-70 sm:col-span-2"
      >
        {pending ? "Sending…" : "Send my demo request"}
      </button>
      <p className="text-small text-text-muted sm:col-span-2">
        I use your details only to reply to you. No spam, ever.
      </p>
    </form>
  );
}
