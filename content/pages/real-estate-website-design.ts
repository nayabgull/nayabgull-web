import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /industries/real-estate-website-design (industry page). Primary keyword: "real estate website
 * design". Brief: content/briefs/real-estate-website-design.md. Keywords: docs/seo/keyword-map.md
 * (Industries). Breadcrumb: Home › Industries › this page.
 *
 * IDX: listings come through the client's own MLS membership and an IDX provider the MLS approves.
 * The page never says Nayab supplies MLS access or a data feed. Fair Housing is named only as the
 * brokerage's responsibility, with no compliance claim.
 *
 * Prices ($1,500 business website, $2,500 full system, from content/pages/pricing.ts) and the
 * "two to six weeks" timeline: approved by Nayab 2026-11-21. No IDX provider, CRM or other vendor
 * is named or described, except GoHighLevel (what I build on).
 * TODO(nayab): PROOF. No real estate case study, client name, number or review is approved yet.
 * Replace the "Case study" note in the "proof" section with a real, approved result.
 * TODO(nayab): when /ai-automation-agency/ai-receptionist-for-small-business goes live, point the
 * follow-up section link there instead of the AI automation hub.
 */
export const realEstateWebsiteDesign: PageContent = {
  path: "/industries/real-estate-website-design",
  name: "Real estate websites",
  parent: { name: "Industries", path: "/industries" },
  updated: "2026-11-21",
  meta: {
    title: "Real Estate Website Design for Agents | Nayab Gull",
    description:
      "Real estate website design for agents, teams and brokerages: IDX search, lead capture on listings and fast follow-up that books showings. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "Website" preselected.
  request: { type: "demo", service: "website" },

  hero: {
    eyebrow: "Real estate",
    headline: {
      before: "",
      highlight: "Real estate website design",
      after: " that turns home searches into showings",
    },
    lede: "I build real estate websites for agents, teams and brokerages. Buyers search your listings, save the homes they like and book a showing. Then the follow-up keeps going while you are out with clients.",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me about your market and your team. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Why busy agents still lose buyers online",
      intro:
        "The leaks happen between the first home search and the first showing. Agents describe them the same way.",
      columns: 3,
      items: [
        {
          title: "“My site sends buyers somewhere else.”",
          text: "Your site has no real home search, so buyers leave to search somewhere else. You never get their contact details.",
        },
        {
          title: "“I get a name and nothing else.”",
          text: "A form says “Contact me” and asks for nothing useful. You cannot tell a buyer from a renter or a curious neighbor.",
        },
        {
          title: "“Leads go cold while I am at a showing.”",
          text: "A buyer asks about a home on Saturday. You see it on Monday, and they already toured it with someone else.",
        },
      ],
    },
    {
      kind: "features",
      id: "features",
      eyebrow: "What I build",
      heading: "What realtor website design should include",
      intro:
        "A real estate site has two jobs: help people find a home and turn them into a client you can call.",
      layout: "cards",
      paragraphs: [
        "I design the phone view first, then the desktop. These six parts go into almost every real estate agent website design I make.",
      ],
      items: [
        {
          title: "Listing search",
          text: "Buyers search by price, beds and area on your own site. They can save a search and get new-listing alerts.",
          icon: "target",
        },
        {
          title: "Lead capture on listings",
          text: "A visitor who saves a home, saves a search or asks a question leaves a name, a phone number and an email.",
          icon: "mail",
        },
        {
          title: "Showing requests",
          text: "Buyers ask for a time that suits them right on the listing. The request lands on your calendar for you to confirm.",
          icon: "calendar",
        },
        {
          title: "Agent and team pages",
          text: "Each agent gets a page with a photo, the areas they cover and their own contact button.",
          icon: "person",
        },
        {
          title: "Neighborhood pages",
          text: "Pages about the areas you know: homes, parks, commutes and recent listings.",
          icon: "globe",
        },
        {
          title: "A fast mobile site",
          text: "Photos load in the right size for each phone, and the call button stays on screen.",
          icon: "phone",
        },
      ],
      outro:
        "Fair Housing rules apply to every page and ad. Your brokerage is responsible for them, so you approve every word before launch.",
    },
    {
      kind: "prose",
      id: "idx",
      eyebrow: "IDX listings",
      heading: "Real estate IDX website design, explained plainly",
      paragraphs: [
        "IDX stands for Internet Data Exchange. It is the system that lets your website show homes from your local MLS, including listings from other brokerages.",
        "The listings come through your own MLS membership and an IDX provider that your MLS approves. Your MLS has to approve the setup before any listing goes live. I do not provide MLS access or a listing feed.",
        "My part is the website around that feed. I connect the IDX provider you choose, design the search pages and send every saved home and question to your CRM.",
        "Your MLS also sets display rules, such as how listing credits appear. I build to those rules, and you or your broker check them before launch.",
      ],
    },
    {
      kind: "agent-flow",
      id: "lead-flow",
      eyebrow: "Follow-up",
      heading: "How real estate marketing automation turns a search into a showing",
      intro: "Pick a step to follow one new buyer from first search to booked showing.",
      steps: [
        {
          label: "Saved search",
          title: "A buyer saves a search on your site",
          text: "A visitor likes three homes and saves a search. To do that, they enter a name, a phone number and an email.",
          example:
            "Example: a couple saves a search for 3-bedroom homes near a middle school on a Tuesday night.",
          icon: "target",
        },
        {
          label: "First text",
          title: "They get a text right away",
          text: "A short text goes out right away in your name. It thanks them and asks one simple question about their plans.",
          example:
            "Example: “Thanks for saving that search. Are you planning to buy this spring or later?” goes out.",
          icon: "chat",
        },
        {
          label: "Agent alert",
          title: "The right agent gets the lead",
          text: "The lead goes to the agent who covers that area, or to the next agent in line. That agent gets an alert with the homes the buyer saved.",
          example:
            "Example: the agent for the north side gets a phone alert with both names and the saved search.",
          icon: "person",
        },
        {
          label: "Showing booked",
          title: "The buyer books a showing",
          text: "The buyer picks a time from the agent's calendar. The agent confirms it with the listing agent before the visit.",
          example:
            "Example: the couple books Saturday at 10 AM and gets a reminder text on Friday.",
          icon: "calendar",
        },
        {
          label: "CRM and drip",
          title: "Your CRM keeps the follow-up going",
          text: "The lead lands in your CRM with every saved home attached. Slow buyers get a gentle drip of texts and emails, so you stay in touch for months.",
          example: "Example: a buyer who plans to move next year gets a short check-in each month.",
          icon: "crm",
        },
      ],
      footer: "The texts sound like you, and you can take over the chat at any moment.",
    },
    {
      kind: "features",
      id: "follow-up",
      eyebrow: "Speed to lead",
      heading: "Who follows up when you are at a showing?",
      intro:
        "You cannot text a new lead while you walk a client through a kitchen. The system answers for you.",
      layout: "checklist",
      paragraphs: [
        "I set up the follow-up in your CRM. If you do not have one yet, I can build it in GoHighLevel, which handles texts, emails, pipelines and calendars in one place.",
      ],
      example: {
        label: "Example",
        paragraphs: [
          "A buyer asks about a listing at 7:30 PM on a Sunday. They get a text right away and book a showing for Monday evening.",
        ],
      },
      listIntro: "What the follow-up can do for your business:",
      items: [
        { text: "Text every new lead right away, day or night." },
        { text: "Send drip texts and emails to buyers who are months away." },
        { text: "Remind past clients of their home anniversary, so they remember you." },
      ],
      outro: [
        "Business texting in the US needs a short registration called A2P 10DLC, and I handle that setup with you. For the bigger picture, see my ",
        { text: "AI automation services for small businesses", href: "/ai-automation-agency" },
        ".",
      ],
    },
    {
      kind: "features",
      id: "brokerage",
      eyebrow: "Teams and brokerages",
      heading: "Real estate brokerage website design for teams",
      intro:
        "A team or brokerage site has to work for many agents at once, and leads must reach the right person fast.",
      layout: "cards",
      items: [
        {
          title: "Lead routing",
          text: "Leads go to agents by area, by price range or in turn. You set the rules, and you can change them later.",
          icon: "flow",
        },
        {
          title: "Agent pages that sell",
          text: "Each agent page shows their own listings, the areas they cover and real client reviews, plus a button that books time with them.",
          icon: "person",
        },
        {
          title: "Recruiting pages",
          text: "A clear page for agents who want to join, with a short form that goes to the broker.",
          icon: "rules",
        },
      ],
    },
    {
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "My five-step process for a real estate website",
      intro:
        "Most websites take two to six weeks. MLS approval time depends on your MLS, and your written quote shows the full timeline.",
      steps: [
        {
          title: "Free call and site review",
          text: "You walk me through your market, your team and your tools. Then I look through your current site.",
        },
        {
          title: "Page plan and IDX choice",
          text: "A written plan lists the pages, the lead flow and the scope. I help you pick the IDX provider, and you start the MLS approval.",
        },
        {
          title: "Design and writing",
          text: "I write the first drafts from your notes and listings. You edit any line that does not match your voice.",
        },
        {
          title: "Build and testing",
          text: "I set up the site, the home search and the follow-up, then test each on real phones.",
        },
        {
          title: "Launch and handover",
          text: "Your domain goes live on the new site, and your team learns to add agents and pages.",
        },
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What sets the price of real estate website design?",
      intro: [
        "These are my general starting prices. Your quote depends on the pages, the agent profiles and the follow-up you add. Every service is on my ",
        { text: "website pricing page", href: "/pricing" },
        ".",
      ],
      items: [
        {
          name: "Business website (5 pages)",
          from: 1500,
          label: "Starts at $1,500.",
          text: "An agent or team site: home, listings, areas, about and contact.",
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
          text: "Website, CRM and AI, built together as one lead system for buyers and sellers.",
          includes: [
            "Business website.",
            "CRM setup and follow-up.",
            "AI replies for new leads.",
            "Launch support and training.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. IDX provider and MLS fees are separate and paid by you. After the first call, I send a fixed quote in writing.",
    },
    {
      // TODO(nayab): PROOF. Replace the "Case study" note with a real, approved real estate result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire a developer who builds the site and the system?",
      layout: "cards",
      paragraphs: [
        "An agent site often fails between a saved home and your calendar. As a full-stack developer, I build the search, the CRM link and the booking myself. In more than five years, I have finished 400+ projects.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "There is no approved real estate case study yet, so I show none. Ask for a free demo and judge the lead flow with your own listings.",
        ],
      },
      outro: [
        "Read ",
        { text: "about my background and the way I work", href: "/about" },
        " before you book.",
      ],
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "More help for your real estate business",
      items: [
        {
          label: "My web design and development service",
          href: "/services/web-design-development",
          text: "How I plan, build and launch each site.",
        },
        {
          label: "GoHighLevel CRM setup and automation",
          href: "/gohighlevel-agency",
          text: "Pipelines, texts and drips for agents who need a CRM.",
        },
        {
          label: "Websites for other industries",
          href: "/industries",
          text: "Law firms, clinics, roofers and contractors each have their own page.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions agents and brokers ask before they hire me",
    items: [
      {
        question: "Can you give me MLS access or a listing feed?",
        answer:
          "No. Listings come through your own MLS membership and an IDX provider your MLS approves. Your MLS must approve the setup.\n\nI help you pick a provider, then connect it to your site and your CRM.",
      },
      {
        question: "Can I keep my current IDX provider and CRM?",
        answer:
          "Often, yes. I first check how your provider and your CRM connect to other tools. If they do, I build around them.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as hosting, a domain or a CRM.\n\nI build everything inside those accounts: the website, the intake flows and the full setup. At launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Who is responsible for Fair Housing and MLS rules?",
        answer:
          "Your brokerage is. I build the site to the rules you give me, and you or your broker approve every page before launch.",
      },
      {
        question: "How long does it take to build a real estate website?",
        answer:
          "Most websites take two to six weeks. MLS approval time depends on your MLS, and listings go live only after it approves the IDX setup.\n\nYou get a written timeline with your quote, before any work starts.",
      },
      {
        question: "Will I be able to add agents and pages myself?",
        answer:
          "Yes. Your team can add an agent, a neighborhood page or a blog post without any code. At handover, I show you how on a short video call.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
    ],
  },

  closing: {
    heading: "Ready for a site that books showings while you sell?",
    text: "Start with a free demo. Tell me your market and your team size, and I will show you how the site and the lead flow would work for you.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "Real estate website design",
    serviceType: "Real estate website design",
    description:
      "Websites for US real estate agents, teams and brokerages: IDX listing search through the client's MLS, lead capture, showing booking and CRM follow-up.",
  },
};
