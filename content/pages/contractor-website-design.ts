import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /industries/contractor-website-design (industry page). Primary keyword: "contractor website design".
 * Secondary: "general contractor website design", "website design for construction company",
 * "lead generation website design" (docs/seo/keyword-map.md). Roofing and HVAC keywords belong to
 * /industries/roofing-hvac-website-design and are never targeted here.
 * Brief: content/briefs/contractor-website-design.md.
 *
 * TODO(nayab): PROCESS. Add a timeline to each step once you confirm it (the stepper has no dates).
 * TODO(nayab): PRICING. No price is shown on purpose. Decide the starting price, then add a
 * `prices` block (it also adds the Offer to the Service JSON-LD) and the amount to APPROVED_PRICES
 * in the page tests.
 * TODO(nayab): PROOF. No contractor case study, client name, number or review is approved yet.
 * Replace the "proof" section with a real, approved result when one exists.
 * TODO(nayab): Confirm the FAQ answer on build time once the timelines are set.
 * Breadcrumb: Home › Industries › this page (the /industries hub links back down).
 */
export const contractorWebsiteDesign: PageContent = {
  path: "/industries/contractor-website-design",
  name: "Contractor website design",
  parent: { name: "Industries", path: "/industries" },
  updated: "2026-11-19",
  meta: {
    title: "Contractor Website Design That Wins Bids | Nayab Gull",
    description:
      "Contractor website design for builders and remodelers: project galleries, estimate forms that sort jobs and follow-up that books visits. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "Website" preselected.
  request: { type: "demo", service: "website" },

  hero: {
    eyebrow: "Contractors",
    headline: {
      before: "",
      highlight: "Contractor website design",
      after: " that brings in estimate requests",
    },
    lede: "I build sites for general contractors, remodelers and construction companies. Your best jobs sit up front, and the estimate form asks the right questions first.",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me what you build and where. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "features",
      id: "problems",
      eyebrow: "The problem",
      heading: "Where contractors lose jobs before the first bid",
      intro:
        "Your crews do good work. The trouble starts before anyone sees it. These are the three things owners tell me on almost every call.",
      layout: "cards",
      items: [
        {
          title: "“I can’t pick up on a job site.”",
          text: "You are on a ladder or running a saw when the phone rings. By lunch, that homeowner has called two other builders and set up a walkthrough.",
          icon: "phone",
        },
        {
          title: "“Someone faster got the bid.”",
          text: "A kitchen remodel lead comes in on Monday. You send numbers on Friday. The company that replied the same day already has a signed contract.",
          icon: "target",
        },
        {
          title: "“My site looks like 2012.”",
          text: "It has a logo, a phone number and two stock photos. A buyer about to spend tens of thousands wants to see real decks, kitchens and additions you built.",
          icon: "globe",
        },
      ],
    },
    {
      kind: "features",
      id: "features",
      eyebrow: "What I build",
      heading: "What general contractor website design should include",
      intro:
        "Good general contractor website design does two jobs. It shows proof of your work, and it turns a visitor into a clear estimate request. These six parts do that.",
      layout: "cards",
      items: [
        {
          title: "Service and service-area pages",
          text: "Remodels, additions, decks, new builds and commercial work each get their own page. I add area pages only for towns you really work in, each with real jobs from there.",
          icon: "wrench",
        },
        {
          title: "Project gallery with before and after",
          text: "Each project gets a short story: what the client wanted, what you built and how long it took. A slider shows the before and after side by side.",
          icon: "spark",
        },
        {
          title: "Estimate form that sorts jobs by size",
          text: "The form asks for the job type, rough size, timeline and budget range. Small repairs and big builds land in different lists, so you call the right ones first.",
          icon: "rules",
        },
        {
          title: "Fast site on a phone",
          text: "Most people look you up on a phone, often at the house that needs work. Pages stay light, and the call button sits on every screen.",
          icon: "code",
        },
        {
          title: "Reviews, license and insurance",
          text: "A trust block shows your license number, proof of insurance and real reviews from Google. Buyers check these before they let a crew into their home.",
          icon: "shield",
        },
        {
          title: "Google Business Profile tie-in",
          text: "Your name, address, phone and hours match your profile exactly. Your Google reviews show on the site, and your profile links back to the right page.",
          icon: "check",
        },
      ],
      outro:
        "A website design for construction company owners should feel like a walk through your best jobs, not a brochure.",
    },
    {
      kind: "flow",
      id: "lead-flow",
      eyebrow: "Lead flow",
      heading: "How one estimate request turns into a site visit",
      intro:
        "This is the lead generation website design I use for builders. Every step runs on its own, even while you are on a roof or in a crawl space.",
      steps: [
        {
          title: "Form or call",
          detail: "A homeowner fills in the estimate form or taps to call.",
          icon: "code",
        },
        {
          title: "Job questions",
          detail: "Type, size, timeline and budget range come in first.",
          icon: "chat",
        },
        {
          title: "Site visit booked",
          detail: "Good fits pick a walkthrough time on your calendar.",
          icon: "check",
        },
        {
          title: "CRM and texts",
          detail: "The lead lands in your CRM, and follow-up texts start.",
          icon: "flow",
        },
      ],
      footer: "You show up to a walkthrough that already fits your crew.",
    },
    {
      kind: "features",
      id: "receptionist",
      eyebrow: "Phone calls",
      heading: "An AI receptionist for calls you miss on site",
      intro:
        "The form covers people who type. Plenty of homeowners still call, and most of those calls come while your hands are full.",
      layout: "checklist",
      paragraphs: [
        [
          "So I pair the website with an AI receptionist. It answers when you cannot, in a calm and natural voice. You can see how it works on my ",
          { text: "AI automation services page", href: "/ai-automation-agency" },
          ".",
        ],
      ],
      example: {
        label: "Example",
        paragraphs: [
          "A homeowner calls at 2 PM about a bathroom remodel. You are pouring a slab across town.",
          "The AI picks up, asks the same job questions as your form and offers two walkthrough times. You get a text with the notes before the concrete sets.",
        ],
      },
      listIntro: "What the receptionist can do:",
      items: [
        { text: "Answer after hours, on weekends and during busy days." },
        { text: "Ask about the job type, size, timeline and budget range." },
        { text: "Book a site visit on your calendar." },
        { text: "Send you a short summary by text." },
        { text: "Pass urgent calls straight to your cell." },
        { text: "Politely turn away jobs you do not take." },
      ],
      outro: "You decide the questions, the hours and when a call goes straight to you.",
    },
    {
      kind: "compare",
      id: "compare",
      eyebrow: "Compare",
      heading: "DIY builder vs lead platforms vs your own website",
      intro:
        "You have three main ways to get work online. Each one has a place. Here is the honest version.",
      rowLabel: "Question",
      columns: ["DIY site builder", "Angi or HomeAdvisor", "Your own website"],
      rows: [
        {
          label: "Who owns the leads",
          cells: [
            "You do, but few leads come in.",
            "The platform does, and it may send the same lead to other pros.",
            "You do, and each lead comes only to you.",
          ],
        },
        {
          label: "What you pay for",
          cells: [
            "A monthly plan and your own evenings.",
            "Fees for each lead, even the ones that never answer.",
            "The build up front, then hosting and upkeep.",
          ],
        },
        {
          label: "How you stand out",
          cells: [
            "Many sites look alike because they start from the same template.",
            "Your profile sits next to your rivals on one list.",
            "Your projects, your reviews and your story stand alone.",
          ],
        },
        {
          label: "Follow-up",
          cells: [
            "You call people back by hand.",
            "You race other pros to the same phone number.",
            "Texts and booking start the minute a lead comes in.",
          ],
        },
      ],
      note: "Lead platforms can fill gaps in a slow month. Your own site is the asset that keeps working when you stop paying for leads.",
    },
    {
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "How I build your contractor website",
      intro:
        "Five steps take you from the first call to a live site. You know what comes next at each one.",
      steps: [
        {
          title: "Free call",
          text: "Tell me what you build, where you work and which jobs you want more of.",
        },
        {
          title: "Page plan and quote",
          text: "A written plan lists the pages, the form questions and a fixed price.",
        },
        {
          title: "Photos and content",
          text: "You send job photos from your phone. I write the text from a short call and you fix what sounds off.",
        },
        {
          title: "Build and review",
          text: "I build the site and the lead flow. You test it on your own phone and send changes.",
        },
        {
          title: "Launch and handover",
          text: "I test every form and call button, connect your domain and show you how to add new projects.",
        },
      ],
    },
    {
      kind: "features",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What shapes the price of a contractor site",
      intro:
        "Every build gets a fixed quote in writing before I start. The price depends on a few clear things.",
      layout: "checklist",
      items: [
        { text: "How many service and area pages you need." },
        { text: "How many projects go into the gallery at launch." },
        { text: "Whether I write the text or you supply it." },
        { text: "Which parts of the lead flow you add, such as CRM texts or the AI receptionist." },
      ],
      outro: [
        "Hosting, software plans and call minutes are paid to those companies. See my ",
        { text: "website pricing page", href: "/pricing" },
        " for what changes a quote.",
      ],
    },
    {
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Who builds your site",
      layout: "cards",
      paragraphs: [
        "I am a full-stack developer with more than five years of work and 400+ projects behind me. Because I build the site, the forms and the follow-up myself, no step gets lost between vendors.",
        "I will not show you made-up results. On the call, I can walk you through real builds and point out what I would change on your site first.",
      ],
      items: [
        {
          title: "Websites for the trades",
          text: [
            "I also build sites for roofers and HVAC companies. See my ",
            {
              text: "roofing and HVAC website design",
              href: "/industries/roofing-hvac-website-design",
            },
            " page.",
          ],
          icon: "wrench",
        },
        {
          title: "The full web process",
          text: [
            "Want the tech details? My ",
            {
              text: "web design and development service",
              href: "/services/web-design-development",
            },
            " page covers them.",
          ],
          icon: "code",
        },
        {
          title: "CRM and texts",
          text: [
            "Missed-call texts and estimate follow-up run on ",
            { text: "GoHighLevel CRM automation", href: "/gohighlevel-agency" },
            ".",
          ],
          icon: "crm",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions contractors ask",
    items: [
      {
        question: "How long does it take to build my site?",
        answer:
          "It depends on how many pages you need and how fast your photos and details reach me. You get a written timeline with your quote, before any work starts.\n\nIf your busy season is close, tell me on the call. I can launch a strong first version and add pages after.",
      },
      {
        question: "Can I add my own project photos?",
        answer:
          "Yes, and you should. Real photos from your jobs beat stock images every time. Phone shots work fine.\n\nAfter launch, you can add a new project from your phone in a few minutes. Pick the photos, write two lines and publish.",
      },
      {
        question: "Will my business show on Google Maps?",
        answer:
          "Google Maps listings come from your Google Business Profile, not from the website itself. I make sure your site and your profile match and link to each other.\n\nThat match helps, but nobody can honestly promise a spot on the map. Reviews, distance and your competitors matter too.",
      },
      {
        question: "Can you redesign my current site?",
        answer:
          "Yes. I start by checking which pages bring calls today, so nothing that works gets lost. Then I rebuild the site around your projects and the estimate form.\n\nYour domain and email stay the same. If old pages move, I point them to the new ones, so search engines and visitors still find you.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a CRM. I build everything inside those accounts: the website, the lead flows and the full setup.\n\nAt launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
      {
        question: "Do I need the AI receptionist to start?",
        answer:
          "No. Many builders start with the website and the estimate form. You can add the receptionist and CRM texts later.\n\nThe site is built so those parts plug in without a rebuild.",
      },
    ],
  },

  closing: {
    heading: "Ready for a site that books more walkthroughs?",
    text: "Tell me what you build and where you work. I will send back a free demo of your new estimate form and a page plan.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "Contractor website design",
    serviceType: "Contractor website design",
    description:
      "Websites for US general contractors, remodelers and construction companies: project galleries, estimate forms that sort jobs and follow-up that books site visits.",
  },
};
