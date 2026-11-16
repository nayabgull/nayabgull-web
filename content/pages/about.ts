import { CALL_CTA, DIRECT_BENEFIT, home, TRUSTED_TEAM_LINE } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /about. Primary keyword: "nayab gull" (brand).
 * The page is text only: no photo and no avatar.
 * TODO(nayab): send your real LinkedIn, GitHub and Upwork profile URLs. They go into the Person
 * JSON-LD as `sameAs` (seo.md §6) and into a "Find me online" line on this page. None are shown now.
 * Identity: a small web development agency run by Nayab Gull (see IDENTITY_LINE in content/home.ts).
 * TODO(nayab): this page states only facts you have confirmed. Add your own story (how you started,
 * what you studied, why you do this work) in your own words; never let anyone invent it.
 */
export const about: PageContent = {
  path: "/about",
  name: "About",
  updated: "2026-11-10",
  meta: {
    title: "About Nayab Gull, Full-Stack Developer | Nayab Gull",
    description:
      "Meet Nayab Gull, who runs a small web development agency for US businesses: websites, GoHighLevel CRMs and AI automation, built by her. Book a free call.",
  },

  hero: {
    eyebrow: "About",
    headline: {
      before: "I'm ",
      highlight: "Nayab Gull",
      after: ". I build websites and automation that book calls.",
    },
    lede: "I lead every project myself from Lahore, Pakistan, and I build the core work. For more than five years, I have built sites, CRMs and AI tools for owners in the US, the UK and beyond.",
    proof: ["5+ years", "400+ projects delivered", "You work with me, start to finish"],
    primaryCta: CALL_CTA,
  },

  blocks: [
    {
      kind: "profile",
      id: "about",
      about: {
        ...home.about,
        eyebrow: "The short version",
        heading: "A small agency, led by the person who builds",
        link: undefined,
        text: [
          "I started as a full-stack developer. Clients first found me on Upwork and Fiverr. Many stayed, and many sent friends. That is how one-off gigs turned into 400+ finished projects.",
          "Today I run a small web development agency for US businesses. I lead every project myself, and I build the core work: the site, the CRM setup and the automation.",
          TRUSTED_TEAM_LINE,
          "I take on a small number of clients at a time, so each one gets my full attention.",
        ],
      },
    },
    {
      kind: "prose",
      id: "what-i-do",
      eyebrow: "What I do",
      heading: "Three services that work as one system",
      paragraphs: [
        [
          "First, I build websites. My ",
          { text: "web design and development service", href: "/services/web-design-development" },
          " covers everything from a single landing page to a full business site.",
        ],
        [
          "Second, I set up CRMs. My ",
          { text: "small GoHighLevel agency", href: "/gohighlevel-agency" },
          " builds the pipelines, texts and calendars that keep leads from going cold, and I set them up myself.",
        ],
        [
          "Third, I add AI. My ",
          { text: "AI automation services", href: "/ai-automation-agency" },
          " put a receptionist on your phone line and take repeat tasks off your desk.",
        ],
        "Each part helps on its own. Together, they turn a visitor into a booked call without anyone lifting a finger.",
      ],
    },
    {
      kind: "cards",
      id: "principles",
      eyebrow: "How I work",
      heading: "Why clients choose to work with Nayab Gull",
      intro:
        "Skills matter, but habits matter more. These four rules shape every project I take on.",
      columns: 2,
      items: [
        {
          title: "You talk to the builder",
          text: DIRECT_BENEFIT,
        },
        {
          title: "You own everything",
          text: "Domains, hosting, CRM accounts and code sit in your name. If you ever move on, you keep all of it.",
        },
        {
          title: "Plain words, in writing",
          text: "You get short written updates and a fixed quote. Technical choices come with a plain reason, the way I would explain them to a friend.",
        },
        {
          title: "No promises I cannot keep",
          text: "I will not promise rankings or revenue. I promise careful work, honest advice and a clear answer when something is a bad idea.",
        },
      ],
    },
    {
      kind: "prose",
      id: "product",
      eyebrow: "My own product",
      heading: "What I build when I am the client",
      paragraphs: [
        [
          "Outside client work, I run ",
          { text: "SmartQuoteDesk", href: "https://smartquotedesk.com" },
          ". It is a lead marketplace that serves several industries from one platform, and I built it with Next.js.",
        ],
        "Running my own product keeps me honest. I feel the same pain my clients feel: slow pages cost leads, and confusing forms cost more. What I learn there goes straight into client projects.",
      ],
    },
    {
      kind: "prose",
      id: "location",
      eyebrow: "Where and when",
      heading: "Based in Lahore, working on US time",
      paragraphs: [
        "I live and work in Lahore, Pakistan. I do not have a US office, and I will never pretend to. What I do have is a workday that overlaps with US business hours.",
        "You and I meet on video calls during that overlap. Between calls, I send written updates, so you always know where your project stands.",
      ],
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Next steps",
      heading: "Where to go from here",
      items: [
        {
          label: "Hire me as your full stack developer",
          href: "/hire-full-stack-developer",
          text: "The kinds of projects I take on and how I work with clients.",
        },
        {
          label: "See starting prices",
          href: "/pricing",
          text: "Clear numbers for websites, CRM setup and AI.",
        },
        {
          label: "Websites for roofing and HVAC companies",
          href: "/industries/roofing-hvac-website-design",
          text: "One industry I build for, explained in detail.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Quick answers about me",
    items: [
      {
        question: "Are you an agency or a freelancer?",
        answer: `I run a small web development agency, and I lead every project myself. I plan the work, and I build the core of it.\n\n${TRUSTED_TEAM_LINE} ${DIRECT_BENEFIT}`,
      },
      {
        question: "Where are you based?",
        answer:
          "I am based in Lahore, Pakistan. My clients are mostly in the United States, with others in the UK and elsewhere. All of my work happens online.",
      },
      {
        question: "How do I reach you?",
        answer:
          "The fastest way is to book a free strategy call from this page. Pick a time that suits you, and I will meet you on video.",
      },
    ],
  },

  closing: {
    heading: "Tell me about your project",
    text: "Send the short form, and tell me where your leads come from today. I will show you what I would build first.",
  },

  person: true,
};
