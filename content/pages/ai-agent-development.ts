import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /ai-automation-agency/ai-agent-development (service page under the AI automation hub).
 * Primary keyword: "ai agent development services". Keywords approved by Nayab on 2026-11-16.
 * Copy: content/briefs/ai-agent-development-copy.md (approved). Brief: content/briefs/ai-agent-development.md.
 * Kept from the first version: the five-step agent flow, the comparison table, the three
 * industries and the proof section.
 *
 * Small cuts from the approved copy, needed by the brand-voice rule (tests/unit/content/
 * brand-voice.test.tsx: no "let's", never "solo"):
 * - Hero and closing: "Let's discuss your project." / "Let's discuss your AI agent development
 *   project." are left out.
 * - "Comparing an AI agent agency with a solo developer?" reads "... with other options?".
 * And two word swaps for the content audit (no three sentences in a row may open with "I"):
 * - Process steps 1 and 4: "I also identify" / "I also check" read "Then I identify" / "Then I check".
 *
 * TODO(nayab): PRICING. No price is shown on purpose. Decide the starting price after the
 * competitor pricing analysis, then add a `prices` block (it also adds the Offer to the Service
 * JSON-LD) and the amount to APPROVED_PRICES in the page tests.
 * TODO(nayab): CASE STUDY. No AI agent case study is approved yet (see the "proof" section).
 */
