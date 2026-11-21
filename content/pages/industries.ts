import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /industries (hub). Primary keyword: "industry website design". Secondary: "website design for
 * small business" (docs/seo/keyword-map.md, Industries). Brief: content/briefs/industries.md.
 * Links down to every industry page; each industry page sets `parent` to this hub.
 *
 * Every card repeats only what its industry page says. When an industry page changes its problem
 * or its offer, update its card here too.
 *
 * TODO(nayab): CASE STUDY. The hub rules (docs/rules/seo.md §10) ask for a case study. None is
 * approved yet, so the "proof" section says so and shows none. Replace that note with a real,
 * approved result.
 * TODO(nayab): TIMELINE. "Two to six weeks" comes from the homepage. Confirm it also holds for the
 * law firm, contractor and real estate pages, which show no timeline yet.
 */
export const industries: PageContent = {
  path: "/industries",
  name: "Industries",
  updated: "2026-11-21",
  meta: {
    title: "Industry Website Design for Small Businesses | Nayab Gull",
    description:
      "Industry website design for law firms, clinics, agents, roofers and contractors: forms that ask the right questions and follow-up that books calls.",
  },

  // Both forms on this page ask for a custom demo, with "Website" preselected.
  request: { type: "demo", service: "website" },

  hero: {
    eyebrow: "Industries",
    headline: {
      before: "",
      highlight: "Industry website design",
      after: " for small businesses",
    },
    lede: "I build sites for law firms, clinics, real estate agents, roofers, HVAC companies and contractors. Each one asks the questions your buyers have.",
    proof: ["5+ years", "400+ projects delivered"],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me what your business does and how customers reach you. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "cards",
      id: "industries",
      eyebrow: "Pick your industry",
      heading: "Website design for small business owners, one industry at a time",
      intro:
        "Each page below starts with the problem owners in that field tell me about. Then it shows what I build to fix it.",
      columns: 3,
      items: [
        {
          title: "Law firms",
          text: "Calls go to voicemail while you are in court, and web leads wait in a busy inbox. I build practice area pages, intake forms that sort cases and consult booking that runs after hours.",
          link: {
            label: "Law firm website design for attorneys",
            href: "/industries/law-firm-website-design",
          },
        },
        {
          title: "Dental and medical offices",
          text: "The front desk cannot answer every call, clipboards slow down check-in and no-shows leave gaps. The fix: online booking, patient forms filled in at home and visit reminders.",
          link: {
            label: "Dental and medical website design",
            href: "/industries/dental-medical-website-design",
          },
        },
        {
          title: "Real estate agents and brokerages",
          text: "Buyers leave your site to search somewhere else, and a plain contact form tells you little. I add home search on your own site, lead capture on listings and showing requests.",
          link: {
            label: "Real estate website design for agents",
            href: "/industries/real-estate-website-design",
          },
        },
        {
          title: "Roofing and HVAC companies",
          text: "Storms hit after closing time, and quote requests arrive half empty. You get photo quote forms, a call button on every screen and follow-up that answers after hours.",
          link: {
            label: "Roofing and HVAC website design",
            href: "/industries/roofing-hvac-website-design",
          },
        },
        {
          title: "Contractors and remodelers",
          text: "You cannot pick up on a job site, and a faster builder wins the bid. My answer is a project gallery, estimate forms that sort jobs by size and booked site visits.",
          link: {
            label: "Contractor website design for builders",
            href: "/industries/contractor-website-design",
          },
        },
      ],
    },
    {
      kind: "prose",
      id: "why-industry",
      eyebrow: "Why it matters",
      heading: "Why does an industry website beat a generic one?",
      paragraphs: [
        "A site built for your industry wins more work because it speaks to one kind of buyer. Every page answers the questions that buyer really asks.",
        "Think about the first form on the site. A roofer needs the address and photos of the damage. A law firm needs the case type, the state and how urgent it is.",
        "For a dental office, it is the visit type and the insurance plan. Builders want the job size, the timeline and a budget range. One generic contact form gets none of this, so you start every lead with a phone call.",
        "Trust works the same way. Homeowners check a license number and proof of insurance. Patients want to see the people who will treat them. Clients of a firm look for bar admissions.",
        "Each field also has its own rules. Attorneys follow state bar advertising rules. Agents follow MLS display rules and Fair Housing rules. You approve every claim before launch, because those rules are yours to judge.",
      ],
    },
    {
      kind: "features",
      id: "core",
      eyebrow: "In every build",
      heading: "What every site I build includes",
      intro:
        "The questions change from one industry to the next. The core parts stay the same, because every owner wants the same result: more booked calls.",
      layout: "cards",
      paragraphs: [
        "Most of your visitors find you on a phone, often in a hurry. So I design the phone view first, and these six parts go into almost every build.",
      ],
      items: [
        {
          title: "A fast mobile site",
          text: "Pages open quickly on a weak signal. The call button stays on screen, and the text is easy to read.",
          icon: "globe",
        },
        {
          title: "Forms that ask your questions",
          text: "Short forms collect the details your business needs. Good-fit leads stand out before you pick up the phone.",
          icon: "rules",
        },
        {
          title: "Booking on your calendar",
          text: "Visitors pick an open time for a consult, a visit or a walkthrough. They get a confirmation text right away.",
          icon: "calendar",
        },
        {
          title: "Follow-up through your CRM",
          text: "Each lead lands in your CRM, such as GoHighLevel, with every answer attached. Reminder and follow-up texts go out on their own.",
          icon: "crm",
        },
        {
          title: "An AI receptionist, if you want one",
          text: "An AI voice agent can answer the calls you miss, ask your questions and book the next step. It is an add-on, not a must.",
          icon: "phone",
        },
        {
          title: "Your Google Business Profile",
          text: "Your name, address, phone and hours match your profile, so local buyers find the same facts everywhere.",
          icon: "check",
        },
      ],
      outro:
        "I follow accessibility best practices (WCAG 2.2 AA), so more people can use your site. Business texting also needs a carrier registration called A2P 10DLC, and I start it early because approval takes time.",
    },
    {
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "One process for every industry",
      intro:
        "Most websites take two to six weeks. Your written quote shows the exact timeline for your business.",
      steps: [
        {
          title: "Free call and site review",
          text: "First, you show me how customers find you and how they book today. After that, I study your current site.",
        },
        {
          title: "Page plan and fixed quote",
          text: "A written plan lists the pages, the form questions and a fixed price for you to approve.",
        },
        {
          title: "Design and writing",
          text: "Your notes and photos become the first drafts. You change any line until it sounds like your business.",
        },
        {
          title: "Build and testing",
          text: "I build the site and the follow-up. Then I test every form and call button on real phones.",
        },
        {
          title: "Launch and handover",
          text: "Your domain moves to the new site, and your team learns to update pages on their own.",
        },
      ],
    },
    {
      kind: "prose",
      id: "industry-steps",
      eyebrow: "What changes",
      heading: "Where the process bends for your industry",
      paragraphs: [
        "The five steps stay the same, but a few industries add their own outside steps. I plan for them from the first week, so they never stall the launch.",
      ],
      bullets: [
        "Real estate: your MLS has to approve the IDX setup before any listing goes live on your site.",
        "Dental and medical: patients fill in forms at home, so I plan the questions with your front desk first.",
        "Law firms: your staff run the conflict check in their own software, and the site only sends them a reminder.",
        "Roofing, HVAC and contractors: real job photos matter most, so I ask for them early.",
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does a website for your industry cost?",
      intro: [
        "These are my general starting prices. Your quote depends on the pages, the writing and the follow-up you add. See ",
        { text: "what changes the price of a website", href: "/pricing" },
        ".",
      ],
      items: [
        {
          name: "Business website (5 pages)",
          from: 1500,
          label: "Starts at $1,500.",
          text: "A full site for your business, with the pages and the form your industry needs.",
          includes: [
            "Custom design on each page.",
            "Lead forms and call buttons.",
            "On-page SEO basics.",
            "Editing access and training.",
          ],
        },
        {
          name: "Full system",
          from: 2500,
          label: "Starts at $2,500.",
          text: "Website, CRM and AI follow-up, built together as one lead system.",
          includes: [
            "Business website.",
            "CRM setup and follow-up.",
            "AI replies for new leads.",
            "Launch support and training.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. After the first call, you get a fixed quote in writing. Hosting, software plans and call minutes go to those providers.",
    },
    {
      // TODO(nayab): CASE STUDY. Replace the "Case study" note with a real, approved result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why work with one developer across industries?",
      layout: "cards",
      paragraphs: [
        "I am a full-stack developer with more than five years of work and 400+ projects behind me. I build the site, the forms and the follow-up myself, so every step fits the next one.",
        "Building for several industries also helps you. A form idea that cuts bad leads for a roofer can help a contractor too. I bring those lessons into every new build.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved case study to show on this page yet, and I will not invent one. Ask for a free demo instead, and judge the site and the lead flow for your own business.",
        ],
      },
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions owners ask before they hire me",
    items: [
      {
        question: "Do you only work with these five industries?",
        answer:
          "No. These are the industries I know best, but I also build for other service businesses. On the first call, I will tell you honestly whether I am the right fit for your project.",
      },
      {
        question: "How much does a small business website cost?",
        answer:
          "A five-page business website starts at $1,500, and a full system with a CRM and AI follow-up starts at $2,500. More pages, writing and custom features raise the price.\n\nAfter the first call, you get a fixed quote in writing.",
      },
      {
        question: "How long does it take to build my site?",
        answer:
          "Most websites take two to six weeks. Booking, forms and follow-up can add time, and so can outside approvals such as an MLS or a texting registration.\n\nYour written quote shows the timeline before any work starts.",
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
        question: "Can you redesign my current site?",
        answer:
          "Yes. I first check which pages bring in calls today, so nothing that works gets lost. Old addresses point to the new pages.\n\nYour domain and your email stay the same.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "Yes. Your team can change text, add a photo or add a page without any code. At handover, I show you how on a short video call.",
      },
      {
        question: "Do I need the CRM or the AI receptionist to start?",
        answer:
          "No. Many owners start with the website and a good form. You can add the CRM texts or the AI receptionist later.\n\nI build the site so those parts plug in without a rebuild.",
      },
      {
        question: "Can you promise a top spot on Google?",
        answer:
          "No, I cannot promise that. I build fast pages that Google can read, with clear service pages and correct business details.\n\nYour reviews and your Google Business Profile matter too.",
      },
      {
        question: "Who checks the rules for my industry?",
        answer:
          "You do, or your own advisor. That covers state bar rules for attorneys, MLS and Fair Housing rules for agents and patient privacy for clinics.\n\nI build to the rules you give me, and you approve every page before launch.",
      },
    ],
  },

  closing: {
    heading: "Not sure which page fits your business?",
    text: "Tell me what you do and how customers reach you now. I will show you a free demo of the site and the lead flow for your industry.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "Industry website design",
    serviceType: "Industry website design",
    description:
      "Websites for US small businesses in five industries: law firms, dental and medical offices, real estate, roofing and HVAC, and contractors, with lead forms, booking and follow-up.",
  },
};
