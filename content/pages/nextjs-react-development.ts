import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /services/nextjs-react-development (service page). Primary keyword: "react development company".
 * Keywords: docs/seo/keyword-map.md (Services, phase 1). Brief: content/briefs/nextjs-react-development.md.
 * The /services hub does not exist yet, so the breadcrumb goes Home › this page.
 * The two FAQ answers on ownership and US time zones are Nayab's own words, kept exactly.
 *
 * TODO(nayab): TIMELINE. Add a typical duration to each process step once you confirm them.
 * TODO(nayab): PORTFOLIO. Add approved Next.js / React projects to the "portfolio" section. Nothing
 * is shown until a client approves it.
 * TODO(nayab): PRICING. No price is shown on purpose. When you set a starting price, add a `prices`
 * block (it also adds the Offer to the Service JSON-LD) and update the page tests.
 */
export const nextjsReactDevelopment: PageContent = {
  path: "/services/nextjs-react-development",
  name: "Next.js and React development",
  updated: "2026-11-19",
  meta: {
    title: "React Development Company for Fast Sites | Nayab Gull",
    description:
      "A small React development company building fast Next.js websites and web apps that rank on Google and are easy to update. Book a free call.",
  },

  // Both forms on this page ask for a custom demo, with "Website" preselected.
  request: { type: "demo", service: "website" },

  hero: {
    eyebrow: "Next.js and React",
    headline: {
      before: "A ",
      highlight: "React development company",
      after: " for fast sites you can update",
    },
    lede: "I build websites and web apps with Next.js and React. Your pages open fast, show up well on Google and stay easy to change.",
    body: [
      "Think of me as a small React development company that writes every line itself. You get one builder, clear updates and code you own.",
    ],
    callout: "Need a faster site or a custom web app?",
    proof: [],
    // Site rule for demo pages (tests/unit/pages/pages.test.tsx): the demo form leads, the call follows.
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Request a custom demo",
      text: "Tell me what you want to build. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "explainer",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What are Next.js and React, in plain words?",
      paragraphs: [
        "React is a tool for building the parts of a website that people see and click. Next.js is a framework that sits on top of React. It turns those parts into full pages that load fast.",
        "Here is why that matters to you. A fast page keeps visitors from leaving. Clean pages help Google understand what you sell.",
        "And a simple editor lets you change text and photos without calling me.",
      ],
      diagramLabel:
        "How a Next.js site works: you edit your content, React builds the page parts, Next.js prepares ready pages, and the visitor gets a fast page.",
      diagram: [
        { label: "Your content", caption: "Text and photos you edit", icon: "rules" },
        { label: "React", caption: "Builds buttons, forms and cards", icon: "code" },
        { label: "Next.js", caption: "Turns them into ready pages", icon: "spark" },
        { label: "Visitor", caption: "Gets a fast page on any phone", icon: "check" },
      ],
      notes: [
        {
          text: "Speed. Next.js prepares pages ahead of time, so they open fast, even on a phone with a weak signal.",
          icon: "spark",
        },
        {
          text: "SEO. Google gets clean pages with real text, titles and links. That makes your business easier to find.",
          icon: "globe",
        },
        {
          text: "Easy updates. I connect a simple editor, so you can change prices, photos and posts on your own.",
          icon: "wrench",
        },
      ],
      callout:
        "You do not need to learn any of this. You get a site that is fast, easy to find and easy to change.",
    },
    {
      kind: "features",
      id: "what-i-build",
      eyebrow: "What I build",
      heading: "React development services: what I build",
      intro:
        "My React development services cover six kinds of projects. Most clients start with one and add more later.",
      layout: "cards",
      items: [
        {
          title: "Marketing sites",
          text: "Fast business websites with clear pages, strong calls to action and forms that reach you right away.",
          icon: "globe",
        },
        {
          title: "Web apps and dashboards",
          text: "Private tools where your team or your clients log in, see their data and get work done.",
          icon: "layout",
        },
        {
          title: "SaaS front ends",
          text: "The screens your paying users see every day: sign-up, billing, settings and the main app.",
          icon: "crm",
        },
        {
          title: "Headless CMS sites",
          text: "You edit content in a simple dashboard, and the site shows it fast. I use Payload CMS for this.",
          icon: "rules",
        },
        {
          title: "E-commerce front ends",
          text: "Quick product and checkout pages that sit on top of Shopify or another store system.",
          icon: "cart",
        },
        {
          title: "API and Node.js back ends",
          text: "The server side of your app: logins, payments, data and links to tools like your CRM.",
          icon: "plug",
        },
      ],
      outro: [
        "Need a classic small business site with no custom features? See my ",
        { text: "website design services", href: "/services/web-design-development" },
        " instead.",
      ],
    },
    {
      kind: "compare",
      id: "compare",
      eyebrow: "Compare",
      heading: "Next.js vs WordPress vs page builders",
      intro:
        "Each option has its place. Here is an honest look, so you can pick the right one for your business.",
      rowLabel: "Question",
      columns: ["Next.js and React", "WordPress", "Page builders"],
      rows: [
        {
          label: "Speed",
          cells: [
            "Very fast, because pages are ready before anyone asks.",
            "Fast with care, but plugins often slow it down.",
            "Often slow, with heavy code you cannot remove.",
          ],
        },
        {
          label: "Google and SEO",
          cells: [
            "Clean code and full control over titles and page structure.",
            "Good, with an SEO plugin and regular checks.",
            "Basic. You get only what the builder allows.",
          ],
        },
        {
          label: "Easy updates",
          cells: [
            "Easy, once I connect a simple editor.",
            "Easy. Most people know the dashboard.",
            "Very easy. You drag and drop.",
          ],
        },
        {
          label: "Custom features",
          cells: [
            "No limits. Logins, dashboards and full apps are all possible.",
            "Good, through plugins, but plugins can clash.",
            "Limited to what the tool offers.",
          ],
        },
        {
          label: "Upkeep",
          cells: [
            "Low. There are few moving parts to patch.",
            "Regular plugin and security updates.",
            "The platform handles it for a monthly fee.",
          ],
        },
        {
          label: "Best for",
          cells: [
            "Growing businesses that need speed or custom features.",
            "Blogs and content sites on a tight budget.",
            "A quick first site you build yourself.",
          ],
        },
      ],
      note: "If WordPress or a page builder suits you better, I will tell you on the call. Honest advice comes first.",
    },
    {
      kind: "features",
      id: "stack",
      eyebrow: "My stack",
      heading: "The tools I use, and why",
      intro: "I keep a small, proven set of tools. Each one has a clear job.",
      layout: "cards",
      items: [
        {
          title: "Next.js",
          text: "Fast pages, strong SEO and one codebase for your site and your app.",
          icon: "spark",
        },
        {
          title: "React",
          text: "Buttons, forms and screens that respond the moment people click.",
          icon: "code",
        },
        {
          title: "TypeScript",
          text: "Catches many mistakes in the code before your site goes live.",
          icon: "shield",
        },
        {
          title: "Node.js",
          text: "Runs the server side: logins, emails and links to other apps.",
          icon: "chip",
        },
        {
          title: "Tailwind CSS",
          text: "Clean design that looks right on every screen size.",
          icon: "layout",
        },
        {
          title: "PostgreSQL",
          text: "A reliable database for your users, orders and leads.",
          icon: "database",
        },
        {
          title: "Payload CMS",
          text: "A simple editor for your text, photos and pages.",
          icon: "rules",
        },
        {
          title: "Vercel",
          text: "Hosting that keeps pages fast for visitors all over the US.",
          icon: "globe",
        },
      ],
      outro:
        "You do not need to know these names. They matter because they keep your site fast, safe and easy to grow.",
    },
    {
      kind: "features",
      id: "hire",
      eyebrow: "Hire",
      heading: "Hire a Next.js developer who builds front and back end",
      intro:
        "Many owners hire React developers for the screens. Then they hire a Node.js developer for the server. With me, the same builder does both.",
      layout: "checklist",
      paragraphs: [
        "That means fewer handoffs and fewer gaps. The front end and the back end fit together, because I build them together.",
        [
          "Want the full picture of how I work with clients? Read how to ",
          { text: "hire a full stack developer", href: "/hire-full-stack-developer" },
          " for your project.",
        ],
      ],
      listIntro: "When you hire me, you get:",
      items: [
        { text: "One point of contact from plan to launch." },
        { text: "Short weekly updates in plain English." },
        { text: "Clean, typed code that any good developer can pick up." },
        { text: "Full access to the code and every account." },
        { text: "Speed and SEO checks before launch." },
        { text: "Help after launch when you need changes." },
      ],
      outro:
        "A bigger React development agency adds account managers and extra layers. A large Next.js development company often splits your project across many people. I keep it simple and direct.",
    },
    {
      // TODO(nayab): TIMELINE. Add a typical duration to each step once you confirm them.
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "My Next.js and React process",
      intro:
        "Five clear steps take your project from the first call to launch. You get a timeline for your project after that call.",
      steps: [
        {
          title: "Free call and plan",
          text: "I learn about your business, your goals and your current site. Then I suggest the right pages and features.",
        },
        {
          title: "Design",
          text: "First, I design the key pages, so you see the look before any code. You give feedback, and I adjust.",
        },
        {
          title: "Build",
          text: "Next, I build the site or app with Next.js and React. A private preview link lets you follow the progress.",
        },
        {
          title: "Test",
          text: "I test speed, forms, phones and Google basics. Then you review everything before launch.",
        },
        {
          title: "Launch and support",
          text: "Your site goes live on your own accounts, and I show you how to update it. After that, I stay on hand for fixes and new features.",
        },
      ],
    },
    {
      // TODO(nayab): PORTFOLIO. Replace the "Portfolio" card with real, approved project cards.
      kind: "features",
      id: "portfolio",
      eyebrow: "Portfolio",
      heading: "Next.js and React projects",
      layout: "cards",
      paragraphs: [
        "Over five years, I have delivered 400+ projects for clients in the US, the UK and beyond.",
      ],
      example: {
        label: "Portfolio",
        paragraphs: [
          "I am choosing the projects to show here, each with the client's approval. Until then, ask me on the call, and I will walk you through live work.",
        ],
      },
      outro: [
        "You can also read ",
        { text: "more about me and my background", href: "/about" },
        " before you book.",
      ],
    },
    {
      // TODO(nayab): PRICING. No numbers until you approve a starting price.
      kind: "features",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does a Next.js or React project cost?",
      intro: "Every project gets a fixed, written price before any work starts.",
      layout: "cards",
      paragraphs: [
        "The price depends on three things. How many pages or screens do you need? How many tools should I connect, and how much custom logic does it need?",
        "A marketing site costs far less than a full web app. You see the full scope and price before you decide.",
      ],
      outro: [
        "See how I price my work on the ",
        { text: "website pricing page", href: "/pricing" },
        ", or ask for a quote on a free call.",
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "What does a React development company do?",
        answer:
          "It plans, designs and builds websites and web apps with React. I also use Next.js, so your pages load fast and are easy for Google to read.",
      },
      {
        question: "Is Next.js better than WordPress for my business?",
        answer:
          "It depends on your goals. Next.js is faster and more flexible, which helps with SEO and custom features. WordPress is fine for a simple blog on a small budget. I will tell you honestly which one fits.",
      },
      {
        question: "Can I update the site myself?",
        answer:
          "Yes. I connect Payload CMS, a simple editor where you change text, photos and pages. You never need to touch the code.",
      },
      {
        question: "Will a Next.js site help me rank on Google?",
        answer:
          "It gives you a strong start. Fast pages, clean code and clear titles all help Google understand your site. No one can promise a top ranking, and I never do.",
      },
      {
        question: "How long does a project take?",
        answer:
          "It depends on the size. A marketing site takes less time than a web app with logins and payments. You get a clear timeline after the first call.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a database service. I build everything inside those accounts: the code, the setup and the full site.\n\nAt launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
    ],
  },

  closing: {
    heading: "Ready for a faster website or web app?",
    text: "Tell me what you want to build and what slows you down today. I will reply with a clear plan and an idea for your custom demo. Or book a free call and talk it through.",
    form: {
      heading: "Request your custom demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "Next.js and React development for US businesses",
    serviceType: "React development services",
    description:
      "Fast websites, web apps, SaaS front ends and Node.js back ends built with Next.js and React for US small businesses and startups.",
  },
};
