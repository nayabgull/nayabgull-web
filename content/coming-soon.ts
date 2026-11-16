import { CALL_CTA } from "./home.ts";
import type { Link } from "./home.ts";

/**
 * The holding page that replaces every public route while SITE_MODE is "coming-soon" (lib/site-mode.ts).
 * It is served at "/" (rewritten from /coming-soon), so its canonical is the homepage and it reuses
 * the homepage's primary keyword, "web development agency". Facts come from content/home.ts: 5+ years
 * and 400+ projects. No logos, reviews, prices or results are shown here.
 */
export interface ComingSoonService {
  title: string;
  text: string;
  icon: "spark" | "phone" | "code";
}

export interface ComingSoonContent {
  meta: { title: string; description: string };
  badge: string;
  headline: { before: string; highlight: string };
  lede: string;
  proof: readonly string[];
  primaryCta: Link;
  secondaryCta: Link;
  services: { id: string; heading: string; items: readonly ComingSoonService[] };
  demo: { id: string; heading: string; text: string; note: string };
  /** Footer line: the legal links stay open in coming-soon mode because the form needs them. */
  footerNote: string;
}

export const comingSoon: ComingSoonContent = {
  meta: {
    title: "Web Development Agency for AI Agents | Nayab Gull",
    description:
      "Web development agency for US businesses. AI agents, AI voice receptionists and websites that turn leads into booked calls. Request a custom demo.",
  },
  badge: "Full site launching soon",
  headline: {
    before: "Web development agency for ",
    highlight: "AI agents, AI receptionists and websites",
  },
  lede: "I'm Nayab Gull, and I run a small agency for US businesses. I build AI agents that answer new leads, AI voice receptionists that pick up your phone, and websites that turn those leads into booked calls. My full site is launching soon. Until then, you can request a custom demo or book a free call.",
  proof: ["5+ years", "400+ projects delivered"],
  primaryCta: { label: "Request a custom demo", href: "#demo" },
  secondaryCta: CALL_CTA,
  services: {
    id: "what-i-build",
    heading: "What I build as your web development company",
    items: [
      {
        icon: "spark",
        title: "AI agents",
        text: "An AI agent replies to every new lead, asks the right questions and books the call on your calendar.",
      },
      {
        icon: "phone",
        title: "AI voice receptionist",
        text: "A voice receptionist answers your phone day and night, handles common questions and sends real leads to you.",
      },
      {
        icon: "code",
        title: "Websites and automation",
        text: "Fast websites, CRM setup and automations that connect your forms, calls and follow-ups in one place.",
      },
    ],
  },
  demo: {
    id: "demo",
    heading: "Request a custom demo",
    text: "Tell me about your business and what you want to see. I reply within one business day to plan your demo.",
    note: "Prefer to talk first? Book a free call and we will go through it together.",
  },
  footerNote: "Full site launching soon.",
};
