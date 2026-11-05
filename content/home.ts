/**
 * Homepage copy, typed so it can move to Payload later without touching the components.
 * Rules: docs/rules/content.md (American English, short sentences, no banned phrases, no invented
 * numbers) and docs/seo/keyword-map.md (primary keyword for "/": "web development agency").
 *
 * Anything marked `TODO(nayab)` is a placeholder or a claim Nayab must confirm before launch.
 */

export const STRATEGY_CALL_URL = "https://cal.com/nayab-gull/strategy-call";

export interface Link {
  label: string;
  href: string;
}

export interface ProofItem {
  value: string;
  label: string;
}

export interface Pillar {
  id: string;
  title: string;
  summary: string;
  points: readonly string[];
  tools: readonly string[];
}

export interface Industry {
  id: string;
  name: string;
  pain: string;
  outcome: string;
}

export interface FlowStep {
  title: string;
  detail: string;
}

export interface ProcessStep {
  title: string;
  when: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CaseStudy {
  name: string;
  url: string;
  /** TODO(nayab): set to true only after you approve this card for launch. */
  approved: boolean;
  summary: readonly string[];
  tags: readonly string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface HomeContent {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    headline: { before: string; highlight: string; after: string };
    lede: string;
    proof: string;
    primaryCta: Link;
    secondaryCta: Link;
  };
  flow: { label: string; caption: string; steps: readonly FlowStep[]; footer: string };
  proof: { heading: string; items: readonly ProofItem[] };
  pillars: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: readonly Pillar[];
  };
  industries: { eyebrow: string; heading: string; intro: string; items: readonly Industry[] };
  work: {
    eyebrow: string;
    heading: string;
    caseStudy: CaseStudy;
    note: string;
    linkLabel: string;
  };
  process: { eyebrow: string; heading: string; intro: string; steps: readonly ProcessStep[] };
  pricing: { eyebrow: string; heading: string; text: readonly string[] };
  faq: { eyebrow: string; heading: string; items: readonly Faq[] };
  about: {
    eyebrow: string;
    heading: string;
    name: string;
    initials: string;
    role: string;
    location: string;
    /** TODO(nayab): set to "/images/nayab-gull.webp" once the photo is in public/images. */
    photo: string | null;
    text: readonly string[];
  };
  finalCta: { heading: string; text: string; cta: Link; note: string };
  /** TODO(nayab): hidden until you add real, approved quotes. The section renders nothing while empty. */
  testimonials: readonly Testimonial[];
}

