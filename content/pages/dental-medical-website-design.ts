import { CALL_CTA } from "../home.ts";

import type { PageContent } from "./types.ts";

/**
 * /industries/dental-medical-website-design (industry page). Primary keyword: "medical website
 * design company". Brief: content/briefs/dental-medical-website-design.md. Keywords:
 * docs/seo/keyword-map.md (Industries). Breadcrumb: Home › Industries › this page.
 *
 * Facts on this page come from the repo: prices (content/pages/pricing.ts), "two to six weeks"
 * (content/home.ts), 5+ years and 400+ projects (content/home.ts), ownership, time zone and support
 * answers (content/home.ts FAQ), A2P 10DLC (content/pages/gohighlevel-agency.ts).
 *
 * Prices ($1,500 business website, $2,500 full system, with the Offer schema), the "two to six
 * weeks" timeline and the outside facts (HIPAA and BAA, Google review rules, no care details in
 * review replies, callers told to dial 911 in an emergency): approved by Nayab 2026-11-21.
 * No practice management software or other product is named.
 * TODO(nayab): PROOF. No dental or medical case study, client, number or review is approved yet.
 * Replace the "Case study" note in the "proof" section with a real, approved result.
 * TODO(nayab): when /ai-automation-agency/ai-voice-agents goes live, point the after-hours section
 * link there instead of the AI automation hub.
 */
