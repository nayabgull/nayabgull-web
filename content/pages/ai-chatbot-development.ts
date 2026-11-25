import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

const AGENT_PATH = "/ai-automation-agency/ai-agent-development";

/**
 * /ai-automation-agency/ai-chatbot-development (service page under the AI automation hub).
 * Primary keyword: "ai chatbot development services" (docs/seo/keyword-map.md, "AI chatbots" row).
 * Brief: content/briefs/ai-chatbot-development.md. One topic only: a chatbot on your website or
 * WhatsApp that answers questions and captures leads, and how I build it. The "ai agent" terms
 * belong to the AI agent page; this page only links to it.
 *
 * The demo forms preselect "AI automation": the lead form has no "AI chatbot" option yet (adding
 * one needs a Payload enum migration).
 *
 * TODO(nayab): TIMELINE. The process steps carry no timeline on purpose. Add one per step when
 * confirmed.
 * TODO(nayab): PRICING. No price is shown and there is no Offer in the Service JSON-LD. Decide the
 * starting price, then add a `prices` block and the amount to APPROVED_PRICES in the page tests.
 * TODO(nayab): CASE STUDY. No chatbot case study is approved yet (see the "proof" section).
 */
export const aiChatbotDevelopment: PageContent = {
  path: "/ai-automation-agency/ai-chatbot-development",
  name: "AI chatbot development",
  parent: { name: "AI automation agency", path: "/ai-automation-agency" },
  updated: "2026-11-19",
  meta: {
    title: "AI Chatbot Development Services for Business | Nayab Gull",
    description:
      "AI chatbot development services for your website and WhatsApp. Answer questions, capture leads and book calls day and night. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo.
  request: { type: "demo", service: "ai-chatbot" },

  hero: {
    eyebrow: "AI chatbots",
    headline: { before: "", highlight: "AI Chatbot Development Services", after: "" },
    lede: "My AI chatbot development services give you a chatbot that answers your customers on your website and on WhatsApp. It knows your business, captures leads and books calls, even at night.",
    body: [
      "Say a visitor asks a question at 10 PM. The bot replies in seconds, using your own prices, hours and services. If the visitor wants a quote, it asks for a name and phone number and saves the lead for you.",
    ],
    callout: "Want to see a chatbot answer questions about your business?",
    proof: [],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me where your customers message you. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "compare",
      id: "chatbot-vs-agent",
      eyebrow: "The basics",
      heading: "Chatbot or AI agent: which one do you need?",
      intro:
        "A chatbot talks with your customers. An AI agent can also do work inside your other tools. Most small businesses start with a chatbot.",
      rowLabel: "Question",
      columns: ["AI chatbot", "AI agent"],
      rows: [
        {
          label: "Main job",
          cells: [
            "Answers questions and collects contact details.",
            "Finishes tasks across your tools, like updating records.",
          ],
        },
        {
          label: "Where it works",
          cells: [
            "A chat window on your site, WhatsApp or Messenger.",
            "Chat, phone calls and the background of your apps.",
          ],
        },
        {
          label: "What it needs",
          cells: [
            "Your business info and a few clear rules.",
            "Your business info, your rules and access to your tools.",
          ],
        },
        {
          label: "Good fit",
          cells: [
            "Owners who get the same questions every day.",
            "Owners who want to hand off a whole process.",
          ],
        },
      ],
      note: [
        "Not sure which one fits? Read ",
        { text: "how I build AI agents for business tasks", href: AGENT_PATH },
        ", or ask me on a free call.",
      ],
    },
    {
      kind: "features",
      id: "use-cases",
      eyebrow: "Use cases",
      heading: "What can an AI chatbot do for your business?",
      intro:
        "Most chatbots I build do one or more of these six jobs. You can start with one job and add more later.",
      layout: "cards",
      items: [
        {
          title: "Website FAQ bot",
          text: "It answers common questions about prices, hours, service areas and policies. Your team stops typing the same reply over and over.",
          icon: "chat",
        },
        {
          title: "Lead capture and booking",
          text: [
            "When a visitor is ready, the bot asks for a name, phone and email. It offers open times from your calendar and saves the lead in your CRM, such as ",
            { text: "GoHighLevel", href: "/gohighlevel-agency" },
            ".",
          ],
          icon: "calendar",
        },
        {
          title: "WhatsApp Business replies",
          text: "Customers text your WhatsApp number and get a fast, correct answer. The bot runs on Meta's official channel for business messages.",
          icon: "phone",
        },
        {
          title: "Order and status questions",
          text: "Where is my order? Is my visit still on? The bot looks up the answer in your store or booking system and replies.",
          icon: "database",
        },
        {
          title: "After-hours support",
          text: "Nights and weekends are covered. The bot answers simple questions and takes details, so your team starts the day with a clear list.",
          icon: "shield",
        },
        {
          title: "Handoff to a person",
          text: "Some chats need a human. When a customer asks for one, or the bot is not sure, it sends the full chat to you by text or email.",
          icon: "person",
        },
      ],
      outro: "Each job runs on your own business info, so the answers stay correct.",
    },
    {
      kind: "features",
      id: "channels",
      eyebrow: "Where it runs",
      heading: "Where can your chatbot talk to customers?",
      intro:
        "Your customers already message you in a few places. I put one chatbot in each of them, with the same answers everywhere.",
      layout: "cards",
      items: [
        {
          title: "Your website",
          text: "A small chat bubble sits in the corner of every page. It loads after the page does, so your site stays fast.",
          icon: "globe",
        },
        {
          title: "WhatsApp",
          text: "I handle the WhatsApp Business API integration with Meta. The bot replies from your business number, and you can still jump in by hand.",
          icon: "chat",
        },
        {
          title: "Facebook and Instagram DMs",
          text: "Messages to your Facebook page and Instagram account get the same quick reply. Leads from your ads never sit unread.",
          icon: "mail",
        },
      ],
    },
    {
      kind: "features",
      id: "knowledge",
      eyebrow: "Your business info",
      heading: "How does the chatbot learn your business?",
      intro:
        "The bot does not guess. It reads only the info you give it, and I check its answers before launch.",
      layout: "checklist",
      paragraphs: [
        "I use a large language model, such as OpenAI GPT through a ChatGPT API integration, or Claude. The model writes clear, friendly replies. Your own info keeps those replies true.",
        "Think of it like training a new front desk hire. You hand over the handbook. I turn it into a knowledge base the bot can search in a split second.",
      ],
      listIntro: "What I load into your chatbot:",
      items: [
        { text: "The services you offer and what each one includes." },
        { text: "Prices or price ranges, only if you want them shared." },
        { text: "Hours, service areas and contact details." },
        { text: "Your FAQ page and the questions customers email you." },
        { text: "Rules for refunds, changes and payments." },
        { text: "Topics the bot must never answer, like legal or medical advice." },
      ],
      outro:
        "When your info changes, I update the knowledge base, and the bot uses the new answers.",
    },
    {
      // TODO(nayab): TIMELINE. Add how long each step takes once confirmed.
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "How my AI chatbot development services work",
      intro: "Four steps take you from a first call to a live chatbot.",
      steps: [
        {
          title: "Plan the bot",
          text: "On a short call, you tell me where customers reach you and what they ask most. Then you pick the first jobs for the bot.",
        },
        {
          title: "Build its knowledge",
          text: "I gather your business info and write the bot's rules. You read the rules and change anything that does not sound like you.",
        },
        {
          title: "Connect and test",
          text: "I connect the bot to your website, WhatsApp or CRM. Then I test it with real questions, odd ones and rude ones.",
        },
        {
          title: "Launch and improve",
          text: "The bot goes live on your channels. After launch, I read the chats with you and fix weak answers.",
        },
      ],
    },
    {
      // TODO(nayab): PRICING. No numbers until the starting price is approved.
      kind: "features",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does a custom chatbot cost?",
      layout: "checklist",
      paragraphs: [
        "The price depends on how many jobs the bot does and where it runs. A website FAQ bot is the smallest build. A bot that books calls, checks orders and runs on WhatsApp takes more work.",
        "After a free call, I send a written quote with a clear scope. You pay the tool providers yourself, for example the chatbot platform, AI usage and WhatsApp messages.",
      ],
      listIntro: "What changes the price:",
      items: [
        { text: "How many channels the bot runs on." },
        { text: "How many jobs it does for you." },
        { text: "Which tools it connects to, like a CRM or a calendar." },
        { text: "How much business info it needs to learn." },
      ],
    },
    {
      // TODO(nayab): CASE STUDY. Replace the "Case study" card with a real, approved chatbot result.
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Why trust me to build your chatbot?",
      layout: "cards",
      paragraphs: [
        "A chatbot is only as good as the tools around it. I am a full-stack developer, so I also build the website, forms and CRM the bot plugs into. Over five years, I have delivered 400+ projects for clients in the US, the UK and beyond.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I have no approved chatbot case study to share yet, and I will not make one up. Ask for a free demo instead, and test the bot with your own customer questions.",
        ],
      },
      outro: [
        "Want to know who builds your bot? Read ",
        { text: "about me and how I work", href: "/about" },
        ".",
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Chatbot questions owners ask",
    items: [
      {
        question: "What is included in chat bot development?",
        answer:
          "Chat bot development covers the full job. I plan what the bot should do, load your business info and write its rules. Then I connect it to your channels and tools, test it and launch it.",
      },
      {
        question: "Will the chatbot give wrong answers?",
        answer:
          "It can, like any AI, so I lower the risk in three ways. The bot answers only from your info. It says so when it does not know, and it hands hard questions to a person.",
      },
      {
        question: "Can the chatbot book appointments and save leads?",
        answer:
          "Yes. It can offer open times from your calendar and book the slot. It also saves each lead in your CRM, such as GoHighLevel or HubSpot, with a short summary of the chat.",
      },
      {
        question: "Do I need the WhatsApp Business API?",
        answer:
          "For an automated bot on WhatsApp, yes. The free WhatsApp Business app does not allow bots. I set up the API with Meta and connect it to your bot. Meta charges for some messages, and you pay Meta directly.",
      },
      {
        question: "Can I change the answers later?",
        answer:
          "Yes. When your prices, hours or services change, tell me and I update the bot. If you like, I can also show you how to edit simple answers yourself.",
      },
      {
        question: "Who owns the accounts and the work?",
        answer:
          "My clients do. In most projects, the client buys the tools in their own name, such as the chatbot platform, a WhatsApp Business account or a CRM. I build everything inside those accounts: the chatbot, the prompts and the full setup.\n\nAt launch, it all stays with the client. If a client would rather run on my accounts, I can do that too, at an extra cost.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. I am available for calls and messages every weekday from 9 AM to 3 PM Eastern Time (6 AM to noon Pacific). That covers the US morning and early afternoon.",
      },
    ],
  },

  closing: {
    heading: "Ready to let a chatbot answer your customers?",
    text: "Start with one channel and the questions you hear most. Tell me where your customers message you, and I will build a demo bot that answers with your own business info.",
    form: {
      heading: "Request your chatbot demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "AI chatbot development for small businesses",
    serviceType: "AI chatbot development services",
    description:
      "Custom AI chatbots for US small businesses on websites, WhatsApp, Facebook and Instagram: they answer questions, capture leads, book calls and hand off to a person.",
  },
};
