import { STRATEGY_CALL_URL } from "../home.ts";

import type { PageContent } from "./types.ts";

const CTA = { label: "Book a free strategy call", href: STRATEGY_CALL_URL };

/**
 * /industries/roofing-hvac-website-design (industry page). Primary keyword: "roofing website design".
 * TODO(nayab): confirm the timelines, the list of field-service tools in the FAQ and every answer.
 * TODO(nayab): add real project photos or screenshots when a roofing or HVAC client approves them.
 * The /industries hub does not exist yet, so the breadcrumb goes Home › this page.
 */
export const roofingHvacWebsiteDesign: PageContent = {
  path: "/industries/roofing-hvac-website-design",
  name: "Roofing and HVAC website design",
  updated: "2026-11-10",
  meta: {
    title: "Roofing Website Design for Roofers and HVAC | Nayab Gull",
    description:
      "Roofing website design and HVAC sites that turn storm calls into booked jobs. A 5-page business website starts at $1,500. Book a free strategy call.",
  },

  hero: {
    eyebrow: "Roofing and HVAC",
    headline: {
      before: "",
      highlight: "Roofing website design",
      after: " that turns storm calls into booked jobs",
    },
    lede: "I build fast sites for roofers and HVAC companies. Each one has a quote form that asks for photos and follow-up that answers after hours.",
    proof: ["5+ years", "400+ projects delivered", "Websites start at $1,500"],
    primaryCta: CTA,
    secondaryCta: { label: "See what the site includes", href: "#features" },
  },

  flow: {
    label: "Storm night",
    caption: "What happens when hail hits at 11 PM",
    steps: [
      { title: "Homeowner finds you", detail: "They search for roof repair on a phone." },
      { title: "Quote form with photos", detail: "They upload three shots of the damage." },
      { title: "AI answers the call", detail: "It asks about leaks and offers a time." },
      { title: "Inspection booked", detail: "Your crew sees the job at 7 AM." },
    ],
    footer: "You slept through all of it.",
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Why good crews still lose jobs online",
      intro:
        "Your work is solid, and your trucks are busy. The leaks are on the web side. Owners in Texas and across the US tell me the same three stories.",
      columns: 3,
      items: [
        {
          title: "The storm hits after closing",
          text: "Hail falls at night. Homeowners call five roofers before breakfast. The first company that answers gets the inspection, and voicemail never wins that race.",
        },
        {
          title: "The site hides the phone number",
          text: "A homeowner with water on the floor will not hunt through menus. If the call button is not on the first screen, they tap back and pick another name.",
        },
        {
          title: "Quote requests arrive half empty",
          text: "A form that only asks for a name and an email tells you nothing. You drive across town to learn it was a job you do not take.",
        },
      ],
    },
    {
      kind: "prose",
      id: "what-it-includes",
      eyebrow: "The basics",
      heading: "What does good roofing company website design include?",
      paragraphs: [
        "Good roofing company website design does three jobs. It loads fast on a phone, it proves you are real and local, and it makes the next step obvious. Fancy effects come last.",
        "Most of your visitors are on a phone, often outside, often stressed. So I design the phone view first. Big text, a call button that follows the scroll and a short form.",
        "Trust comes from real things. Your crew, your trucks, your license number and jobs from streets people know. Stock photos of smiling models do the opposite.",
      ],
      bullets: [
        "A tap-to-call button on every screen.",
        "A quote form that collects the address and photos.",
        "One clear page for each service you sell.",
        "Proof: licenses, insurance, warranties and real job photos.",
      ],
    },
    {
      kind: "cards",
      id: "features",
      eyebrow: "What you get",
      heading: "Features built for roofers and HVAC techs",
      intro:
        "Every build starts from your services and your area. These six parts go into almost every site I make for the trades.",
      columns: 3,
      items: [
        {
          title: "Photo quote form",
          text: "The form asks what you need to price a job: address, roof type or unit age, the problem and a few photos. Bad-fit jobs get filtered early.",
        },
        {
          title: "Service pages",
          text: "Roof repair, full replacement, storm damage, AC repair and furnace installs each get a page. Each page answers the questions that buyer asks.",
        },
        {
          title: "Honest service-area pages",
          text: "I write pages only for cities you really serve, with jobs and details from each one. Copy-and-paste city pages can hurt you in search, so I skip them.",
        },
        {
          title: "Project gallery",
          text: "Before-and-after photos sell roofs better than any slogan. You can add a new job from your phone in a few minutes.",
        },
        {
          title: "Emergency banner",
          text: "One switch turns on a storm or heat-wave banner across the site. It tells visitors you are taking emergency calls today.",
        },
        {
          title: "Speed and tracking",
          text: "Pages stay light, so they open fast on weak signal. Call and form tracking shows you which pages bring real jobs.",
        },
      ],
    },
    {
      kind: "prose",
      id: "hvac",
      eyebrow: "HVAC",
      heading: "How is HVAC website design different?",
      paragraphs: [
        "HVAC website design has to serve two buyers at once. One has a dead AC in July and needs help now. The other is planning a new system and wants to compare options.",
        "So the site splits early. An emergency path leads with the phone number and same-day service. A planning path explains systems, financing and what an install day looks like.",
        "HVAC also has repeat work that roofing lacks. Tune-up plans and filter reminders bring steady income in slow months. Your site should let people join a plan and book a visit online.",
      ],
    },
    {
      kind: "cards",
      id: "follow-up",
      eyebrow: "After the click",
      heading: "Follow-up that runs while you are on a roof",
      intro:
        "A site only starts the job. What happens in the next five minutes decides who gets the work. I can add these to any build.",
      columns: 2,
      items: [
        {
          title: "Missed-call text-back",
          text: "If you cannot pick up, the caller gets a text within seconds. It asks what they need and offers a time to talk.",
          link: { label: "GoHighLevel setup for contractors", href: "/gohighlevel-agency" },
        },
        {
          title: "AI receptionist",
          text: "An AI voice agent answers after hours, asks about the damage and books the inspection on your calendar.",
          link: { label: "AI automation for small businesses", href: "/ai-automation-agency" },
        },
        {
          title: "Estimate follow-up",
          text: "Sent a quote and heard nothing? A short series of texts and emails checks in over the next two weeks, then stops when they reply.",
        },
        {
          title: "Review requests",
          text: "When a job closes, the customer gets a thank-you text with a link to review you on Google. Real reviews from real jobs, nothing else.",
        },
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "From first call to launch",
      intro:
        "The goal is to launch before your busy season, not during it. Here is how the weeks usually go.",
      steps: [
        {
          title: "Call and site review",
          when: "Day 1",
          text: "We look at your current site, your service area and where your jobs come from now.",
        },
        {
          title: "Page plan and quote",
          when: "Within 3 days",
          text: "You get a list of pages, the form questions and a fixed price in writing.",
        },
        {
          title: "Design and build",
          when: "2 to 4 weeks",
          text: "You send photos and service details. I build, and you review the site on your own phone.",
        },
        {
          title: "Launch and handover",
          when: "Launch week",
          text: "I test every form and call button, connect your domain and show your office how to add jobs.",
        },
      ],
    },
    {
      kind: "prose",
      id: "compare",
      eyebrow: "Buying guide",
      heading: "How to compare a roofing web design company",
      paragraphs: [
        "Whether you hire me or another roofing web design company, ask the same five questions. They also work for HVAC website design companies. The answers tell you more than any portfolio.",
        "Watch for long contracts and sites you only rent. If you stop paying and the site vanishes, you never owned it. A fair builder hands you the keys.",
      ],
      bullets: [
        "Who owns the domain, the site and the content when we part ways?",
        "Can I see one of your sites load on my phone right now?",
        "Is there a contract term, and what does it cost to leave?",
        "Will you use my real photos, or stock images?",
        "Who do I call when something breaks, and how fast do they answer?",
      ],
    },
    {
      kind: "prose",
      id: "proof",
      eyebrow: "Proof",
      heading: "What I bring to your build",
      paragraphs: [
        "My background is full-stack development, with more than five years of work and 400+ projects behind me. You get the site, the forms and the follow-up from one person, so nothing gets lost between vendors.",
        [
          "I also run my own lead product, ",
          { text: "SmartQuoteDesk", href: "https://smartquotedesk.com" },
          ", which handles quote requests for several industries. That work taught me which form questions bring good leads and which ones scare people off.",
        ],
        "I will not show you invented results. On our call, I can walk you through real builds and explain what I would change on your site first.",
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What a roofing or HVAC website costs",
      intro:
        "Most roofing and HVAC builds fall into one of these four. You get a fixed quote in writing before I start.",
      items: [
        {
          name: "Business website (5 pages)",
          from: 1500,
          label: "Starts at $1,500.",
          text: "Home, services, about, gallery and contact, built for phones first.",
          includes: [
            "Photo quote form.",
            "Tap-to-call on every screen.",
            "Basic on-page SEO setup.",
            "Training to add jobs yourself.",
          ],
        },
        {
          name: "Landing page",
          from: 600,
          label: "Starts at $600.",
          text: "One focused page for a storm campaign, a tune-up offer or your ads.",
          includes: [
            "One offer and one form.",
            "Fast load on mobile data.",
            "Call and form tracking.",
          ],
        },
        {
          name: "AI voice receptionist",
          from: 750,
          label: "Starts at $750 for setup, plus $149 per month.",
          text: "Answers after-hours calls and books inspections. Call minutes go on your own phone bill.",
          includes: [
            "Script for roofing or HVAC calls.",
            "Calendar booking.",
            "Call notes by text.",
          ],
        },
        {
          name: "Full system",
          from: 2500,
          label: "Starts at $2,500.",
          text: "Website, CRM and AI follow-up as one lead system.",
          includes: [
            "Everything in the business website.",
            "CRM with text-back and follow-up.",
            "AI replies to new leads.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. Extra pages, custom features and content writing change the price. Hosting, software plans and call minutes go to those providers.",
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "Services that pair well with your new site",
      items: [
        {
          label: "GoHighLevel CRM setup",
          href: "/gohighlevel-agency",
          text: "Pipelines, text-back and estimate follow-up for your office.",
        },
        {
          label: "AI receptionists and automation",
          href: "/ai-automation-agency",
          text: "AI that answers the phone when your crew cannot.",
        },
        {
          label: "My web design and development service",
          href: "/services/web-design-development",
          text: "The full process, the tech and what every site includes.",
        },
        {
          label: "Full pricing page",
          href: "/pricing",
          text: "What changes the price, and which costs go to other companies.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions roofers and HVAC owners ask",
    items: [
      {
        question: "How much does a roofing website cost?",
        answer:
          "A five-page business website starts at $1,500. A single landing page starts at $600. More pages, custom tools or writing push the price up.\n\nYou get a fixed quote in writing after our first call. It lists every page and feature, so the bill matches the plan.",
      },
      {
        question: "How long does it take to build?",
        answer:
          "Most sites for roofers and HVAC companies take two to four weeks. The clock mostly depends on how fast I get your photos and service details.\n\nIf storm season is close, tell me. We can launch a strong first version early and add pages later.",
      },
      {
        question: "Will my site show up on Google?",
        answer:
          "I build the site so Google can read it: fast pages, clear service pages and correct business details. That is the base every local site needs.\n\nNobody can honestly promise a top spot. Rankings also depend on your reviews, your Google Business Profile and your competitors.",
      },
      {
        question: "Can you write the content and use my photos?",
        answer:
          "Yes. I draft the text from a short call with you, and you correct anything that sounds off. Your own job photos work best, even phone shots.\n\nIf you have no photos yet, start taking a few on each job now. I can launch with what you have and add more later.",
      },
      {
        question: "Does the site connect to the software my office uses?",
        answer:
          "Often it does. Many roofing and HVAC tools, such as JobNimbus, AccuLynx, ServiceTitan and Housecall Pro, can receive leads from a website.\n\nI check how your tool connects before I quote. If a direct link is not possible, leads can still reach you by email and text.",
      },
      {
        question: "You are not in the US. How do we work together?",
        answer:
          "I am based in Lahore, Pakistan, and I work with US clients every week. My day overlaps with US business hours, so we talk live on video calls.\n\nBetween calls, you get short written updates. You review the site on a private link, from your truck if you like.",
      },
      {
        question: "Do I keep my domain and own the site?",
        answer:
          "Yes. Your domain, hosting and site stay in accounts under your name. I never hold them hostage.\n\nIf you already have a domain, we keep it. Moving to the new site does not change your address or your email.",
      },
    ],
  },

  finalCta: {
    heading: "Want your site ready before the next storm?",
    text: "Book a free strategy call. We review your current site together, and you leave with a page plan for your roofing or HVAC business.",
    cta: CTA,
    note: "It takes about 30 minutes.",
  },

  service: {
    name: "Roofing and HVAC website design",
    serviceType: "Roofing website design",
    description:
      "Websites for roofing and HVAC companies in the US: photo quote forms, service pages, tap-to-call, and after-hours follow-up.",
  },
};
