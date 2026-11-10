import { STRATEGY_CALL_URL } from "../home.ts";

import type { PageContent } from "./types.ts";

const CTA = { label: "Book a free strategy call", href: STRATEGY_CALL_URL };

/**
 * /pricing. Primary keyword: "website development cost".
 * The five "starts at" prices below are the ones Nayab approved on November 10, 2026. Never add or
 * change a price without approval, and always show them as starting prices, never as guarantees.
 * TODO(nayab): confirm how scope changes are handled and every FAQ answer. Payment terms (deposit,
 * milestones, refunds) are not stated anywhere because they are not decided yet.
 */
export const pricing: PageContent = {
  path: "/pricing",
  name: "Pricing",
  updated: "2026-11-10",
  meta: {
    title: "Website Development Cost and Pricing | Nayab Gull",
    description:
      "Website development cost, in plain numbers: landing pages from $600, business websites from $1,500, full systems from $2,500. Book a free strategy call.",
  },

  hero: {
    eyebrow: "Pricing",
    headline: {
      before: "",
      highlight: "Website development cost",
      after: ", with real starting prices",
    },
    lede: "Most developers hide their prices until a sales call. Here are mine. Each number is a starting price, and your exact quote comes in writing before any work begins.",
    proof: ["Fixed written quotes", "No long contracts", "You own everything"],
    primaryCta: CTA,
    secondaryCta: { label: "See the prices", href: "#prices" },
  },

  blocks: [
    {
      kind: "prices",
      id: "prices",
      eyebrow: "Starting prices",
      heading: "What each service starts at",
      intro:
        "Five services, five starting prices in US dollars. Pick the one closest to what you need, and we refine it on a call.",
      items: [
        {
          name: "Landing page",
          from: 600,
          label: "Starts at $600.",
          text: "A single page built around one offer, for ads or a campaign.",
          includes: [
            "Custom design and code.",
            "One lead form with tracking.",
            "Fast load on phones.",
          ],
        },
        {
          name: "Business website (5 pages)",
          from: 1500,
          label: "Starts at $1,500.",
          text: "A full small-business site: home, services, about, work and contact.",
          includes: [
            "Custom design on each page.",
            "Lead forms and call buttons.",
            "On-page SEO basics.",
            "Editing access and training.",
          ],
        },
        {
          name: "GoHighLevel setup",
          from: 750,
          label: "Starts at $750.",
          text: "Your CRM set up and ready. You pay your GoHighLevel subscription to them.",
          includes: [
            "Account, users and phone number.",
            "One pipeline and core workflows.",
            "A2P 10DLC texting registration.",
          ],
        },
        {
          name: "AI voice receptionist",
          from: 750,
          label: "Starts at $750 for setup, plus $149 per month.",
          text: "An AI agent that answers calls and books visits. You pay for the call minutes.",
          includes: ["Custom call script.", "Calendar booking.", "Monthly tuning and support."],
        },
        {
          name: "Full system",
          from: 2500,
          label: "Starts at $2,500.",
          text: "Website, GoHighLevel and AI, built together as one lead system.",
          includes: [
            "Business website.",
            "CRM setup and follow-up.",
            "AI replies for new leads.",
            "Launch support and training.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. Your price depends on the scope we agree on in writing. Third-party costs, such as software plans, hosting and call minutes, go to those providers.",
    },
    {
      kind: "prose",
      id: "what-changes-it",
      eyebrow: "The factors",
      heading: "What changes the cost of web design?",
      paragraphs: [
        "Scope changes the cost of web design more than anything else. A five-page site with one form is a small job. Twenty pages, a booking tool and three integrations is a large one.",
        "The price follows the hours, and the hours follow the list below. When we talk, I ask about each item, so the quote has no guesswork in it.",
      ],
      bullets: [
        "Number of pages, and how different their layouts are.",
        "Custom features, such as calculators, portals or bookings.",
        "Who writes the text and supplies the photos.",
        "Links to other tools, like a CRM or a payment system.",
        "An online store, and how many products it holds.",
        "A tight deadline that needs evening and weekend work.",
      ],
    },
    {
      kind: "cards",
      id: "third-party",
      eyebrow: "Other costs",
      heading: "What you pay to other companies",
      intro:
        "My fee covers my work. Some services bill you directly, in your own accounts. I tell you about each one before you commit.",
      columns: 3,
      items: [
        {
          title: "Domain and hosting",
          text: "Your web address renews once a year. Hosting bills monthly or yearly. Both stay in your name.",
        },
        {
          title: "GoHighLevel subscription",
          text: "You choose a plan with GoHighLevel and pay them. Texts, calls and emails sent from the CRM are billed by usage.",
        },
        {
          title: "AI and phone usage",
          text: "AI voice agents use phone minutes and AI model time. The more calls you get, the more you use.",
        },
      ],
    },
    {
      kind: "prose",
      id: "web-apps",
      eyebrow: "Custom builds",
      heading: "What about web app development cost?",
      paragraphs: [
        "Web app development cost depends on the features, so it always gets a custom quote. A client portal, a marketplace and a quote calculator share almost nothing under the hood.",
        "To keep it sane, we start with the smallest version that is useful. You launch that, learn from real users and then decide what to add. This keeps the first bill low and the risk lower.",
        [
          "For this kind of work, see how you can ",
          { text: "hire me as a full stack developer", href: "/hire-full-stack-developer" },
          ".",
        ],
      ],
    },
    {
      kind: "prose",
      id: "why-prices-differ",
      eyebrow: "The market",
      heading: "Why is website design pricing so different everywhere?",
      paragraphs: [
        "Website design pricing varies because you are buying very different things. A DIY builder sells you software, and you do the work. Template shops sell speed. Large agencies sell a full team and its overhead.",
        "I sell one experienced person's time and judgment. There is no sales team, no office and no account manager in my price. That is why my numbers sit below most agencies and above the cheapest template shops.",
        "The cheapest quote is rarely the lowest cost. A slow site that brings no leads is expensive at any price.",
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "How quotes work",
      heading: "From rough idea to fixed price",
      intro: "You will know the full cost before you spend a dollar.",
      steps: [
        {
          title: "Free call",
          when: "30 minutes",
          text: "You explain what you need. I ask about pages, features, tools and deadlines.",
        },
        {
          title: "Written quote",
          when: "Within 3 days",
          text: "You receive the scope, the price, the timeline and a list of what is not included.",
        },
        {
          title: "You decide",
          when: "No rush",
          text: "Take your time, compare other quotes and ask me anything. Work starts only after you approve.",
        },
        {
          title: "Changes later",
          when: "As needed",
          text: "If you want to add something mid-project, it gets its own small quote first. No surprise lines on the bill.",
        },
      ],
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "The services",
      heading: "See what each price includes",
      items: [
        {
          label: "Web design and development",
          href: "/services/web-design-development",
          text: "What goes into a landing page or a business website.",
        },
        {
          label: "GoHighLevel agency services",
          href: "/gohighlevel-agency",
          text: "The full list of what a CRM setup covers.",
        },
        {
          label: "AI automation agency services",
          href: "/ai-automation-agency",
          text: "How the AI voice receptionist works and where its limits are.",
        },
        {
          label: "Roofing and HVAC website design",
          href: "/industries/roofing-hvac-website-design",
          text: "An example of these packages applied to one industry.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions about cost",
    items: [
      {
        question: "Are these prices fixed?",
        answer:
          "They are starting prices. A simple project can land right on them. A bigger scope costs more.\n\nOnce we agree on the scope, your quote is fixed in writing. It does not creep up unless you ask for more work.",
      },
      {
        question: "Is the first call really free?",
        answer:
          "Yes. The strategy call costs nothing, and you keep the advice whether or not you hire me.\n\nI use the call to learn about your project. You use it to see if I am a good fit.",
      },
      {
        question: "Are there monthly fees?",
        answer:
          "Only the AI voice receptionist has a monthly fee from me. It is $149 per month for tuning and support.\n\nWebsites and CRM setups are one-time projects. Ongoing care is optional, and we agree on it only if you want it.",
      },
      {
        question: "Why do you not list an hourly rate?",
        answer:
          "A fixed price is fairer to you. With hourly billing, a slow developer earns more, and you carry the risk.\n\nWith a fixed quote, the risk is mine. If the work takes longer than I planned, the price stays the same.",
      },
      {
        question: "Can I start small and add more later?",
        answer:
          "Yes, and I often suggest it. Start with a landing page or a five-page site. Add the CRM and the AI once leads are coming in.\n\nEverything I build is made to grow, so early work is never thrown away.",
      },
      {
        question: "Is the full system cheaper than buying each part?",
        answer:
          "Usually, yes. Building the website, the CRM and the AI together saves setup time, because the parts get planned as one.\n\nThe full system starts at $2,500. Your quote shows exactly what it includes.",
      },
    ],
  },

  finalCta: {
    heading: "Want a real number for your project?",
    text: "Book a free strategy call. Tell me what you need, and you will have a fixed, written quote within three days.",
    cta: CTA,
    note: "No obligation, and no follow-up spam.",
  },

  service: {
    name: "Web development, GoHighLevel and AI automation",
    serviceType: "Website development",
    description:
      "Starting prices for landing pages, business websites, GoHighLevel setup, AI voice receptionists and full lead systems for US businesses.",
  },
};