export const home: HomeContent = {
  meta: {
    title: "Web Development Agency for US Businesses | Nayab Gull",
    description:
      "A one-person web development agency for US businesses: fast websites, GoHighLevel CRM and AI automation that books calls. Book a free strategy call.",
  },

  hero: {
    // TODO(nayab): confirm you are taking new projects; change the text when you are booked up.
    badge: "Taking on new projects",
    headline: {
      before: "A one-person ",
      highlight: "web development agency",
      after: " for US businesses that want more booked calls",
    },
    lede: "I'm Nayab Gull, a full-stack developer. I build fast websites, GoHighLevel CRMs and AI automation that reply to every lead in seconds.",
    proof: "5+ years and 400+ projects for clients in the US, the UK and around the world.",
    primaryCta: { label: "Book a free strategy call", href: STRATEGY_CALL_URL },
    secondaryCta: { label: "See what I build", href: "#services" },
  },

  flow: {
    label: "Live automation",
    caption: "What happens when a new lead fills in your form",
    steps: [
      { title: "New lead from website", detail: "A visitor sends your quote form." },
      { title: "Added to GoHighLevel", detail: "Contact saved, pipeline stage set." },
      {
        title: "AI assistant calls in 60 seconds",
        detail: "Asks your questions, checks your calendar.",
      },
      { title: "Call booked", detail: "Time confirmed, reminder text on its way." },
    ],
    footer: "Same flow at 2 PM or 2 AM.",
  },

  proof: {
    heading: "Experience you can check",
    items: [
      { value: "5+ years", label: "building for paying clients" },
      { value: "400+", label: "projects delivered" },
      { value: "US and UK", label: "clients, plus many more worldwide" },
      { value: "Upwork and Fiverr", label: "where clients around the world hire me" },
    ],
  },

  pillars: {
    eyebrow: "Services",
    heading: "Three ways this web development agency helps you grow",
    intro:
      "Most small businesses don't need more tools. They need the right site, one place for their leads and follow-up that never sleeps. I build all three, and I make them work together.",
    items: [
      {
        id: "web",
        title: "Web design and development",
        summary:
          "Fast, clean websites and web apps that turn visits into calls. I pick the platform that fits your business and your budget, not the one I like best.",
        points: [
          "Marketing sites and landing pages.",
          "Shopify stores and WordPress sites you can edit.",
          "Custom web apps, portals and dashboards.",
          "Speed and SEO fixes for the site you already have.",
        ],
        tools: ["Next.js", "React", "Shopify", "WordPress", "Laravel"],
      },
      {
        id: "ghl",
        title: "GoHighLevel CRM and automation",
        summary:
          "One home for your leads, calls, texts and bookings. I set up GoHighLevel so follow-up happens on its own and nothing slips through the cracks.",
        points: [
          "Pipelines and sub-accounts that match how you sell.",
          "Workflows that text and email new leads right away.",
          "Calendar booking with reminders that cut no-shows.",
          "A2P 10DLC registration, so carriers deliver your texts.",
        ],
        tools: ["GoHighLevel", "Workflows", "Calendars", "Webhooks"],
      },
      {
        id: "ai",
        title: "AI automation",
        summary:
          "AI that handles the busy work: answering, sorting and booking. It hands the conversation to you when a real person should step in.",
        points: [
          "AI chatbots that answer questions on your site.",
          "An AI voice receptionist that picks up missed calls.",
          "n8n, Make and Zapier flows that link your apps.",
          "Simple reports in your inbox each week.",
        ],
        tools: ["n8n", "Make", "Zapier", "OpenAI", "Vapi"],
      },
    ],
  },

  industries: {
    eyebrow: "Industries",
    heading: "Built around the way your industry wins work",
    intro:
      "A law firm and a roofer lose leads for very different reasons. Here is the problem I hear most from each, and what I build to fix it.",
    items: [
      {
        id: "law",
        name: "Law firms",
        pain: "A potential client calls at 7 PM, hits voicemail and calls the next firm on Google.",
        outcome:
          "Intake forms and an after-hours AI receptionist that books the consult before they move on.",
      },
      {
        id: "dental",
        name: "Dental and medical",
        pain: "Your front desk spends the day on the phone while new-patient forms pile up on clipboards.",
        outcome:
          "Online booking, text reminders and digital intake forms that patients finish before they arrive.",
      },
      {
        id: "real-estate",
        name: "Real estate",
        pain: "Portal leads go cold in minutes, and your follow-up lives in a spreadsheet nobody updates.",
        outcome:
          "An IDX-ready site that drops every buyer and seller into a pipeline with steady follow-up.",
      },
      {
        id: "roofing",
        name: "Roofing and HVAC",
        pain: "Storm season brings a rush of calls at night, and half the quote requests have no photos or address.",
        outcome:
          "A quote form that asks for photos and the address up front, plus an AI receptionist for the night shift.",
      },
      {
        id: "contractors",
        name: "Contractors",
        pain: "You lose evenings writing quotes for jobs that were never a fit for your crew.",
        outcome:
          "A site that shows off your best work and a form that screens job type, budget and timeline first.",
      },
    ],
  },

  work: {
    eyebrow: "Featured work",
    heading: "SmartQuoteDesk, a lead marketplace I built",
    // TODO(nayab): approve this card before launch. It uses only the facts you gave me
    // (multi-vertical lead marketplace, built with Next.js). Add real, approved numbers and a
    // screenshot when you have them; never invent results.
    caseStudy: {
      name: "SmartQuoteDesk",
      url: "https://smartquotedesk.com",
      approved: false,
      summary: [
        "SmartQuoteDesk is my own product: a lead marketplace that serves several industries from one platform.",
        "I planned it, designed it and built it with Next.js. It brings together the same parts I build for clients: lead capture, routing and fast pages.",
      ],
      tags: ["Next.js", "Lead marketplace", "Multi-vertical"],
    },
    note: "Results and screenshots will appear here once they are ready to share.",
    linkLabel: "Visit SmartQuoteDesk",
  },

  process: {
    eyebrow: "Process",
    heading: "How we work together, step by step",
    // TODO(nayab): confirm these steps and rough timelines match how you work.
    intro:
      "You always know what happens next and when. Here is the usual path from the first call to a live project.",
    steps: [
      {
        title: "Free strategy call",
        when: "Day 1",
        text: "We talk about your goals, your leads and what slows you down. You leave with clear next steps, even if we never work together.",
      },
      {
        title: "Plan and quote",
        when: "Within 3 days",
        text: "You get a written plan with the scope, price and timeline. Work starts only after you say yes.",
      },
      {
        title: "Design and build",
        when: "2 to 6 weeks",
        text: "Each week you see real progress on a private preview link. Your feedback comes straight to me.",
      },
      {
        title: "Test and launch",
        when: "Launch week",
        text: "I test on phones, tablets and laptops. Then we go live together on a call.",
      },
      {
        title: "Support and growth",
        when: "After launch",
        text: "Need a fix, a new page or one more automation? Send me a message and I take care of it.",
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    heading: "What does a project cost?",
    // TODO(nayab): PRICING SLOT. Replace this text with your real price ranges. Do not invent prices.
    text: [
      "Price ranges for each service are coming to this page soon.",
      "Until then, book a free call. You get a clear price for your exact project before any work begins.",
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Questions owners ask before they hire me",
    // TODO(nayab): review every answer; they describe your policies (ownership, support, hours).
    items: [
      {
        question: "How much does a website or automation project cost?",
        answer:
          "It depends on the scope. A simple marketing site costs far less than a custom web app or a full GoHighLevel build. On our free call, I ask about your goals and give you a clear price before any work starts.",
      },
      {
        question: "How long will my project take?",
        answer:
          "Most websites take two to six weeks. A GoHighLevel setup or a single AI automation can go live sooner. Your written quote includes the timeline.",
      },
      {
        question: "Who owns the code, the website and the accounts?",
        answer:
          "You do. I build on accounts in your name, like your domain, hosting and GoHighLevel. When the project ends, you keep full access and all the code.",
      },
      {
        question: "You are in Pakistan. How do time zones and calls work?",
        answer:
          "My workday overlaps with US business hours, so we can talk live on calls. Between calls, you get short written updates, so you always know where things stand.",
      },
      {
        question: "What happens after launch?",
        answer:
          "You can still reach me. I fix bugs, answer questions and help you add pages or automations as you grow. If you want ongoing care, we agree on a simple monthly plan.",
      },
      {
        question: "Can you promise more leads or a top spot on Google?",
        answer:
          "No honest developer can promise rankings or revenue. What I can promise is a fast site that follows Google's own guidance, clean tracking and follow-up that answers every lead in seconds. Those are the parts you control.",
      },
      {
        question: "Will I work with you or with a team?",
        answer:
          "You work with me. I write the code and stay your main contact. When a project needs more hands, like a designer or a copywriter, I bring in people I trust and lead the work myself.",
      },
      {
        question: "I already use GoHighLevel or another CRM. Can you work with it?",
        answer:
          "Yes. I can clean up the account you have now, connect it to your site and tools, or move you over from another CRM such as HubSpot.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    heading: "The developer behind the work",
    name: "Nayab Gull",
    initials: "NG",
    role: "Full-stack developer",
    location: "Lahore, Pakistan",
    photo: null,
    text: [
      "Hi, I'm Nayab. I'm a full-stack developer in Lahore, Pakistan, and most of my clients run businesses in the US.",
      "For more than five years, I have built websites, CRMs and automations for clients who found me on Upwork, on Fiverr and through referrals.",
      "There is no sales team and no account manager here. You get the person who writes your code, and a straight answer when you ask a question.",
    ],
  },

  finalCta: {
    heading: "Ready to turn more visitors into booked calls?",
    text: "Book a free strategy call. We look at your site and your lead flow together, and you leave with a plan you can use.",
    cta: { label: "Book a free strategy call", href: STRATEGY_CALL_URL },
    note: "No pressure and no obligation.",
  },

  testimonials: [],
};