export const dentalMedicalWebsiteDesign: PageContent = {
  path: "/industries/dental-medical-website-design",
  name: "Dental and medical websites",
  parent: { name: "Industries", path: "/industries" },
  updated: "2026-11-21",
  meta: {
    title: "Medical Website Design Company for Dentists | Nayab Gull",
    description:
      "A medical website design company for dental offices and clinics: online booking, patient forms, reminders and missed-call replies. Get a free demo.",
  },

  // Both forms on this page ask for a custom demo, with "Website" preselected.
  request: { type: "demo", service: "website" },

  hero: {
    eyebrow: "Dental and medical",
    headline: {
      before: "",
      highlight: "Medical website design company",
      after: " for dental offices and clinics",
    },
    lede: "I build fast websites for dentists, doctors and small clinics. Patients book online, fill in forms at home and get reminders, so your front desk can focus on the people in the room.",
    proof: ["5+ years", "400+ projects delivered", "Websites start at $1,500"],
    primaryCta: { label: "Get a free demo", href: "#hero-quote" },
    secondaryCta: CALL_CTA,
    form: {
      heading: "Get a free demo",
      text: "Tell me about your practice and how patients book today. I reply within one business day.",
    },
  },

  blocks: [
    {
      kind: "cards",
      id: "problems",
      eyebrow: "The problem",
      heading: "Where dental and medical practices lose new patients",
      intro: "Your care is good. The gaps show up before the first visit.",
      columns: 3,
      items: [
        {
          title: "“The front desk can't answer every call.”",
          text: "Your staff is checking in a patient when the phone rings. A new patient hears voicemail and calls the next office on the list.",
        },
        {
          title: "“Patients still fill in forms on a clipboard.”",
          text: "Paper forms slow down check-in. Later, someone types every answer into your software, and the day runs late.",
        },
        {
          title: "“No-shows leave holes in my schedule.”",
          text: "A patient forgets a cleaning or a follow-up visit. The chair or the exam room sits empty, and nobody had time to call the waitlist.",
        },
      ],
    },
    {
      kind: "features",
      id: "features",
      eyebrow: "What I build",
      heading: "What good doctor website design includes",
      intro:
        "A practice website has two jobs. It helps a new patient choose you, and it gets them booked without a phone call.",
      layout: "cards",
      paragraphs: [
        "Most patients look for a dentist or a doctor on their phone. So I design the phone view first, with these six parts.",
      ],
      items: [
        {
          title: "Online booking",
          text: "Patients pick a visit type, like a first exam or a cleaning, and an open time.",
          icon: "calendar",
        },
        {
          title: "New patient forms",
          text: "Patients fill in history and insurance at home. Your staff checks the answers instead of retyping them.",
          icon: "rules",
        },
        {
          title: "Treatment and insurance pages",
          text: "A page for each treatment, plus the insurance plans you accept. Patients find the answers they usually call about.",
          icon: "target",
        },
        {
          title: "Provider bios",
          text: "Real photos of your dentists, doctors and staff, with their training. Patients like to know who they will see.",
          icon: "person",
        },
        {
          title: "A fast mobile site",
          text: "Pages open quickly on a weak signal. The call button, the address and the map stay one tap away.",
          icon: "globe",
        },
        {
          title: "Local SEO basics",
          text: "Your name, address and phone match your Google Business Profile, so nearby patients can find you.",
          icon: "check",
        },
      ],
      outro:
        "I follow accessibility best practices (WCAG 2.2 AA), so patients who use a screen reader or large text can book too. Whether your site meets the ADA is a legal question for your own advisor.",
    },
    {
      kind: "agent-flow",
      id: "patient-flow",
      eyebrow: "Patient flow",
      heading: "How healthcare workflow automation books and reminds patients",
      intro:
        "The site starts the visit, and the automation handles the busywork. Pick a step to follow one new patient.",
      steps: [
        {
          label: "Book online",
          title: "A new patient books a visit",
          text: "The patient picks a visit type and an open time on your site. The booking lands on your calendar right away.",
          example:
            "Example: a dad books a first dental exam for his son at 10:30 PM on a Wednesday.",
          icon: "calendar",
        },
        {
          label: "Forms at home",
          title: "Forms come back before the visit",
          text: "The confirmation text links to your new patient forms. The patient fills in their history and insurance on their phone.",
          example: "Example: the forms come back on Thursday, and your team checks the insurance.",
          icon: "rules",
        },
        {
          label: "Reminders",
          title: "Reminders go out before the appointment",
          text: "A text goes out ahead of the visit. The patient confirms or asks for a new time with one tap.",
          example: "Example: two days before the exam, the dad taps the link to confirm.",
          icon: "chat",
        },
        {
          label: "Recall",
          title: "Your CRM plans the next visit",
          text: "After the visit, your CRM keeps the patient record. A recall reminder goes out when the next cleaning or checkup is due.",
          example: "Example: five months after a cleaning, a booking link arrives by text.",
          icon: "crm",
        },
        {
          label: "Review request",
          title: "Every patient gets the same review request",
          text: "The day after the visit, a short text asks for a Google review. Everyone gets it, because Google's rules do not allow asking only happy patients.",
          example: "Example: a patient seen on Monday gets the review link on Tuesday afternoon.",
          icon: "check",
        },
      ],
      footer:
        "The system books visits and sends reminders. It never gives medical advice, and texts never name a treatment.",
    },
    {
      kind: "features",
      id: "after-hours",
      eyebrow: "Missed calls",
      heading: "What happens to a missed call at your office?",
      intro:
        "Patients call at lunch, after 5 PM and on Saturday morning. When nobody answers, many try the next practice.",
      layout: "checklist",
      paragraphs: [
        "I add two safety nets. A missed-call text back sends the caller a booking link right away. An AI receptionist, a voice agent that follows your script, can answer and book the visit.",
      ],
      example: {
        label: "Example",
        paragraphs: [
          "A patient with a broken crown calls your dental office at 7:10 PM. The AI receptionist asks a few questions and books the first open emergency slot. Your team reads the summary in the morning.",
        ],
      },
      listIntro: "What the after-hours setup can do for your practice:",
      items: [
        { text: "Answer calls at lunch, after hours and on weekends." },
        { text: "Text a booking link to every caller who hangs up." },
        { text: "Tell anyone with a medical emergency to hang up and call 911." },
        { text: "Never give medical advice, and say so on every call." },
      ],
      outro: [
        "See how voice agents and follow-up fit together in my ",
        { text: "AI automation services for small businesses", href: "/ai-automation-agency" },
        ".",
      ],
    },
    {
      kind: "prose",
      id: "patient-data",
      eyebrow: "Patient data",
      heading: "Where does patient information go?",
      paragraphs: [
        "Health details that patients share with your practice are protected under HIPAA. That shapes which tools your forms, booking and texts can use.",
        "In plain words: a tool that stores patient health information needs to be HIPAA-ready. The company behind it usually signs a business associate agreement (BAA) with your practice. I help you pick tools that offer one, and I keep health details out of the parts that do not.",
        "Your practice decides, with your own compliance advisor, if the setup meets HIPAA. My work alone does not make a site meet HIPAA.",
      ],
      bullets: [
        "The contact form asks only for a name, a phone number, an email and a visit type.",
        "Health history goes through a HIPAA-ready form tool that you and your advisor approve.",
        "Reminder texts give the day and time, never the reason for the visit.",
      ],
    },
    {
      kind: "stepper",
      id: "process",
      eyebrow: "Process",
      heading: "From first call to launch in five steps",
      intro:
        "Most websites take two to six weeks. Your written quote gives the exact timeline for your practice.",
      steps: [
        {
          title: "Free call and booking review",
          text: "You show me how patients book today. Then I review your current site.",
        },
        {
          title: "Plan and tool choice",
          text: "You get the pages and tools in writing. I also start your texting registration (A2P 10DLC), since carriers take time to approve it.",
        },
        {
          title: "Design and writing",
          text: "I write the pages from your notes. You fix anything that sounds off.",
        },
        {
          title: "Build and testing",
          text: "I build the site, the booking and the reminders, then test each step on real phones.",
        },
        {
          title: "Launch and training",
          text: "Your domain moves to the new site. Your front desk learns how to change hours and pages.",
        },
      ],
    },
    {
      kind: "prices",
      id: "pricing",
      eyebrow: "Pricing",
      heading: "What does a dental or medical website cost?",
      intro: [
        "These are my general starting prices. Your quote depends on the pages and the automation you add. Every service is on my ",
        { text: "website pricing page", href: "/pricing" },
        ".",
      ],
      items: [
        {
          name: "Business website (5 pages)",
          from: 1500,
          label: "Starts at $1,500.",
          text: "A full practice site: home, treatments, providers, insurance and contact.",
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
          text: "Website, CRM and AI, built together as one patient booking system.",
          includes: [
            "Business website.",
            "CRM setup and follow-up.",
            "AI replies for new leads.",
            "Launch support and training.",
          ],
        },
      ],
      note: "These are starting prices in US dollars, not fixed quotes or guarantees. Form, texting, phone and software plans bill you directly.",
    },
    {
      kind: "features",
      id: "proof",
      eyebrow: "Proof",
      heading: "Hiring a dental website design agency? Here is how I work",
      layout: "cards",
      paragraphs: [
        "Comparing a dental web design company or a healthcare website design agency? You work directly with me, the developer who builds and connects every part: the site, the calendar, the forms and the texts. Over more than five years, I have delivered 400+ projects.",
      ],
      example: {
        label: "Case study",
        paragraphs: [
          "I do not have an approved dental or medical case study yet, and I will not make one up. Ask for a free demo and judge the booking flow on your own practice.",
        ],
      },
    },
    {
      kind: "links",
      id: "related",
      eyebrow: "Related",
      heading: "More ways to bring patients in",
      items: [
        {
          label: "My web design and development service",
          href: "/services/web-design-development",
          text: "The full build process, the tech and what every site includes.",
        },
        {
          label: "GoHighLevel CRM setup",
          href: "/gohighlevel-agency",
          text: "Pipelines, reminder texts and recall follow-up in one CRM.",
        },
        {
          label: "Custom AI agents for calls and chat",
          href: "/ai-automation-agency/ai-agent-development",
          text: "An agent that answers patient questions and books visits.",
        },
      ],
    },
  ],

  faq: {
    eyebrow: "FAQ",
    heading: "Questions practice owners ask before they hire me",
    items: [
      {
        question: "Is the website HIPAA compliant or ADA compliant?",
        answer:
          "I make no compliance claims, because only your practice and your advisor can decide that. I pick tools that offer a BAA for patient data and build to WCAG 2.2 AA guidelines.\n\nYour advisor reviews the setup before launch, and I make any changes they ask for.",
      },
      {
        question: "Can patients book through my practice management software?",
        answer:
          "It depends on your software. If it offers online booking or a way to connect, I link your site to it.\n\nIf it cannot connect, patients request a time and your front desk confirms it.",
      },
      {
        question: "How long does a new practice website take?",
        answer:
          "Most websites take two to six weeks. Booking, forms and reminders can add time. Your written quote shows the timeline before any work starts.",
      },
      {
        question: "How much does a dental website cost?",
        answer:
          "A five-page business website starts at $1,500, and a full system starts at $2,500. After the first call, you get a fixed quote in writing.",
      },
      {
        question: "Who owns the website and the patient data?",
        answer:
          "You do. I build on accounts in your name: your domain, your hosting and your form and booking tools. Patient entries stay in those accounts.\n\nWhen the project ends, you keep full access and all the code.",
      },
      {
        question: "Do you work in US time zones?",
        answer:
          "Yes. My workday overlaps with US business hours, so you and I can talk live on calls. Most messages get a reply the same business day.",
      },
      {
        question: "Can you ask patients for reviews the right way?",
        answer:
          "Yes. Every patient gets the same short request after the visit, so nobody gets left out.\n\nWhen you reply to a review, keep care details out of your answer. Your advisor can tell you what is safe to say.",
      },
    ],
  },

  closing: {
    heading: "Ready for fewer phone calls and more booked visits?",
    text: "Start with a free demo. Tell me how patients book today, and I will show you how the site, the forms and the reminders would work for your practice.",
    form: {
      heading: "Request your free demo",
      text: "No pressure and no obligation.",
    },
    band: true,
  },

  service: {
    name: "Dental and medical website design",
    serviceType: "Medical website design",
    description:
      "Websites for US dental offices and medical practices: online booking, new patient forms, reminders, review requests and missed-call follow-up.",
  },
};
