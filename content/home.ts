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

export interface Service {
  id: "web" | "ghl" | "ai";
  title: string;
  /** One line: what the client gets. */
  line: string;
  /** Link to the page that covers this service, once that page exists. */
  link?: Link;
}

export interface FlowStep {
  title: string;
  detail: string;
}

export interface Industry {
  id: "law" | "dental" | "real-estate" | "roofing" | "contractors";
  name: string;
  /** One plain line: their problem and what I fix. */
  line: string;
  /** Link to the industry page, once that page exists. */
  link?: Link;
}

export interface ProcessStep {
  title: string;
  when: string;
  text: string;
}

export interface Faq {
  question: string;
  /** Paragraphs are separated by a blank line ("\n\n"). */
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
    /** Proof facts shown under the CTAs (seo.md §10 proof bar). Only confirmed facts. */
    proof: readonly string[];
    primaryCta: Link;
    secondaryCta: Link;
  };
  flow: { label: string; caption: string; steps: readonly FlowStep[]; footer: string };
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: readonly Service[];
    /** Links under the cards to pages that are not a single service (hire, pricing). */
    more: readonly Link[];
  };
  howItWorks: { eyebrow: string; heading: string; intro: string; steps: readonly FlowStep[] };
  industries: { eyebrow: string; heading: string; intro: string; items: readonly Industry[] };
  process: { eyebrow: string; heading: string; intro: string; steps: readonly ProcessStep[] };
  work: {
    eyebrow: string;
    heading: string;
    caseStudy: CaseStudy;
    note: string;
    linkLabel: string;
  };
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
    /** Link to the About page (homepage only). */
    link?: Link;
  };
  faq: { eyebrow: string; heading: string; items: readonly Faq[] };
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
      before: "The ",
      highlight: "web development agency",
      after: " that turns your leads into booked calls",
    },
    lede: "I build fast websites, set up GoHighLevel, and add AI that calls every new lead within 60 seconds.",
    proof: ["5+ years", "400+ projects delivered", "Clients in the US, UK and worldwide"],
    primaryCta: { label: "Book a free strategy call", href: STRATEGY_CALL_URL },
    secondaryCta: { label: "See services", href: "#services" },
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

  services: {
    eyebrow: "Services",
    heading: "What my web development agency sets up for you",
    intro:
      "You get three things that work as one system. Your site brings in the lead. Your CRM keeps it. AI makes sure someone calls back fast.",
    items: [
      {
        id: "web",
        title: "Web Development",
        line: "Fast, professional websites that bring in leads.",
        link: { label: "Website design and development", href: "/services/web-design-development" },
      },
      {
        id: "ghl",
        title: "GoHighLevel",
        line: "CRM, pipelines, SMS and email follow-up set up for you.",
        link: { label: "GoHighLevel agency services", href: "/gohighlevel-agency" },
      },
      {
        id: "ai",
        title: "AI Automation",
        line: "AI that answers and calls your leads, day and night.",
        link: { label: "AI automation agency services", href: "/ai-automation-agency" },
      },
    ],
    more: [
      { label: "Hire me as your full stack developer", href: "/hire-full-stack-developer" },
      { label: "Website and automation pricing", href: "/pricing" },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "From first click to booked call",
    intro:
      "Every lead takes the same short path. Nobody waits on hold, and nobody gets forgotten. You only step in when the call is on your calendar.",
    steps: [
      { title: "Website", detail: "A visitor fills in your form." },
      { title: "GoHighLevel", detail: "The lead lands in your pipeline." },
      { title: "AI call", detail: "AI calls them within 60 seconds." },
      { title: "Booked call", detail: "The meeting is on your calendar." },
    ],
  },

  industries: {
    eyebrow: "Who I work with",
    heading: "Websites and automation for these businesses",
    intro:
      "Each industry loses leads in its own way. Here is the problem I hear most from owners in each one, and how I fix it.",
    items: [
      {
        id: "law",
        name: "Law firms",
        line: "Calls after 5 PM go to voicemail and then to the next firm. I add an intake form and an AI receptionist that books the consult.",
      },
      {
        id: "dental",
        name: "Dental and medical",
        line: "Your front desk is on the phone all day. I add online booking, text reminders and intake forms patients fill in before they arrive.",
      },
      {
        id: "real-estate",
        name: "Real estate",
        line: "Portal leads go cold in minutes. I connect your site to GoHighLevel so every buyer and seller gets a fast reply and steady follow-up.",
      },
      {
        id: "roofing",
        name: "Roofing and HVAC",
        line: "Storm season floods your phone at night. I add a quote form that asks for photos and an AI receptionist that answers after hours.",
        link: {
          label: "Roofing and HVAC website design",
          href: "/industries/roofing-hvac-website-design",
        },
      },
      {
        id: "contractors",
        name: "Contractors",
        line: "You waste evenings on quotes for jobs that don't fit. I build a site that shows your best work and a form that asks about budget first.",
      },
    ],
  },

  process: {
    eyebrow: "Process",
    heading: "Four steps, with no surprises",
    // TODO(nayab): confirm these steps and rough timelines match how you work.
    intro:
      "You always know what happens next and when. Each step has a clear goal and a rough timeline.",
    steps: [
      {
        title: "Free strategy call",
        when: "Day 1",
        text: "We talk about your goals and your leads. You leave with clear next steps, even if we never work together.",
      },
      {
        title: "Plan and quote",
        when: "Within 3 days",
        text: "You get a written plan with the scope, price and timeline. Work starts only after you say yes.",
      },
      {
        title: "Build",
        when: "2 to 6 weeks",
        text: "Each week you see real progress on a private preview link. Your feedback comes straight to me.",
      },
      {
        title: "Launch and support",
        when: "Launch week",
        text: "I test every form, call flow and page on phones and laptops. Then we go live together, and I stay on hand for fixes.",
      },
    ],
  },

  work: {
    eyebrow: "My work",
    heading: "One example: SmartQuoteDesk",
    // TODO(nayab): approve this card before launch. It uses only the facts you gave me
    // (multi-vertical lead marketplace, built with Next.js). Add real, approved numbers and a
    // screenshot when you have them; never invent results.
    caseStudy: {
      name: "SmartQuoteDesk",
      url: "https://smartquotedesk.com",
      approved: false,
      summary: [
        "SmartQuoteDesk is my own product: a lead marketplace that serves several industries from one platform.",
        "I planned it, designed it and built it with Next.js. It uses the same parts I build for clients: lead capture, routing and fast pages.",
      ],
      tags: ["Next.js", "Lead marketplace", "Multi-vertical"],
    },
    note: "Results and screenshots will appear here once they are ready to share.",
    linkLabel: "Visit SmartQuoteDesk",
  },

  about: {
    eyebrow: "About me",
    heading: "The developer behind the work",
    name: "Nayab Gull",
    initials: "NG",
    role: "Full-stack developer",
    location: "Lahore, Pakistan",
    photo: null,
    text: [
      "Hi, I'm Nayab. I'm a full-stack developer in Lahore, Pakistan, and most of my clients run businesses in the US.",
      "For more than five years, I have built websites, CRMs and automations for clients on Upwork, on Fiverr and through referrals. You work with me directly, from the first call to launch day.",
      "My goal is simple. When a lead reaches out, your business answers fast and books the call, even when you are busy on a job.",
    ],
    link: { label: "More about Nayab Gull", href: "/about" },
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Questions owners ask before they hire me",
    // TODO(nayab): review every answer; they describe your policies (ownership, support, hours).
    items: [
      {
        question: "How much does a website or automation project cost?",
        answer:
          "It depends on the scope. A simple marketing site costs far less than a custom web app or a full GoHighLevel build.\n\nOn our free call, I ask about your goals, your current tools and your deadline. Then you get a clear, written price before any work starts. The quote lists what is included and what is not, so there are no surprise bills later.",
      },
      {
        question: "How long will my project take?",
        answer:
          "Most websites take two to six weeks. A GoHighLevel setup or a single AI automation can go live sooner. Your written quote includes the timeline, so you can plan around it.\n\nThe biggest factor is how fast we get your content, like photos, service details and logins. When those arrive early, launch day comes early too.",
      },
      {
        question: "Who owns the code, the website and the accounts?",
        answer:
          "You do. I build on accounts in your name, like your domain, hosting and GoHighLevel. When the project ends, you keep full access and all the code.\n\nYou never pay me just to keep your own site online. If you ever want another developer to take over, they get a clean handover.",
      },
      {
        question: "You are in Pakistan. How do time zones and calls work?",
        answer:
          "My workday overlaps with US business hours, so we can talk live on calls.\n\nBetween calls, you get short written updates. You always know where things stand. Most messages get a reply the same business day, and urgent issues get handled first.",
      },
      {
        question: "What happens after launch?",
        answer:
          "You can still reach me. I fix bugs, answer questions and help you add pages or automations as you grow.\n\nIf you want ongoing care, we agree on a simple monthly plan. That can cover updates, backups, speed checks and small changes. You can also just message me when you need something.",
      },
      {
        question: "Can you promise more leads or a top spot on Google?",
        answer:
          "No honest developer can promise rankings or revenue. What I can promise is a fast site that follows Google's own guidance, clean tracking and follow-up that answers every lead in seconds. Those are the parts you control.\n\nBetter follow-up often wins more jobs than more traffic, because fewer leads slip away. I set up tracking so you can see which calls and forms turn into real work.",
      },
      {
        question: "Will I work with you or with a team?",
        answer:
          "You work with me. I write the code and stay your main contact. When a project needs more hands, like a designer or a copywriter, I bring in people I trust and lead the work myself. You still talk to one person, and you never pay for a sales team or an account manager.",
      },
      {
        question: "I already use GoHighLevel or another CRM. Can you work with it?",
        answer:
          "Yes. I can clean up the account you have now and connect it to your site and tools. I can also move you over from another CRM, such as HubSpot, without losing your contacts.\n\nYour pipelines, tags and past notes come across too. Before anything changes, we agree on a plan, and your team keeps working while I move things over.",
      },
    ],
  },

  finalCta: {
    heading: "Ready to turn more leads into booked calls?",
    text: "Book a free strategy call. We look at your site and your lead flow together, and you leave with a plan you can use.",
    cta: { label: "Book a free strategy call", href: STRATEGY_CALL_URL },
    note: "No pressure and no obligation.",
  },

  testimonials: [],
};
