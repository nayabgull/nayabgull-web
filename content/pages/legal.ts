import { STRATEGY_CALL_URL } from "../home.ts";

import type { LinkSpan, PageContent } from "./types.ts";

/**
 * /privacy-policy and /terms. Both are `noindex, follow` and stay out of the sitemap, so they have
 * no keyword in docs/seo/keyword-map.md. They include the SMS wording US carriers look for when they
 * review an A2P 10DLC registration (GoHighLevel): what the texts are, opt-in, STOP and HELP, message
 * frequency, rates, and that mobile opt-in data is never shared for marketing.
 *
 * TODO(nayab): these are plain-English drafts, not legal advice. Have a lawyer review both pages.
 * TODO(nayab): add a support email and phone number (carriers expect one next to HELP). Until then
 * the only contact route is the booking page.
 * TODO(nayab): confirm the legal business name used in your A2P brand registration matches "Nayab
 * Gull", and decide the governing law for the terms (no governing-law clause is included yet).
 * TODO(nayab): update the "what this site uses" section before any analytics or form goes live.
 */
const UPDATED = "2026-11-10";
const UPDATED_TEXT = "Last updated: November 10, 2026.";

const BOOKING: LinkSpan = { text: "the booking page", href: STRATEGY_CALL_URL };
const PRIVACY: LinkSpan = { text: "Privacy Policy", href: "/privacy-policy" };
const TERMS: LinkSpan = { text: "Terms of Service", href: "/terms" };

export const privacyPolicy: PageContent = {
  path: "/privacy-policy",
  name: "Privacy Policy",
  updated: UPDATED,
  noindex: true,
  meta: {
    title: "Privacy Policy for nayabgull.com | Nayab Gull",
    description:
      "How nayabgull.com collects, uses and protects your information, including phone numbers and text message (SMS) consent.",
  },

  hero: {
    eyebrow: "Legal",
    headline: { before: "", highlight: "Privacy Policy", after: "" },
    lede: "This page explains what information I collect through nayabgull.com, why I collect it and what you can do about it. I have kept it short and in plain English.",
    proof: [],
  },

  blocks: [
    {
      kind: "prose",
      id: "who",
      eyebrow: "1",
      heading: "Who this policy covers",
      paragraphs: [
        UPDATED_TEXT,
        'This website belongs to Nayab Gull, a full-stack developer based in Lahore, Pakistan. In this policy, "I", "me" and "my" mean Nayab Gull. "You" means anyone who visits the site or contacts me through it.',
        [
          "This policy works together with my ",
          TERMS,
          ". If you become a client, your written quote or agreement may add more specific terms.",
        ],
      ],
    },
    {
      kind: "prose",
      id: "collect",
      eyebrow: "2",
      heading: "What I collect",
      paragraphs: ["I collect only what I need to reply to you and to do the work you ask for."],
      bullets: [
        "Contact details you give me: your name, email address, phone number and business name.",
        "What you tell me about your project when you book a call, fill in a form, email me or text me.",
        "Booking details, such as the time you pick for a call.",
        "Records of our messages, including texts and emails.",
        "Basic technical data that any web server receives, such as your IP address, browser type and the pages you open.",
      ],
    },
    {
      kind: "prose",
      id: "use",
      eyebrow: "3",
      heading: "How I use it",
      paragraphs: [
        "I use your information to run my business with you, and for nothing else.",
        "I do not sell your personal information. I do not use it to build advertising profiles.",
      ],
      bullets: [
        "To reply to your questions and schedule calls.",
        "To send quotes, project updates and invoices.",
        "To send appointment reminders and follow-ups you asked for.",
        "To keep the site secure and fix problems.",
        "To meet legal and tax duties.",
      ],
    },
    {
      kind: "prose",
      id: "sms",
      eyebrow: "4",
      heading: "Text messages (SMS)",
      paragraphs: [
        "If you give me your mobile number and agree to receive texts, I may text you about your inquiry, your appointments and your project. Agreeing to texts is never a condition of buying anything from me.",
        "Message frequency varies with your project. Message and data rates may apply, depending on your phone plan.",
        "You can opt out at any time. Reply STOP to any text, and I will stop texting that number. Reply HELP for help, or contact me using the details at the end of this page.",
        "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging opt-in data and consent are never shared with any third party. The only exception is the service providers that deliver the messages for me, such as my messaging platform and the phone carriers.",
      ],
    },
    {
      kind: "prose",
      id: "sharing",
      eyebrow: "5",
      heading: "Who I share it with",
      paragraphs: [
        "I share information only with service providers that help me run the site and my business. They may use it only to provide their service to me.",
        "I may also share information when the law requires it, or to protect my rights, my clients or the public.",
      ],
      bullets: [
        "Hosting: Vercel serves this website.",
        "Scheduling: Cal.com handles call bookings.",
        "CRM and messaging: GoHighLevel stores contacts and sends texts and emails, through its phone and email carriers.",
      ],
    },
    {
      kind: "prose",
      id: "site",
      eyebrow: "6",
      heading: "Cookies and what this site stores",
      paragraphs: [
        "This site does not use advertising cookies. It saves one small setting in your browser: your light or dark theme choice. That setting never leaves your device.",
        "When you click through to the booking page, you leave this site. That service has its own privacy policy and may set its own cookies.",
        "If I add analytics or other tools later, I will update this policy first and ask for your consent where the law requires it.",
      ],
    },
    {
      kind: "prose",
      id: "retention",
      eyebrow: "7",
      heading: "How long I keep it and how I protect it",
      paragraphs: [
        "I keep your information for as long as I need it for the purposes above, or as long as the law requires. When I no longer need it, I delete it or remove the details that identify you.",
        "I use reputable providers, strong passwords and two-step sign-in to protect your data. No system is perfectly secure, so I cannot promise absolute security.",
        "I am based in Pakistan, and my service providers operate in the United States and other countries. Your information may be processed in those places.",
      ],
    },
    {
      kind: "prose",
      id: "choices",
      eyebrow: "8",
      heading: "Your choices",
      paragraphs: [
        "Depending on where you live, the law may give you more rights over your personal information. I will honor valid requests.",
        "This site is for business owners. It is not directed to children under 13, and I do not knowingly collect their information.",
      ],
      bullets: [
        "Ask me what information I hold about you.",
        "Ask me to correct or delete it.",
        "Reply STOP to end text messages.",
        "Use the unsubscribe link in any marketing email.",
      ],
    },
    {
      kind: "prose",
      id: "contact",
      eyebrow: "9",
      heading: "Changes and contact",
      paragraphs: [
        "I may update this policy as the site or the law changes. The date at the top shows the latest version. Big changes will be clearly marked on this page.",
        [
          "Questions or requests about your data? Reach me through ",
          BOOKING,
          " and mention privacy in your note.",
        ],
      ],
    },
  ],
};

