import { STRATEGY_CALL_URL } from "../home.ts";

import type { PageContent } from "./types.ts";

const CTA = { label: "Book a free strategy call", href: STRATEGY_CALL_URL };

/**
 * /hire-full-stack-developer (service page). Primary keyword: "hire full stack developer".
 * TODO(nayab): confirm the stack list, the ways of working (fixed quote, monthly block of hours),
 * the NDA answer and every other FAQ answer. No hourly rate is shown because none is approved.
 */
export const hireFullStackDeveloper: PageContent = {
  path: "/hire-full-stack-developer",
  name: "Hire a full stack developer",
  updated: "2026-11-10",
  meta: {
    title: "Hire Full Stack Developer for Web Apps | Nayab Gull",
    description:
      "Hire full stack developer Nayab Gull for websites, web apps and automation. 5+ years, 400+ projects and direct contact. Book a free strategy call.",
  },

  hero: {
    eyebrow: "Work with me",
    headline: {
      before: "",
      highlight: "Hire full stack developer",
      after: " Nayab Gull for your next build",
    },
    lede: "I plan, design, code and launch. You get one senior person who handles the front end, the back end and the tools that connect them.",
    proof: ["5+ years", "400+ projects delivered", "Clients in the US, UK and worldwide"],
    primaryCta: CTA,
    secondaryCta: { label: "See what I can take on", href: "#work" },
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Why hiring a developer goes wrong so often",
      intro:
        "Most owners have a bad hiring story. The details change, but the causes repeat. I built my way of working around these three.",
      columns: 3,
      items: [
        {
          title: "They vanish mid-project",
          text: "Updates slow down, then stop. You are left with half a site, no access and no idea what was done.",
        },
        {
          title: "Three people, three stories",
          text: "The designer blames the coder, and the coder blames the host. Every fix needs a meeting, and nobody owns the result.",
        },
        {
          title: "The code is a black box",
          text: "It works until it does not. Then the next developer says it must be rebuilt, and you pay twice for the same thing.",
        },
      ],
    },
    {
      kind: "prose",
      id: "what-it-means",
      eyebrow: "The basics",
      heading: "What do you get when you hire a web developer who is full stack?",
      paragraphs: [
        "You get one person who can build the whole product. Full stack means both halves of a web project. The front end is what visitors see and click. The back end is the logic, the database and the links to other tools.",
        "When you hire a web developer for only one half, you become the go-between. With both halves in one head, the design, the data and the deadlines stay in step.",
        "I also set up hosting, domains and tracking. So the handover is a working product, not a folder of files.",
      ],
      bullets: [
        "One contact from the first call to launch.",
        "Clean code in your own accounts.",
        "Short written updates you can read in a minute.",
        "A recorded handover, so you are never locked in.",
      ],
    },
    {
      kind: "cards",
      id: "work",
      eyebrow: "What I take on",
      heading: "Projects you can hire a website developer like me for",
      intro:
        "If it runs in a browser, I have probably built something like it. These are the most common requests.",
      columns: 3,
      items: [
        {
          title: "Business websites",
          text: "Fast marketing sites with lead forms and easy editing.",
          link: {
            label: "Web design and development service",
            href: "/services/web-design-development",
          },
        },
        {
          title: "Web apps and portals",
          text: "Client dashboards, booking tools, quote calculators and internal tools with logins, roles and a database.",
        },
        {
          title: "Front end only",
          text: "Need to hire frontend developer help for a design you already have? I turn Figma files into fast, accessible pages.",
        },
        {
          title: "APIs and integrations",
          text: "I connect your site to payment systems, CRMs, calendars and other software, so data moves without retyping.",
        },
        {
          title: "CRM and automation",
          text: "Pipelines, texting and AI follow-up that work with your site.",
          link: { label: "GoHighLevel setup and automation", href: "/gohighlevel-agency" },
        },
        {
          title: "Rescue and repair",
          text: "Slow site, broken checkout or a project someone left unfinished? I audit the code and tell you what is worth saving.",
        },
      ],
    },
    {
      kind: "prose",
      id: "stack",
      eyebrow: "Skills",
      heading: "Which tools do I work with?",
      paragraphs: [
        "My main stack is TypeScript, React and Next.js on the front end, with Node.js and PostgreSQL behind them. This site runs on that stack, with Payload as the content system.",
        "For styling, I use Tailwind CSS. For testing, I use Vitest and Playwright, so bugs get caught before your customers find them.",
        [
          "On the automation side, I work with GoHighLevel, n8n, Make and Zapier. My ",
          { text: "AI automation services", href: "/ai-automation-agency" },
          " page covers voice agents and chatbots in detail.",
        ],
      ],
    },
    {
      kind: "prose",
      id: "how-to-vet",
      eyebrow: "Buying guide",
      heading: "How to vet a freelance web developer before you sign",
      paragraphs: [
        "Before you hire any freelance web developer, including me, run a short check. It takes one call and saves months of pain.",
        "Good answers are plain and specific. Vague answers are your warning sign. If someone cannot explain their work simply, they will not explain your project simply either.",
      ],
      bullets: [
        "Ask for a live product you can click, not just screenshots.",
        "Who owns the code and the accounts at the end?",
        "How often will you get updates, and in what form?",
        "What happens if the project runs late?",
        "Get the quote in writing, with a list of what is not included.",
      ],
    },
    {
      kind: "prose",
      id: "ways-to-work",
      eyebrow: "Ways to work",
      heading: "Project, ongoing help or a design partner?",
      paragraphs: [
        "Most clients start with a fixed project. We agree on the scope, the price and the date. You know the full cost before any work begins.",
        "After launch, some clients keep me on for a set block of hours each month. That covers new features, fixes and advice. We agree on the size of the block together.",
        "Agencies and studios also look for website designers for hire who can code what they draw. I do both, or I pair with your designer and build their work as drawn.",
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "What working with me looks like",
      intro: "No mystery and no jargon. Each step ends with something you can check.",
      steps: [
        {
          title: "Intro call",
          when: "Day 1",
          text: "You describe the goal. I ask questions, flag risks and say honestly whether I am the right fit.",
        },
        {
          title: "Scope and quote",
          when: "Within 3 days",
          text: "You get a written scope with milestones, a price and a timeline. We adjust it until it fits.",
        },
        {
          title: "Weekly builds",
          when: "Every week",
          text: "Each week ends with a working preview link and a short note on what is done and what is next.",
        },
        {
          title: "Launch and handover",
          when: "Final week",
          text: "I deploy to your accounts, hand over the code and record a walkthrough for you or your team.",
        },
      ],
    },
    {
      kind: "prose",
      id: "proof",
      eyebrow: "Proof",
      heading: "Work you can check yourself",
      paragraphs: [
        "Over more than five years, I have delivered 400+ projects for clients on Upwork, on Fiverr and through referrals. They range from one-page sites to full web apps.",
        [
          "You can also judge a product I own. I planned and built ",
          {
            text: "SmartQuoteDesk, a multi-industry lead marketplace",
            href: "https://smartquotedesk.com",
          },
          ", with Next.js. Click around, and test how fast it feels.",
        ],
        "On our call, I am happy to share my screen and walk through real code. You do not need to read it. You only need to see that it is tidy and tested.",
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What it costs to hire me",
      intro:
        "I quote a fixed price per project, so the risk of overruns sits with me. Web apps and ongoing work get a custom quote after a call.",
      items: [
        {
          name: "Landing page",
          from: 600,
          label: "Starts at $600.",
          text: "One page, one goal, built to load fast.",
          includes: ["Design and code.", "One lead form.", "Tracking setup."],
        },
        {
          name: "Business website (5 pages)",
          from: 1500,
          label: "Starts at $1,500.",
          text: "A full small-business site you can edit yourself.",
          includes: ["Custom design.", "Lead forms.", "Editing access.", "Launch support."],
        },
        {
          name: "Full system",
          from: 2500,
          label: "Starts at $2,500.",
          text: "Website, GoHighLevel and AI follow-up, built as one.",
          includes: ["Business website.", "CRM setup.", "AI replies for new leads."],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. Your written quote depends on the scope. Hosting, software plans and usage fees go to those providers.",
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "Where to look next",
      items: [
        {
          label: "Website design for small businesses",
          href: "/services/web-design-development",
          text: "What every site I build includes, from design to launch.",
        },
        {
          label: "GoHighLevel agency work",
          href: "/gohighlevel-agency",
          text: "CRM setup that makes sure each lead gets an answer.",
        },
        {
          label: "AI receptionists and workflows",
          href: "/ai-automation-agency",
          text: "Automation for calls, chats and repeat tasks.",
        },
        {
          label: "Pricing and how quotes work",
          href: "/pricing",
          text: "Starting prices, third-party costs and the path to a fixed quote.",
        },
        {
          label: "More about me",
          href: "/about",
          text: "Where I am based, how I work and what I build for myself.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions before you hire a freelance web developer",
    items: [
      {
        question: "Do you charge by the hour or by the project?",
        answer:
          "By the project, in most cases. You get a fixed price for a clear scope, so the total is known up front.\n\nOngoing work after launch runs on a monthly block of hours. We set the size of that block together, based on what you need.",
      },
      {
        question: "Who owns the code when the project ends?",
        answer:
          "You do, in full. The code lives in a repository under your account, and the site runs on hosting you control.\n\nI keep no hidden keys. If you bring in another developer later, they can pick up right where I stopped.",
      },
      {
        question: "Will you sign an NDA?",
        answer:
          "Yes. Send me yours before our call, or ask me for a simple one. I treat client data and business plans as private either way.\n\nI also never show client work in public without written permission.",
      },
      {
        question: "Can you work with my existing team or codebase?",
        answer:
          "Yes. I often join projects that are already running. First I read the code and the open tasks. Then I tell you what I found.\n\nI am comfortable with pull requests, code review and the chat tools your team already uses.",
      },
      {
        question: "How do calls work across time zones?",
        answer:
          "I am in Lahore, Pakistan, and my working day overlaps with US business hours. We can meet live on video during that overlap.\n\nOutside calls, I write short updates. Many clients like waking up to finished work and a clear note.",
      },
      {
        question: "Do you take small jobs and quick fixes?",
        answer:
          "Yes. A broken form, a slow page or a small new feature is a fine place to start. Small jobs are also a low-risk way to see how I work.\n\nTell me the problem, and I will reply with a price and a date.",
      },
      {
        question: "What if I only need a designer?",
        answer:
          "I can design and build, but pure brand design is not my main trade. If you only need a logo or a brand kit, a specialist will serve you better.\n\nIf you need pages designed and coded, that is exactly my work.",
      },
    ],
  },

  finalCta: {
    heading: "Have a project in mind?",
    text: "Book a free strategy call. Tell me what you want to build, and I will tell you how I would do it, how long it takes and what it costs.",
    cta: CTA,
    note: "You talk to me, not a sales team.",
  },

  service: {
    name: "Full stack web development",
    serviceType: "Full stack developer for hire",
    description:
      "Full stack development for US businesses: websites, web apps, API integrations and automation, built with Next.js, React, Node.js and PostgreSQL.",
  },
};
