import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /gohighlevel-agency/api-integrations (service page under the GoHighLevel hub).
 * Primary keyword: "gohighlevel api". Secondary: "crm integration", "webhook automation"
 * (docs/seo/keyword-map.md). Brief: content/briefs/gohighlevel-api-integrations.md.
 * One topic only: connecting GoHighLevel to the other tools a business uses, and what that saves.
 *
 * TODO(nayab): TIMELINE. Add how long each process step takes (the "process" stepper), once
 * confirmed. No timeline is shown until then.
 * TODO(nayab): PRICING. No price is shown on purpose. Decide the starting price, then replace the
 * "pricing" section with a `prices` block (it also adds the Offer to the Service JSON-LD) and add
 * the amount to APPROVED_PRICES in tests/unit/pages/pages.test.tsx.
 * TODO(nayab): PROOF. No GoHighLevel integration case study is approved yet (see "proof").
 */
export const gohighlevelApiIntegrations: PageContent = {
  path: "/gohighlevel-agency/api-integrations",
  name: "GoHighLevel API integrations",
  parent: { name: "GoHighLevel agency", path: "/gohighlevel-agency" },
  updated: "2026-11-19",
  meta: {
    title: "GoHighLevel API Integrations for Your Tools | Nayab Gull",
    description:
      "I connect GoHighLevel to your site, Stripe, Google Sheets, QuickBooks and Vapi with the GoHighLevel API and webhooks. Stop copying data. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "GoHighLevel" preselected.
  request: { type: "demo", service: "gohighlevel" },

  hero: {
    eyebrow: "GoHighLevel integrations",
    headline: {
      before: "",
      highlight: "GoHighLevel API",
      after: " integrations that connect the tools you already use",
    },
    lede: "I use the GoHighLevel API and webhooks to link your CRM with your website, payments, reports, AI calls and books. Data moves on its own, so no one types the same lead twice.",
    body: [
      "You keep the apps you like. I make them talk to your CRM, test every path and set up alerts for when something breaks.",
    ],
    callout: "Tired of copying data from one app to the next?",
    proof: ["5+ years", "400+ projects delivered"],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me which apps you want to connect. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "two-way",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What do the GoHighLevel API and webhooks do?",
      paragraphs: [
        "They let GoHighLevel swap data with your other apps, with no copy and paste.",
        "An API is a door that lets another app ask GoHighLevel to read or change data, such as adding a new contact.",
        "A webhook is a short message GoHighLevel sends to another app the moment something happens, such as a new booking.",
        "Put the two together, and a lead, a payment or a call note shows up in the right place within seconds.",
      ],
      diagramLabel:
        "Your app sends requests to GoHighLevel through the API, and GoHighLevel sends events back to your app through webhooks.",
      left: { label: "Your app", caption: "Site, Stripe, Sheets, Vapi", icon: "globe" },
      right: { label: "GoHighLevel", caption: "Contacts, deals, calendars", icon: "crm" },
      request: { tag: "API", text: "Your app asks GHL to add or change data" },
      event: { tag: "Webhook", text: "GHL tells your app that something happened" },
      notes: [
        {
          text: "Webhook automation is the fast part. When a deal moves to Won, GoHighLevel can tell your other apps right away. No one has to check and click.",
          icon: "flow",
        },
        {
          text: "CRM integration is the whole job. It covers the API calls, the webhooks and the rules for which data goes where.",
          icon: "plug",
        },
        {
          text: "You do not need to learn any of this. You see the result: the right data in the right app, every time.",
          icon: "check",
        },
      ],
      callout: "The goal is simple. Enter data once, and every tool gets its copy.",
    },
    {
      kind: "features",
      id: "integrations",
      eyebrow: "Integrations",
      heading: "GoHighLevel CRM integration for six common tools",
      intro:
        "These are the links owners ask me for most. Each card says what moves and what it saves you.",
      layout: "cards",
      items: [
        {
          title: "Website and custom forms",
          text: "Your own site form sends each lead straight into GoHighLevel, with the right tags and source. No more leads stuck in an inbox.",
          icon: "globe",
        },
        {
          title: "Stripe and payments",
          text: "A paid invoice can move the deal to Won, tag the buyer and start your welcome steps. A failed payment can alert your team.",
          icon: "card",
        },
        {
          title: "Google Sheets and reports",
          text: "New leads, sales or calls can add a row to a sheet. You get a clean weekly report without an export.",
          icon: "sheet",
        },
        {
          title: "Vapi AI calls",
          text: [
            "When a Vapi voice agent ends a call, the caller, the notes and the booked time land on the contact. See my ",
            {
              text: "AI agent development services",
              href: "/ai-automation-agency/ai-agent-development",
            },
            " for the agent itself.",
          ],
          icon: "phone",
        },
        {
          title: "QuickBooks or accounting",
          text: "Won deals and payments can create the customer and the invoice in your books. Your bookkeeper stops typing the same names twice.",
          icon: "receipt",
        },
        {
          title: "Custom apps and dashboards",
          text: "Your own software or client portal can read and update GoHighLevel. I can also build a dashboard with the numbers you check daily.",
          icon: "code",
        },
      ],
      outro:
        "Not on the list? If an app has an API or can send webhooks, I can most likely connect it.",
    },
    {
      kind: "compare",
      id: "options",
      eyebrow: "Compare",
      heading: "Native integration vs Zapier or Make vs a custom build",
      intro:
        "There are three ways to connect GoHighLevel to another app. Here is an honest look at each, so you pick the simplest one that works.",
      rowLabel: "Question",
      columns: ["Native integration", "Zapier or Make", "Custom API build"],
      rows: [
        {
          label: "Setup time",
          cells: [
            "Minutes. You turn it on in your settings.",
            "A few hours for a simple flow.",
            "Days to weeks, based on the job.",
          ],
        },
        {
          label: "Running cost",
          cells: [
            "Often part of the plans you already pay for.",
            "A monthly plan that grows as you use it more.",
            "You pay for the build once, plus small hosting costs.",
          ],
        },
        {
          label: "What it can do",
          cells: [
            "Only what the built-in link offers.",
            "Most simple steps between two apps.",
            "Anything both apps allow.",
          ],
        },
        {
          label: "When it breaks",
          cells: [
            "The app maker fixes it.",
            "You get an email, and someone has to fix the step.",
            "Alerts and logs show me the error first.",
          ],
        },
        {
          label: "Best for",
          cells: [
            "Common tools, such as Stripe and Google Calendar.",
            "Quick links between a few apps.",
            "High volume, custom rules or your own software.",
          ],
        },
      ],
      note: "My rule: use the native option when it does the job. Use Zapier or Make when it comes close. Build a custom link only when the first two fall short.",
    },
    {
      kind: "features",
      id: "checks",
      eyebrow: "Before I build",
      heading: "What I check before I connect anything",
      intro:
        "Most broken links fail for the same four reasons. I check them on day one, so yours keeps working.",
      layout: "cards",
      items: [
        {
          title: "API v2 and OAuth",
          text: "The old version of the GoHighLevel API no longer gets support, so I build on API v2. It uses OAuth, a safe login that gives an app only the access it needs.",
          icon: "key",
        },
        {
          title: "Rate limits",
          text: "GoHighLevel caps how many requests an app can send in a few seconds and in one day. I pace each request, so a big import does not stall halfway.",
          icon: "gauge",
        },
        {
          title: "Error alerts",
          text: "Apps go down and passwords change. When a request fails, my code tries again, logs it and sends an alert. No lead gets lost in silence.",
          icon: "bell",
        },
        {
          title: "Data mapping",
          text: "Each field must land in the right spot, such as phone, source or deal value. Before I write code, I map every field, custom fields too.",
          icon: "flow",
        },
      ],
      outro: "A short check up front saves a long cleanup later.",
    },
    {
      // TODO(nayab): TIMELINE. Add how long each step takes once confirmed.
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "How a GoHighLevel integration project runs",
      intro: "Every project follows four steps. You approve the plan before I build anything.",
      steps: [
        {
          title: "Free call and app list",
          text: "You tell me about your tools and the job each one does. I list every app, the data it holds and where that data should go.",
        },
        {
          title: "Written plan",
          text: "You get a short plan: what connects, which method fits and how I will test it. The build starts when you approve it.",
        },
        {
          title: "Build and test",
          text: "I build inside your accounts. Then I send test data through every path, even the ones that should fail.",
        },
        {
          title: "Launch and handover",
          text: "The links go live, and I watch the first real data come through. You get short notes on how it all works.",
        },
      ],
    },
    {
      // TODO(nayab): PRICING. Replace with a `prices` block once the starting price is approved.
      kind: "prose",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What shapes the price of a GoHighLevel integration",
      paragraphs: [
        "Three things decide the price: how many apps you connect, how much data moves and how many rules it must follow. A form that sends leads to one pipeline is a small job. A two-way sync with your books takes more work.",
        "After a free call, you get a written quote before any work starts. App plans, such as GoHighLevel, Zapier or Stripe fees, go to those companies, not to me.",
      ],
    },
    {
      // TODO(nayab): PROOF. Replace the "Case study" card with a real, approved integration result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire a developer who knows both sides",
      layout: "cards",
      paragraphs: [
        "Most integrations break at the edges, where GoHighLevel meets your site, your payments or your own code. I am a full-stack developer, so I build both sides. Over five years, I have delivered 400+ projects for clients in the US, the UK and beyond.",
        [
          "This page covers one part of my ",
          { text: "GoHighLevel agency work", href: "/gohighlevel-agency" },
          ". If your account still needs pipelines, workflows or texting set up, start there.",
        ],
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved integration case study to show yet, and I will not invent one. Ask for a free demo instead, and judge the work on your own apps.",
        ],
      },
      outro: [
        "You can read ",
        { text: "more about me and how I work", href: "/about" },
        " before you book.",
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions about GoHighLevel integrations",
    items: [
      {
        question: "What can I connect to GoHighLevel?",
        answer:
          "Most apps with an API or webhooks can connect. That includes website forms, Stripe, Google Sheets, QuickBooks, Vapi and your own software.\n\nOn a free call, I go through your list. You hear which apps have a built-in link and which need custom work.",
      },
      {
        question: "Do I need Zapier, or can you connect apps directly?",
        answer:
          "It depends on the job. Zapier or Make is fine for a few simple steps.\n\nFor high volume or custom rules, a direct link through the API is often more stable. It also skips one more monthly plan.",
      },
      {
        question: "What is a webhook in GoHighLevel?",
        answer:
          "A webhook is a message GoHighLevel sends to another app when something happens, such as a new contact or a booked call. A workflow can send one at any step, so your other apps react right away.",
      },
      {
        question: "What happens if an integration breaks?",
        answer:
          "Each link I build tries a failed request again and sends an alert. You or I hear about the problem before a customer does.\n\nThen I fix the cause, not just the symptom.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          // Exact answer approved by Nayab; split into two paragraphs only (max 4 sentences each).
          "My clients do. In most projects, the client buys the tools in their own name, such as GoHighLevel, hosting or the apps being connected.\n\nI build everything inside those accounts: the integrations, the code and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
      {
        question: "How much does a GoHighLevel integration cost?",
        answer:
          "It depends on the number of apps, the amount of data and the rules involved. You get a written quote after a free call, before any work starts.",
      },
    ],
  },

  closing: {
    heading: "Ready to connect GoHighLevel to the rest of your business?",
    text: "Pick the one task you still do by hand most often. Tell me the apps involved, and I will show you how the link would work.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "GoHighLevel API integrations",
    serviceType: "GoHighLevel API integration services",
    description:
      "GoHighLevel API and webhook integrations for US businesses: website forms, Stripe, Google Sheets, QuickBooks, Vapi AI calls and custom apps, connected to your CRM.",
  },
};
