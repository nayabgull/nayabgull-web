import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /gohighlevel-agency/custom-crm-development (service page under the GoHighLevel hub).
 * Primary keyword: "custom crm development services". Secondary keywords: docs/seo/keyword-map.md.
 * Brief: content/briefs/custom-crm-development.md. One topic: when a business needs a custom CRM,
 * and the two ways I build it (inside GoHighLevel, or as a custom web app).
 *
 * TODO(nayab): PROCESS TIMELINE. The five steps have no durations yet. Add them (the stepper has
 * no "when" field, so put the time in each step's text) once you confirm them.
 * TODO(nayab): PRICING. No numbers on purpose and no Offer in the Service JSON-LD. When you set a
 * starting price, replace the "pricing" prose block with a `prices` block (it adds the Offer).
 * TODO(nayab): PROOF. No CRM case study is approved yet. Replace the "Case study" card with a
 * real, approved result. Nothing here is invented.
 */
export const customCrmDevelopment: PageContent = {
  path: "/gohighlevel-agency/custom-crm-development",
  name: "Custom CRM development",
  parent: { name: "GoHighLevel agency", path: "/gohighlevel-agency" },
  updated: "2026-11-19",
  meta: {
    title: "Custom CRM Development Services | Nayab Gull",
    description:
      "Custom CRM development services for US businesses. I build your CRM inside GoHighLevel or as a custom web app, and you own it all. Get a free demo.",
  },

  // Both forms on this page ask for a free demo, with "GoHighLevel" preselected (the hub's service).
  request: { type: "demo", service: "gohighlevel" },

  hero: {
    eyebrow: "Custom CRM",
    headline: { before: "", highlight: "Custom CRM Development Services", after: "" },
    lede: "My custom CRM development services give your team one place for leads, deals and follow-up. I build the CRM inside GoHighLevel or as a custom web app. You own every account and all the work.",
    callout: "Want to see what your CRM could look like?",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me how you track leads today. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "features",
      id: "signs",
      eyebrow: "Is it time?",
      heading: "Signs you need a custom CRM",
      intro:
        "A custom CRM is a sales system built around your steps, not someone else's. You likely need one if two or more of these sound like you.",
      layout: "checklist",
      items: [
        { text: "Leads sit in inboxes, texts and spreadsheets, and some get lost." },
        { text: "Your team types the same details into two or three apps." },
        { text: "Your CRM forces steps that do not match how you sell." },
        { text: "You pay for HubSpot or Salesforce features nobody uses." },
        { text: "You cannot see which deals are stuck or who owns them." },
        { text: "Your work has rules no ready-made tool covers, such as unit stock." },
      ],
      outro:
        "If none of this fits, a plain CRM off the shelf may be enough. I will say so on the call.",
    },
    {
      kind: "compare",
      id: "compare",
      eyebrow: "Compare",
      heading: "GoHighLevel vs custom-built vs off-the-shelf CRM",
      intro: "Each option is right for some businesses. Here is an honest look at all three.",
      rowLabel: "Question",
      columns: ["GoHighLevel CRM", "Custom-built CRM", "Off-the-shelf (HubSpot and others)"],
      rows: [
        {
          label: "Best for",
          cells: [
            "Service businesses that want texts, calls, booking and follow-up in one place.",
            "Teams with their own process, data or rules that no tool fits.",
            "Teams with a standard sales process that want to start today.",
          ],
        },
        {
          label: "Time to launch",
          cells: [
            "Fast, because the core parts already exist.",
            "Slower, because I build each screen and rule.",
            "Fastest. You sign up and add your contacts.",
          ],
        },
        {
          label: "Monthly cost",
          cells: [
            "One GoHighLevel plan, paid to them.",
            "Hosting and a database, with no fee per user.",
            "A fee per user that grows with your team.",
          ],
        },
        {
          label: "Fit to your process",
          cells: [
            "Good. Pipelines, fields and workflows bend a long way.",
            "Exact. It does what you need and nothing else.",
            "Limited. You often change your process to fit the tool.",
          ],
        },
        {
          label: "Who owns it",
          cells: [
            "The account and the data are yours.",
            "The code, the database and the data are yours.",
            "Your data is yours. The software stays theirs.",
          ],
        },
        {
          label: "Main risk",
          cells: [
            "Limits on custom screens and complex reports.",
            "A bigger first build that someone must maintain.",
            "Costs rise as you add users and features.",
          ],
        },
      ],
      note: [
        "Many businesses start in GoHighLevel and add custom parts later. I can build both and connect them. My ",
        { text: "GoHighLevel agency page", href: "/gohighlevel-agency" },
        " covers the setup side.",
      ],
    },
    {
      kind: "cards",
      id: "two-ways",
      eyebrow: "Two ways to build",
      heading: "Two ways I handle CRM software development",
      intro:
        "There is no single right tool. I pick the build that fits your sales steps, your team and your budget.",
      columns: 2,
      items: [
        {
          title: "Inside GoHighLevel",
          text: "GoHighLevel already has contacts, pipelines, texts, email and calendars. I shape it with custom fields, workflows and forms. This is the faster path for most service businesses.",
          link: { label: "GoHighLevel setup and automation", href: "/gohighlevel-agency" },
        },
        {
          title: "As a custom web app",
          text: "Some work needs its own screens, data or rules. Then I build the CRM from scratch as a web app. It works the way your team works, and the code is yours.",
          link: { label: "Hire a full stack developer", href: "/hire-full-stack-developer" },
        },
      ],
    },
    {
      kind: "features",
      id: "features",
      eyebrow: "Features",
      heading: "What my custom CRM development services include",
      intro: "Every CRM I build covers six core parts. You choose how deep each one goes.",
      layout: "cards",
      items: [
        {
          title: "Pipelines",
          text: "See every deal and its stage on one board, from new lead to won.",
          icon: "flow",
        },
        {
          title: "Contacts and history",
          text: "Each contact keeps its calls, texts, emails, notes and files in one timeline.",
          icon: "person",
        },
        {
          title: "Automations",
          text: "Follow-ups, reminders and tasks run on their own when a deal moves.",
          icon: "spark",
        },
        {
          title: "Role-based access",
          text: "Each person sees only what their role needs. Owners see everything.",
          icon: "shield",
        },
        {
          title: "Dashboards and reports",
          text: "Track leads, sales and reply times without building a spreadsheet.",
          icon: "target",
        },
        {
          title: "Integrations and APIs",
          text: [
            "Connect your website, phone, email and calendar through APIs and webhooks. You can add ",
            {
              text: "an AI agent that works inside your CRM",
              href: "/ai-automation-agency/ai-agent-development",
            },
            " too.",
          ],
          icon: "plug",
        },
      ],
      outro: "I build only what you need now, and leave room to add more later.",
    },
    {
      kind: "prose",
      id: "real-estate",
      eyebrow: "Example",
      heading: "Real estate developer CRM: one example",
      paragraphs: [
        "Say a real estate developer sells 120 units in a new building. A real estate developer CRM tracks each unit as open, held or sold, and links it to the buyer. It sends payment reminders before each due date and warns sales when a hold runs out. The owner sees sales by building and by agent on one dashboard.",
      ],
    },
    {
      kind: "features",
      id: "stack",
      eyebrow: "Stack",
      heading: "The tools I build with",
      intro: "Proven tools with large communities, so any good developer can take over later.",
      layout: "cards",
      items: [
        {
          title: "GoHighLevel",
          text: "An all-in-one CRM for texts, calls, booking and follow-up.",
          icon: "crm",
        },
        {
          title: "Next.js",
          text: "A React framework for fast, secure custom web apps.",
          icon: "code",
        },
        {
          title: "Laravel",
          text: "A PHP framework for back ends with complex business rules.",
          icon: "wrench",
        },
        {
          title: "PostgreSQL",
          text: "A trusted database that keeps your records safe and quick to search.",
          icon: "database",
        },
        {
          title: "APIs",
          text: "The links that let your CRM talk to your website, phone and other apps.",
          icon: "plug",
        },
      ],
    },
    {
      // TODO(nayab): PROCESS TIMELINE. Add the duration of each step once confirmed.
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "How I build your CRM in five steps",
      intro: "You approve the plan before I build, and you test everything before launch.",
      steps: [
        {
          title: "Discovery call",
          text: "You show me how leads reach you and where they get stuck. I note your tools, your team and your goals.",
        },
        {
          title: "Plan and scope",
          text: "I map your pipelines, fields and rules. Then I suggest GoHighLevel, a custom web app or both, in a written scope.",
        },
        {
          title: "Build",
          text: "The build happens in your own accounts. You can click through it early and tell me what to change.",
        },
        {
          title: "Test and move data",
          text: "I test every flow with real cases. Then I import your contacts and deals and check them with you.",
        },
        {
          title: "Launch and training",
          text: "Your team gets a walkthrough and a short guide. After launch, I stay on to fix what real use shows.",
        },
      ],
    },
    {
      // TODO(nayab): PRICING. No numbers until you approve a starting price.
      kind: "prose",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does a custom CRM cost?",
      paragraphs: [
        "The price depends on the build. A GoHighLevel CRM costs less than a custom web app, and more pipelines, integrations and user roles add work.",
        "You get a fixed, written quote before any work starts. Software fees, such as your GoHighLevel plan or hosting, go to the provider, not to me.",
      ],
    },
    {
      // TODO(nayab): PROOF. Replace the "Case study" card with a real, approved CRM result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire me as your CRM development company?",
      layout: "cards",
      paragraphs: [
        "I am a full-stack developer, so I build the CRM, the website and the links between them. Over five years, I have delivered 400+ projects for clients in the US, the UK and beyond.",
        "You do not need a large CRM development company for one focused build. You need a builder who answers your messages.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved CRM case study to show here yet, and I will not invent one. Ask for a free demo instead, and judge the work on your own process.",
        ],
      },
      outro: [
        "My CRM development services cover the plan, the build, the tests and the care after launch. You can read ",
        { text: "more about me and how I work", href: "/about" },
        " before you book.",
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions about a custom CRM",
    items: [
      {
        question: "What are custom CRM development services?",
        answer:
          "They cover the plan, the build and the setup of a CRM around your own sales steps. That can mean shaping GoHighLevel to fit your business. It can also mean a new web app built from scratch.",
      },
      {
        question: "Should I use GoHighLevel or build a custom CRM?",
        answer:
          "Start with GoHighLevel if you sell a service and need texts, calls and booking. Choose a custom CRM when your work needs its own data, screens or rules. On the call, I will tell you which fits, even when it is the cheaper choice.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as GoHighLevel, hosting or a database service. I build everything inside those accounts: the CRM, the code and the full setup.\n\nAt launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
      {
        question: "Can you move my data from HubSpot or spreadsheets?",
        answer:
          "Yes. I export your contacts, deals and notes, then map each field to its new place. Before the switch, I run a test import and check it with you.",
      },
      {
        question: "How long does a CRM build take?",
        answer:
          "It depends on the build. A GoHighLevel CRM is faster than a custom web app, because the core parts already exist. Your written quote lists the timeline.",
      },
    ],
  },

  closing: {
    heading: "Ready for a CRM that fits how you sell?",
    text: "Start with the part that costs you most, such as lost leads or double data entry. Tell me how you work today, and I will show you what your CRM could look like.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "Custom CRM development",
    serviceType: "Custom CRM development services",
    description:
      "Custom CRMs for US businesses, built inside GoHighLevel or as a custom web app: pipelines, contacts and history, automations, role-based access, dashboards and integrations.",
  },
};
