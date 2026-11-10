import { describe, expect, it, vi } from "vitest";

import { IDLE_STATE } from "@/lib/leads/fields.ts";
import { notifyNewLead } from "@/lib/leads/notify.ts";
import { BUSINESS_TYPES, LEAD_STATUSES, SERVICES, values } from "@/lib/leads/options.ts";
import { leadValues, parseLead } from "@/lib/leads/schema.ts";
import type { SubmitDeps } from "@/lib/leads/submit.ts";
import { MESSAGES, submitLead } from "@/lib/leads/submit.ts";
import { verifyTurnstile } from "@/lib/leads/turnstile.ts";

const GOOD = {
  name: "  Sam Roofer ",
  email: "sam@example.com",
  phone: "(512) 555-0100",
  businessType: "roofing",
  service: "full-system",
  message: "Need a new site before storm season.",
  source: "/contact",
};

function form(fields: Record<string, string | undefined>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) data.set(key, value);
  }
  return data;
}

function deps(overrides: Partial<SubmitDeps> = {}) {
  return {
    save: vi.fn(() => Promise.resolve()),
    notify: vi.fn(() => Promise.resolve()),
    logError: vi.fn(),
    ...overrides,
  };
}

describe("lead options", () => {
  it("offers the agreed business types, services and statuses", () => {
    expect(BUSINESS_TYPES.map((o) => o.label)).toEqual([
      "Roofing",
      "HVAC",
      "Law firm",
      "Dental/Medical",
      "Real estate",
      "Contractor",
      "Other",
    ]);
    expect(SERVICES.map((o) => o.label)).toEqual([
      "Website",
      "GoHighLevel",
      "AI automation",
      "Full system",
    ]);
    expect(values(LEAD_STATUSES)).toEqual(["new", "contacted", "booked", "won", "lost"]);
  });
});

describe("parseLead", () => {
  it("accepts a complete form and trims the text", () => {
    const parsed = parseLead(form(GOOD));
    expect(parsed).toEqual({ ok: true, lead: { ...GOOD, name: "Sam Roofer" } });
  });

  it("lets phone and message stay empty", () => {
    const parsed = parseLead(form({ ...GOOD, phone: "", message: undefined }));
    expect(parsed.ok).toBe(true);
  });

  it("returns one plain message per bad field", () => {
    const parsed = parseLead(
      form({ name: "", email: "not-an-email", phone: "abc", businessType: "", service: "seo" }),
    );
    expect(parsed).toEqual({
      ok: false,
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid phone number.",
        businessType: "Please pick your business type.",
        service: "Please pick what you need.",
      },
    });
  });

  it("limits field length", () => {
    const parsed = parseLead(form({ ...GOOD, message: "x".repeat(1001) }));
    expect(parsed.ok ? "" : parsed.errors.message).toContain("1000");
  });

  it("falls back to / when the source is missing or not a site path", () => {
    for (const source of [undefined, "https://evil.example", "/ok?x=<script>"]) {
      const parsed = parseLead(form({ ...GOOD, source }));
      expect(parsed.ok && parsed.lead.source).toBe("/");
    }
  });

  it("reads only strings from the form", () => {
    const data = form(GOOD);
    data.set("name", new Blob(["x"]));
    expect(leadValues(data).name).toBe("");
  });
});

describe("submitLead", () => {
  it("saves a valid lead, runs the notification hook and says thanks", async () => {
    const d = deps();
    const state = await submitLead(form(GOOD), d);
    expect(state).toEqual({ status: "success", message: MESSAGES.success, errors: {}, values: {} });
    expect(d.save).toHaveBeenCalledWith(expect.objectContaining({ email: "sam@example.com" }));
    expect(d.notify).toHaveBeenCalledOnce();
  });

  it("returns the errors and what was typed, and saves nothing, when the form is invalid", async () => {
    const d = deps();
    const state = await submitLead(form({ ...GOOD, phone: "abc" }), d);
    expect(state.status).toBe("error");
    expect(state.message).toBe(MESSAGES.invalid);
    expect(state.errors).toEqual({ phone: "Please enter a valid phone number." });
    expect(state.values.name).toBe(GOOD.name);
    expect(d.save).not.toHaveBeenCalled();
  });

  it("drops a submission that fills the honeypot, but still answers thanks", async () => {
    const d = deps();
    const state = await submitLead(form({ ...GOOD, company_website: "https://spam.example" }), d);
    expect(state.status).toBe("success");
    expect(d.save).not.toHaveBeenCalled();
    expect(d.notify).not.toHaveBeenCalled();
  });

  it("requires a valid Turnstile token when the check is configured", async () => {
    const verifySpamCheck = vi.fn((token: string) => Promise.resolve(token === "good"));
    const blocked = deps({ verifySpamCheck });
    const state = await submitLead(form(GOOD), blocked);
    expect(state.message).toBe(MESSAGES.spamCheck);
    expect(verifySpamCheck).toHaveBeenCalledWith("");
    expect(blocked.save).not.toHaveBeenCalled();

    const allowed = deps({ verifySpamCheck });
    const ok = await submitLead(form({ ...GOOD, "cf-turnstile-response": "good" }), allowed);
    expect(ok.status).toBe("success");
    expect(allowed.save).toHaveBeenCalledOnce();
  });

  it("shows a friendly error and logs when saving fails", async () => {
    const error = new Error("database is down");
    const d = deps({ save: vi.fn(() => Promise.reject(error)) });
    const state = await submitLead(form(GOOD), d);
    expect(state).toMatchObject({ status: "error", message: MESSAGES.failed });
    expect(state.values.email).toBe(GOOD.email);
    expect(d.logError).toHaveBeenCalledWith(error);
    expect(d.notify).not.toHaveBeenCalled();
  });

  it("never loses a saved lead because the notification hook failed", async () => {
    const d = deps({ notify: vi.fn(() => Promise.reject(new Error("mail down"))) });
    const state = await submitLead(form(GOOD), d);
    expect(state.status).toBe("success");
    expect(d.logError).toHaveBeenCalledOnce();
  });

  it("starts idle, and the notification hook is a no-op until a service is chosen", async () => {
    expect(IDLE_STATE).toEqual({ status: "idle", message: "", errors: {}, values: {} });
    const parsed = parseLead(form(GOOD));
    await expect(parsed.ok ? notifyNewLead(parsed.lead) : undefined).resolves.toBeUndefined();
  });
});

describe("verifyTurnstile", () => {
  const respond = (body: unknown, ok = true) =>
    vi.fn(() => Promise.resolve({ ok, json: () => Promise.resolve(body) } as Response));

  it("is true only when Cloudflare says success", async () => {
    const fetcher = respond({ success: true });
    await expect(verifyTurnstile("token", "secret", fetcher)).resolves.toBe(true);
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, { body: URLSearchParams }];
    expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    expect(init.body.get("secret")).toBe("secret");
    expect(init.body.get("response")).toBe("token");
  });

  it("is false for an empty token, a failed check, a bad reply or a network error", async () => {
    const never = respond({ success: true });
    await expect(verifyTurnstile("", "secret", never)).resolves.toBe(false);
    expect(never).not.toHaveBeenCalled();
    await expect(verifyTurnstile("t", "s", respond({ success: false }))).resolves.toBe(false);
    await expect(verifyTurnstile("t", "s", respond("nope"))).resolves.toBe(false);
    await expect(verifyTurnstile("t", "s", respond({ success: true }, false))).resolves.toBe(false);
    const down = vi.fn(() => Promise.reject(new Error("offline")));
    await expect(verifyTurnstile("t", "s", down)).resolves.toBe(false);
  });
});
