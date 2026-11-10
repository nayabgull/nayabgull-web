import { STRATEGY_CALL_URL } from "../home.ts";

import type { PageContent } from "./types.ts";

const CTA = { label: "Book a free strategy call", href: STRATEGY_CALL_URL };

/**
 * /services/web-design-development (service page). Primary keyword: "website design company".
 * TODO(nayab): confirm the tech list (Next.js, React, Payload, WordPress, Shopify), the timelines and
 * every FAQ answer. The /services hub does not exist yet, so the breadcrumb goes Home › this page.
 */
export const webDesignDevelopment: PageContent = {
  path: "/services/web-design-development",
  name: "Web design and development",
  updated: "2026-11-10",
  meta: {
    title: "Website Design Company for Small Business | Nayab Gull",
    description:
      "A one-person website design company for US small businesses. Fast, custom sites that bring in leads. Business websites start at $1,500. Book a free call.",
  },

  hero: {
    eyebrow: "Web design and development",
    headline: {
      before: "A ",
      highlight: "website design company",
      after: " of one, building sites that bring in leads",
    },
    lede: "I design and code your site myself. It loads fast, reads clearly and gives every visitor one obvious next step: call, book or ask for a quote.",
    proof: ["5+ years", "400+ projects delivered", "Business websites start at $1,500"],
    primaryCta: CTA,
    secondaryCta: { label: "See what you get", href: "#deliverables" },
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Why your current site is not pulling its weight",
      intro:
        "Most small-business sites fail in quiet ways. Nobody complains. People just leave. These are the three causes I find most.",
      columns: 3,
      items: [
        {
          title: "It is slow on a phone",
          text: "Heavy themes, huge images and a pile of plugins make pages crawl. Visitors on mobile data give up before the first photo shows.",
        },
        {
          title: "It looks fine but asks for nothing",
          text: "The design is pretty, yet there is no clear button, no short form and no reason to act today. Nice pages do not pay the bills.",
        },
        {
          title: "You cannot change a word",
          text: "Each small edit means an email to a developer and a week of waiting. So the prices, hours and photos slowly go out of date.",
        },
      ],
    },
    {
      kind: "prose",
      id: "what-to-expect",
      eyebrow: "The basics",
      heading: "What should a web design company deliver?",
      paragraphs: [
        "A web design company should deliver a site that wins you customers, not just a set of pages. That means a clear message, fast load times, working forms and a way to measure results.",
        "Design and code are only half of it. The other half is structure: which pages you need, what each one says and where the visitor goes next. I plan that with you before I draw anything.",
        "You also need to own the result. The domain, the hosting account and the content belong to you from day one.",
      ],
      bullets: [
        "A page plan built around what your buyers search for.",
        "A custom design that matches your brand.",
        "Forms and call buttons that reach you right away.",
        "Simple editing, so you can update the site yourself.",
      ],
    },
    {
      kind: "cards",
      id: "deliverables",
      eyebrow: "Deliverables",
      heading: "Website design services, start to finish",
      intro: "Every project includes the six parts below. Nothing here is an upsell.",
      columns: 3,
      items: [
        {
          title: "Custom design",
          text: "No recycled template. I design your pages around your services, your photos and the action you want visitors to take.",
        },
        {
          title: "Mobile-first build",
          text: "I build the phone layout first, then scale up to tablets and desktops. Text stays readable, and buttons stay easy to tap.",
        },
        {
          title: "Words and structure",
          text: "I help shape your headlines and page order. You know your business. My part is making it clear to a stranger in ten seconds.",
        },
        {
          title: "On-page SEO basics",
          text: "Each page gets a proper title, description, headings and structured data. A sitemap tells search engines what to read.",
        },
        {
          title: "Lead forms and tracking",
          text: "Forms send leads to your inbox, your phone or your CRM. Tracking shows which pages bring calls and which ones need work.",
        },
        {
          title: "Launch and training",
          text: "I connect your domain, test every page and record a short video on how to edit your content.",
        },
      ],
    },
    {
      kind: "prose",
      id: "tech",
      eyebrow: "Tech",
      heading: "What do I build your site with?",
      paragraphs: [
        "I pick the tool that fits your goal, not the one that is trendy. For most business sites, I use Next.js and React. They produce very fast pages, which helps both visitors and search engines.",
        "For editing, I add a content system called a CMS. It gives you a simple screen to change text, photos and prices without touching code. I often use Payload for this.",
        "Some projects suit other platforms. WordPress works well when you want a large library of plugins. Shopify is the safe choice for most online stores. On our call, I explain the trade-offs in plain words.",
      ],
    },
    {
      kind: "prose",
      id: "options",
      eyebrow: "Your options",
      heading: "Freelancer, website creation company or big web design firms?",
      paragraphs: [
        "It depends on your budget and how much contact you want. A DIY builder is cheapest, but your time is the hidden cost. A low-cost website creation company is quick, though you often get a template and a queue.",
        "Large web design firms bring a full team and a matching price. That makes sense for big brands with many people who must approve things.",
        "A one-person web design agency like mine sits in between. You talk to the person who writes the code. Decisions take a message, not a meeting, and the quote has no account-manager fees inside it.",
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "How your new site comes together",
      intro: "Four steps, each with something you can see and approve.",
      steps: [
        {
          title: "Discovery call",
          when: "Day 1",
          text: "We talk about your customers, your services and the sites you like. I ask what a good lead looks like for you.",
        },
        {
          title: "Page plan and quote",
          when: "Within 3 days",
          text: "You receive a sitemap, a rough layout of the homepage and a fixed price. Nothing starts until you sign off.",
        },
        {
          title: "Design, then code",
          when: "2 to 6 weeks",
          text: "First you approve the look. Then I build it and share a private link, so you can click through real pages.",
        },
        {
          title: "Test and launch",
          when: "Launch week",
          text: "I check speed, forms and every screen size. We pick a launch day, and I watch the site closely that week.",
        },
      ],
    },
    {
      kind: "prose",
      id: "proof",
      eyebrow: "Proof",
      heading: "A site I built that you can click through",
      paragraphs: [
        [
          "The best proof is a live product. ",
          { text: "SmartQuoteDesk is a lead marketplace", href: "https://smartquotedesk.com" },
          " that I planned, designed and built with Next.js. It serves several industries from one platform.",
        ],
        "Behind it are five years of client work and more than 400 delivered projects, from one-page sites to full web apps. Clients have come from the US, the UK and other countries.",
        "This very site is also my work. If it loaded fast and made sense to you, that is the standard your project gets.",
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What a website development company charges here",
      intro:
        "I am a small website development company, so the quote covers the work and little else. These starting prices show the range.",
      items: [
        {
          name: "Landing page",
          from: 600,
          label: "Starts at $600.",
          text: "One page with one goal, ideal for an ad campaign or a single offer.",
          includes: ["Custom design.", "One lead form.", "Speed and tracking setup."],
        },
        {
          name: "Business website (5 pages)",
          from: 1500,
          label: "Starts at $1,500.",
          text: "A complete small-business site, such as home, services, about, work and contact.",
          includes: [
            "Custom design on every page.",
            "Lead forms and call buttons.",
            "On-page SEO basics.",
            "Editing access and training.",
          ],
        },
        {
          name: "Full system",
          from: 2500,
          label: "Starts at $2,500.",
          text: "Your website plus a CRM and AI follow-up, set up together.",
          includes: [
            "Everything in the business website.",
            "GoHighLevel pipelines and messages.",
            "AI replies for new leads.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. More pages, custom features, online stores and content writing raise the price. Domain, hosting and software plans go to those providers.",
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "What to add once the site is live",
      items: [
        {
          label: "GoHighLevel CRM setup",
          href: "/gohighlevel-agency",
          text: "Send every form into a pipeline and reply by text in seconds.",
        },
        {
          label: "AI automation for small business",
          href: "/ai-automation-agency",
          text: "Let an AI receptionist answer calls when you cannot.",
        },
        {
          label: "Roofing and HVAC website design",
          href: "/industries/roofing-hvac-website-design",
          text: "See how these ideas apply to one trade, page by page.",
        },
        {
          label: "Hire me for a web app or custom build",
          href: "/hire-full-stack-developer",
          text: "For projects that go beyond a marketing site.",
        },
        {
          label: "Website development cost, explained",
          href: "/pricing",
          text: "Starting prices and the six things that move a quote up or down.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions about working with a web design agency of one",
    items: [
      {
        question: "How much does a small-business website cost?",
        answer:
          "A five-page business website starts at $1,500, and a landing page starts at $600. Bigger sites, stores and custom features cost more.\n\nAfter our first call, you get a fixed quote in writing. It names each page and feature, so you know what you are paying for.",
      },
      {
        question: "How long does a website take?",
        answer:
          "Most sites take two to six weeks from the signed plan to launch. A landing page can be ready sooner.\n\nContent is the usual delay. If your photos and service details arrive in the first week, the rest moves quickly.",
      },
      {
        question: "Can you redesign my current site without hurting my Google traffic?",
        answer:
          "Yes, with care. Before the switch, I list your current pages and point each old address to its new one. That keeps links and bookmarks working.\n\nTraffic can still dip for a short time after any redesign. Good redirects and a faster site give you the best odds of a smooth move.",
      },
      {
        question: "Who writes the text and supplies the photos?",
        answer:
          "We do it together. You bring the facts about your business. I turn them into clear pages and send drafts for your edits.\n\nReal photos of you, your team and your work beat stock images every time. Phone photos in good light are fine to start.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "Yes. You get a login to a simple editing screen and a short training video. Changing text, photos, prices and hours takes a few minutes.\n\nLarger changes, such as a new page layout, are quick jobs you can send my way.",
      },
      {
        question: "What about hosting and care after launch?",
        answer:
          "I set up hosting in an account you own and show you what it costs. For most small sites, that monthly bill is small.\n\nAfter launch, you can message me for fixes and updates. If you prefer a regular plan for updates and checks, we can agree on one.",
      },
      {
        question: "Do you build online stores?",
        answer:
          "Yes. For most stores, I recommend Shopify because payments, stock and shipping work out of the box. I design the store and set up your products.\n\nStores take more time than a brochure site, so they get their own quote.",
      },
    ],
  },

  finalCta: {
    heading: "Ready for a site that earns its keep?",
    text: "Book a free strategy call. We look at your current site together, and you leave with a page plan and a price range.",
    cta: CTA,
    note: "Free, friendly and useful even if you build elsewhere.",
  },

  service: {
    name: "Web design and development",
    serviceType: "Website design and development",
    description:
      "Custom, mobile-first websites for US small businesses, with lead forms, on-page SEO basics, a CMS for editing and launch support.",
  },
};
