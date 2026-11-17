import { CALL_CTA, QUOTE_FORM, TRUSTED_TEAM_LINE } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /hire-saas-developer (service page). Primary keyword: "hire saas developer" (approved by Nayab
 * 2026-11-17). "saas development company" and "saas application development services" belong to
 * /services/saas-mvp-development and must not be targeted here.
 * TODO(nayab): /services/saas-mvp-development, /services/nextjs-react-development and the AI agent
 * page are not built yet, so this page cannot link to them (broken links fail CI). Add the links
 * in "related" and "build" when those pages ship.
 * TODO(nayab): confirm the stack list, the process timelines and the FAQ answers on cost, timeline,
 * support and takeovers. The ownership and time-zone answers are Nayab's own wording (2026-11-17).
 */
export const hireSaasDeveloper: PageContent = {
  path: "/hire-saas-developer",
  name: "Hire a SaaS developer",
  updated: "2026-11-17",
  meta: {
    title: "Hire SaaS Developer to Build Your App | Nayab Gull",
    description:
      "Hire SaaS developer Nayab Gull to plan, build and grow your SaaS app: logins, billing, dashboards and AI features. Book a free call to talk it through.",
  },

  hero: {
    eyebrow: "SaaS development",
    headline: {
      before: "",
      highlight: "Hire SaaS Developer",
      after: " for Your Product: Build, Launch and Grow",
    },
    lede: "I turn your SaaS idea into a working app that customers can sign up for and pay for. Then I help it grow.",
    proof: ["5+ years", "400+ projects delivered", "Clients in the US, UK and worldwide"],
    primaryCta: CALL_CTA,
    form: QUOTE_FORM,
    secondaryCta: { label: "Request a custom demo", href: "#quote" },
  },

  blocks: [
    {
      kind: "cards",
      id: "journey",
      eyebrow: "The basics",
      heading: "What a SaaS developer does for you",
      intro:
        "SaaS means software as a service. People log in to your app online and pay a monthly fee. A SaaS developer builds that app and keeps it running as you grow.",
      columns: 2,
      items: [
        {
          title: "1. Idea",
          text: "Before any code, I help you pick the one problem your app must solve well.",
        },
        {
          title: "2. MVP",
          text: "An MVP is the smallest version people will pay for. It has only the features you need to test the idea.",
        },
        {
          title: "3. Launch",
          text: "I set up hosting, payments and emails, so your first customers can sign up without help.",
        },
        {
          title: "4. Grow",
          text: "You learn what users want. I add features, fix weak spots and keep the app fast as more people join.",
        },
      ],
    },
    {
      kind: "prose",
      id: "when",
      eyebrow: "Timing",
      heading: "When is the right time to hire a SaaS developer?",
      paragraphs: [
        "The best time to hire a SaaS developer is when you know who will pay and why. You do not need a full spec. A clear problem and a few people who want it fixed is enough.",
        "Here are the signs I hear most often from founders on a first call.",
      ],
      bullets: [
        "People keep asking for your service, and spreadsheets can no longer keep up.",
        "Your no-code app works, but it has hit limits on speed, users or cost.",
        "You have an app already, and it breaks every time you add a feature.",
        "You want to sell a tool you built for your own business to others.",
      ],
    },
    {
      kind: "cards",
      id: "build",
      eyebrow: "What I build",
      heading: "Custom SaaS development, piece by piece",
      intro:
        "Most SaaS apps need the same core parts. I build each one to fit your product, not a template.",
      columns: 3,
      items: [
        {
          title: "Logins and user roles",
          text: "Users sign up and log in safely. Roles decide who sees what, so an owner can do more than a staff member.",
        },
        {
          title: "Subscriptions and billing",
          text: "I connect Stripe for monthly plans, free trials, upgrades and invoices. Money goes straight to your account.",
        },
        {
          title: "Multi-tenant setup",
          text: "Multi-tenant means many customers share one app, but each one sees only their own data.",
        },
        {
          title: "Admin dashboard",
          text: "You get one screen to see sign-ups, payments and usage. You can help a customer without asking me.",
        },
        {
          title: "API integrations",
          text: "An API lets two apps talk. I link your app to the tools your customers already use, like CRMs and calendars.",
          link: { label: "Connect it to GoHighLevel", href: "/gohighlevel-agency" },
        },
        {
          title: "AI features",
          text: "Add smart search, chat help or text that writes itself. I pick the AI model that fits your budget.",
          link: { label: "AI automation services", href: "/ai-automation-agency" },
        },
      ],
    },
    {
      kind: "prose",
      id: "stack",
      eyebrow: "Tech stack",
      heading: "Which tools does a SaaS app need?",
      paragraphs: [
        "I build most SaaS apps with Next.js and React on the front end. That is the part people see and click. TypeScript catches mistakes before your users do.",
        "Behind it, I use Node.js or Laravel for the logic and PostgreSQL for the data. These tools are popular and well supported. Any good developer can pick up the code later.",
        [
          "Need a simple marketing site next to the app? My ",
          { text: "web design and development service", href: "/services/web-design-development" },
          " covers that part.",
        ],
      ],
    },
    {
      kind: "table",
      id: "compare",
      eyebrow: "Your options",
      heading: "SaaS developer, agency or freelancers?",
      intro:
        "There is no single right answer. You can hire one developer, a SaaS development agency or a few freelancers. Here is an honest look at each.",
      caption: "Three ways to build a SaaS app, compared.",
      columns: ["SaaS developer (me)", "Agency", "Freelancers"],
      rows: [
        {
          label: "Who you talk to",
          cells: [
            "The person who builds your app.",
            "An account manager who passes notes on.",
            "Each freelancer, one by one.",
          ],
        },
        {
          label: "Cost",
          cells: [
            "Lower than a big agency, with a fixed quote.",
            "Highest, because you also pay for layers of staff.",
            "Low per hour, but gaps and rework add up.",
          ],
        },
        {
          label: "Speed",
          cells: [
            "Fast decisions, steady weekly progress.",
            "Fast once started, slow to get started.",
            "Depends on who is free that week.",
          ],
        },
        {
          label: "Best for",
          cells: [
            "Founders who want one owner for the whole build.",
            "Large firms with a big budget and many teams.",
            "Small, separate tasks you can manage yourself.",
          ],
        },
      ],
    },
    {
      kind: "prose",
      id: "vetting",
      eyebrow: "Buying guide",
      heading: "Questions to ask any SaaS developer before you sign",
      paragraphs: [
        "SaaS apps fail in quiet places, like billing and data. So whether you pick a SaaS web development company or a freelancer, ask about those parts first.",
        "Clear, calm answers are a good sign. If the answers are vague, keep looking.",
      ],
      bullets: [
        "What happens when a customer's card payment fails?",
        "How do you keep one customer's data away from another?",
        "How often is the data backed up, and who can restore it?",
        "Which parts of the app have automated tests?",
        "How will I add a new feature a year from now?",
      ],
    },
    {
      kind: "prose",
      id: "agency-note",
      eyebrow: "Bigger builds",
      heading: "What if my SaaS app needs extra hands?",
      paragraphs: [
        "Most MVPs do not. One skilled developer can plan and ship the first version on their own.",
        TRUSTED_TEAM_LINE,
        [
          "If you only need a developer for a website or a web app that is not SaaS, see my page on how to ",
          { text: "hire a full stack developer", href: "/hire-full-stack-developer" },
          ".",
        ],
      ],
    },
    {
      // TODO(nayab): replace these three cards with real SaaS projects you approve: name, the
      // problem, what you built and the stack. No invented projects, clients or numbers.
      kind: "cards",
      id: "portfolio",
      eyebrow: "Portfolio",
      heading: "SaaS app development I have done",
      intro:
        "Each card shows the problem, what I built and the stack. Ask me for a live walkthrough on the call.",
      columns: 3,
      items: [
        {
          title: "SaaS project 1 (TODO)",
          text: "Problem: TODO(nayab). What I built: TODO(nayab). Stack: TODO(nayab).",
        },
        {
          title: "SaaS project 2 (TODO)",
          text: "Problem: TODO(nayab). What I built: TODO(nayab). Stack: TODO(nayab).",
        },
        {
          title: "SaaS project 3 (TODO)",
          text: "Problem: TODO(nayab). What I built: TODO(nayab). Stack: TODO(nayab).",
        },
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "How my SaaS development services work",
      intro: "Five clear steps. Each one ends with something you can see and check.",
      steps: [
        {
          title: "Discovery call",
          when: "Day 1",
          text: "You tell me the idea and who it is for. I ask hard questions and point out risks early.",
        },
        {
          title: "Scope and plan",
          when: "Week 1",
          text: "You get a written plan with features, milestones, a price and a date. Nothing starts until you agree.",
        },
        {
          title: "Design",
          when: "Week 2",
          text: "I sketch the main screens. You click through them and tell me what to change.",
        },
        {
          title: "Build and test",
          when: "Each week",
          text: "Each week ends with a preview link you can try and a short note on what is next.",
        },
        {
          title: "Launch and support",
          when: "Launch day and after",
          text: "I go live on your accounts, watch for errors and stay on for fixes and new features.",
        },
      ],
    },
    {
      // TODO(nayab): add approved starting prices for a SaaS MVP and for monthly support. Until
      // then this block shows no dollar amounts and the page carries no Offer schema.
      kind: "prose",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does a custom SaaS build cost?",
      paragraphs: [
        "Every SaaS app is different, so I quote a fixed price after a free call. You know the full cost before any work begins.",
        "Starting prices: TODO(nayab).",
        [
          "Want to see how I price other work? My ",
          { text: "pricing page", href: "/pricing" },
          " shows starting prices for websites and automation.",
        ],
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions founders ask before they hire",
    items: [
      {
        question: "How much does it cost to hire a SaaS developer?",
        answer:
          "It depends on the features, so I quote each app after a free call. A small MVP costs far less than a full product with many roles and reports.\n\nYou get a fixed price in writing. Hosting and tools like Stripe bill you directly.",
      },
      {
        question: "How long does it take to build a SaaS MVP?",
        answer:
          "Most MVPs take a few weeks to a few months. The biggest factor is how many features you want in the first version.\n\nI help you cut the list down, so you can launch sooner and learn from real users.",
      },
      {
        // Nayab's own wording (2026-11-17), split into two paragraphs for the 4-sentence limit.
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as hosting, Stripe or a database service. I build everything inside those accounts: the code, the setup and the full app.\n\nAt launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        // Nayab's own wording (2026-11-17).
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
      {
        question: "Do you offer support after launch?",
        answer:
          "Yes. Most founders keep me on each month after launch. I fix bugs, keep the app updated and build new features as you grow.\n\nYou choose how much help you need, and you can change it any month.",
      },
      {
        question: "Can you take over an existing SaaS app?",
        answer:
          "Yes. First I read the code and check how it runs. Then I tell you in plain words what works, what is risky and what to fix first.\n\nMany apps do not need a rebuild. Often a few focused fixes are enough.",
      },
    ],
  },

  closing: {
    heading: "Ready to build your SaaS app?",
    text: "Send the short form with your idea. I will reply with how I would build it, how long it takes and what it costs.",
  },

  service: {
    name: "SaaS development",
    serviceType: "SaaS developer for hire",
    description:
      "Custom SaaS development for founders: logins and roles, Stripe billing, multi-tenant setup, admin dashboards, API integrations and AI features, built with Next.js, React, Node.js, Laravel and PostgreSQL.",
  },
};
