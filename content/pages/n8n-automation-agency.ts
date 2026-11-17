import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /ai-automation-agency/n8n-automation-agency (service page under the AI automation hub).
 * Primary keyword: "n8n automation agency". Keywords approved by Nayab on 2026-11-17.
 * Brief: content/briefs/n8n-automation-agency.md.
 *
 * TODO(nayab): PRICING. No price is shown on purpose. When you set one, add a `prices` block after
 * the "pricing" section (it also adds the Offer to the Service JSON-LD) and update the page tests.
 * TODO(nayab): CASE STUDY. No n8n case study is approved yet. When a client approves one, put the
 * real result in the "proof" section. Never invent results, clients or numbers.
 * TODO(nayab): confirm the FAQ answers on ownership and time zone, the timelines in "process" and
 * in the FAQ, and what the free demo includes.
 */
export const n8nAutomationAgency: PageContent = {
  path: "/ai-automation-agency/n8n-automation-agency",
  name: "n8n automation agency",
  parent: { name: "AI automation agency", path: "/ai-automation-agency" },
  updated: "2026-11-17",
  meta: {
    title: "n8n Automation Agency for Small Business | Nayab Gull",
    description:
      "A small n8n automation agency for US businesses. I build workflows that move leads, invoices and emails for you, with no copy and paste. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "AI automation" preselected.
  request: { type: "demo", service: "ai-automation" },

  hero: {
    eyebrow: "n8n automation",
    headline: {
      before: "An ",
      highlight: "n8n automation agency",
      after: " that takes the busywork off your desk",
    },
    lede: "I build n8n workflows that move leads, invoices and emails between your apps. You stop copying data by hand, and nothing slips through the cracks.",
    proof: ["5+ years", "400+ projects delivered", "Free custom demo"],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me one task you repeat each week. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "prose",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What is n8n automation, and why do businesses use it?",
      paragraphs: [
        "n8n is a tool that links your apps and runs tasks for you. You build a workflow, which is a set of steps that runs by itself. A new form entry comes in, and n8n does the rest.",
        "Each step is a box on a screen. One box reads the form, the next adds the lead to your CRM, and a third sends a text. You see the whole flow at a glance.",
        "Owners pick n8n for three reasons. It can run on your own server, so your data stays with you. It handles big volumes without a big bill. And when a step needs custom logic, I can add a bit of code.",
        "As your n8n automation agency, I plan the flow, build it, test it and watch it after launch. You get the hours back.",
      ],
    },
    {
      kind: "compare",
      id: "compare",
      eyebrow: "Compare",
      heading: "n8n vs Make vs Zapier: a fair, short comparison",
      intro:
        "All three tools are good. They differ in cost, control and how easy they are to learn. Here is the plain version.",
      rowLabel: "Question",
      columns: ["n8n", "Make", "Zapier"],
      rows: [
        {
          label: "Cost",
          cells: [
            "Free to self-host, so you pay only for the server. The cloud plan is paid.",
            "Free plan to start. Paid plans grow with the steps you run.",
            "Free plan to start. Paid plans grow with tasks, so high volume costs the most.",
          ],
        },
        {
          label: "Self-hosting",
          cells: [
            "Yes, on your own server or in n8n Cloud.",
            "No. Make runs only in its own cloud.",
            "No. Zapier runs only in its own cloud.",
          ],
        },
        {
          label: "Flexibility",
          cells: [
            "Very high. Steps can run code, call any API and use AI models.",
            "High, with visual branches and strong data tools.",
            "Good for simple flows, with the most ready-made app links.",
          ],
        },
        {
          label: "Ease of use",
          cells: [
            "Takes the most time to learn.",
            "Easy once the visual map feels familiar.",
            "The easiest of the three to start with.",
          ],
        },
      ],
      note: "None of these is the best tool for every job. The right pick depends on your apps, your volume and who will look after the flows.",
    },
    {
      kind: "cards",
      id: "builds",
      eyebrow: "What I build",
      heading: "n8n automation services: five workflows I build often",
      intro: "Each one replaces a task someone on your team does by hand today.",
      columns: 3,
      items: [
        {
          title: "Lead form to CRM to text",
          text: "A visitor fills your web form. n8n adds the lead to your CRM, tags the job type and texts the lead within a minute. You get a ping with the details.",
        },
        {
          title: "Invoice to accounting",
          text: "An invoice lands in your inbox as a PDF. n8n reads the amount, the vendor and the due date. Then it creates the bill in QuickBooks or Xero and files the PDF.",
        },
        {
          title: "AI that sorts your email",
          text: "An AI step reads each new email and labels it: sales, support, billing or spam. Hot sales leads go to your phone. The rest wait in the right folder.",
        },
        {
          title: "Booked call to follow-up",
          text: "Someone books a call on your calendar. n8n sends a reminder the day before and a short form after the call. No-shows get a friendly link to book again.",
        },
        {
          title: "Weekly report in your inbox",
          text: "Every Monday, n8n pulls new leads, booked jobs and paid invoices from your apps into one short email.",
        },
      ],
    },
    {
      kind: "prose",
      id: "which-tool",
      eyebrow: "Which tool?",
      heading: "When should you choose n8n, Make or Zapier?",
      paragraphs: [
        "Pick the tool that fits the job and the person who will run it. I work with all three. Unlike an n8n agency that sells only n8n, I have no reason to push one.",
        "Choose n8n when you run many tasks a month, need your data on your own server or want custom logic and AI steps. It costs less as you grow.",
        "Choose Make when your flows have many branches and you want a clear visual map. I also work as a Make.com expert, so Make.com automation fits in well when your team already uses it.",
        "Choose Zapier when the flow is short and your team wants to edit it alone. For Zapier workflow automation, I build the Zaps and show your team how to change them. Want to hire a Zapier expert or a Zapier automation agency? That work is part of what I do.",
      ],
      bullets: [
        "Already on Zapier or Make? I can fix or extend what you have.",
        "Bills too high on Zapier? I can move busy flows to n8n.",
        "Not sure? I map the task first, then suggest one tool.",
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "How I build your n8n workflows",
      intro: "Four short steps. You see the workflow run on your own data before it goes live.",
      steps: [
        {
          title: "Free demo",
          when: "Day 1",
          text: "You show me one task you repeat. I show you how a workflow would handle it, and you decide if it is worth it.",
        },
        {
          title: "Map the steps",
          when: "Week 1",
          text: "I write down each step, each app and each rule. You check the map, and I fix anything that does not match your day.",
        },
        {
          title: "Build and test",
          when: "Weeks 1 to 2",
          text: "I build the workflow in your account. Then I run real past cases through it and fix every step that fails.",
        },
        {
          title: "Launch and watch",
          when: "First month",
          text: "The workflow goes live. I set alerts for errors and check the logs with you in the first weeks.",
        },
      ],
    },
    {
      // TODO(nayab): PRICING. Words only until you set a price (see the note at the top of this file).
      kind: "prose",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does an n8n workflow cost?",
      paragraphs: [
        "Each project gets a written quote after the demo. A short flow with two apps costs far less than a system with ten.",
        "The tool has its own cost too. Self-hosted n8n needs a small server. The cloud plans of n8n, Make and Zapier bill you directly. I estimate that bill from your real volume before you decide.",
        [
          "My other services have set starting prices. You can see them on the ",
          { text: "website and CRM pricing page", href: "/pricing" },
          ".",
        ],
      ],
    },
    {
      // TODO(nayab): CASE STUDY. Replace the last paragraph with a real, approved n8n result.
      kind: "prose",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire an n8n expert who is also a developer?",
      paragraphs: [
        "Most workflows break at the edges, where one app hands data to the next. I am a full-stack developer, so I can fix those edges with code when a ready-made step falls short.",
        [
          "Over five years, I have delivered 400+ projects for clients in the US, the UK and beyond. When you hire an n8n expert from my agency, you work with me, not a hand-off team. For bigger builds, I also take work as a ",
          { text: "hired full stack developer", href: "/hire-full-stack-developer" },
          ".",
        ],
        "I have no approved n8n case study to share yet, and I will not invent one. Ask for a free demo instead, and judge the workflow on your own task.",
      ],
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "Where n8n fits with the rest of your system",
      items: [
        {
          label: "AI automation agency",
          href: "/ai-automation-agency",
          text: "The full picture: voice agents, chatbots and workflows that work as one.",
        },
        {
          label: "AI agent development services",
          href: "/ai-automation-agency/ai-agent-development",
          text: "When a step needs judgment, an AI agent can take it over inside your flow.",
        },
        {
          label: "GoHighLevel CRM setup",
          href: "/gohighlevel-agency",
          text: "A CRM gives your workflows a home for contacts, texts and pipelines.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions owners ask an n8n consultant",
    items: [
      {
        question: "How much does n8n automation cost?",
        answer:
          "It depends on how many apps and steps the job has. You get a written quote after the free demo, so you know the price before any work starts.\n\nYou also pay for the tool itself: a small server for self-hosted n8n, or a cloud plan from n8n, Make or Zapier.",
      },
      {
        question: "How long does it take to build a workflow?",
        answer:
          "A simple workflow with two or three apps often goes live in one to two weeks. Bigger systems take longer.\n\nYour quote includes a timeline. Quick answers to my questions keep the build moving.",
      },
      {
        question: "Should I self-host n8n or use n8n Cloud?",
        answer:
          "Self-host when you want your data on your own server or you run a lot of tasks. It costs less at high volume, but someone has to keep the server updated.\n\nPick n8n Cloud when you want zero upkeep. I can set up either one and explain the trade-off for your case.",
      },
      {
        // TODO(nayab): confirm this ownership answer.
        question: "Who owns the workflows?",
        answer:
          "You do. I build in an account in your name, and you keep the logins. Each workflow is yours to change, copy or move.\n\nAt the end, you get a short guide to what each flow does. If you move to another n8n developer, they can pick it up from there.",
      },
      {
        question: "What support do I get after launch?",
        answer:
          "I watch the workflows closely in the first month and fix anything that fails. Error alerts tell me right away when an app changes.\n\nAfter that, you can message me for fixes or new flows. If you prefer, I offer ongoing care as well.",
      },
      {
        // TODO(nayab): confirm this time-zone answer.
        question: "I am in the US. How does the time zone work?",
        answer:
          "I overlap with US business hours for calls, and I reply to messages within one business day. You pick a call time that suits your time zone.\n\nThe workflows themselves run around the clock, so they keep working while you sleep.",
      },
    ],
  },

  closing: {
    heading: "Want to see n8n handle one of your tasks?",
    text: "Send the short form and name one task you repeat each week. I will reply with a demo plan built around it.",
    form: {
      heading: "Request your custom demo",
      text: "No pressure and no obligation.",
    },
  },

  service: {
    name: "n8n automation for small businesses",
    serviceType: "n8n automation agency services",
    description:
      "n8n, Make and Zapier workflows for US small businesses: lead routing, invoice processing, AI email sorting, follow-ups and reports, self-hosted or in the cloud.",
  },
};
