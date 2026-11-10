import { STRATEGY_CALL_URL } from "../home.ts";

import type { PageContent } from "./types.ts";

const CTA = { label: "Book a free strategy call", href: STRATEGY_CALL_URL };

/**
 * /gohighlevel-agency (hub). Primary keyword: "gohighlevel agency".
 * TODO(nayab): confirm the timelines in "process" and every FAQ answer; they describe how you work.
 * TODO(nayab): the child pages (workflows, API, custom CRM) are not built yet, so this hub cannot
 * link down to them. Add the links here when those pages ship (seo.md §4 and §10).
 */
export const gohighlevelAgency: PageContent = {
  path: "/gohighlevel-agency",
  name: "GoHighLevel agency",
  updated: "2026-11-10",
  meta: {
    title: "GoHighLevel Agency: Setup and Automation | Nayab Gull",
    description:
      "A one-person GoHighLevel agency for US businesses: CRM setup, pipelines, texts and AI follow-up. Setup starts at $750. Book a free strategy call.",
  },

  hero: {
    eyebrow: "GoHighLevel",
    headline: {
      before: "A ",
      highlight: "GoHighLevel agency",
      after: " that sets up your CRM and answers every lead",
    },
    lede: "I build your pipelines, texts, emails, calendars and AI follow-up inside your own account. You work with one person who knows the platform, not a ticket queue.",
    proof: ["5+ years", "400+ projects delivered", "Setup starts at $750"],
    primaryCta: CTA,
    secondaryCta: { label: "See what I set up", href: "#setup" },
  },

  flow: {
    label: "Inside your CRM",
    caption: "What a missed call looks like after setup",
    steps: [
      { title: "Missed call", detail: "A customer rings while you are on a job." },
      { title: "Text-back sent", detail: "Your number texts them within seconds." },
      { title: "Lead in the pipeline", detail: "The contact lands under New Lead." },
      { title: "Appointment booked", detail: "They pick a time on your calendar." },
    ],
    footer: "It runs while you work.",
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Why most accounts never pay for themselves",
      intro:
        "GoHighLevel can do a lot. That is also why so many owners get stuck. These are the three problems I hear on almost every first call.",
      columns: 3,
      items: [
        {
          title: "Leads wait hours for a reply",
          text: "A quote form comes in at 7 PM. Nobody sees it until the next morning. By then, the lead has called the next company on the list.",
        },
        {
          title: "The account is half built",
          text: "You signed up, watched a few videos and made one pipeline. The workflows, texts and calendars never got done, and you still pay for the plan each month.",
        },
        {
          title: "Your texts do not go out",
          text: "Messages fail or land as spam. Most of the time, nobody registered the business number with the phone carriers, so they block it.",
        },
      ],
    },
    {
      kind: "prose",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What does a GoHighLevel expert do for you?",
      paragraphs: [
        "A GoHighLevel expert turns an empty account into a working sales system. GoHighLevel, or GHL for short, is a CRM and marketing automation platform. A CRM is the tool that stores your contacts and tracks every deal.",
        "The platform puts your leads, texts, emails, calendars, forms and reviews in one place. That only helps when someone sets it up around how your business sells. My job is that setup.",
        "As a small GoHighLevel agency, I map your sales steps first. Then I build each part, test it with real phone numbers and show your team how to use it. You do not need to learn the software to see results from it.",
      ],
      bullets: [
        "Every new lead gets a reply in seconds, by text and email.",
        "Your team sees each deal and its stage on one board.",
        "Reminders cut no-shows without anyone making phone calls.",
        "You keep the account, the data and every login.",
      ],
    },
    {
      kind: "cards",
      id: "setup",
      eyebrow: "What I set up",
      heading: "CRM automation services inside your account",
      intro:
        "Each build is different, but most include the six parts below. You can start with one and add the rest later.",
      columns: 3,
      items: [
        {
          title: "Account and sub-account",
          text: "A sub-account is one business's own space on the platform. I set up yours with your users, your phone number, your domain and email sending that reaches the inbox.",
        },
        {
          title: "Pipelines",
          text: "A pipeline is a board that shows each lead's stage, such as New, Quoted and Won. I build stages that match the way you sell, so nothing gets lost.",
        },
        {
          title: "Workflows",
          text: "A workflow is a list of steps that run on their own. One new form can send a text, send an email and give your team a task.",
        },
        {
          title: "A2P 10DLC registration",
          text: "A2P 10DLC is the sign-up US carriers require before a business can text from a local 10-digit number. I prepare your brand and campaign details and submit them.",
        },
        {
          title: "Calendar booking",
          text: "Leads pick a time that works for both of you. The calendar sends reminders by SMS and email, and it syncs with Google or Outlook.",
        },
        {
          title: "AI voice agent and chat",
          text: "An AI voice agent answers calls or phones new leads, asks your questions and books the visit. I build it with the platform's own AI tools or with Vapi.",
          link: { label: "AI automation agency services", href: "/ai-automation-agency" },
        },
      ],
    },
    {
      kind: "prose",
      id: "who-it-fits",
      eyebrow: "Is it right for you?",
      heading: "When does it make sense to bring in help?",
      paragraphs: [
        "It makes sense when your time is worth more than the setup fee. Most owners can learn the platform. Few have 40 free hours to do it, and mistakes in texting rules or email setup cost real leads.",
        "Owners usually hire GoHighLevel expert help in three cases. They are new and want it done right the first time. They have a messy account that needs a cleanup. Or they are moving from another CRM, such as HubSpot, and want their contacts to arrive safely.",
        "If you only need a contact list and a calendar, you may not need me at all. I will tell you that on the call. The setup pays off when you get steady leads and need fast follow-up.",
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "How a setup runs, start to finish",
      intro:
        "The work follows four steps. You approve the plan before I build, and you test everything before it goes live.",
      steps: [
        {
          title: "Map your sales steps",
          when: "Day 1",
          text: "On a free call, we list how leads reach you today and where they drop off. I note your tools, your team and your goals.",
        },
        {
          title: "Written plan and price",
          when: "Within 3 days",
          text: "You get a short plan: the pipelines, the workflows, the messages and the cost. I start when you approve it.",
        },
        {
          title: "Build and test",
          when: "1 to 2 weeks",
          text: "I build inside your account and send test leads through every step. Carrier approval for texting runs in the background.",
        },
        {
          title: "Handover and training",
          when: "Launch week",
          text: "Your team gets a recorded walkthrough and a one-page guide. I stay close for the first weeks and fix what real leads reveal.",
        },
      ],
    },
    {
      kind: "prose",
      id: "proof",
      eyebrow: "Proof",
      heading: "What I can show you today",
      paragraphs: [
        "I have built websites, CRMs and automations for more than five years, across 400+ projects. My clients are in the US, the UK and beyond. Most found me on Upwork, on Fiverr or through a referral.",
        [
          "I do not post client numbers without permission, so you will not find made-up stats here. One build you can open right now is ",
          { text: "SmartQuoteDesk, my own lead marketplace", href: "https://smartquotedesk.com" },
          ". It runs on the same ideas I bring to client accounts: capture the lead, route it fast and follow up.",
        ],
        "On the strategy call, ask me about past builds like yours. You will hear what worked, what did not and what I would do first in your account.",
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What a GoHighLevel setup costs",
      intro:
        "You get a fixed, written quote before any work starts. These starting prices show what to expect.",
      items: [
        {
          name: "GoHighLevel setup",
          from: 750,
          label: "Starts at $750.",
          text: "A working account for one business. You pay your GoHighLevel subscription to them directly.",
          includes: [
            "Sub-account, users and phone number.",
            "One pipeline with your stages.",
            "Core follow-up workflows.",
            "A2P 10DLC registration.",
          ],
        },
        {
          name: "AI voice receptionist",
          from: 750,
          label: "Starts at $750 for setup, plus $149 per month.",
          text: "An AI agent that answers calls and books visits. You pay for the call minutes you use.",
          includes: [
            "Call script based on your questions.",
            "Calendar booking on the call.",
            "Call notes saved to the contact.",
            "Monthly tuning and fixes.",
          ],
        },
        {
          name: "Full system",
          from: 2500,
          label: "Starts at $2,500.",
          text: "A website, GoHighLevel and AI that work as one lead system.",
          includes: [
            "Business website with lead forms.",
            "Full CRM setup and workflows.",
            "AI follow-up for new leads.",
            "Launch support and training.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. Your price depends on the scope we agree on in writing. Software subscriptions and usage fees go to the provider, not to me.",
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "Where this setup fits",
      items: [
        {
          label: "AI receptionists and chatbots",
          href: "/ai-automation-agency",
          text: "AI that answers calls and chats, then saves the notes to your CRM.",
        },
        {
          label: "Websites for roofing and HVAC companies",
          href: "/industries/roofing-hvac-website-design",
          text: "A fast site with a photo quote form that feeds your pipeline.",
        },
        {
          label: "Website design and development",
          href: "/services/web-design-development",
          text: "A new site that sends every form into your CRM from day one.",
        },
        {
          label: "Pricing for every service",
          href: "/pricing",
          text: "All five starting prices on one page, with what each includes.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions about hiring a GoHighLevel agency",
    items: [
      {
        question: "How much does GoHighLevel setup cost?",
        answer:
          "My setup starts at $750 for one business. That covers the account, one pipeline, core workflows and texting registration.\n\nBigger builds cost more. Extra pipelines, complex workflows, custom forms and AI agents add time. You always see a written price before I start.",
      },
      {
        question: "Do I pay for the GoHighLevel subscription myself?",
        answer:
          "Yes. You pay GoHighLevel directly, and the account stays in your name. My fee covers the setup work only.\n\nThis keeps you in control. If we stop working together, nothing changes in your account, and you lose no data.",
      },
      {
        question: "How long does a setup take?",
        answer:
          "A standard setup takes about one to two weeks once I have your logins and content. Larger builds take longer, and your quote lists the timeline.\n\nTexting approval is the part I cannot speed up. Carriers review each registration on their own schedule, so I submit yours early.",
      },
      {
        question: "What is A2P 10DLC, and do I need it?",
        answer:
          "A2P 10DLC is the system US carriers use to approve business texting from local 10-digit numbers. If you text customers in the US from your CRM, you need it.\n\nWithout it, carriers can block your messages. I handle the forms, the sample messages and the opt-in wording your site needs.",
      },
      {
        question: "Can you fix an account that someone else started?",
        answer:
          "Yes. Cleanup jobs are common. I review your pipelines, workflows, phone setup and email sending first.\n\nThen you get a short list of what to keep, what to fix and what to remove. Often a cleanup costs less than a fresh build.",
      },
      {
        question: "Can you move me from HubSpot or another CRM?",
        answer:
          "Yes. I export your contacts, deals and notes, then map each field to its new home. Your tags and pipeline stages come across too.\n\nBefore the switch, I run a test import and check it with you. Your team keeps working in the old CRM until the new one is ready.",
      },
      {
        question: "Will my team be able to run it without you?",
        answer:
          "Yes. That is the goal. Each build ends with a recorded walkthrough and a short written guide for your team.\n\nDaily tasks stay simple: reply to chats, move deals and check the calendar. If you want changes later, you can make them yourself or ask me.",
      },
      {
        question: "Does it work with my current website?",
        answer:
          "In most cases, yes. Your current forms can send leads into the CRM, and a chat widget or booking calendar can sit on any page.\n\nIf your site is slow or hard to edit, a rebuild may serve you better. I can do both and connect them from day one.",
      },
    ],
  },

  finalCta: {
    heading: "Want your account set up the right way?",
    text: "Book a free strategy call. We look at how your leads come in today, and you leave with a clear setup plan.",
    cta: CTA,
    note: "The call is free, and the plan is yours to keep.",
  },

  service: {
    name: "GoHighLevel setup and automation",
    serviceType: "GoHighLevel agency services",
    description:
      "GoHighLevel account setup for US businesses: pipelines, workflows, A2P 10DLC registration, calendar booking and AI voice agents.",
  },
};