export const terms: PageContent = {
  path: "/terms",
  name: "Terms of Service",
  updated: UPDATED,
  noindex: true,
  meta: {
    title: "Terms of Service for nayabgull.com | Nayab Gull",
    description:
      "The terms for using nayabgull.com and for receiving text messages (SMS) from Nayab Gull, including how to opt out with STOP.",
  },

  hero: {
    eyebrow: "Legal",
    headline: { before: "", highlight: "Terms of Service", after: "" },
    lede: "These terms cover your use of nayabgull.com and the text messages I may send you. Client projects also have their own written agreement.",
    proof: [],
  },

  blocks: [
    {
      kind: "prose",
      id: "about",
      eyebrow: "1",
      heading: "About these terms",
      paragraphs: [
        UPDATED_TEXT,
        'This website is run by Nayab Gull, a full-stack developer based in Lahore, Pakistan ("I", "me", "my"). By using the site, you agree to these terms. If you do not agree, please do not use the site.',
        ["My ", PRIVACY, " explains how I handle your information. It is part of these terms."],
      ],
    },
    {
      kind: "prose",
      id: "services",
      eyebrow: "2",
      heading: "The site and my services",
      paragraphs: [
        "The site describes my services: web development, GoHighLevel setup and AI automation. The content is general information, not professional advice for your exact situation.",
        "A project starts only when we both agree to a written quote or agreement. That document sets the scope, the price, the timeline and who owns what. If it conflicts with these terms, the written agreement wins.",
      ],
    },
    {
      kind: "prose",
      id: "prices",
      eyebrow: "3",
      heading: "Prices and results",
      paragraphs: [
        [
          "Prices on the site, including those on my ",
          { text: "pricing page", href: "/pricing" },
          ", are starting prices in US dollars. They are not offers or fixed quotes. Your price is the one in your written quote.",
        ],
        "Third-party costs are separate. Software subscriptions, hosting, phone minutes and similar fees go to those providers.",
        "I work carefully, but I do not promise specific results. That includes search rankings, lead counts and revenue. Those depend on many things outside my control.",
      ],
    },
    {
      kind: "prose",
      id: "sms",
      eyebrow: "4",
      heading: "Text message (SMS) terms",
      paragraphs: [
        "When you give me your mobile number and agree to receive texts, you join my text messaging program. I use it to send messages about your inquiry, appointment reminders, quotes and project updates.",
        "Consent to receive texts is not a condition of any purchase. Message frequency varies. Message and data rates may apply.",
        "To stop, reply STOP to any message. You will get one final text to confirm, and then no more. To get help, reply HELP or contact me using the details at the end of this page.",
        "Phone carriers are not liable for delayed or undelivered messages. You agree to tell me if you change or give up your mobile number.",
        [
          "I do not share mobile numbers or text messaging consent with third parties for marketing. See the ",
          PRIVACY,
          " for details.",
        ],
      ],
    },
    {
      kind: "prose",
      id: "content",
      eyebrow: "5",
      heading: "Site content and links",
      paragraphs: [
        "I own the text, design and code of this site, unless stated otherwise. You may read and share pages, but please do not copy the content for commercial use without my written permission.",
        "The site links to other websites and tools, such as scheduling and CRM software. I do not control them and am not responsible for their content or their policies.",
      ],
    },
    {
      kind: "prose",
      id: "liability",
      eyebrow: "6",
      heading: "No warranties and limits on liability",
      paragraphs: [
        'I provide the site "as is". I try to keep it accurate and online, but I make no warranties that it will be free of errors or always available.',
        "To the extent the law allows, I am not liable for indirect or consequential losses that come from using the site. Nothing in these terms limits any rights you have that the law does not let me limit.",
      ],
    },
    {
      kind: "prose",
      id: "changes",
      eyebrow: "7",
      heading: "Changes and contact",
      paragraphs: [
        "I may update these terms from time to time. The date at the top shows the latest version. If you keep using the site after a change, the new terms apply.",
        ["Questions about these terms? Reach me through ", BOOKING, "."],
      ],
    },
  ],
};
