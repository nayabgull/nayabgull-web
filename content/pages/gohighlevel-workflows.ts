import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /gohighlevel-agency/workflows-automation (service page under the GoHighLevel hub).
 * Primary keyword: "gohighlevel workflows". Secondary: "crm automation", "automated crm system"
 * (docs/seo/keyword-map.md). Brief: content/briefs/gohighlevel-workflows.md.
 * One topic only: the workflows Nayab builds in GoHighLevel and what each one does for the business.
 *
 * TODO(nayab): TIMELINE. The four process steps have no timelines yet. Add a time per step once
 * you confirm them (the hub says "1 to 2 weeks" for a full setup).
 * TODO(nayab): PRICING. No price is shown on purpose, and the Service JSON-LD has no Offer. When you
 * set a starting price, add a `prices` block (it also adds the Offer) and update the page tests.
 * TODO(nayab): PROOF. No GoHighLevel workflow case study is approved yet (see the "proof" section).
 */
export const gohighlevelWorkflows: PageContent = {
  path: "/gohighlevel-agency/workflows-automation",
  name: "GoHighLevel workflows",
  parent: { name: "GoHighLevel agency", path: "/gohighlevel-agency" },
  updated: "2026-11-19",
  meta: {
    title: "GoHighLevel Workflows Built for Your Business | Nayab Gull",
    description:
      "GoHighLevel workflows that text new leads in 60 seconds, remind clients, ask for reviews and wake up old leads, built in your account. Get a free demo.",
  },

  // Both forms on this page ask for a demo, with "GoHighLevel" preselected.
  request: { type: "demo", service: "gohighlevel" },

  hero: {
    eyebrow: "GoHighLevel workflows",
    headline: { before: "", highlight: "GoHighLevel Workflows", after: " That Follow Up for You" },
    lede: "I build GoHighLevel workflows that reply to new leads, remind clients, ask for reviews and bring old leads back. They run inside your own account, day and night.",
    body: [
      "You already pay for the software. My job is to make it do the follow-up your team has no time for, with texts and emails that sound like you.",
    ],
    callout: "Want to see one run on your own leads?",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me which workflow you want first. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "explainer",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What are GoHighLevel workflows?",
      paragraphs: [
        "A GoHighLevel workflow is a set of steps that runs on its own. Something happens, the workflow acts, and you get a result.",
        "Each workflow has three parts. The trigger is the event that starts it, such as a new form, a missed call or a booking. The actions are the steps that follow: send a text, wait a day, move a deal or alert your team.",
        "Last comes the result you want, like a booked call or a new review. You set it up once, and it works on every lead, at 2 PM or 2 AM.",
      ],
      diagramLabel:
        "How a GoHighLevel workflow works: a trigger starts it, the actions run in order, and you get a result.",
      diagram: [
        { label: "Trigger", caption: "A new lead fills out your form", icon: "flow" },
        { label: "Actions", caption: "A text, an email and a task for your team", icon: "chat" },
        { label: "Result", caption: "The lead books a call", icon: "check" },
      ],
      notes: [
        {
          text: "Wait steps add a pause, such as one day before a second text. If/else steps send people down different paths based on their answers.",
          icon: "rules",
        },
        {
          text: "Workflows read and update your contact records: tags, custom fields and pipeline stages. Your CRM stays current without typing.",
          icon: "crm",
        },
        {
          text: "A workflow can also send data to other apps through webhooks. That is how it talks to tools outside GoHighLevel.",
          icon: "plug",
        },
      ],
      callout: "Good workflows feel personal to the customer and invisible to you.",
    },
    {
      kind: "features",
      id: "workflows",
      eyebrow: "What I build",
      heading: "The CRM automation I build first",
      intro:
        "These six workflows cover the moments where most small businesses lose money. You can start with one and add the rest later.",
      layout: "cards",
      items: [
        {
          title: "Speed-to-lead text in 60 seconds",
          text: "A new lead fills out your form or ad. Within 60 seconds, they get a text with their name and a link to book. Your team gets an alert at the same time, so the fastest reply is yours.",
          icon: "spark",
        },
        {
          title: "Missed-call text back",
          text: "You miss a call while you are on a job. The workflow texts the caller right away and asks how you can help. Their reply lands in your inbox, so the lead stays warm until you call back.",
          icon: "phone",
        },
        {
          title: "Appointment reminders",
          text: "Once someone books, they get a confirmation, a reminder the day before and one an hour before. Each text has a link to reschedule. Fewer people forget, and you stop making reminder calls.",
          icon: "calendar",
        },
        {
          title: "Review requests",
          text: "When a job is done, the customer gets a direct link to your Google review page. One polite reminder follows if they do not leave one. Every customer gets the same ask, because Google does not allow you to filter out unhappy ones.",
          icon: "check",
        },
        {
          title: "Pipeline stage updates",
          text: "Deals move on their own. A booked call moves the lead to Booked, and a signed quote moves it to Won. Your board stays correct without anyone dragging cards.",
          icon: "crm",
        },
        {
          title: "Reactivation of old leads",
          text: "You have old leads who never bought. This workflow sends them a short, friendly text or email with a reason to reply now. Anyone who answers goes back into your pipeline as a fresh lead.",
          icon: "mail",
        },
      ],
      outro: [
        "Together, these six turn GoHighLevel into an automated CRM system. For replies that need judgment, I add an ",
        {
          text: "AI agent that works with your CRM",
          href: "/ai-automation-agency/ai-agent-development",
        },
        ".",
      ],
    },
    {
      kind: "prose",
      id: "a2p-10dlc",
      eyebrow: "Texting rules",
      heading: "What is A2P 10DLC, and why does it matter?",
      paragraphs: [
        "A2P 10DLC is the registration US phone carriers require before a business can send texts from a regular 10-digit number. Without it, carriers block or filter your messages, so your workflows send texts that never arrive. I register your brand and campaign, write the sample messages and add the opt-in wording your forms need. Carriers set their own review time, so I submit it on day one.",
      ],
    },
    {
      kind: "compare",
      id: "mistakes",
      eyebrow: "Account cleanup",
      heading: "Mistakes I fix in existing GoHighLevel accounts",
      intro:
        "Many accounts I see already have workflows. They just do not work the way the owner thinks. Here are the problems I find most often.",
      rowLabel: "Mistake",
      columns: ["What goes wrong", "How I fix it"],
      rows: [
        {
          label: "Two workflows fire at once",
          cells: [
            "A new lead gets the same text twice, from two workflows.",
            "I merge them into one clear workflow with one trigger.",
          ],
        },
        {
          label: "No stop rule",
          cells: [
            "Leads keep getting follow-ups after they reply or book.",
            "I add goal steps that end the sequence once the lead answers.",
          ],
        },
        {
          label: "Unregistered number",
          cells: [
            "Texts fail without a warning, because the number has no carrier approval.",
            "I register the number and test every message on a real phone.",
          ],
        },
        {
          label: "Dead triggers",
          cells: [
            "Workflows still point at forms or calendars you deleted.",
            "I remove what is dead and rebuild the ones you still need.",
          ],
        },
        {
          label: "No alerts for your team",
          cells: [
            "Hot leads sit in the CRM, and nobody on your staff knows.",
            "I send a text or email alert to the right person.",
          ],
        },
        {
          label: "Wrong time zone",
          cells: [
            "Texts go out at 3 AM, because the account uses the wrong time zone.",
            "I set your time zone and quiet hours for every message.",
          ],
        },
      ],
    },
    {
      // TODO(nayab): TIMELINE. Add the time each step takes once you confirm it.
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "How I build your workflows",
      intro: "Four steps, and you approve the plan before anything goes live.",
      steps: [
        {
          title: "Free call and audit",
          text: "On a free call, I learn how leads reach you and where they slip away. If you already have an account, I look inside it too.",
        },
        {
          title: "Written plan",
          text: "You get a short plan that lists each workflow, its trigger and its messages. Then you read the texts, written in your voice, and approve them.",
        },
        {
          title: "Build and test",
          text: "Next, I build the workflows in your account. Test leads go through every path on real phones, so I catch mistakes before your customers do.",
        },
        {
          title: "Launch and handover",
          text: "At launch, I turn the workflows on and watch the first real leads. You get a recorded walkthrough that shows how each one works and how to pause it.",
        },
      ],
    },
    {
      // TODO(nayab): PRICING. No numbers until you approve a starting price.
      kind: "prose",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What do GoHighLevel workflows cost?",
      paragraphs: [
        "The price depends on how many workflows you need and how many paths each one has. A single missed-call text back is a small job. A full set with reminders, reviews and reactivation takes more time.",
        "You get a fixed, written quote after the free call, before any work starts. Your GoHighLevel plan and texting fees go to GoHighLevel, not to me.",
      ],
    },
    {
      // TODO(nayab): PROOF. Replace the "Case study" card with a real, approved workflow result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why trust me with your account?",
      layout: "cards",
      paragraphs: [
        "I have built websites, CRMs and automations for more than five years, across 400+ projects. My clients are in the US, the UK and beyond.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved GoHighLevel workflow case study to show here yet, and I will not invent one. Ask for a free demo instead, and watch a workflow run on your own use case.",
        ],
      },
      outro: [
        "See everything else I set up on my ",
        { text: "GoHighLevel agency page", href: "/gohighlevel-agency" },
        ", or read ",
        { text: "more about me and how I work", href: "/about" },
        ".",
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions about GoHighLevel workflows",
    items: [
      {
        question: "Do I need a GoHighLevel account first?",
        answer:
          "It helps, but it is not required. If you do not have one yet, you sign up in your own name, and I set it up from there. With an existing account, I build inside it.",
      },
      {
        question: "How many workflows does a small business need?",
        answer:
          "Most start with three: speed-to-lead, missed-call text back and appointment reminders. Those catch the leads you lose today.\n\nReview requests and reactivation come next, once the basics run well.",
      },
      {
        question: "Can you fix the workflows I already have?",
        answer:
          "Yes. I review every active workflow, its trigger and its messages. Then you get a short list of what to keep, what to fix and what to turn off.",
      },
      {
        question: "Will automated texts feel like spam to my customers?",
        answer:
          "Not when they are short, personal and sent at the right time. I write each message in your voice, use the customer's first name and respect quiet hours.\n\nEvery text includes a way to opt out, as US texting rules require.",
      },
      {
        question: "Can GoHighLevel workflows use AI?",
        answer:
          "Yes. GoHighLevel has its own AI for chat and calls, and a workflow can hand a conversation to it. For bigger jobs, I build a custom AI agent that sends its results back into your CRM.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as GoHighLevel, a phone number or a CRM. I build everything inside those accounts: the workflows, the code and the full setup.\n\nAt launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
    ],
  },

  closing: {
    heading: "Want your follow-up to run on its own?",
    text: "Pick the one workflow that would save you the most time this week. Tell me about your account and your leads, and I will show you how it would work in a free demo.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "GoHighLevel workflows for small businesses",
    serviceType: "GoHighLevel workflows",
    description:
      "GoHighLevel workflows for US small businesses: speed-to-lead texts, missed-call text back, appointment reminders, review requests, pipeline updates and old-lead reactivation.",
  },
};
