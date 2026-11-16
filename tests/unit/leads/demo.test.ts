import { describe, expect, it, vi } from "vitest";

import { ALL_SERVICES, DEMO_WANTS, SERVICES, values } from "@/lib/leads/options.ts";
import { demoValues, DEMO_SOURCE, parseDemo } from "@/lib/leads/schema.ts";
import { MESSAGES, submitDemo } from "@/lib/leads/submit.ts";

const GOOD = {
  name: "  Sam Roofer ",
  email: "sam@example.com",
  businessName: " Sam Roofing LLC ",
  website: "samroofing.com",
  businessType: "roofing",
  service: "ai-receptionist",
};

function form(fields: Record<string, string | undefined>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) data.set(key, value);
  }
  return data;
}

function deps(overrides = {}) {
  return {
    save: vi.fn(() => Promise.resolve()),
    notify: vi.fn(() => Promise.resolve()),
    logError: vi.fn(),
    ...overrides,
  };
}

describe("demo options", () => {
  it("offers AI agent, AI receptionist, automation and website", () => {
    expect(DEMO_WANTS.map((o) => o.label)).toEqual([
      "AI agent",
      "AI receptionist",
      "Automation",
      "Website",
    ]);
  });

  it("stores every demo choice in the same service column as the quote form", () => {
    const stored = values(ALL_SERVICES);
    for (const want of values(DEMO_WANTS)) expect(stored).toContain(want);
    for (const service of values(SERVICES)) expect(stored).toContain(service);
    expect(new Set(stored).size).toBe(stored.length);
  });
});

describe("parseDemo", () => {
  it("accepts a complete form, trims text and adds https:// to the website", () => {
    const parsed = parseDemo(form(GOOD));
    expect(parsed).toEqual({
      ok: true,
      lead: {
        name: "Sam Roofer",
        email: "sam@example.com",
        businessName: "Sam Roofing LLC",
        website: "https://samroofing.com",
        businessType: "roofing",
        service: "ai-receptionist",
        source: DEMO_SOURCE,
      },
    });
  });

  it("makes the website optional and keeps a full URL as typed", () => {
    expect(parseDemo(form({ ...GOOD, website: "" }))).toMatchObject({
      ok: true,
      lead: { website: "" },
    });
    expect(parseDemo(form({ ...GOOD, website: "http://samroofing.com/x" }))).toMatchObject({
      ok: true,
      lead: { website: "http://samroofing.com/x" },
    });
  });

  it("ignores a source sent by the browser", () => {
    expect(parseDemo(form({ ...GOOD, source: "/pricing" }))).toMatchObject({
      lead: { source: "coming-soon" },
    });
  });

  it("reports one message per bad field", () => {
    const parsed = parseDemo(
      form({
        name: "A",
        email: "nope",
        businessName: "",
        website: "not a url",
        businessType: "pirate",
        service: "full-system",
      }),
    );
    expect(parsed.ok).toBe(false);
    if (parsed.ok) return;
    expect(Object.keys(parsed.errors).sort()).toEqual(
      ["businessName", "businessType", "email", "name", "service", "website"].sort(),
    );
    expect(parsed.errors.website).toBe("Please enter a valid website, like example.com.");
  });

  it("rejects a website that is not a web address", () => {
    for (const website of ["javascript:alert(1)", "ftp://example.com", "localhost", "a b.com"]) {
      expect(parseDemo(form({ ...GOOD, website })).ok).toBe(false);
    }
  });

  it("returns the typed values so the form can refill", () => {
    expect(demoValues(form(GOOD))).toMatchObject({ businessName: " Sam Roofing LLC " });
  });
});

describe("submitDemo", () => {
  it("saves a valid request, notifies and says thanks", async () => {
    const d = deps();
    const state = await submitDemo(form(GOOD), d);
    expect(state.status).toBe("success");
    expect(state.message).toBe(MESSAGES.success);
    expect(d.save).toHaveBeenCalledWith(expect.objectContaining({ source: "coming-soon" }));
    expect(d.notify).toHaveBeenCalledTimes(1);
  });

  it("drops a filled honeypot without saving", async () => {
    const d = deps();
    const state = await submitDemo(form({ ...GOOD, company_website: "spam" }), d);
    expect(state.status).toBe("success");
    expect(d.save).not.toHaveBeenCalled();
  });

  it("returns field errors and the typed values without saving", async () => {
    const d = deps();
    const state = await submitDemo(form({ ...GOOD, email: "nope" }), d);
    expect(state.status).toBe("error");
    expect(state.errors.email).toBe("Please enter a valid email address.");
    expect(state.values.businessName).toBe(" Sam Roofing LLC ");
    expect(d.save).not.toHaveBeenCalled();
  });

  it("needs a valid Turnstile token when Turnstile is configured", async () => {
    const verifySpamCheck = vi.fn(() => Promise.resolve(false));
    const d = deps({ verifySpamCheck });
    const state = await submitDemo(form({ ...GOOD, "cf-turnstile-response": "t" }), d);
    expect(state.message).toBe(MESSAGES.spamCheck);
    expect(verifySpamCheck).toHaveBeenCalledWith("t");
    expect(d.save).not.toHaveBeenCalled();
  });

  it("shows a friendly message when saving fails, and a failing notification never loses the lead", async () => {
    const failing = deps({ save: vi.fn(() => Promise.reject(new Error("db down"))) });
    expect((await submitDemo(form(GOOD), failing)).message).toBe(MESSAGES.failed);
    expect(failing.logError).toHaveBeenCalledTimes(1);

    const notifyFails = deps({ notify: vi.fn(() => Promise.reject(new Error("mail down"))) });
    expect((await submitDemo(form(GOOD), notifyFails)).status).toBe("success");
    expect(notifyFails.logError).toHaveBeenCalledTimes(1);
  });
});
