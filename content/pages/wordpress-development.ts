import { CALL_CTA, QUOTE_FORM } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /services/wordpress-development (service page). Primary keyword: "wordpress development agency".
 * Keywords approved by Nayab on 2026-11-22 (docs/seo/keyword-map.md, source PR #49).
 * Brief: content/briefs/wordpress-development.md. The /services hub does not exist yet, so the
 * breadcrumb goes Home › this page.
 *
 * Facts taken from other pages in the repo (Nayab confirmed on 2026-11-22 that they apply to WordPress):
 * - "5+ years" and "400+ projects delivered" (homepage, web design page).
 * - Free 30-minute call and a written quote within 3 days (/pricing).
 * - "2 to 6 weeks" for design and build, and "Launch week" (/services/web-design-development).
 * - The optional regular plan for updates and checks after launch (/services/web-design-development).
 * - The ownership and US time zone FAQ answers (approved copy on /industries/law-firm-website-design).
 *
 * Price approved by Nayab on 2026-11-22: "WordPress websites start at $1,500" (prices block,
 * which also adds the Offer to the Service JSON-LD).
 * TODO(nayab): CASE STUDY. No WordPress case study is approved yet (see the "proof" section).
 * TODO(nayab): CARE PLAN. When /packages/wordpress-care-plan goes live, link it from the
 * "after launch" FAQ and the related links.
 */
export const wordpressDevelopment: PageContent = {
  path: "/services/wordpress-development",
  name: "WordPress development",
  updated: "2026-11-21",
  meta: {
    title: "WordPress Development Agency for US Businesses | Nayab Gull",
    description:
      "A WordPress development agency for US small businesses: custom themes, WooCommerce, speed fixes and safe redesigns. Book a free call today.",
  },

  // Both forms ask for a quote, with the service preselected (lead form table, PR #53).
  request: { type: "quote", service: "website" },

  hero: {
    eyebrow: "WordPress development",
    headline: {
      before: "A ",
      highlight: "WordPress development agency",
      after: " for sites you can edit, trust and grow",
    },
    lede: "As a WordPress development agency, I design, build and fix WordPress sites for small businesses. Your site loads fast, stays easy to edit and brings in leads.",
    proof: ["5+ years", "400+ projects delivered", "WordPress websites start at $1,500"],
    primaryCta: CALL_CTA,
    form: QUOTE_FORM,
    secondaryCta: { label: "See what I build", href: "#services" },
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Problems I fix on WordPress sites",
      intro:
        "WordPress is a great tool, but business sites often grow messy. These are common problems.",
      columns: 2,
      items: [
        {
          title: "The site is slow",
          text: "A heavy theme, big images and too many plugins make each page drag. People on a phone leave before they see your offer.",
        },
        {
          title: "Small edits feel risky",
          text: "You change a price, and the page builder breaks the layout. So the site slowly goes stale.",
        },
        {
          title: "Updates break things",
          text: "One plugin update and the contact form stops sending. Nobody notices for a week, and the leads from that week are gone.",
        },
        {
          title: "Security scares",
          text: "Old plugins, old PHP and no backups leave the door open.",
        },
      ],
    },
    {
      kind: "prose",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What is a WordPress agency?",
      paragraphs: [
        "A WordPress agency is a business that plans, designs, builds and looks after websites made with WordPress. Some, like a WordPress design company, focus on looks. If a WordPress web design company also codes, it can add features, connect tools and handle updates.",
        "My agency is small, and I do the core work myself. So the person who sketches your site also writes its code.",
        "WordPress itself is free. You pay for the work, plus hosting and any paid plugins.",
      ],
    },
    {
      kind: "features",
      id: "services",
      eyebrow: "What I build",
      heading: "WordPress website design and development services",
      intro: "Think of me as a WordPress website design agency and a developer in one.",
      layout: "cards",
      items: [
        {
          title: "Custom WordPress design",
          text: "Pages designed around your services and your buyers, not a theme demo with your logo dropped in.",
          icon: "spark",
        },
        {
          title: "Custom themes and blocks",
          text: "Your own lean theme, plus custom blocks in the block editor (Gutenberg). You edit content, and the layout stays clean.",
          icon: "code",
        },
        {
          title: "Plugins and integrations",
          text: "When no plugin does the job, I write a custom plugin. Forms send leads to your CRM, your inbox and your phone.",
          icon: "plug",
        },
        {
          title: "WooCommerce stores",
          text: "Products, checkout, shipping and payments on WooCommerce, the store plugin for WordPress.",
          icon: "database",
        },
        {
          title: "Speed and Core Web Vitals",
          text: "Lighter pages, smaller images, caching and a CDN. Core Web Vitals are Google's checks for how fast and stable a page feels.",
          icon: "target",
        },
        {
          title: "Migration and redesign",
          text: "Move to a new look or a new host and keep your pages and links. Every old address points to its new one.",
          icon: "globe",
        },
      ],
      outro:
        "I follow accessibility best practices (WCAG 2.2 AA) and set up an SEO plugin for titles and sitemaps. Security updates, backups and fixes after launch are part of the plan too.",
    },
    {
      kind: "prose",
      id: "custom",
      eyebrow: "Custom work",
      heading: "Custom WordPress development: what custom really means",
      paragraphs: [
        "Custom WordPress development means the parts of your site are built for your business, not bought off a shelf. WordPress still runs the site, and you log in to the same dashboard.",
        "Many sites use a page builder such as Elementor on top of a big theme. Setup is quick, but every page loads code it does not need.",
        "A custom theme loads only what your pages use. With Advanced Custom Fields (ACF), you fill in a box for a price or an address. For content that repeats, like services or projects, I set up custom post types.",
      ],
      bullets: [
        "A custom plugin for features like a quote calculator.",
        "Headless WordPress with Next.js, with WordPress used only as the editor.",
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "How I build your WordPress site, step by step",
      intro: "You sign off at every stage, so nothing moves ahead without your yes.",
      steps: [
        {
          title: "Free call and site review",
          when: "30 minutes",
          text: "You tell me about your business and your goals. If you already have a site, I look at it with you.",
        },
        {
          title: "Page plan and written quote",
          when: "Within 3 days",
          text: "You get the page list, the features, the price and a clear list of what is not included.",
        },
        {
          title: "Design, then build",
          when: "2 to 6 weeks",
          text: "First you approve the design. Then I build it on a staging site, a private copy you can click through.",
        },
        {
          title: "Test and launch",
          when: "Launch week",
          text: "I test forms, speed and every screen size. Then the site goes live on your domain and your hosting.",
        },
        {
          title: "Handover and support",
          when: "After launch",
          text: "You get admin access, a short training video and a direct line to me for fixes and changes.",
        },
      ],
    },
    {
      // Price approved by Nayab on 2026-11-22: "WordPress websites start at $1,500".
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does a WordPress development company charge?",
      intro: [
        "A WordPress development company prices each project by its scope. After the first call, you get a fixed quote in writing. For the factors that move any website price, see my ",
        { text: "website pricing page", href: "/pricing" },
        ".",
      ],
      items: [
        {
          name: "WordPress website",
          from: 1500,
          label: "Starts at $1,500.",
          text: "A custom WordPress site for a small business, built on a lean theme you can edit yourself.",
          includes: [
            "A design made for your pages, not a theme demo.",
            "Forms and tap-to-call buttons that reach you fast.",
            "Titles, meta text and a sitemap set up for search.",
            "Admin login plus a short video on how to edit.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. Your price goes up with extra pages, custom blocks, a WooCommerce store, content you need moved and tool connections. You pay hosting, your domain and any paid plugins to those companies directly.",
    },
    {
      kind: "prose",
      id: "still-good",
      eyebrow: "The platform",
      heading: "Is WordPress still a good choice in 2026?",
      paragraphs: [
        "Yes, for many businesses. WordPress fits well when your team edits content often or you need a blog and many service pages.",
        "It is not always the best fit. A site with few edits and a strong focus on speed can be simpler on Next.js. A store that sells most of its revenue online is often easier to run on Shopify.",
        [
          "I build on all three, so I have no reason to push one. You can compare the options on my ",
          { text: "web design and development service", href: "/services/web-design-development" },
          " page.",
        ],
      ],
    },
    {
      kind: "compare",
      id: "compare",
      eyebrow: "Compare",
      heading: "Hire a WordPress developer, a large agency or me?",
      intro:
        "Each option fits a different business. Before you hire WordPress developers or an agency, look at what each path gives you.",
      rowLabel: "Question",
      columns: ["Freelance marketplace", "Large WordPress agency", "Working with me"],
      rows: [
        {
          label: "Who does the work",
          cells: [
            "The developer you pick, and quality varies from one to the next.",
            "A team of designers, developers and project managers.",
            "I plan and build the core work myself.",
          ],
        },
        {
          label: "How you talk",
          cells: [
            "Through the marketplace inbox, often across time zones.",
            "Usually through an account manager.",
            "Directly with me, in a US-friendly time window.",
          ],
        },
        {
          label: "Who owns the site",
          cells: [
            "It depends on the developer, so ask before you start.",
            "It depends on the contract, so read it before you sign.",
            "Your accounts hold the domain, the hosting and the site.",
          ],
        },
        {
          label: "Best for",
          cells: [
            "Small, clear tasks with a fixed brief.",
            "Large brands with many people who must approve each step.",
            "Small businesses that want a fast site and a direct line to the builder.",
          ],
        },
      ],
      note: "Marketplaces list many WordPress experts for hire. All three paths can work, so pick the one that fits your budget.",
    },
    {
      // TODO(nayab): CASE STUDY. Replace the "Case study" note with a real, approved WordPress result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why choose a WordPress website development company that builds the whole system?",
      layout: "cards",
      paragraphs: [
        "The form, the CRM and the follow-up matter as much as the pages. As a full-stack developer, I build those parts too. Over five years, I have delivered 400+ projects.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved WordPress case study to show here yet, and I will not invent one. Book a free call, and I will walk you through how I would plan your site.",
        ],
      },
      outro: [
        "You can read ",
        { text: "more about me and how I work", href: "/about" },
        " before you book a call.",
      ],
    },
    {
      // Free review confirmed by Nayab on 2026-11-22.
      kind: "features",
      id: "free-review",
      eyebrow: "Free review",
      heading: "Get a free review of your WordPress site",
      intro:
        "Not sure what is wrong with your current site? Book a free call and ask for a review. You hear what I would fix first.",
      layout: "checklist",
      listIntro: "What I check on the call:",
      items: [
        { text: "How fast your key pages load on a phone." },
        { text: "Which plugins are old, unused or doubled up." },
        { text: "Your PHP version and when WordPress was last updated." },
        { text: "Whether backups run, and where they are stored." },
        { text: "Whether your forms still send leads to the right place." },
        { text: "How hard it is for you to edit a page today." },
      ],
      outro: "You keep the findings whether you hire me or not.",
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "What to pair with your WordPress site",
      items: [
        {
          label: "Connect your forms to GoHighLevel",
          href: "/gohighlevel-agency",
          text: "Each WordPress form entry lands in a pipeline with a quick text reply.",
        },
        {
          label: "AI automation services",
          href: "/ai-automation-agency",
          text: "Follow up on new leads from your site, day and night.",
        },
        {
          label: "Hire a full stack developer",
          href: "/hire-full-stack-developer",
          text: "When you need a portal or web app next to your WordPress site.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions to ask a WordPress development agency",
    items: [
      {
        question: "How much does it cost to hire a WordPress developer?",
        answer:
          "WordPress websites start at $1,500. The final price depends on the number of pages, custom features, a store and how much content needs to move. You get a fixed quote in writing after a free call.\n\nI quote by the project, not by the hour. If the work takes longer than I planned, the price stays the same.",
      },
      {
        question: "Which WordPress design agency is the best in the USA?",
        answer:
          "The best one is the one that fits your business. Look at real sites they built, ask who will do the work and ask who owns the site at the end.\n\nClear answers tell you more than any ranking list.",
      },
      {
        question: "Can ChatGPT build a WordPress website?",
        answer:
          "ChatGPT can help you write text or draft a bit of code. It cannot plan your pages, test your forms or fix a plugin conflict on your live site.\n\nA person still has to check every line before it goes live.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a CRM.\n\nI build everything inside those accounts: the website, the intake flows and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
      {
        question: "Can you redesign or migrate my site without losing Google traffic?",
        answer:
          "Yes, with a careful plan. I map every current page to its new address and set up redirects before launch day. I also keep your titles and content that already rank.\n\nNo one can promise zero change, since rankings can move for a few weeks after any big switch.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "Yes. You log in to the normal WordPress dashboard and fill in simple fields. Changing text, photos and prices takes a few minutes.\n\nAt handover, you get a short training video for the edits you make most.",
      },
      {
        question: "What happens after launch?",
        answer:
          "You can message me for fixes and changes. If you prefer a regular plan for updates and checks, I offer one.\n\nWordPress and its plugins need updates over time, and a plan keeps them current.",
      },
    ],
  },

  closing: {
    heading: "Ready for a WordPress site that works as hard as you do?",
    text: "Send the short form, and tell me about your site.",
  },

  service: {
    name: "WordPress development",
    serviceType: "WordPress website design and development",
    description:
      "Custom WordPress design and development for US small businesses: custom themes and blocks, WooCommerce, speed, security updates, migration and redesign.",
  },
};
