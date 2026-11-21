import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /industries/law-firm-website-design (industry page). Primary keyword: "law firm website design".
 * Brief: content/briefs/law-firm-website-design.md. Keywords: docs/seo/keyword-map.md (Industries).
 * Breadcrumb: Home › Industries › this page.
 *
 * TODO(nayab): TIMELINE. The process shows no week counts on purpose. Add the real timeline for each
 * step (and to the "How long does it take?" answer) once you confirm it.
 * TODO(nayab): PRICING. No price is shown on purpose, so there is no `prices` block and no Offer in
 * the Service JSON-LD. Add the approved starting prices as a `prices` block (and to APPROVED_PRICES
 * in tests/unit/pages/pages.test.tsx) when you decide them.
 * TODO(nayab): PROOF. No law firm case study, client name, number or review is approved yet. Replace
 * the "Case study" note in the "proof" section with a real, approved result.
 * TODO(nayab): when /ai-automation-agency/ai-receptionist-for-small-business goes live, point the
 * after-hours section link there instead of the AI automation hub.
 */
export const lawFirmWebsiteDesign: PageContent = {
  path: "/industries/law-firm-website-design",
  name: "Law firm websites",
  parent: { name: "Industries", path: "/industries" },
  updated: "2026-11-19",
  meta: {
    title: "Law Firm Website Design for Attorneys | Nayab Gull",
    description:
      "Law firm website design for small firms: fast pages, intake forms that sort cases and booked consultations, even after hours. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "Website" preselected.
  request: { type: "demo", service: "website" },

  hero: {
    eyebrow: "Law firms",
    headline: {
      before: "",
      highlight: "Law firm website design",
      after: " that books consultation calls",
    },
    lede: "I build fast, clear websites for attorneys and small firms. Each one turns a worried visitor into a booked consult, and the intake follow-up keeps working while you are in court.",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me about your firm and your practice areas. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Why good lawyers still lose new clients online",
      intro:
        "Your legal work is strong. The leaks happen before a client ever meets you, and attorneys tell me the same three things.",
      columns: 3,
      items: [
        {
          title: "“I miss calls while I am in court.”",
          text: "You are in a hearing all morning. A new client calls twice, gets voicemail and hires the next firm on the list.",
        },
        {
          title: "“My website looks like it is from 2012.”",
          text: "It loads slowly on a phone, and the photos look old. People in a legal crisis judge you in seconds.",
        },
        {
          title: "“Leads come in, and nobody calls them back.”",
          text: "Form entries sit in a busy inbox. By the time someone calls back, the person has signed with another firm.",
        },
      ],
    },
    {
      kind: "features",
      id: "features",
      eyebrow: "What I build",
      heading: "What good law firm web design includes",
      intro:
        "A law firm site has one job: to turn the right visitor into a booked consultation. Every part I build serves that job.",
      layout: "cards",
      paragraphs: [
        "Most visitors arrive on a phone, often late at night. So I design the phone view first. These six parts go into almost every attorney website design I make.",
      ],
      items: [
        {
          title: "Practice area pages",
          text: "Family law, personal injury or estate planning each get a page that answers the questions those clients ask first.",
          icon: "target",
        },
        {
          title: "Attorney bios",
          text: "People hire a person, not a logo. Real photos, bar admissions and a short personal note build trust fast.",
          icon: "person",
        },
        {
          title: "A fast mobile site",
          text: "Pages open quickly on weak signal, and the call button stays on screen.",
          icon: "globe",
        },
        {
          title: "Consultation booking",
          text: "Visitors pick an open time on your calendar without a phone call, and they get a reminder text.",
          icon: "calendar",
        },
        {
          title: "Intake forms that sort cases",
          text: "A few short questions show the case type, the state and the urgency. Good-fit cases go to the top.",
          icon: "rules",
        },
        {
          title: "Reviews and trust signals",
          text: "Real Google reviews, bar memberships and awards you actually hold. Nothing invented.",
          icon: "shield",
        },
      ],
      outro:
        "I follow accessibility best practices (WCAG 2.2 AA), so more people can use your site. Your state bar's advertising rules are your call, so you approve every claim before launch.",
    },
    {
      kind: "agent-flow",
      id: "intake-flow",
      eyebrow: "Intake automation",
      heading: "How legal workflow automation turns a lead into a consult",
      intro:
        "The site starts the conversation, and the automation finishes it. Pick a step to follow one new lead.",
      steps: [
        {
          label: "Form or call",
          title: "A new client reaches out",
          text: "A person fills in your website form or calls your office. Both paths feed the same system.",
          example: "Example: a driver hurt in a crash sends your form at 9:40 PM on a Sunday.",
          icon: "phone",
        },
        {
          label: "Intake questions",
          title: "It asks your intake questions",
          text: "The form or a text asks your questions: what happened, when, in which state and who else is involved.",
          example:
            "Example: the crash was last Tuesday in Ohio, and the other driver had insurance.",
          icon: "chat",
        },
        {
          label: "Conflict check",
          title: "Your team gets a conflict check reminder",
          text: "Your staff get the names of every party and a reminder to run a conflict check. They run it in your own software.",
          example: "Example: your paralegal gets a task with both names at 8 AM on Monday.",
          icon: "shield",
        },
        {
          label: "Booked consult",
          title: "The consultation goes on your calendar",
          text: "The person picks an open slot. The case notes and a video link go into the booking, so you walk in prepared.",
          example: "Example: the client books Tuesday at 11 AM and gets a confirmation text.",
          icon: "calendar",
        },
        {
          label: "CRM and texts",
          title: "Your CRM tracks the lead and sends follow-up texts",
          text: "The lead lands in your CRM with every answer attached. Reminder texts go out, and a follow-up checks in if the person goes quiet.",
          example: "Example: a reminder goes out the day before the meeting.",
          icon: "crm",
        },
      ],
      footer:
        "The system only collects facts and books time. It never gives legal advice, and it says so.",
    },
    {
      kind: "features",
      id: "after-hours",
      eyebrow: "After hours",
      heading: "Who answers the phone when your office is closed?",
      intro:
        "Many people look for a lawyer at night or on the weekend, right after something goes wrong. A website alone cannot pick up the phone.",
      layout: "checklist",
      paragraphs: [
        "So I can pair your new site with an AI receptionist: a voice agent that answers calls, follows your script and books the consultation.",
      ],
      example: {
        label: "Example",
        paragraphs: [
          "A woman calls your family law office at 8:15 PM about a custody hearing. The AI receptionist asks four intake questions and books a consult for Thursday.",
          "You get a short text summary and walk into the call ready.",
        ],
      },
      listIntro: "What the AI receptionist can do for your firm:",
      items: [
        { text: "Answer every call after hours, on weekends and while you are in court." },
        { text: "Book consults on your calendar and send a confirmation text." },
        { text: "Pass urgent calls to your cell phone right away." },
        { text: "Tell callers it cannot give legal advice, and mean it." },
      ],
      outro: [
        "Want the full picture first? My ",
        { text: "AI automation services for small businesses", href: "/ai-automation-agency" },
        " page explains how voice agents and follow-up work together.",
      ],
    },
    {
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "My five-step process for website development for law firms",
      intro: "You keep running your cases while I do the work.",
      steps: [
        {
          title: "Free call and site review",
          text: "You tell me about your practice. Then I review your current site.",
        },
        {
          title: "Page plan and intake questions",
          text: "You get the pages, the intake questions and a fixed scope in writing to approve.",
        },
        {
          title: "Design and writing",
          text: "I draft the pages from your notes. You correct anything that does not sound like you.",
        },
        {
          title: "Build and testing",
          text: "I build the site and the follow-up, then test them on real phones.",
        },
        {
          title: "Launch and handover",
          text: "I connect your domain and show your staff how to update pages.",
        },
      ],
    },
    {
      // TODO(nayab): PRICING. Replace this note with a `prices` block once the starting prices are approved.
      kind: "prose",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "How is the price of a lawyer website set?",
      paragraphs: [
        "The price of a lawyer website design depends on three things: how many practice area pages you need, how much writing I do and how much intake automation you want.",
        "A small law firm website design costs much less than a large site with an AI receptionist. You get a fixed quote in writing after the first call.",
        [
          "For the factors that change any website price, see my ",
          { text: "website pricing page", href: "/pricing" },
          ".",
        ],
      ],
    },
    {
      // TODO(nayab): PROOF. Replace the "Case study" note with a real, approved law firm result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire a developer who builds the whole system?",
      layout: "cards",
      paragraphs: [
        "I work as one developer, not a law firm website design agency, so you talk to the person who builds your site. As a full-stack developer, I build the form, the inbox rules and the calendar link too. Over five years, I have delivered 400+ projects.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved law firm case study to show yet, and I will not invent one. Ask for a free demo instead, and judge the intake flow on your own practice area.",
        ],
      },
      outro: [
        "You can read ",
        { text: "more about me and how I work", href: "/about" },
        " before you book a call.",
      ],
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "Services that pair well with your new site",
      items: [
        {
          label: "My web design and development service",
          href: "/services/web-design-development",
          text: "The full build process, the tech and what every site includes.",
        },
        {
          label: "AI automation for small businesses",
          href: "/ai-automation-agency",
          text: "Voice agents, follow-up and the automation behind your intake.",
        },
        {
          label: "Roofing and HVAC website design",
          href: "/industries/roofing-hvac-website-design",
          text: "See how the same approach works for a very different trade.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions attorneys ask before they hire me",
    items: [
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a CRM.\n\nI build everything inside those accounts: the website, the intake flows and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
      {
        question: "How long does it take to build a law firm website?",
        answer:
          "It depends on the number of pages and the intake automation you choose. You get a written timeline with your quote, before any work starts.",
      },
      {
        question: "Can you redesign my current site?",
        answer:
          "Yes. I keep the pages that bring visitors and redirect old addresses to the new ones. Your domain and email stay the same.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "Yes. Your staff can change text or add an attorney bio without any code. At handover, I show you how on a short video call.",
      },
      {
        question: "How do you handle confidential client information?",
        answer:
          "The form asks only what you need to book a consult, and it tells visitors not to send private case details.\n\nEntries go to accounts in your name, and only people you choose can see them. Your confidentiality duties stay your call, and I set things up the way you decide.",
      },
      {
        question: "Do you give legal advice or write legal claims for my site?",
        answer:
          "No. I build the site and the intake system, and you review every word before launch.",
      },
    ],
  },

  closing: {
    heading: "Ready for a site that books consultations while you work?",
    text: "Start with a free demo. Tell me your practice areas, and I will show you how the site and the intake flow would work for your firm.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "Law firm website design",
    serviceType: "Law firm website design",
    description:
      "Websites for US law firms and attorneys: practice area pages, attorney bios, consultation booking, intake forms and after-hours follow-up.",
  },
};
