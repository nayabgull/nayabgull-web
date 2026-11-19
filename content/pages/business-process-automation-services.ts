import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /ai-automation-agency/business-process-automation-services (service page under the AI hub).
 * Primary keyword: "business process automation services" (100–1K, KD 3). Keywords approved by
 * Nayab on 2026-11-19. Brief: content/briefs/business-process-automation-services.md.
 * One topic only: which daily tasks I automate and how that saves time. "ai workflow automation"
 * belongs to the AI hub and is never used here.
 *
 * TODO(nayab): TIMELINE. The process steps carry no durations yet. Add them to the steps (and the
 * "How long" FAQ answer) once you confirm them.
 * TODO(nayab): PRICING. No price is shown on purpose. When you set a starting price, add a
 * `prices` block (it also adds the Offer to the Service JSON-LD) and the amount to APPROVED_PRICES
 * in tests/unit/pages/pages.test.tsx.
 * TODO(nayab): CASE STUDY. No process automation case study is approved yet (see "proof").
 */
export const businessProcessAutomationServices: PageContent = {
  path: "/ai-automation-agency/business-process-automation-services",
  name: "Business process automation",
  parent: { name: "AI automation agency", path: "/ai-automation-agency" },
  updated: "2026-11-19",
  meta: {
    title: "Business Process Automation Services | Nayab Gull",
    description:
      "Business process automation services for US small businesses. I automate lead replies, invoices, onboarding, reviews and reports. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "AI automation" preselected.
  request: { type: "demo", service: "ai-automation" },

  hero: {
    eyebrow: "Process automation",
    headline: { before: "", highlight: "Business Process Automation Services", after: "" },
    lede: "My business process automation services take the daily busywork off your plate. I set up workflows that copy data, send texts, log invoices and build reports, so your staff stops repeating the same clicks.",
    body: [
      "You tell me which tasks eat your week. Then I map them, build the workflow and test it. After launch, it runs day and night.",
    ],
    callout: "Which task would you hand off first?",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Name one task you do by hand every day. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "explainer",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What Is Business Process Automation?",
      paragraphs: [
        "Business process automation means software does the routine steps of your work. It moves data, sends messages and updates records for you.",
        "Take a task your staff repeats daily. A lead fills out your form. Someone copies it into the CRM, sends a text and tells sales.",
        "With workflow automation, the form entry is the trigger. The workflow follows your rules and does every step in seconds.",
      ],
      diagramLabel:
        "How a workflow runs: a trigger starts it, your rules decide what happens, your apps get updated, and the task is done.",
      diagram: [
        { label: "Trigger", caption: "A form, email or payment comes in", icon: "flow" },
        { label: "Rules", caption: "The workflow checks what to do", icon: "rules" },
        { label: "Your apps", caption: "CRM, accounting and calendar", icon: "plug" },
        { label: "Done", caption: "Record saved, text sent", icon: "check" },
      ],
      notes: [
        {
          text: "A trigger starts a workflow. It can be a new form, a paid invoice or a set time each morning.",
          icon: "flow",
        },
        {
          text: "Most workflows need no AI. I add an AI model only where a step must read or sort text.",
          icon: "chip",
        },
        {
          text: "You stay in charge. A workflow can pause for your approval before it sends money or a message.",
          icon: "person",
        },
      ],
      callout: "The goal is simple: fewer clicks for your staff and no tasks lost between apps.",
    },
    {
      kind: "use-cases",
      id: "workflows",
      eyebrow: "Workflows",
      heading: "6 Workflow Automation Solutions I Build Most",
      intro: "Each of these replaces a task someone does by hand today.",
      labels: { problem: "The task by hand", agent: "What the workflow does", result: "Result" },
      items: [
        {
          title: "Lead form to CRM to text",
          business: "roofing company",
          problem:
            "A homeowner fills out your quote form. Someone copies it into the CRM and calls back hours later.",
          agent:
            "The workflow saves the lead in your CRM, texts the homeowner and alerts your sales rep.",
          result: "Every lead gets a reply in seconds, even at night.",
        },
        {
          title: "Invoices to accounting",
          business: "cleaning company",
          problem:
            "Paid invoices sit in Stripe. At month end, someone types each one into QuickBooks.",
          agent:
            "When a customer pays, the workflow adds the entry to your books and files the receipt.",
          result: "Your books stay current with no month-end typing.",
        },
        {
          title: "Client onboarding",
          business: "marketing agency",
          problem:
            "A new client signs. Then someone sends the welcome email, makes a folder and sets up tasks.",
          agent:
            "The signed contract starts the workflow. It sends the welcome email, makes the folder and builds the task list.",
          result: "Every client gets the same smooth start, and you never skip a step.",
        },
        {
          title: "Review requests",
          business: "dental office",
          problem: "Happy patients forget to leave a review, and busy staff forget to ask.",
          agent:
            "When your staff close a visit, the workflow texts a thank-you with your Google review link, then one reminder.",
          result: "You ask every patient, every time, with no extra work.",
        },
        {
          title: "Weekly reports",
          business: "HVAC company",
          problem:
            "Each Monday, someone copies numbers from the CRM and ads account into a spreadsheet.",
          agent:
            "The workflow fills a Google Sheet overnight and posts a summary in your team chat.",
          result: "You start the week with the report already done.",
        },
        {
          title: "Email sorting with AI",
          business: "law firm",
          problem:
            "One inbox mixes new cases, client questions, bills and spam. Someone reads every email to sort it.",
          agent:
            "An AI model tags each email as new case, client, billing or spam. It drafts a reply for a person to check.",
          result: "The right person sees the right email first.",
        },
      ],
    },
    {
      kind: "compare",
      id: "before-after",
      eyebrow: "Before and after",
      heading: "Manual vs automated: what changes day to day?",
      rowLabel: "Task",
      columns: ["Done by hand", "Automated"],
      rows: [
        {
          label: "New leads",
          cells: [
            "Someone checks the inbox and calls back when they can.",
            "The lead gets a text in seconds and lands in the CRM.",
          ],
        },
        {
          label: "Data entry",
          cells: [
            "Staff type the same details into two or three apps.",
            "You enter the data once, and it flows to every app.",
          ],
        },
        {
          label: "Invoices",
          cells: [
            "Someone logs paid invoices in the books at month end.",
            "Each payment shows up in your books the same day.",
          ],
        },
        {
          label: "Follow-ups",
          cells: [
            "Follow-ups depend on someone's memory.",
            "Every follow-up goes out on time, by the rules you set.",
          ],
        },
        {
          label: "Reports",
          cells: [
            "Someone builds the report by hand every week.",
            "The report is ready before you open your laptop.",
          ],
        },
        {
          label: "Mistakes",
          cells: [
            "Typos and missed steps slip through.",
            "The same steps run the same way, and any error sends an alert.",
          ],
        },
      ],
      note: [
        "For the bigger picture, see my ",
        { text: "AI automation agency services", href: "/ai-automation-agency" },
        ".",
      ],
    },
    {
      kind: "features",
      id: "tools",
      eyebrow: "Tools",
      heading: "Which tools do I use, and when?",
      intro:
        "Good workflow automation services start with the right tool for the job and your budget.",
      layout: "cards",
      items: [
        {
          title: "n8n",
          text: "Best for long workflows with many steps. It can run on your own server, so your data stays with you.",
          icon: "flow",
        },
        {
          title: "Make",
          text: "Good for workflows with many branches. Its visual builder is easy for your staff to follow.",
          icon: "spark",
        },
        {
          title: "Zapier",
          text: "Best for short, simple workflows. It connects the most apps, and your staff can edit it.",
          icon: "plug",
        },
        {
          title: "GoHighLevel",
          text: [
            "Best when the work lives in your CRM: leads, texts, pipelines and calendars. See my ",
            { text: "GoHighLevel agency services", href: "/gohighlevel-agency" },
            ".",
          ],
          icon: "crm",
        },
        {
          title: "APIs and custom code",
          text: "For apps with no ready connector. I write the code and link apps through their APIs and webhooks.",
          icon: "code",
        },
      ],
      outro: [
        "Some steps need judgment, not just rules. For those, I build an ",
        {
          text: "AI agent that can read, decide and act",
          href: "/ai-automation-agency/ai-agent-development",
        },
        ".",
      ],
    },
    {
      // TODO(nayab): TIMELINE. Add how long each step takes once you confirm it.
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "How I automate a task in 4 steps",
      intro: "Four steps take a task from your to-do list to a workflow that runs on its own.",
      steps: [
        {
          title: "Map the task",
          text: "On a call, you walk me through the task as it works today. I write down each step, app and person involved.",
        },
        {
          title: "Plan the workflow",
          text: "Next, I pick the tools and draw the new workflow. You see each step and approve the plan before I build.",
        },
        {
          title: "Build and test",
          text: "I build the workflow inside your accounts. Then I test it with real examples, odd cases and errors.",
        },
        {
          title: "Launch and support",
          text: "At launch, I turn it on, watch the first runs and fix any issues. You get short notes on how it works, and I stay on for support.",
        },
      ],
    },
    {
      // TODO(nayab): PRICING. No numbers until you set a starting price.
      kind: "features",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What do business process automation services cost?",
      layout: "checklist",
      paragraphs: [
        "The price depends on the task. One workflow between two apps costs far less than a system that links five tools and uses AI.",
      ],
      listIntro: "What sets the price:",
      items: [
        { text: "How many steps and apps the workflow touches." },
        { text: "Whether a step needs AI to read or sort text." },
        { text: "Whether an app needs custom API code." },
        { text: "How much testing and error handling the task needs." },
      ],
      outro:
        "Tool fees, such as your n8n, Zapier or CRM plan, go to those companies. You get a written quote before work starts.",
    },
    {
      // TODO(nayab): CASE STUDY. Replace the "Case study" card with a real, approved result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire me over larger business process automation companies?",
      layout: "cards",
      paragraphs: [
        "Many business process automation companies pass your project to a junior team. With me, the person on your call builds your workflows.",
        "As a full-stack developer, I can write custom code when a connector falls short. Over five years, I have delivered 400+ projects for clients in the US, the UK and beyond.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved process automation case study to show yet, and I will not invent one. Ask for a free demo instead, and judge the workflow on one of your own tasks.",
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
    heading: "Questions about business process automation",
    items: [
      {
        question: "How much do business process automation services cost?",
        answer:
          "It depends on the steps, apps and AI parts your workflow needs. After a short call about your task, I send a written quote.",
      },
      {
        question: "How long does it take to automate a process?",
        answer:
          "A simple workflow takes less time than a system with several apps and custom code. You get a timeline with your quote.",
      },
      {
        question: "Is workflow automation for small business worth it?",
        answer:
          "Yes, if a task repeats often and follows clear steps. Start with the one task that annoys your staff most.",
      },
      {
        question: "Do I need to change the tools I use now?",
        answer:
          "Usually not. I build around the apps you already pay for. If an app has no API, you hear it from me before I quote.",
      },
      {
        question: "What happens if a workflow breaks?",
        answer:
          "Every workflow I build sends an alert when a step fails and keeps the failed task. During support, I find the cause and fix it.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as n8n, a CRM or a phone service. I build everything inside those accounts: the workflows, the code and the full setup.\n\nAt launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
    ],
  },

  closing: {
    heading: "Ready to automate your first task?",
    text: "Pick one task that eats your week. Tell me how it works today, and I will show you how a workflow can run it.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "Business process automation for small businesses",
    serviceType: "Business process automation services",
    description:
      "Workflow automation for US small businesses: lead follow-up, invoices, client onboarding, review requests, weekly reports and email sorting, built with n8n, Make, Zapier, GoHighLevel and APIs.",
  },
};
