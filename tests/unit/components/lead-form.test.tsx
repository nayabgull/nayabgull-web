import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { submitLeadAction } from "@/app/(site)/actions.ts";
import { LeadForm } from "@/components/forms/LeadForm.tsx";
import { Turnstile } from "@/components/forms/Turnstile.tsx";
import { ContactPage } from "@/components/sections/ContactPage.tsx";
import { MobileCtaBar } from "@/components/sections/MobileCtaBar.tsx";
import { InView } from "@/components/ui/InView.tsx";
import { contact } from "@/content/contact.ts";
import type { LeadFormState } from "@/lib/leads/fields.ts";

const action = vi.mocked(submitLeadAction);

afterEach(() => {
  cleanup();
  action.mockReset();
  vi.unstubAllGlobals();
  document.head.innerHTML = "";
});

/** A controllable IntersectionObserver: tests decide what is on screen. */
function stubObserver() {
  const instances: { callback: IntersectionObserverCallback; targets: Element[] }[] = [];
  class FakeObserver {
    targets: Element[] = [];
    callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
      instances.push(this);
    }
    observe(target: Element) {
      this.targets.push(target);
    }
    disconnect() {
      this.targets = [];
    }
  }
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  const emit = (index: number, entries: { target: Element; isIntersecting: boolean }[]) => {
    act(() => {
      instances[index]?.callback(
        entries as IntersectionObserverEntry[],
        {} as IntersectionObserver,
      );
    });
  };
  return { instances, emit };
}

describe("LeadForm", () => {
  it("renders every field with a label, the right options and a hidden source", () => {
    render(
      <>
        <h2 id="form-title">Get a free quote</h2>
        <LeadForm source="/contact" labelledBy="form-title" />
      </>,
    );
    const form = screen.getByRole("form", { name: "Get a free quote" });
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Phone (optional)")).not.toBeRequired();
    expect(screen.getByLabelText("Business type")).toBeRequired();
    expect(screen.getByLabelText("What you need")).toBeRequired();
    expect(screen.getByLabelText("Short message (optional)")).not.toBeRequired();
    expect(screen.getByRole("option", { name: "Dental/Medical" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Full system" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Get my free quote" })).toHaveAttribute(
      "type",
      "submit",
    );
    expect(form.querySelector('input[name="source"]')).toHaveValue("/contact");
    expect(form.querySelector('input[name="company_website"]')).toHaveAttribute("tabindex", "-1");
    expect(form.querySelector("[data-turnstile]")).toBeNull();
  });

  async function submitWith(state: LeadFormState) {
    action.mockResolvedValue(state);
    render(
      <>
        <h2 id="t">Quote</h2>
        <LeadForm source="/" labelledBy="t" />
      </>,
    );
    await act(async () => {
      fireEvent.submit(screen.getByRole("form"));
      await Promise.resolve();
    });
  }

  it("shows field errors next to their fields and keeps what was typed", async () => {
    await submitWith({
      status: "error",
      message: "Please fix the marked fields and send the form again.",
      errors: { phone: "Please enter a valid phone number." },
      values: { name: "Sam", phone: "abc" },
    });
    expect(await screen.findByRole("alert")).toHaveTextContent("Please fix the marked fields");
    const phone = screen.getByLabelText("Phone (optional)");
    expect(phone).toHaveAttribute("aria-invalid", "true");
    expect(phone).toHaveAccessibleDescription("Please enter a valid phone number.");
    expect(phone).toHaveValue("abc");
    expect(screen.getByLabelText("Name")).toHaveValue("Sam");
  });

  it("replaces the form with the thank-you message after a successful send", async () => {
    await submitWith({
      status: "success",
      message: "Thanks! Your request is in.",
      errors: {},
      values: {},
    });
    expect(await screen.findByRole("status")).toHaveTextContent("Thanks! Your request is in.");
    expect(screen.queryByRole("form")).toBeNull();
  });

  it("loads Turnstile only after the visitor focuses the form", () => {
    render(
      <>
        <h2 id="t">Quote</h2>
        <LeadForm source="/" labelledBy="t" turnstileSiteKey="site-key" />
      </>,
    );
    expect(document.querySelector('script[src*="turnstile"]')).toBeNull();
    fireEvent.focus(screen.getByLabelText("Name"));
    expect(document.querySelector('script[src*="turnstile"]')).not.toBeNull();
  });
});

