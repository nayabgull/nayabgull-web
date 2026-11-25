import { CALL_CTA, QUOTE_FORM } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /services/shopify-development (service page). Primary keyword: "shopify development agency".
 * Keywords approved by Nayab on 2026-11-22 (source: PR #49). Brief: content/briefs/shopify-development.md.
 * The /services hub does not exist yet, so the breadcrumb goes Home › this page.
 *
 * Approved by Nayab on 2026-11-22: the starting price ("Shopify store builds start at $1,500"),
 * the timelines (new store 2 to 4 weeks, migration 1 to 3 weeks), the free store audit, one week of
 * monitoring after launch and access through a collaborator or staff account.
 * TODO(nayab): PROOF. No Shopify case study, store name or result is approved yet. Replace the
 * "Case study" note in the "proof" section with a real, approved result.
 * TODO(nayab): link /services/ecommerce-development and /packages/website-speed-optimization from
 * the "related" block once those pages exist (brief §7).
 */
export const shopifyDevelopment: PageContent = {
  path: "/services/shopify-development",
  name: "Shopify development",
  updated: "2026-11-22",
  meta: {
    title: "Shopify Development Agency for US Stores | Nayab Gull",
    description:
      "A small Shopify development agency for US store owners: setup, theme work, migration, speed and apps. Start with a free store audit on a free call.",
  },

  // Both forms ask for a quote, with "Website" preselected.
  request: { type: "quote", service: "website" },

  hero: {
    eyebrow: "Shopify development",
    headline: {
      before: "A ",
      highlight: "Shopify development agency",
      after: " for US store owners who want more sales",
    },
    lede: "My Shopify development agency sets up, fixes and grows Shopify stores. I build the theme, the apps and the links to your other tools, so your store sells while you run the business.",
    body: [
      "Start with a free store audit. I look at your store with you on a call and show you what slows it down and what costs you sales.",
    ],
    proof: ["5+ years", "400+ projects delivered", "You own your store"],
    primaryCta: CALL_CTA,
    form: QUOTE_FORM,
    secondaryCta: { label: "See what I build", href: "#services" },
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Why a good store can still lose sales",
      intro:
        "You picked Shopify because it handles payments, stock and shipping. The trouble starts when the store needs to do more than the theme allows.",
      columns: 3,
      items: [
        {
          title: "Pages load slowly",
          text: "Big images, heavy apps and extra code make product pages crawl on a phone. Shoppers leave before they see the price.",
        },
        {
          title: "The theme does not fit",
          text: "You want a size chart, a bundle offer or a custom product page. The theme says no, and every workaround adds another app.",
        },
        {
          title: "Apps clash and bills grow",
          text: "Ten apps each add a script and a monthly fee. Some break each other, and nobody knows which one to remove.",
        },
      ],
    },
    {
      kind: "prose",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What does a Shopify development agency do?",
      paragraphs: [
        "A Shopify development agency builds and changes the parts of your store that settings alone cannot. That covers the theme code, custom sections, app setup and links to other tools.",
        "Shopify themes use a template language called Liquid. Modern themes follow Online Store 2.0, which splits each page into sections and blocks you can move around in the editor. Good Shopify work keeps that editor working, so you can still change pages yourself.",
        "Can you hire someone to set up your Shopify store? Yes, and the store stays yours.",
      ],
    },
    {
      kind: "features",
      id: "services",
      eyebrow: "What I build",
      heading: "Shopify development services for your store",
      intro:
        "Every store is different, so you pick the parts you need. Most projects use two or three of these.",
      layout: "cards",
      items: [
        {
          title: "Store setup",
          text: "Products, collections, Shopify Payments, Shop Pay, shipping rates, taxes and the pages every store needs. You get a store ready to take orders.",
          icon: "check",
        },
        {
          title: "Theme customization",
          text: "I start from Dawn or the paid theme you like and change it to fit your brand. Custom sections and metafields (extra product fields, like a size chart) stay editable.",
          icon: "code",
        },
        {
          title: "Shopify store design services",
          text: "Product pages, collection pages and a homepage designed around how your buyers shop. The phone view comes first.",
          icon: "target",
        },
        {
          title: "Apps and integrations",
          text: "I pick apps with care and remove the ones you do not need. When an app cannot do the job, I connect your tools through the Shopify API.",
          icon: "plug",
        },
        {
          title: "Speed work",
          text: "I compress images, cut unused scripts and clean up theme code. I check the result against Core Web Vitals, the speed scores Google uses.",
          icon: "spark",
        },
        {
          title: "Shopify SEO services",
          text: "Clean titles and descriptions, product structured data, redirects and Google Analytics 4 tracking. These basics help Google read every product.",
          icon: "globe",
        },
      ],
      outro: [
        "Want a store as part of a bigger website project? See my ",
        { text: "web design and development service", href: "/services/web-design-development" },
        ".",
      ],
    },
    {
      kind: "features",
      id: "migration",
      eyebrow: "Migration",
      heading: "Moving your store to Shopify",
      intro:
        "Many owners come to Shopify from WooCommerce, Magento or Wix. The move is safe when you plan it, and risky when you rush it.",
      layout: "checklist",
      paragraphs: [
        "The biggest risk is not the products. It is the old web addresses. If Google and your customers hit dead links after the move, you lose traffic you worked hard to earn.",
      ],
      listIntro: "What a careful migration to Shopify covers:",
      items: [
        { text: "Products, variants, photos and collections, checked after import." },
        { text: "Customer accounts and past orders, where the old platform allows export." },
        { text: "A 301 redirect for every old page, so links keep working." },
        { text: "Page titles and descriptions moved over, not lost." },
        { text: "Test orders, emails and tax settings before launch day." },
      ],
      outro:
        "Traffic can still dip for a short time after any move. Good redirects give you the best odds that it comes back fast.",
    },
    {
      kind: "prose",
      id: "headless",
      eyebrow: "Headless",
      heading: "Headless Shopify, in plain words",
      paragraphs: [
        "Headless Shopify means Shopify still runs your products, payments and orders, but the shop front your customers see is a separate site. That front end can be built with Next.js or with Shopify's own Hydrogen. It gets product data through the Storefront API.",
        "The upside is full design freedom and very fast pages. The downside is cost and upkeep. Many theme apps do not work out of the box, so each feature needs its own build.",
        "My honest advice: most small stores do not need it. A well-built theme is fast enough for them. Headless makes sense when you have a large catalog, content-heavy pages or a design no theme can handle.",
      ],
    },
    {
      kind: "prose",
      id: "plus",
      eyebrow: "Shopify Plus",
      heading: "Do you need a Shopify Plus development agency?",
      paragraphs: [
        "Shopify Plus is Shopify's plan for larger, high-volume brands. It adds more control over checkout and tools for B2B selling.",
        "If you are already on Plus, the work looks much like any other store, with a few extra pieces. I can build checkout changes and connect Plus to your other systems.",
        "If you are not on Plus yet, ask first whether you need it. On the call, I tell you plainly if the upgrade pays for itself.",
      ],
    },
    {
      kind: "features",
      id: "audit",
      eyebrow: "Free audit",
      heading: "Start with a free Shopify store audit",
      intro:
        "Before you pay for any work, see what your store needs. The audit happens on the free call, and you keep the notes either way.",
      layout: "checklist",
      listIntro: "What I check in your store:",
      items: [
        { text: "Speed on a phone, page by page." },
        { text: "The theme, and how much custom code it carries." },
        { text: "Installed apps, what each one costs and which ones overlap." },
        { text: "The path from product page to checkout." },
        { text: "Titles, descriptions and structured data on key pages." },
      ],
      outro: "You leave with a short list of fixes in order of impact.",
    },
    {
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "How a Shopify project runs, step by step",
      intro: "Each step ends with something you can see and approve.",
      steps: [
        {
          title: "Free call and store audit",
          text: "In a 30-minute call, you tell me your goals. Then I walk through your store with you.",
        },
        {
          title: "Written quote",
          text: "Within 3 days, you get the scope, the price and the timeline in writing. Work starts only after you approve.",
        },
        {
          title: "Design and build",
          text: "A new store takes 2 to 4 weeks. A migration takes 1 to 3 weeks, depending on how many products and orders move. I build on a copy of your theme, so your live store keeps selling.",
        },
        {
          title: "Testing",
          text: "I place test orders and check every page on real phones. Apps, emails and redirects get checked too.",
        },
        {
          title: "Launch and handover",
          text: "I publish the new theme at a quiet hour and watch the store that week. You get a short video on how to edit it.",
        },
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does a Shopify development company cost?",
      intro: [
        "How much does it cost to hire a Shopify expert? Shopify store builds start at $1,500. A custom theme, a migration or a headless build costs more. To see what changes any web price, read my ",
        { text: "website development cost guide", href: "/pricing" },
        ".",
      ],
      items: [
        {
          name: "Shopify store build",
          from: 1500,
          label: "Starts at $1,500.",
          text: "A new Shopify store, set up and ready to take orders.",
          includes: [
            "Products, collections, payments, shipping and taxes.",
            "A theme customized to your brand.",
            "Test orders before launch.",
            "A short video on how to edit your store.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. Custom sections, products to move, apps to connect and product writing raise the price. Your Shopify plan and paid apps are billed by Shopify and the app makers.",
    },
    {
      kind: "compare",
      id: "compare",
      eyebrow: "Compare",
      heading: "Where to hire Shopify developer help: three options",
      intro:
        "There is no single right choice. Before you sign with any Shopify website development company, compare what each option really gives you.",
      rowLabel: "Question",
      columns: ["Marketplace freelancer", "Large Shopify agency", "Working with me"],
      rows: [
        {
          label: "Who does the work",
          cells: [
            "One person you pick from many profiles.",
            "A team of designers, developers and account staff.",
            "I plan and build it myself and stay your contact.",
          ],
        },
        {
          label: "How you talk",
          cells: [
            "Messages inside the marketplace app.",
            "Usually through an account manager.",
            "Directly with me, by call or message.",
          ],
        },
        {
          label: "Best for",
          cells: [
            "A small fix with a clear brief.",
            "Big brands that need many people at once.",
            "Store owners who want one expert who knows the whole store.",
          ],
        },
      ],
      note: "All three can work well. The right pick depends on the size of the job and how involved you want to be.",
    },
    {
      // TODO(nayab): PROOF. Replace the "Case study" note with a real, approved Shopify result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire Shopify expert help from a full-stack developer?",
      layout: "cards",
      paragraphs: [
        "Expert Shopify developers know more than themes. Stores break where Shopify meets your other tools, such as Klaviyo for email, your stock system or your CRM. I am a full-stack developer, so I build those links too. Over five years, I have delivered 400+ projects.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved Shopify case study to show yet, and I will not invent one. Book the free audit instead, and judge my advice on your own store.",
        ],
      },
      outro: [
        "You can read ",
        { text: "more about me and how I work", href: "/about" },
        " before you book a call.",
      ],
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "More ways I can help your store",
      items: [
        {
          label: "Web design and development",
          href: "/services/web-design-development",
          text: "How I plan, design and build the rest of your website.",
        },
        {
          label: "Hire a full stack developer",
          href: "/hire-full-stack-developer",
          text: "For custom apps, portals and tools that go beyond a theme.",
        },
        {
          label: "AI automation for small businesses",
          href: "/ai-automation-agency",
          text: "Answer customer questions and follow up with buyers automatically.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions store owners ask a Shopify agency",
    items: [
      {
        question: "Can I hire someone to set up my Shopify store?",
        answer:
          "Yes. I set up products, payments, shipping, taxes and the theme, then test real orders. You get a store that is ready to sell and a short video on how to run it.",
      },
      {
        question: "How much does a Shopify developer charge?",
        answer:
          "Prices vary a lot, from small hourly fixes to large custom builds. I work on fixed quotes, not hourly rates. Shopify store builds start at $1,500.\n\nAfter the free call, you get the full price in writing, so there are no surprise lines on the bill.",
      },
      {
        question: "Is it worth it to hire a Shopify expert?",
        answer:
          "It is worth it when your time is worth more than the fee, or when the job needs code. Simple changes are fine to do yourself in the theme editor.\n\nCustom sections, migrations, speed fixes and app links are where an expert saves you money and mistakes.",
      },
      {
        question: "Can I hire someone to manage my Shopify store?",
        answer:
          "I handle the technical side: theme updates, fixes, new sections, apps and speed. Daily tasks such as orders, customer emails and ads stay with you or your team.\n\nAfter launch, you can message me for fixes and changes.",
      },
      {
        question: "Who owns the store and the code?",
        answer:
          "You do. The Shopify account, the theme, the domain and every app account sit in your name.\n\nI work through a Shopify collaborator account (or a staff account if you prefer). You never share your password, and you can remove my access anytime.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
      {
        question: "Will I be able to edit the store myself?",
        answer:
          "Yes. I build with sections and blocks, so you can change text, photos and products in the normal Shopify editor. No code needed.",
      },
    ],
  },

  closing: {
    heading: "Ready to see what your store needs?",
    text: "Book a free call, and bring your store link. You get a free audit on the call and a fixed, written quote after it.",
  },

  service: {
    name: "Shopify development",
    serviceType: "Shopify development",
    description:
      "Shopify store setup, theme customization, migration to Shopify, speed work, apps and integrations, headless Shopify and Shopify Plus development for US store owners.",
  },
};
