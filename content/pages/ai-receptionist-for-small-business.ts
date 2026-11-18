import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /ai-automation-agency/ai-receptionist-for-small-business (service page under the AI automation hub).
 * Primary keyword: "ai receptionist for small business". Keyword map change approved by Nayab on
 * 2026-11-19. Brief: content/briefs/ai-receptionist-for-small-business.md.
 * Not targeted here (reserved for blog posts): ai receptionist cost, ai receptionist pricing, best
 * ai receptionist, best ai answering service.
 *
 * TODO(nayab): TIMELINE. Add how long each of the four process steps takes, and a total for the
 * "How long does setup take?" answer. No timeline is shown until you confirm it.
 * TODO(nayab): DEMO LINE. Add the demo phone number to the "demo" block after you test the demo.
 * Until then no phone number is published.
 * TODO(nayab): PRICING. No price is shown on purpose. Add a `prices` block (it also adds the Offer
 * to the Service JSON-LD) and the amount to APPROVED_PRICES in the page tests once you decide it.
 * TODO(nayab): CASE STUDY. No AI receptionist case study is approved yet (see the "proof" block).
 */
export const aiReceptionistForSmallBusiness: PageContent = {
  path: "/ai-automation-agency/ai-receptionist-for-small-business",
  name: "AI receptionist",
  parent: { name: "AI automation agency", path: "/ai-automation-agency" },
  updated: "2026-11-19",
  meta: {
    title: "AI Receptionist for Small Business, 24/7 Calls | Nayab Gull",
    description:
      "An AI receptionist for small business that answers every call 24/7, books jobs, flags emergencies and texts you a summary. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo. "AI agent" is the closest service option.
  request: { type: "demo", service: "ai-agent" },

  hero: {
    eyebrow: "AI receptionist",
    headline: { before: "", highlight: "AI Receptionist for Small Business", after: "" },
    lede: "My AI receptionist for small business answers every call in your company name, day and night. It books jobs on your calendar, flags emergencies and texts you a short summary of each call.",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me how your calls work today. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "call-flow",
      id: "call-flow",
      eyebrow: "On a real call",
      heading: "What an AI receptionist does on a real call",
      intro:
        "Here is one late call to an HVAC company, from the first ring to the text on your phone.",
      steps: [
        {
          who: "Caller",
          title: "A customer calls",
          says: "Hi, my AC stopped working, and it's 92 degrees in here.",
          icon: "phone",
        },
        {
          who: "AI receptionist",
          title: "It answers in your company name",
          says: "Thanks for calling Acme Heating and Air. This is the virtual assistant. How can I help?",
          icon: "chip",
        },
        {
          who: "AI receptionist",
          title: "Then it asks about the problem and the address",
          says: "Sorry to hear that. What is the address, and when did it stop?",
          icon: "chat",
        },
        {
          who: "AI receptionist",
          title: "Next, it books the visit or flags it as urgent",
          says: "A tech can be there at 8 AM. Since it's so hot, I'm also marking this urgent for the owner.",
          icon: "calendar",
        },
        {
          who: "You",
          title: "You get a text with the summary",
          says: "Your phone buzzes with every detail. Call back tonight, or let the booking stand.",
          icon: "mail",
        },
      ],
      summary: {
        label: "Text from your AI receptionist",
        lines: [
          { name: "Caller", value: "Dana, a new customer." },
          { name: "Problem", value: "AC not cooling, house at 92°F." },
          { name: "Address", value: "418 Maple Avenue." },
          { name: "Status", value: "Urgent, booked for 8 AM." },
        ],
      },
      footer: "One call, five steps, and you never had to pick up the phone.",
    },
    {
      kind: "features",
      id: "features",
      eyebrow: "What it handles",
      heading: "What your AI virtual receptionist handles",
      intro:
        "A voice AI receptionist does six jobs for you. I set each one up around your hours, your services and your rules.",
      layout: "cards",
      items: [
        {
          title: "24/7 answering",
          text: "Calls get picked up on the first ring, at 2 PM or 2 AM, on weekends and on holidays. No one hears a busy tone.",
          icon: "phone",
        },
        {
          title: "After-hours and overflow",
          text: "Send it every call after you close, or only the ones your team misses when lines are busy.",
          icon: "flow",
        },
        {
          title: "Booking on your calendar",
          text: "While the caller is still on the line, the AI checks your open times and books the job.",
          icon: "calendar",
        },
        {
          title: "Emergency flagging",
          text: "A burst pipe or a gas smell is not a normal call. You pick the urgent words, and the AI alerts you right away.",
          icon: "shield",
        },
        {
          title: "Call summary by text",
          text: "After each call, a short text tells you who called, what they need, the address and what happens next.",
          icon: "mail",
        },
        {
          title: "Handoff to a person",
          text: "Some callers ask for a human. Then the AI transfers the call to you, or takes a clear message.",
          icon: "person",
        },
      ],
      outro:
        "This is AI call answering that follows your rules. Callers get answers about your business, not a script.",
    },
    {
      kind: "compare",
      id: "compare",
      eyebrow: "Compare",
      heading: "AI receptionist vs voicemail vs answering service vs human receptionist",
      intro:
        "An AI phone answering service is not right for every call. Here is an honest look, so you can pick what fits.",
      rowLabel: "Question",
      columns: ["AI receptionist", "Voicemail", "Answering service", "Human receptionist"],
      rows: [
        {
          label: "Answers at 2 AM",
          cells: [
            "Yes, every call, every day.",
            "No. The caller hears a beep.",
            "Yes, if you pay for night hours.",
            "No, unless you staff a night shift.",
          ],
        },
        {
          label: "Books the job",
          cells: [
            "Yes, right on your calendar.",
            "No. You call back later.",
            "Some do. Most take a message.",
            "Yes, and they know your customers.",
          ],
        },
        {
          label: "Tricky calls",
          cells: [
            "Fair. It passes odd calls to you.",
            "No help at all.",
            "Good. A trained person can adapt.",
            "Best. A person knows your business.",
          ],
        },
        {
          label: "What you pay",
          cells: [
            "A monthly tool fee plus a cost per minute.",
            "Nothing extra.",
            "A monthly plan, often per minute or per call.",
            "A full salary and benefits.",
          ],
        },
      ],
      note: "Many owners keep their front desk and add an AI phone receptionist for nights, weekends and overflow. The two work well together.",
    },
    {
      kind: "cards",
      id: "who-its-for",
      eyebrow: "Who it's for",
      heading: "Who an AI receptionist for small business helps most",
      intro:
        "An AI voice agent for small business helps wherever a missed call means a lost job. Here are three examples.",
      columns: 3,
      items: [
        {
          title: "Home services: roofing, HVAC and plumbing",
          text: "A pipe bursts at 11 PM, and the homeowner calls three plumbers. The first one to answer gets the job. Your AI picks up, gets the address and texts your on-call tech.",
          link: {
            label: "Roofing and HVAC websites",
            href: "/industries/roofing-hvac-website-design",
          },
        },
        {
          title: "Dental and medical clinics",
          text: "Your front desk is checking in a patient when the second line rings. The AI answers, books a cleaning in an open slot and leaves a note for staff. Medical advice stays with your team.",
        },
        {
          title: "Law firms",
          text: "Someone calls on a Saturday after a car crash. The AI asks your intake questions, gets a callback number and books a consult for Monday. Legal advice stays with your lawyers.",
        },
      ],
    },
    {
      kind: "features",
      id: "build",
      eyebrow: "How I build it",
      heading: "How I build your AI voice agent",
      intro:
        "My AI voice agent services start with your calls, not the tech. You do not need to learn any of these tools.",
      layout: "cards",
      items: [
        {
          title: "Vapi",
          text: "The voice platform that runs the call. It listens, speaks and talks to your other tools in real time.",
          icon: "spark",
        },
        {
          title: "A language model such as GPT",
          text: "This is the brain that understands the caller. I give it your services, your approved answers and clear limits.",
          icon: "chip",
        },
        {
          title: "Your phone number",
          text: "Keep the number your customers know. You forward calls to the AI at the times you choose.",
          icon: "phone",
        },
        {
          title: "Your calendar",
          text: "Google Calendar or the booking tool you use now, so jobs land in the right slot.",
          icon: "calendar",
        },
        {
          title: "Your CRM",
          text: [
            "Every caller lands in your CRM, such as ",
            { text: "GoHighLevel", href: "/gohighlevel-agency" },
            " or HubSpot, with the call notes attached.",
          ],
          icon: "crm",
        },
      ],
      outro: [
        "Want one agent for calls, chat and follow-ups? See my ",
        {
          text: "AI agent development services",
          href: "/ai-automation-agency/ai-agent-development",
        },
        ".",
      ],
    },
    {
      // TODO(nayab): TIMELINE. Add the time each step takes once you confirm it.
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "From first call to launch in four steps",
      intro: "You get an exact timeline after a free call.",
      steps: [
        {
          title: "Call review",
          text: "I learn what callers ask, your hours and what counts as urgent. Then I write the call flow in plain English for you to approve.",
        },
        {
          title: "Build and connect",
          text: "I set up the voice, the prompts and the call rules in Vapi. Your phone number, calendar and CRM get connected next.",
        },
        {
          title: "Test with real calls",
          text: "I run test calls with hard cases, like angry callers and bad lines. You call it too and tell me what to change.",
        },
        {
          title: "Go live and fine-tune",
          text: "You switch on call forwarding. I read the first calls, fix weak spots and keep making it better.",
        },
      ],
    },
    {
      // TODO(nayab): DEMO LINE. Put the demo number here after you test the demo. Never before.
      kind: "features",
      id: "demo",
      eyebrow: "Demo",
      heading: "Call the demo line",
      layout: "cards",
      paragraphs: [
        "The best test is to hear it yourself. Soon you can call a sample AI receptionist and try to trip it up.",
      ],
      example: {
        label: "Demo line",
        paragraphs: [
          "The number goes here once I finish testing. Until then, ask for a free demo built around your business.",
        ],
      },
    },
    {
      // TODO(nayab): PRICING. No price until you approve one; no Offer in the JSON-LD.
      kind: "features",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "Pricing for your AI receptionist service",
      intro: "You see the full price before I start work. Your quote depends on four things.",
      layout: "checklist",
      items: [
        { text: "How many calls you get each month." },
        { text: "How many steps each call has." },
        { text: "Which tools I connect, such as your calendar and CRM." },
        { text: "Whether you want ongoing care after launch." },
      ],
      outro:
        "Tool fees, such as Vapi minutes and your phone number, go straight to those providers on your own accounts.",
    },
    {
      // TODO(nayab): CASE STUDY. Replace the "Case study" card with a real, approved result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Results from real projects",
      layout: "cards",
      paragraphs: [
        "A voice agent is only as good as what it connects to. As a full-stack developer, I build those parts too: the website, the CRM and the links.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved AI receptionist case study to share yet, and I will not make one up. Ask for a demo, and judge it on your own calls.",
        ],
      },
      outro: [
        "See all my ",
        { text: "AI automation services", href: "/ai-automation-agency" },
        ", or read ",
        { text: "more about me and how I work", href: "/about" },
        ".",
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Does an AI receptionist sound like a robot?",
        answer:
          "Not like the old phone menus. Today's AI voices sound natural, pause like a person and handle interruptions. Your receptionist still tells callers it is a virtual assistant, so no one feels tricked.",
      },
      {
        question: "What if it can't answer a question?",
        answer:
          "Then it takes a message or transfers the call to you, based on your rules. I tell it not to guess, and I test that before launch. You see every one of these calls in your text summary.",
      },
      {
        question: "Is it legal to use AI on business calls?",
        answer:
          "For calls coming in, it is generally allowed when you are open about it. The AI says it is a virtual assistant at the start of each call. If you record calls, some states need consent from everyone on the line, so the greeting can mention it. This service covers incoming calls only, and your lawyer can confirm the rules for your state.",
      },
      {
        // TODO(nayab): TIMELINE. Add the usual setup time once you confirm it.
        question: "How long does setup take?",
        answer:
          "It depends on your call types and the tools I connect. A simple after-hours line is faster than a full setup with booking and CRM updates. You get a clear timeline after a free call.",
      },
      {
        question: "Is an AI answering service for small business worth it with few calls?",
        answer:
          "It depends on what one job is worth to you. For a roofer or a plumber, one missed call can be a lost job. You can start small, with nights and weekends only, and add more later.",
      },
      {
        // Approved answer, word for word. The blank line only splits it into two paragraphs.
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as Vapi, a phone number or a CRM. I build everything inside those accounts: the call flows, the prompts and the full setup.\n\nAt launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        // Approved answer, word for word.
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
    ],
  },

  closing: {
    heading: "Ready to stop missing calls?",
    text: "Tell me how your calls work today and what you want the AI to handle. I will build a short demo around your business, so you can hear it before you decide.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "AI receptionist for small businesses",
    serviceType: "AI receptionist for small business",
    description:
      "An AI voice receptionist for US small businesses: 24/7 call answering, booking on your calendar, emergency flagging, text summaries and handoff to a person.",
  },
};