describe("Turnstile", () => {
  it("renders the widget once the script has loaded, and only once", () => {
    const renderWidget = vi.fn();
    const { rerender } = render(<Turnstile siteKey="k" active={false} />);
    expect(document.querySelector("script")).toBeNull();

    rerender(<Turnstile siteKey="k" active />);
    const script = document.querySelector("script") ?? document.createElement("script");
    expect(script.src).toContain("challenges.cloudflare.com/turnstile/v0/api.js");
    fireEvent.load(script); // script loaded but API missing: nothing to render
    vi.stubGlobal("turnstile", { render: renderWidget });
    fireEvent.load(script);
    fireEvent.load(script);
    expect(renderWidget).toHaveBeenCalledOnce();
    expect(renderWidget.mock.calls[0]?.[1]).toEqual({ sitekey: "k" });
  });

  it("reuses a script another form already added, and an API that is already there", () => {
    render(<Turnstile siteKey="a" active />);
    render(<Turnstile siteKey="b" active />);
    expect(document.querySelectorAll("script")).toHaveLength(1);

    const renderWidget = vi.fn();
    vi.stubGlobal("turnstile", { render: renderWidget });
    render(<Turnstile siteKey="c" active />);
    expect(renderWidget).toHaveBeenCalledWith(expect.any(HTMLElement), { sitekey: "c" });
  });
});

describe("InView", () => {
  it("flips data-inview as its content enters and leaves the screen", () => {
    const { instances, emit } = stubObserver();
    render(
      <InView className="flow">
        <p>Steps</p>
      </InView>,
    );
    const box = screen.getByText("Steps").parentElement ?? document.body;
    expect(box).toHaveAttribute("data-inview", "false");
    expect(instances[0]?.targets).toEqual([box]);
    emit(0, [{ target: box, isIntersecting: true }]);
    expect(box).toHaveAttribute("data-inview", "true");
    emit(0, [{ target: box, isIntersecting: false }]);
    expect(box).toHaveAttribute("data-inview", "false");
  });

  it("stays in its final state when IntersectionObserver is missing", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(
      <InView>
        <p>Steps</p>
      </InView>,
    );
    expect(screen.getByText("Steps").parentElement).toHaveAttribute("data-inview", "false");
  });
});

describe("MobileCtaBar", () => {
  it("shows only while no hero or quote section is on screen", () => {
    const { emit } = stubObserver();
    const { container } = render(
      <>
        <section data-cta-zone>Hero</section>
        <MobileCtaBar />
      </>,
    );
    const zone = screen.getByText("Hero");
    const bar = container.querySelector("div.fixed") ?? document.body;
    expect(bar).not.toBeVisible();
    emit(0, [{ target: zone, isIntersecting: true }]);
    expect(bar).not.toBeVisible();
    emit(0, [{ target: zone, isIntersecting: false }]);
    expect(bar).toBeVisible();
    expect(screen.getByRole("link", { name: "Get a quote" })).toHaveAttribute("href", "#quote");
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute(
      "href",
      "https://cal.com/nayab-gull/strategy-call",
    );
  });

  it("stays hidden when IntersectionObserver is missing", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<MobileCtaBar />);
    expect(container.querySelector("div.fixed")).not.toBeVisible();
  });
});

describe("ContactPage", () => {
  it("shows the email card only when a real address is set", () => {
    const { rerender } = render(<ContactPage content={contact} email={null} />);
    expect(screen.queryByRole("heading", { name: "Email" })).toBeNull();
    expect(screen.queryByRole("link", { name: /@/ })).toBeNull();

    rerender(<ContactPage content={contact} email="hello@example.com" />);
    expect(screen.getByRole("link", { name: "hello@example.com" })).toHaveAttribute(
      "href",
      "mailto:hello@example.com",
    );
  });
});
