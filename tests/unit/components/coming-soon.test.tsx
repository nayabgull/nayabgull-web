import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { submitDemoAction } from "@/app/(site)/actions.ts";
import { DemoForm } from "@/components/forms/DemoForm.tsx";
import { ComingSoonPage } from "@/components/sections/ComingSoonPage.tsx";
import { ComingSoonFooter, ComingSoonHeader } from "@/components/sections/ComingSoonShell.tsx";
import { comingSoon } from "@/content/coming-soon.ts";
import type { DemoFormState } from "@/lib/leads/fields.ts";
import { comingSoonJsonLd } from "@/lib/seo/coming-soon-jsonld.ts";
import { validateJsonLd } from "@/lib/seo/jsonld-validate.ts";
import { serializeJsonLd } from "@/lib/seo/jsonld.ts";

const action = vi.mocked(submitDemoAction);

afterEach(() => {
  cleanup();
  action.mockReset();
  document.head.innerHTML = "";
});

describe("ComingSoonPage", () => {
  it("has one h1 with the primary keyword, three service cards and one primary call to action", () => {
    render(<ComingSoonPage content={comingSoon} />);
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent(/web development agency/i);
    const cards = within(screen.getByRole("region", { name: /what i build/i })).getAllByRole(
      "heading",
      { level: 3 },
    );
    expect(cards.map((card) => card.textContent)).toEqual([
      "AI agents",
      "AI voice receptionist",
      "Websites and automation",
    ]);
    expect(screen.getByRole("link", { name: "Request a custom demo" })).toHaveAttribute(
      "href",
      "#demo",
    );
    for (const link of screen.getAllByRole("link", { name: "Book a free call" })) {
      expect(link).toHaveAttribute("href", "https://cal.com/nayab-gull/strategy-call");
    }
  });

  it("states only real facts: 5+ years and 400+ projects, and no reviews or logos", () => {
    const html = renderToStaticMarkup(<ComingSoonPage content={comingSoon} />);
    expect(html).toContain("5+ years");
    expect(html).toContain("400+ projects delivered");
    expect(html).not.toMatch(/<img|testimonial|review|★/i);
  });

  it("describes itself with valid Organization, WebSite and BreadcrumbList JSON-LD", () => {
    const data = comingSoonJsonLd(comingSoon);
    const types = data["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["ProfessionalService", "WebSite", "BreadcrumbList", "Person"]);
    expect(validateJsonLd([serializeJsonLd(data)], "home")).toEqual([]);
    expect(renderToStaticMarkup(<ComingSoonPage content={comingSoon} />)).toContain(
      "application/ld+json",
    );
  });

  it("keeps its title and description inside the SEO limits", () => {
    expect(comingSoon.meta.title).toMatch(/\| Nayab Gull$/);
    expect(comingSoon.meta.title.length).toBeGreaterThanOrEqual(30);
    expect(comingSoon.meta.title.length).toBeLessThanOrEqual(60);
    expect(comingSoon.meta.description.length).toBeGreaterThanOrEqual(120);
    expect(comingSoon.meta.description.length).toBeLessThanOrEqual(155);
    expect(comingSoon.meta.description.toLowerCase()).toContain("web development agency");
  });
});

describe("coming-soon header and footer", () => {
  it("shows no page navigation in the header", () => {
    render(<ComingSoonHeader />);
    expect(screen.queryByRole("navigation")).toBeNull();
    expect(screen.getByRole("link", { name: /nayab gull/i })).toHaveAttribute("href", "/");
  });

  it("links the privacy policy and terms, and nothing else", () => {
    render(<ComingSoonFooter />);
    const legal = screen.getByRole("navigation", { name: "Legal" });
    expect(
      within(legal)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["/privacy-policy", "/terms"]);
    expect(screen.getByText(comingSoon.footerNote)).toBeInTheDocument();
  });
});

describe("DemoForm", () => {
  it("renders every field with a label and the agreed options", () => {
    render(
      <>
        <h2 id="t">Request a custom demo</h2>
        <DemoForm labelledBy="t" />
      </>,
    );
    const form = screen.getByRole("form", { name: "Request a custom demo" });
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Business name")).toBeRequired();
    expect(screen.getByLabelText("Website (optional)")).not.toBeRequired();
    expect(screen.getByLabelText("Industry")).toBeRequired();
    expect(screen.getByLabelText("What you want")).toBeRequired();
    for (const name of ["AI agent", "AI receptionist", "Automation", "Website", "Roofing"]) {
      expect(screen.getByRole("option", { name })).toBeInTheDocument();
    }
    expect(form.querySelector('input[name="company_website"]')).toHaveAttribute("tabindex", "-1");
    // The server fixes the source, so the browser sends none.
    expect(form.querySelector('input[name="source"]')).toBeNull();
    expect(form.querySelector("[data-turnstile]")).toBeNull();
  });

  it("with Turnstile on and JavaScript off, says why the form cannot send and links the call", () => {
    const html = renderToStaticMarkup(<DemoForm labelledBy="t" turnstileSiteKey="site-key" />);
    const noscript = /<noscript>(.*?)<\/noscript>/.exec(html)?.[1] ?? "";
    expect(noscript).toContain("The spam check on this form needs JavaScript.");
    expect(noscript).toContain('href="https://cal.com/nayab-gull/strategy-call"');
  });

  async function submitWith(state: DemoFormState) {
    action.mockResolvedValue(state);
    render(
      <>
        <h2 id="t">Request a custom demo</h2>
        <DemoForm labelledBy="t" />
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
      errors: { website: "Please enter a valid website, like example.com." },
      values: { name: "Sam", website: "not a url" },
    });
    expect(await screen.findByRole("alert")).toHaveTextContent("Please fix the marked fields");
    const website = screen.getByLabelText("Website (optional)");
    expect(website).toHaveAttribute("aria-invalid", "true");
    expect(website).toHaveAccessibleDescription("Please enter a valid website, like example.com.");
    expect(website).toHaveValue("not a url");
    expect(screen.getByLabelText("Name")).toHaveValue("Sam");
  });

  it("replaces the form with the thank-you message after a successful send", async () => {
    await submitWith({ status: "success", message: "Thanks!", errors: {}, values: {} });
    expect(await screen.findByRole("status")).toHaveTextContent("Thanks!");
    expect(screen.queryByRole("form")).toBeNull();
  });

  it("loads Turnstile only after the visitor focuses the form", () => {
    render(
      <>
        <h2 id="t">Request a custom demo</h2>
        <DemoForm labelledBy="t" turnstileSiteKey="site-key" />
      </>,
    );
    expect(document.querySelector('script[src*="turnstile"]')).toBeNull();
    fireEvent.focus(screen.getByLabelText("Name"));
    expect(document.querySelector('script[src*="turnstile"]')).not.toBeNull();
  });
});