export const aiAgentDevelopment: PageContent = {
  path: "/ai-automation-agency/ai-agent-development",
  name: "AI agent development",
  parent: { name: "AI automation agency", path: "/ai-automation-agency" },
  updated: "2026-11-17",
  meta: {
    title: "AI Agent Development Services for Business | Nayab Gull",
    description:
      "Custom AI agents for your business. Automate lead replies, customer support, follow-ups and booking with AI agent development services. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "AI agent" preselected.
  request: { type: "demo", service: "ai-agent" },

  hero: {
    eyebrow: "AI agents",
    headline: { before: "", highlight: "AI Agent Development Services", after: "" },
    lede: "I build custom AI agents that help businesses manage leads, support customers and automate daily tasks. My AI agent development services cover website chat, voice calls, CRM updates, appointment booking and business workflow automation.",
    body: [
      "Every business has its own way of working. I build AI agents around your services, business rules and existing tools. Whether you need an AI receptionist, a lead qualification system or an agent that connects your business apps, I can help you plan and build it.",
      "You stay in control of the process. I handle the planning, development, testing and setup.",
    ],
    callout: "Have a business task you want to automate?",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me the job you want an agent to do. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "explainer",
      id: "what-it-is",
      eyebrow: "The basics",
      heading: "What Is AI Agent Development?",
      paragraphs: [
        "AI agent development is the process of building software that can understand a goal, make choices and perform tasks.",
        "A basic chatbot answers questions. An AI agent can do more. It can read a request, find the right information and take action through connected tools.",
        "For example, a customer visits your website and asks to book a call. The agent can ask for contact details, check your calendar and book an open time. It can then save the details in your CRM and send a confirmation message.",
      ],
      diagramLabel:
        "How an AI agent works: a customer request goes to an AI model, the model uses your tools, and the agent takes action.",
      diagram: [
        { label: "Request", caption: "A customer asks to book a call", icon: "chat" },
        { label: "AI model", caption: "OpenAI GPT or Claude reads it", icon: "chip" },
        { label: "Tools", caption: "Calendar, CRM and APIs", icon: "plug" },
        { label: "Action", caption: "Call booked, CRM updated", icon: "check" },
      ],
      notes: [
        {
          text: "The main technology behind these systems is often a large language model (LLM). Models such as OpenAI GPT and Claude can understand instructions and write natural responses.",
          icon: "chip",
        },
        {
          text: "I connect these models with business data, APIs and approved tools. This allows an agent to complete tasks instead of only talking to customers.",
          icon: "plug",
        },
        {
          text: "You may also hear the term agentic AI. It describes AI that can take action to reach a goal. An agentic AI development company and an AI agent development company often offer similar services.",
          icon: "spark",
        },
      ],
      callout:
        "The real value comes from the workflow. A useful agent needs clear rules, the right tools and limits on what it can do.",
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
      kind: "features",
      id: "custom-agents",
      eyebrow: "Custom agents",
      heading: "Custom AI Agents for Business",
      intro:
        "Every business has different needs. A ready-made chatbot may answer common questions, but it may not know your prices, service areas or sales process.",
      layout: "cards",
      paragraphs: [
        "Custom AI agent development solves this problem. I build agents around the tasks you want to automate.",
      ],
      example: {
        label: "Example",
        paragraphs: [
          "For example, a home service company may need an agent to handle new booking requests. A software agency may need an agent to qualify leads and arrange sales calls.",
          "Both systems use AI, but their goals and workflows are different.",
        ],
      },
      listIntro: "My custom AI agent development process can include:",
      items: [
        {
          title: "Business rules",
          text: "The agent follows your prices, services, hours and company policies.",
          icon: "rules",
        },
        {
          title: "AI model setup",
          text: "I select a suitable model for the task and budget.",
          icon: "chip",
        },
        {
          title: "Tool connections",
          text: "The agent connects to your CRM, website, calendar and other apps.",
          icon: "plug",
        },
        {
          title: "Task automation",
          text: "It can complete approved actions through connected tools.",
          icon: "flow",
        },
        {
          title: "Human control",
          text: "Complex requests go to a person when needed.",
          icon: "person",
        },
        {
          title: "Testing",
          text: "I test real customer requests and unusual cases before launch.",
          icon: "test",
        },
      ],
      outro:
        "The goal is simple. I build an agent that solves a real business problem and fits your current workflow.",
    },
    {
      kind: "use-cases",
      id: "use-cases",
      eyebrow: "Use cases",
      heading: "What Can AI Agents for Business Do?",
      intro:
        "AI agents for business can help with sales, customer support and daily operations. They work best when a task follows clear steps and happens often. Here are five ways businesses can use them.",
      items: [
        {
          title: "Lead qualification",
          business: "insurance agency",
          problem:
            "A customer fills out your website form at 9 PM. Your sales team has closed for the day, but the lead still needs a reply.",
          agent:
            "An AI lead qualification agent can respond within seconds. It can ask questions, collect contact details and learn what service the customer needs.",
          result: "This helps businesses manage new inquiries without checking every form by hand.",
          more: [
            "For example, an insurance agency may ask customers about their coverage needs, location and preferred contact time. The agent can collect these details and check if the inquiry fits the agency's service area.",
            "It can then save the lead in the CRM and send a summary to the sales team.",
          ],
        },
        {
          title: "Customer support",
          business: "cleaning company",
          problem:
            "Customers often ask the same questions. They may want an order update, a new appointment or details about a company policy.",
          agent:
            "An AI customer support agent can answer these questions using your approved business information.",
          result: "This gives customers faster replies and lets your team focus on harder cases.",
          more: [
            "For example, a cleaning company may receive messages about booking times and service changes. The agent can check the booking record and explain the available options.",
            "It can also help customers move an appointment when the system allows it.",
            "Some requests need human attention. Refund disputes and serious complaints should go to a support person.",
          ],
        },
        {
          title: "Sales follow-up",
          business: "web design agency",
          problem:
            "A customer receives a quote but does not reply. Your sales team gets busy, and the lead may be forgotten.",
          agent: "An AI agent can send a follow-up based on your rules.",
          result:
            "It can answer basic service questions and offer a time for a call. It can also save the response in your CRM.",
          more: [
            "For example, a web design agency sends a proposal to a business owner. If the customer does not reply, the agent can send a polite message after two days.",
            "The agent must respect customer choices. If someone says no or asks to stop messages, it should end the follow-up.",
          ],
        },
        {
          title: "AI receptionist and voice agent",
          business: "plumbing company",
          problem:
            "Missed calls can mean lost business. This is a common problem for teams that work outside the office.",
          agent:
            "An AI receptionist can answer calls, ask why the person is calling and collect their details.",
          result:
            "After the call, the agent can send a short summary to the business owner and save the caller's details in the CRM.",
          more: [
            "For example, a plumbing company may receive calls while its team is at a job site. A voice agent can ask about the problem, collect the property location and arrange a callback.",
            "It can also answer questions about working hours and service areas.",
          ],
        },
        {
          title: "Internal workflows",
          business: "marketing agency",
          problem:
            "Many businesses move data between emails, spreadsheets, CRMs and project tools. This takes time and can lead to mistakes.",
          agent:
            "AI agents can also work behind the scenes. They do not always need to talk to customers.",
          result:
            "A person can review important changes before they take effect. This keeps the process under control and reduces manual data entry.",
          more: [
            "For example, a marketing agency receives a signed client agreement by email. An internal AI agent can read the approved details, prepare a new project record and create a task list.",
            "It can then send a message to the assigned team.",
          ],
        },
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
      kind: "features",
      id: "integrations",
      eyebrow: "Integrations",
      heading: "AI Agent Integration Services",
      intro: "An AI agent becomes more useful when it connects with the tools you already use.",
      layout: "cards",
      paragraphs: [
        "Without integrations, an agent can only talk. Your team still has to update records and finish tasks by hand.",
        "My AI agent integration services fix that. I connect the agent to your apps with APIs, webhooks and ready connectors.",
      ],
      listIntro: "Common integration options include:",
      items: [
        {
          title: "CRM systems",
          text: [
            "Connect with HubSpot, ",
            { text: "GoHighLevel", href: "/gohighlevel-agency" },
            " and other CRMs to save leads and update records.",
          ],
          icon: "crm",
        },
        {
          title: "Websites",
          text: "Add AI chat to your website and connect it to your business workflows.",
          icon: "globe",
        },
        { title: "WhatsApp", text: "Reply to customer messages on WhatsApp.", icon: "chat" },
        {
          title: "Voice",
          text: "Connect a voice agent to your phone line to answer calls.",
          icon: "phone",
        },
        {
          title: "Email",
          text: "Read approved inquiries and prepare customer replies.",
          icon: "mail",
        },
        { title: "Calendars", text: "Check open slots and book appointments.", icon: "calendar" },
        {
          title: "APIs and databases",
          text: "Pull data from one app and send it to another.",
          icon: "database",
        },
      ],
      example: {
        label: "Example",
        afterList: true,
        paragraphs: [
          "For example, a roofing company can connect its website form, CRM, calendar and phone line.",
          "A homeowner fills out the form. The agent asks a few questions, books an inspection and updates the CRM. Then it texts the owner.",
        ],
      },
      outro: "I only add the tools your workflow needs.",
    },
    {
      kind: "features",
      id: "hire",
      eyebrow: "Hire",
      heading: "Hire an AI Agent Developer for Your Project",
      intro: "If you want to hire an AI agent developer, start with the task you want to automate.",
      layout: "checklist",
      paragraphs: [
        "Some businesses need a simple website support agent. Others need a system that connects voice calls, CRM records, APIs and internal tools.",
        "I can help you plan the right solution and define the development scope.",
      ],
      listIntro: "My development services include:",
      items: [
        { text: "Custom AI agent development." },
        { text: "AI chat and voice agent development." },
        { text: "LLM-powered business assistants." },
        { text: "CRM and API integrations." },
        { text: "Multi-step workflow automation." },
        { text: "Business knowledge base integration." },
        { text: "AI agent testing and improvements." },
      ],
      outro:
        "You do not need to choose a model or technical framework before starting. Tell me what you want to achieve, and I can help plan the technical solution.",
    },
    {
      kind: "features",
      id: "why",
      eyebrow: "Why choose me",
      heading: "Why Choose My AI Agent Development Services?",
      intro:
        "Good AI agent services start with the task, not the tech. An agent needs clear rules, the right tools and a workflow that holds up.",
      layout: "cards",
      paragraphs: ["As an AI agent developer, I look at your work first. Then I pick the tools."],
      items: [
        {
          title: "Business-first planning",
          text: "I study how you work now and find the tasks worth automating.",
          icon: "target",
        },
        {
          title: "Custom development",
          text: "I build around your services, customer needs and business rules.",
          icon: "code",
        },
        {
          title: "Useful integrations",
          text: "I connect the apps your team already uses.",
          icon: "plug",
        },
        {
          title: "Human control",
          text: "I add approval steps and handoff rules for sensitive tasks.",
          icon: "shield",
        },
        {
          title: "Testing and support",
          text: "I test common requests, odd cases and errors. I stay on to improve the agent after launch.",
          icon: "wrench",
        },
      ],
      outro:
        "Comparing an AI agent agency with other options? Look past the sales pitch. Ask about the workflow, the integration plan, testing and support.",
    },
    {
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "My AI Agent Development Process",
      intro: "I follow five steps to turn your idea into a working system.",
      steps: [
        {
          title: "Discovery and Planning",
          text: "I learn about your business and the task you want to automate. Then I identify the required tools and features.",
        },
        {
          title: "AI Agent Design",
          text: "I plan how the agent will work. This includes its instructions, data access, tools and human handoff rules.",
        },
        {
          title: "Development and Integration",
          text: "I build the agent and connect it to the required APIs, CRM, website and other apps.",
        },
        {
          title: "Testing and Review",
          text: "I test normal requests, missing details and unexpected questions. Then I check when the agent should stop and ask a person for help.",
        },
        {
          title: "Deployment and Support",
          text: "After testing and approval, I deploy the system in the agreed environment. I can help monitor the workflow, fix issues and improve the agent as your needs change.",
        },
      ],
    },
    {
      // TODO(nayab): CASE STUDY. Replace the "Case study" card with a real, approved AI agent result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why hire an AI agent developer who builds the whole system?",
      layout: "cards",
      paragraphs: [
        "Most agents fail at the edges, where the AI meets your website, your CRM and your phone. I am a full-stack developer, so I build those edges too. Over five years, I have delivered 400+ projects for clients in the US, the UK and beyond.",
        "You do not need a large AI agent development company for one focused agent. You need a builder who knows your tools and answers your messages. Think of me as a small AI agent agency without the layers.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved AI agent case study to show yet, and I will not invent one. Ask for a live demo instead, and judge the agent on your own use case.",
        ],
      },
      outro: [
        "My AI agent services cover the plan, the build, the tests and the care after launch. You can read ",
        { text: "more about me and how I work", href: "/about" },
        " before you book.",
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "What are AI agent development services?",
        answer:
          "AI agent development services cover the planning, building and integration of AI software that can perform business tasks using connected tools and data.",
      },
      {
        question: "How much does custom AI agent development cost?",
        answer:
          "The cost depends on the features, AI model, integrations and workflow. A simple support agent needs less work than a system connected to several business apps. I can estimate the scope after reviewing your requirements.",
      },
      {
        question: "Can AI agents work with my existing CRM?",
        answer:
          "Yes. An AI agent can connect with supported CRMs through APIs, webhooks or available connectors. It can save leads, update records and add conversation summaries based on its permissions.",
      },
      {
        question: "Can an AI agent help a small business?",
        answer:
          "Yes. An AI agent for small business can answer customer questions, qualify leads, book appointments and manage follow-ups. You can start with one task and add more features later.",
      },
      {
        question: "What is the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot mainly answers questions. An AI agent can also use connected tools to find information and complete tasks, such as booking a call or updating a CRM record.",
      },
      {
        question: "How long does AI agent development take?",
        answer:
          "The timeline depends on the features, integrations and testing needs. A simple agent may take less time than a system with several workflows and connected apps. I provide a timeline after reviewing the project.",
      },
      {
        question: "Can AI agents replace human employees?",
        answer:
          "AI agents can handle repetitive tasks, but they should not replace human judgment in sensitive cases. I can add rules that send complex requests to your team.",
      },
      {
        question: "Do you provide AI agent integration and support?",
        answer:
          "Yes. I can connect agents with supported business tools and provide setup, testing and ongoing technical support based on the project scope.",
      },
    ],
  },

  closing: {
    heading: "Ready to Build an AI Agent for Your Business?",
    text: "You do not need to automate every task at once. Start with one process that takes too much time or creates delays. Tell me about your business, the tools you use and the task you want to automate. I can help plan the workflow and build a custom AI agent around your requirements.",
    form: {
      heading: "Request your custom demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "AI agent development for small businesses",
    serviceType: "AI agent development services",
    description:
      "Custom AI agents for US small businesses: lead qualification, customer support, sales follow-up, phone answering and internal workflows, connected to your CRM and tools.",
  },
};

/**
 * TODO(nayab): confirm these two answers. Until then they are NOT rendered and NOT in the FAQPage
 * JSON-LD (schema must match visible content). When confirmed, move them into `faq.items` above
 * (after "Can AI agents replace human employees?", as in the approved copy) and remove the drafts.
 */
export const PENDING_FAQ = [
  {
    question: "Who owns the agent and the data?",
    draft:
      "You do. The accounts, prompts, workflows and data stay in your name. I build in your accounts where I can, and I hand over full access at launch.",
  },
  {
    question: "Do you work in US time zones?",
    draft:
      "Yes. I work with US clients and keep set overlap hours for calls and updates. Urgent issues get a reply the same business day.",
  },
] as const;
