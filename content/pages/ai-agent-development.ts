import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /ai-automation-agency/ai-agent-development (service page under the AI automation hub).
 * Primary keyword: "ai agent development services". Keywords approved by Nayab on 2026-11-16.
 * Brief: content/briefs/ai-agent-development.md.
 *
 * TODO(nayab): PRICING. No price is shown on purpose. Decide the starting price after the
 * competitor pricing analysis, then add a `prices` block after the "pricing" section (it also adds
 * the Offer to the Service JSON-LD) and the amount to APPROVED_PRICES in the page tests.
 * TODO(nayab): CASE STUDY. No AI agent case study is approved yet. When a client approves one, put
 * the real result in the "proof" section. Never invent results, clients or numbers.
 * TODO(nayab): confirm the timelines in "process" and in the FAQ, what the free demo includes, and
 * every FAQ answer.
 */
export const aiAgentDevelopment: PageContent = {
  path: "/ai-automation-agency/ai-agent-development",
  name: "AI agent development",
  parent: { name: "AI automation agency", path: "/ai-automation-agency" },
  updated: "2026-11-16",
  meta: {
    title: "AI Agent Development Services for Business | Nayab Gull",
    description:
      "AI agent development services for US small businesses: custom agents that qualify leads, answer customers and book calls. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "AI agent" preselected.
  request: { type: "demo", service: "ai-agent" },

  hero: {
    eyebrow: "AI agents",
    headline: {
      before: "",
      highlight: "AI agent development services",
      after: " for small businesses that want every lead answered",
    },
    lede: "I build AI agents that reply to new leads, ask the right questions and book the call. Each one works inside the tools you already use, and a person can step in at any time.",
    proof: ["5+ years", "400+ projects delivered", "Free custom demo"],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me the job you want an agent to do. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "prose",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What does an AI agent for small business do?",
      paragraphs: [
        "An AI agent is software that takes a goal, makes small choices and finishes the job. It reads a message, looks up what it needs and then acts in your tools. For a small business, that means leads get answers, calls get booked and records stay up to date.",
        "The brain is a large language model, or LLM. That is the kind of AI behind OpenAI GPT and Claude. The model reads and writes like a person. I give it rules, facts and a short list of actions.",
        "You may also hear the term agentic AI. It means AI that acts, not AI that only talks. So an agentic AI development company and an AI agent development company sell the same kind of work.",
        "With my AI agent development services, you get one agent built for one clear job. I plan it, build it, test it and stay on after launch.",
      ],
      bullets: [
        "Leads get a reply in seconds, even after you close.",
        "It works from your own prices, hours and service area.",
        "Your CRM gets a note for every chat and call.",
        "Hard cases go to a person.",
      ],
    },
    {
      kind: "cards",
      id: "use-cases",
      eyebrow: "Use cases",
      heading: "Five jobs custom AI agents for business handle well",
      intro:
        "Start with one job. These five tend to pay off first, because they repeat every day and the steps are easy to explain.",
      columns: 3,
      items: [
        {
          title: "Lead qualification",
          text: "A lead fills your form at 9 PM. The agent texts back, asks three questions and books the call. You wake up to a booked slot and a short summary.",
        },
        {
          title: "Customer support",
          text: "A customer asks where the crew is or how to move a visit. The agent checks the job record and answers from your own policies. Refund requests and complaints go to a person.",
        },
        {
          title: "Sales follow-up",
          text: "You send a quote, and the customer goes quiet. The agent checks in two days later, answers small questions and offers a time to talk. It stops when the customer says no.",
        },
        {
          title: "Receptionist",
          text: "The phone rings while you are on a job. A voice agent picks up, takes the details and books the visit. You get a text with the notes before you reach the truck.",
        },
        {
          title: "Internal operations",
          text: "A signed contract lands in your inbox. The agent creates the project, fills in the client record and posts a note to your crew chat. No one has to copy it by hand.",
        },
      ],
    },
    {
      kind: "agent-flow",
      id: "how-it-works",
      eyebrow: "How it works",
      heading: "How does an AI agent work, step by step?",
      intro:
        "Every agent I build follows the same five steps. Pick a step to see what happens, with one real-world example.",
      steps: [
        {
          label: "Trigger",
          title: "Something happens",
          text: "An agent starts when an event arrives. That can be a form entry, a text, a call or a new row in your CRM. Webhooks and APIs carry the event to the agent right away.",
          example: "Example: a homeowner sends your quote form at 9:14 PM.",
          icon: "flow",
        },
        {
          label: "Understands",
          title: "It reads and understands",
          text: "The language model reads the message and works out what the person wants. It checks your knowledge base, a set of your own documents and answers. Memory lets it recall earlier chats with the same person.",
          example: "Example: it sees a roof leak, an address in your area and a quote from March.",
          icon: "chat",
        },
        {
          label: "Uses your tools",
          title: "It uses your tools",
          text: "Next, the agent picks an action from the list I gave it. This step is called tool calling. It can look up a contact, check your calendar or read a price sheet, and nothing outside that list.",
          example: "Example: it finds two open slots on Thursday in your calendar.",
          icon: "code",
        },
        {
          label: "Acts",
          title: "It acts",
          text: "Now the agent does the work. It replies to the person, books the slot and updates the record. The agent logs every action, so you can read what it did and why.",
          example: "Example: it books Thursday at 10 AM and texts a confirmation.",
          icon: "spark",
        },
        {
          label: "Human handoff",
          title: "It hands off to a human",
          text: "Some cases need a person. When the agent is not sure, or the customer asks, it stops and passes the full thread to you. You pick up where it left off, with nothing to retype.",
          example:
            "Example: the homeowner asks about an insurance claim, so the agent alerts your office manager.",
          icon: "check",
        },
      ],
      footer: "One job, five steps, and a person within reach at every one.",
    },
    {
      kind: "compare",
      id: "compare",
      eyebrow: "Compare",
      heading: "AI agent vs chatbot vs automation: what is the difference?",
      intro:
        "People mix up these three terms a lot. Here is the short version, so you buy the right thing.",
      rowLabel: "Question",
      columns: ["AI agent", "Chatbot", "Automation"],
      rows: [
        {
          label: "What it does",
          cells: [
            "It works toward a goal and takes actions in your tools.",
            "A chatbot answers questions in a chat window.",
            "An automation runs the same fixed steps every time.",
          ],
        },
        {
          label: "How it decides",
          cells: [
            "The agent reasons with a language model, inside rules you set.",
            "It follows a script or picks from stored answers.",
            "Fixed if-this-then-that rules make every choice.",
          ],
        },
        {
          label: "Messy input",
          cells: [
            "Typos, long stories and mixed requests are fine.",
            "Simple questions work, and the rest stall.",
            "It breaks when the data does not match the format.",
          ],
        },
        {
          label: "Tools it touches",
          cells: [
            "Your CRM, calendar, inbox and phone line are all in reach.",
            "It mostly stays inside the chat.",
            "It links any apps you connect with n8n, Make or Zapier.",
          ],
        },
        {
          label: "Best for",
          cells: [
            "Lead intake, support and follow-up that need judgment.",
            "A short FAQ on your website.",
            "Moving data from one app to another.",
          ],
        },
        {
          label: "Main risk",
          cells: [
            "It can be wrong, so it needs guardrails and testing.",
            "People get annoyed when it cannot help.",
            "It fails quietly when an app changes.",
          ],
        },
      ],
      note: [
        "Most good systems mix all three. A plain automation moves the data, and the agent handles the parts that need judgment. My ",
        { text: "AI automation agency page", href: "/ai-automation-agency" },
        " covers the wider picture.",
      ],
    },
    {
      kind: "cards",
      id: "industries",
      eyebrow: "Industries",
      heading: "AI agents for business in three industries",
      intro:
        "The five steps stay the same, but the job changes with the trade. Here is how one agent would work in three of them.",
      columns: 3,
      items: [
        {
          title: "Roofing, HVAC and contractors",
          text: "A storm hits at night, and ten homeowners write in. The agent asks each one for an address and photos. It flags the active leaks and books inspections for the morning.",
          link: {
            label: "Roofing and HVAC website design",
            href: "/industries/roofing-hvac-website-design",
          },
        },
        {
          title: "Law firms",
          text: "A person describes a car accident on your site on a Sunday. The agent collects the date, the state and the other party, then books a consult. It never gives legal advice, and it says so.",
        },
        {
          title: "Real estate",
          text: "A buyer asks about a listing while you are at a showing. The agent answers from the listing sheet, asks about budget and timing, and offers tour times. Serious buyers reach your phone right away.",
        },
      ],
    },
    {
      kind: "stack",
      id: "integrations",
      eyebrow: "Integrations",
      heading: "AI agent integration services: the tools I connect",
      intro:
        "An agent is only as useful as the tools it can reach. I connect it to what you already pay for, so you do not have to switch systems.",
      groups: [
        {
          title: "AI models",
          text: "The model does the reading and the writing. I choose it by the job, the speed you need and the running cost.",
          tags: ["OpenAI GPT", "Claude", "Large language models (LLM)"],
        },
        {
          title: "Agent logic",
          text: "This layer holds the rules, the tool calling and the memory. Bigger jobs can use multi-agent systems, where each agent owns one task.",
          tags: ["LangChain", "Tool calling", "Memory", "Multi-agent systems"],
        },
        {
          title: "Knowledge base",
          text: "Your agent answers from your documents, not from guesses. The method is called RAG. The agent looks up the right page first, then writes the answer.",
          tags: ["Knowledge base (RAG)", "Price sheets", "Policies", "Service areas"],
        },
        {
          title: "CRM integration",
          text: [
            "Leads and notes belong in your CRM. I connect the agent to HubSpot, GoHighLevel or the CRM you run today. No CRM yet? See ",
            { text: "how I set up GoHighLevel", href: "/gohighlevel-agency" },
            ".",
          ],
          tags: ["GoHighLevel", "HubSpot", "Calendars", "Pipelines"],
        },
        {
          title: "Workflows and data",
          text: "Plain automations move data between apps. Webhooks and APIs let the agent talk to nearly any modern tool. A webhook is a short message one app sends another when something changes.",
          tags: ["n8n", "Make", "Zapier", "Webhooks", "APIs"],
        },
        {
          title: "Voice and messaging",
          text: "A voice agent answers your phone line and speaks in a natural voice. The same agent can also reply by text, email or website chat.",
          tags: ["Vapi", "SMS", "Email", "Website chat"],
        },
      ],
    },
    {
      kind: "steps",
      id: "process",
      eyebrow: "Process",
      heading: "My custom AI agent development process",
      intro:
        "Five steps take you from an idea to a working agent. You see it work before it ever talks to a customer.",
      steps: [
        {
          title: "Free demo call",
          when: "Day 1",
          text: "You tell me the job you want off your plate. I show a short demo built around your use case, and you decide if it fits.",
        },
        {
          title: "Plan and rules",
          when: "Week 1",
          text: "I map the steps, the tools and the facts the agent needs. Then I write its rules and the cases that go to a person. You approve them.",
        },
        {
          title: "Build and connect",
          when: "Weeks 1 to 2",
          text: "I build the agent and link it to your CRM, calendar and phone. Your logins stay yours, and I work inside your accounts.",
        },
        {
          title: "Test with real cases",
          when: "Week 2",
          text: "I run past leads and tricky questions through the agent. You try to break it too. I fix what fails before launch.",
        },
        {
          title: "Launch and monitor",
          when: "First month",
          text: "The agent goes live on a slow day. Each week, I review its chats and calls with you and tune the rules.",
        },
      ],
    },
    {
      kind: "cards",
      id: "safety",
      eyebrow: "Safety and control",
      heading: "How do you keep an AI agent safe and under control?",
      intro:
        "AI makes mistakes, so I plan for them. Four habits keep your agent useful and your customers safe.",
      columns: 2,
      items: [
        {
          title: "Guardrails",
          text: "Guardrails are hard limits the agent cannot cross. It quotes only the prices you approve, stays on your topics and never promises a result. I test these limits before launch and after every change.",
        },
        {
          title: "Human handoff",
          text: "The agent knows when to stop. Angry customers, legal questions and money disputes go to a person. In your US business hours, it can transfer live. After hours, it books a callback in the customer's time zone.",
        },
        {
          title: "Data privacy",
          text: "The agent sees only the data its job needs. I set up the model accounts in your name. Where the provider allows it, I switch off data sharing for training. If you handle health records, case files or card numbers, tell me on the first call.",
        },
        {
          title: "You own everything",
          text: "The accounts, the instructions, the code and the data are yours. You get the logins and a plain guide to how the agent works. If you move on, you keep it all.",
        },
      ],
    },
    {
      // TODO(nayab): PRICING. Words only until you set a price (see the note at the top of this file).
      kind: "prose",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What affects the cost of an AI agent?",
      paragraphs: [
        "Every agent gets a written quote after the demo call. I would rather give you a real number for your job than a guess on a web page. Five things move that number most.",
        "You also pay the providers for what the agent uses. That covers the AI model, phone minutes and any automation tools. I estimate those costs from your real volume before you decide.",
        [
          "My other services have set starting prices. You can see them on the ",
          { text: "website and CRM pricing page", href: "/pricing" },
          ".",
        ],
      ],
      bullets: [
        "The number of jobs. One clear job costs less than three.",
        "The tools it must reach. A CRM with a good API is quick, and an old system takes longer.",
        "Voice or text. A voice agent needs more testing than a chat agent.",
        "The knowledge it needs. Ten pages of policies load faster than a thousand.",
        "Care after launch. Some owners want monthly tuning, and some take it from there.",
      ],
    },
    {
      // TODO(nayab): CASE STUDY. Replace the last paragraph with a real, approved AI agent result.
      kind: "prose",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire an AI agent developer who builds the whole system?",
      paragraphs: [
        "Most agents fail at the edges, where the AI meets your website, your CRM and your phone. I am a full-stack developer, so I build those edges too. Over five years, I have delivered 400+ projects for clients in the US, the UK and beyond.",
        "You do not need a large AI agent development company for one focused agent. You need a builder who knows your tools and answers your messages. Think of me as a small AI agent agency without the layers.",
        [
          "My AI agent services cover the plan, the build, the tests and the care after launch. You can read ",
          { text: "more about me and how I work", href: "/about" },
          " before you book.",
        ],
        "I have no approved AI agent case study to show yet, and I will not invent one. Ask for a live demo instead, and judge the agent on your own use case.",
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions owners ask about AI agent development services",
    items: [
      {
        question: "What is an AI agent?",
        answer:
          "An AI agent is software that works toward a goal with little help. It reads a request, decides the next step and acts in your tools.\n\nA good one also knows its limits. It follows your rules and passes the hard cases to a person.",
      },
      {
        question: "What is the difference between an AI agent, a chatbot and an automation?",
        answer:
          "A chatbot answers questions in a chat window. An automation runs the same fixed steps every time. An AI agent can do both, and it also decides what to do next.\n\nSo an agent can read a messy message, pick the right action and finish the job.",
      },
      {
        question: "What affects the cost of an AI agent?",
        answer:
          "Five things matter most: the number of jobs, the tools it connects to, voice or text, the knowledge it needs and the care after launch.\n\nI send a written quote after the demo call. You also pay the model and phone providers for what the agent uses.",
      },
      {
        question: "How long does it take to build an AI agent?",
        answer:
          "An agent with one clear job often goes live in one to two weeks. More tools, voice calls or extra jobs add time.\n\nI put the timeline in your quote. The build moves fastest when you answer my questions about the rules the same day.",
      },
      {
        question: "Can it connect to my CRM and tools?",
        answer:
          "Usually, yes. I connect agents to GoHighLevel, HubSpot, calendars, phone systems and most tools with an API or a Zapier link.\n\nI check every tool you name before I quote. If one cannot connect, I tell you before you pay for anything.",
      },
      {
        question: "What happens when the agent is not sure?",
        answer:
          "It stops and brings in a person. I set clear cases for a human handoff, such as an upset customer or a question outside its rules.\n\nThat person gets the full thread, so the customer never has to repeat the story.",
      },
      {
        question: "Is my customer data safe with an AI agent?",
        answer:
          "The agent works inside accounts you own and sees only what its job needs. I do not copy your customer list to my own systems.\n\nSome data needs extra care, such as health or payment details. I plan for that with you before the build starts.",
      },
      {
        question: "Who owns the agent and the code?",
        answer:
          "You do. The accounts, the instructions, the code and the data all belong to you.\n\nYou get the logins and a short guide when the build is done. You are free to take the agent to another developer at any time.",
      },
      {
        question: "Do I need a technical team?",
        answer:
          "No. You need to know your own business, and I handle the technical side.\n\nAfter launch, you read short summaries and tell me what to change. That takes minutes, not hours.",
      },
      {
        question: "Should I hire an AI agent developer or buy a ready-made tool?",
        answer:
          "If a ready-made tool does the job on day one, buy the tool. It will cost less.\n\nHire a developer when the agent must follow your own rules or reach several of your tools. That is the work I do.",
      },
    ],
  },

  closing: {
    heading: "Want to see an AI agent work on your own leads?",
    text: "Send the short form, and tell me the one job you want off your plate. I will reply with a demo plan built around it.",
    form: {
      heading: "Request your custom demo",
      text: "No pressure and no obligation.",
    },
  },

  service: {
    name: "AI agent development for small businesses",
    serviceType: "AI agent development services",
    description:
      "Custom AI agents for US small businesses: lead qualification, customer support, sales follow-up, phone answering and internal operations, connected to your CRM and tools.",
  },
};
