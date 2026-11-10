import { home, STRATEGY_CALL_URL } from "../home.ts";

import type { PageContent } from "./types.ts";

const CTA = { label: "Book a free strategy call", href: STRATEGY_CALL_URL };

/**
 * /about. Primary keyword: "nayab gull" (brand).
 * TODO(nayab): add your photo at public/images/nayab-gull.webp, then set `photo` below (and in
 * content/home.ts). Until then the page shows the "NG" initials avatar.
 * TODO(nayab): send your real LinkedIn, GitHub and Upwork profile URLs. They go into the Person
 * JSON-LD as `sameAs` (seo.md §6) and into a "Find me online" line on this page. None are shown now.
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
      "Meet Nayab Gull, a full-stack developer in Lahore, Pakistan, who builds websites, GoHighLevel CRMs and AI automation for US businesses. Book a free call.",
  },

  hero: {
    eyebrow: "About",
    headline: {
      before: "I'm ",
      highlight: "Nayab Gull",
      after: ". I build websites and automation that book calls.",
    },
    lede: "I am a full-stack developer in Lahore, Pakistan. For more than five years, I have built sites, CRMs and AI tools for business owners in the US, the UK and beyond.",
    proof: ["5+ years", "400+ projects delivered", "One person, start to finish"],
    primaryCta: CTA,
  },

  blocks: [
    {
      kind: "profile",
      id: "about",
      about: {
        ...home.about,
        eyebrow: "The short version",
        heading: "Who you will be working with",
        photo: null,
        link: undefined,
        text: [
          "I write code for a living, and I like the business side just as much. A site is only good if it brings you work.",
          "Clients first found me on Upwork and Fiverr. Many stayed, and many sent friends. That is how one-off gigs turned into 400+ finished projects.",
          "Today I work with a small number of clients at a time, so each one gets my full attention.",
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
          "Second, I set up CRMs. As a ",
          { text: "GoHighLevel agency of one", href: "/gohighlevel-agency" },
          ", I build the pipelines, texts and calendars that keep leads from going cold.",
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
          text: "There is no account manager between us. When you ask a question, the person who wrote the code answers it.",
        },
        {
          title: "You own everything",
          text: "Domains, hosting, CRM accounts and code sit in your name. If we part ways, you keep all of it.",
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
        "We meet on video calls during that overlap. Between calls, I send written updates, so you always know where your project stands.",
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
          text: "The kinds of projects I take on and how we would work together.",
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
        question: "Are you a company or one person?",
        answer:
          "One person. I plan, design and code the work myself. When a project needs extra hands, such as a copywriter, I bring in people I trust and stay in charge of the result.",
      },
      {
        question: "Where are you based?",
        answer:
          "I am based in Lahore, Pakistan. My clients are mostly in the United States, with others in the UK and elsewhere. All of my work happens online.",
      },
      {
        question: "How do I reach you?",
        answer:
          "The fastest way is to book a free strategy call from this page. Pick a time that suits you, and we talk on video.",
      },
    ],
  },

  finalCta: {
    heading: "Let's talk about your project",
    text: "Book a free strategy call. Tell me where your leads come from today, and I will show you what I would build first.",
    cta: CTA,
    note: "One call, no pressure.",
  },

  person: true,
};
