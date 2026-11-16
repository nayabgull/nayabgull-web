import { describe, expect, it } from "vitest";

import { home, STRATEGY_CALL_URL } from "@/content/home.ts";
import { findBannedPhrases } from "@/lib/content/banned-phrases.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";

const entry = keywordFor("/");
const primary = entry?.primary ?? "";
const headline = `${home.hero.headline.before}${home.hero.headline.highlight}${home.hero.headline.after}`;

describe("homepage content (content/home.ts)", () => {
  it("targets the registered primary keyword for /", () => {
    expect(primary).toBe("web development agency");
  });

  it("puts the primary keyword in the title (first half), H1, meta and an H2", () => {
    const title = home.meta.title.toLowerCase();
    expect(title.indexOf(primary)).toBeGreaterThanOrEqual(0);
    expect(title.indexOf(primary)).toBeLessThanOrEqual(title.length / 2);
    expect(headline.toLowerCase()).toContain(primary);
    expect(home.meta.description.toLowerCase()).toContain(primary);
    expect(home.services.heading.toLowerCase()).toContain(primary);
  });

  it("keeps title and meta description within the SEO lengths", () => {
    expect(home.meta.title.length).toBeGreaterThanOrEqual(30);
    expect(home.meta.title.length).toBeLessThanOrEqual(60);
    expect(home.meta.title.endsWith("| Nayab Gull")).toBe(true);
    expect(home.meta.description.length).toBeGreaterThanOrEqual(120);
    expect(home.meta.description.length).toBeLessThanOrEqual(155);
  });

  it("uses one primary CTA, the same at the top and the end", () => {
    expect(home.hero.primaryCta.href).toBe(STRATEGY_CALL_URL);
    expect(home.quote.cta).toEqual(home.hero.primaryCta);
    expect(STRATEGY_CALL_URL).toBe("https://cal.com/nayab-gull/strategy-call");
    expect(home.hero.secondaryCta.href).toBe("#services");
  });

  it("uses the agreed hero copy", () => {
    expect(headline).toBe("The web development agency that turns your leads into booked calls");
    expect(home.hero.lede).toBe(
      "I build fast websites, set up GoHighLevel, and add AI that calls every new lead within 60 seconds.",
    );
    expect(home.hero.secondaryCta).toEqual({ label: "See services", href: "#services" });
  });

  it("has the sections of the agreed structure", () => {
    expect(home.services.items.map((s) => s.title)).toEqual([
      "Web Development",
      "GoHighLevel",
      "AI Automation",
    ]);
    expect(home.flow.heading).toBe("What happens when a new lead comes in");
    expect(home.industries.heading).toBe("Websites and automation for these businesses");
    expect(home.industries.items.map((i) => i.id)).toEqual([
      "law",
      "dental",
      "real-estate",
      "roofing",
      "contractors",
    ]);
    expect(home.process.steps).toHaveLength(4);
    expect(home.faq.items.length).toBeGreaterThanOrEqual(6);
    expect(home.faq.items.length).toBeLessThanOrEqual(8);
    expect(home.flow.steps.map((s) => s.title)).toEqual([
      "New lead from website",
      "Added to GoHighLevel",
      "AI assistant calls in 60 seconds",
      "Call booked",
    ]);
  });

  it("keeps WordPress and Shopify off the homepage (they get their own pages)", () => {
    expect(JSON.stringify(home)).not.toMatch(/wordpress|shopify/i);
  });

  it("gives every industry its own line", () => {
    const lines = new Set(home.industries.items.map((i) => i.line));
    expect(lines.size).toBe(home.industries.items.length);
  });

  it("states only the confirmed proof facts", () => {
    expect(home.hero.proof).toEqual([
      "5+ years",
      "400+ projects delivered",
      "Clients in the US, UK and worldwide",
    ]);
  });

  it("ships no testimonials, prices or approved case study until Nayab confirms them", () => {
    expect(home.testimonials).toEqual([]);
    expect(home.work.caseStudy.approved).toBe(false);
    expect(JSON.stringify(home)).not.toMatch(/\$\d/);
    expect(JSON.stringify(home)).not.toMatch(/\b(rating|stars?|review)\b/i);
  });

  it("contains no banned phrases and no em dashes", () => {
    const text = JSON.stringify(home);
    expect(findBannedPhrases(text)).toEqual([]);
    expect(text).not.toContain("—");
  });

  it("keeps the about section text only: no photo and no avatar", () => {
    expect(Object.keys(home.about).sort()).toEqual(
      ["eyebrow", "heading", "location", "name", "role", "text"].sort(),
    );
  });

  it("labels both quote forms and promises nothing but a reply", () => {
    expect(home.hero.form.heading).toBe("Get a free quote");
    expect(home.quote.form.heading).not.toBe(home.hero.form.heading);
  });
});
