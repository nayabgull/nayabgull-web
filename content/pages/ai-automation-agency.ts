import { STRATEGY_CALL_URL } from "../home.ts";

import type { PageContent } from "./types.ts";

const CTA = { label: "Book a free strategy call", href: STRATEGY_CALL_URL };

/**
 * /ai-automation-agency (hub). Primary keyword: "ai automation agency".
 * TODO(nayab): confirm the timelines in "process", the tool list and every FAQ answer.
 * TODO(nayab): the child pages (n8n/Make/Zapier, chatbots, voice agents, process automation) are
 * not built yet, so this hub cannot link down to them. Add the links when those pages ship.
 */
export const aiAutomationAgency: PageContent = {
  path: "/ai-automation-agency",
  name: "AI automation agency",
  updated: "2026-11-10",
  meta: {
    title: "AI Automation Agency for Small Business | Nayab Gull",
    description:
      "A one-person AI automation agency for US small businesses: AI receptionists, chatbots and workflows that answer leads fast. Book a free strategy call.",
  },

  hero: {
    eyebrow: "AI automation",
    headline: {
      before: "An ",
      highlight: "AI automation agency",
      after: " that answers leads while you work",
    },
    lede: "I build AI that picks up the phone, replies to chats and moves data between your tools. You stay on the job, and no lead waits for a callback.",
    proof: ["5+ years", "400+ projects delivered", "AI receptionist setup starts at $750"],
    primaryCta: CTA,
    secondaryCta: { label: "See what I build", href: "#builds" },
  },

  flow: {
    label: "After hours",
    caption: "What a 9 PM call looks like with an AI receptionist",
    steps: [
      { title: "Phone rings at 9 PM", detail: "Your office closed hours ago." },
      { title: "AI picks up", detail: "It greets the caller by your business name." },
      { title: "Questions asked", detail: "Name, address and what they need." },
      { title: "Visit on the calendar", detail: "You get a text with the call notes." },
    ],
    footer: "You read the notes over coffee.",
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Where small teams lose hours and leads",
      intro:
        "You do not need AI everywhere. You need it in the few spots where work piles up or leads slip away. These three come up most.",
      columns: 3,
      items: [
        {
          title: "Calls go to voicemail",
          text: "You are with a customer, on a roof or asleep. The caller hears a beep, hangs up and dials the next name in the search results.",
        },
        {
          title: "Staff copy and paste all day",
          text: "A lead arrives by email. Someone types it into the CRM, then into a sheet, then into a calendar. Each step invites a typo.",
        },
        {
          title: "Chats sit with no answer",
          text: "A visitor asks a simple question on your site at lunch. Nobody replies for an hour, and the visitor is long gone.",
        },
      ],
    },
    {
      kind: "prose",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What are AI automation services, in plain words?",
      paragraphs: [
        "AI automation services hand repeat tasks to software that can read, write, talk and decide within rules you set. Old automation only followed fixed steps. AI adds language, so it can hold a call or sort a messy email.",
        "Think of it as a new hire who never sleeps and follows your script. It answers the first call, asks the basic questions and passes the hard cases to you. It does not replace your judgment.",
        "As a one-person AI automation agency, I pick the task, write the rules and connect the tools. Then I test it with real cases before any customer meets it.",
      ],
      bullets: [
        "Leads get an answer in seconds, day or night.",
        "Your team stops typing the same data twice.",
        "Every call and chat lands in your CRM with notes.",
        "A person can step in at any point.",
      ],
    },
    {
      kind: "cards",
      id: "builds",
      eyebrow: "What I build",
      heading: "AI workflow automation I set up most often",
      intro:
        "Most projects start with one of these six builds. We pick the one that saves you the most time or the most leads.",
      columns: 3,
      items: [
        {
          title: "AI voice receptionist",
          text: "An AI voice agent answers your business line, asks your intake questions and books the visit. I build it with Vapi or with the voice tools inside your CRM.",
        },
        {
          title: "AI chatbots",
          text: "A chatbot replies on your website, by text or on WhatsApp. It answers from your own service details and hands the chat to a person when asked.",
        },
        {
          title: "n8n, Make and Zapier workflows",
          text: "These tools link your apps without custom code. A new form entry can create a contact, send a quote and post a note to your team chat.",
        },
        {
          title: "Lead sorting and routing",
          text: "AI reads each new lead and tags it by job type, budget and urgency. Hot leads reach your phone first. The rest get steady follow-up.",
        },
        {
          title: "AI integration services",
          text: "I connect models such as ChatGPT to the tools you already use through their APIs. An API is the door one app opens so another app can talk to it.",
        },
        {
          title: "CRM follow-up",
          text: [
            "The AI needs a home for contacts and messages. For most clients, that home is GoHighLevel, and my ",
            { text: "GoHighLevel agency services", href: "/gohighlevel-agency" },
            " cover that setup.",
          ],
        },
      ],
    },
    {
      kind: "prose",
      id: "limits",
      eyebrow: "Honest limits",
      heading: "What should AI not do in your business?",
      paragraphs: [
        "AI should not make final calls on money, safety or legal matters. It can misread a caller or state a wrong detail with full confidence. So I keep it on a short leash.",
        "Each build has clear rules. The AI only quotes prices you approve. It never promises a result. When a caller is upset, or asks for a person, it transfers the call or takes a message.",
        "You also see what it does. Call notes and chat logs save to the contact record. In the first weeks, I review real calls with you and tighten the script.",
      ],
    },
    {
      kind: "prose",
      id: "who-it-fits",
      eyebrow: "Is it right for you?",
      heading: "Do you need a business automation consultant or just a tool?",
      paragraphs: [
        "If one app solves your problem out of the box, buy the app. You need a business automation consultant when the fix spans several tools, or when the AI has to follow your own rules.",
        "A good first project has three signs. The task repeats every day, the steps are easy to explain, and a mistake is cheap to fix. Missed calls and lead intake fit all three.",
        "Some owners come from a marketing automation agency with email flows already running. That is a fine base. I add the voice, chat and data links around what you have.",
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "From one task to a working AI helper",
      intro:
        "We start small on purpose. One task goes live, proves itself and then earns the next one.",
      steps: [
        {
          title: "Pick one task",
          when: "Day 1",
          text: "On a free call, we list where time and leads leak. We choose the one task with the clearest payoff.",
        },
        {
          title: "Write the rules",
          when: "Week 1",
          text: "I draft the script, the questions and the hand-off rules. You edit them until they sound like your business.",
        },
        {
          title: "Build and test",
          when: "Weeks 1 to 2",
          text: "I connect the tools and run real cases through them. You call the AI yourself and try to break it.",
        },
        {
          title: "Go live and tune",
          when: "First month",
          text: "We launch on a slow day. I review early calls and chats with you and adjust the script.",
        },
      ],
    },
    {
      kind: "prose",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why trust me with this?",
      paragraphs: [
        "I am a full-stack developer, so I build the parts that off-the-shelf tools cannot reach. Over five years and 400+ projects, I have shipped websites, CRMs and automations for clients in the US, the UK and beyond.",
        [
          "My own product, ",
          { text: "the SmartQuoteDesk lead marketplace", href: "https://smartquotedesk.com" },
          ", captures and routes leads across several industries. I built it end to end. The same lead logic sits behind the systems I set up for clients.",
        ],
        "You will not see invented numbers on this page. Ask for a live demo on our call, and judge the AI with your own ears.",
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What AI automation costs to start",
      intro:
        "Two builds have a set starting price. Custom workflows get a written quote after the first call.",
      items: [
        {
          name: "AI voice receptionist",
          from: 750,
          label: "Starts at $750 for setup, plus $149 per month.",
          text: "An AI agent on your business line. You pay the phone provider for the call minutes you use.",
          includes: [
            "Greeting and intake script.",
            "Booking on your calendar.",
            "Transfer to a person on request.",
            "Monthly script review.",
          ],
        },
        {
          name: "Full system",
          from: 2500,
          label: "Starts at $2,500.",
          text: "A website, a CRM and AI follow-up, built to work as one.",
          includes: [
            "Business website with lead forms.",
            "CRM with pipelines and messages.",
            "AI replies for new leads.",
            "Training for your team.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. Your quote depends on the scope we agree on in writing. Fees for AI models, phone minutes and automation tools go to those providers.",
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "More ways I can help",
      items: [
        {
          label: "GoHighLevel setup and CRM automation",
          href: "/gohighlevel-agency",
          text: "Pipelines, texting and calendars that give your AI a place to work.",
        },
        {
          label: "Roofing and HVAC websites with AI call answering",
          href: "/industries/roofing-hvac-website-design",
          text: "How the AI receptionist works for a trade that gets storm calls at night.",
        },
        {
          label: "Custom website design",
          href: "/services/web-design-development",
          text: "A fast site with a chat widget and forms your AI can answer.",
        },
        {
          label: "Hire a full stack developer",
          href: "/hire-full-stack-developer",
          text: "For custom code when off-the-shelf tools cannot do the job.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions owners ask about AI automation",
    items: [
      {
        question: "How much does an AI receptionist cost?",
        answer:
          "Setup starts at $750, plus $149 per month for tuning and support. You also pay the phone provider for the minutes the AI spends on calls.\n\nUsage costs depend on your call volume. On our call, I estimate them from your real numbers so nothing surprises you.",
      },
      {
        question: "Will callers know they are talking to AI?",
        answer:
          "They should, and I recommend telling them. A short line at the start, such as naming it your virtual assistant, builds trust.\n\nMost callers do not mind when the AI is polite, quick and useful. Anyone who wants a person can ask for one.",
      },
      {
        question: "What happens when the AI gets something wrong?",
        answer:
          "It will happen at times, so the build plans for it. The AI stays inside a script, and risky topics trigger a transfer or a message.\n\nYou can read every call note. When we spot a mistake, I fix the script that week.",
      },
      {
        question: "Which tools do you use?",
        answer:
          "It depends on the job. For voice, I use Vapi or the AI built into GoHighLevel. Workflows run on n8n, Make or Zapier.\n\nWhen a job needs custom logic, I write code and call AI models through their APIs. I choose the smallest set of tools that does the job well.",
      },
      {
        question: "Do I need GoHighLevel to use AI automation?",
        answer:
          "No. AI can work with other CRMs, a shared inbox or even a spreadsheet. A CRM does make follow-up much easier, though.\n\nIf you have no CRM yet, I often suggest GoHighLevel because calls, texts and calendars sit in one place.",
      },
      {
        question: "Is my customer data safe?",
        answer:
          "I build on accounts you own, and I share data only with the tools the job needs. You decide what the AI may store.\n\nTell me early if you handle health, legal or payment details. Those need extra care, and some tasks should stay with people.",
      },
      {
        question: "How long does an AI project take?",
        answer:
          "A single voice agent or chatbot often goes live in one to two weeks. Larger workflows that touch many tools take longer.\n\nYour written quote includes a timeline. Fast feedback on the script is what speeds things up most.",
      },
      {
        question: "Can AI work with the phone number and tools I already have?",
        answer:
          "Usually, yes. Your current number can forward to the AI after hours or when the line is busy. Most modern tools also offer an API or a Zapier link.\n\nBefore I quote, I check each tool you name. If one cannot connect, you hear it from me first.",
      },
    ],
  },

  finalCta: {
    heading: "Ready to stop losing leads to voicemail?",
    text: "Book a free strategy call. We find the one task where AI saves you the most, and you leave with a plan for it.",
    cta: CTA,
    note: "No jargon and no hard sell.",
  },

  service: {
    name: "AI automation for small businesses",
    serviceType: "AI automation agency services",
    description:
      "AI voice receptionists, chatbots, workflow automation with n8n, Make and Zapier, and AI integrations for US small businesses.",
  },
};
