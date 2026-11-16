import type { Faq, Link } from "./home.ts";
import { STRATEGY_CALL_URL } from "./home.ts";

/**
 * /contact copy. Primary keyword: "contact nayab gull" (brand).
 * TODO(nayab): this keyword is PROPOSED. Approve it or give me another one (seo.md §1).
 * TODO(nayab): set CONTACT_EMAIL to your real address. Until then the page shows no email, because
 * an invented address would be a false fact.
 * TODO(nayab): confirm the reply time ("within one business day") and the three steps below.
 */
export const CONTACT_EMAIL: string | null = null;

export interface ContactContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: { before: string; highlight: string; after: string };
    lede: string;
  };
  form: { heading: string; text: string };
  next: {
    eyebrow: string;
    heading: string;
    intro: string;
    steps: readonly { title: string; text: string }[];
  };
  other: {
    eyebrow: string;
    heading: string;
    intro: string;
    /** Text link back to the homepage services, shown under the cards. */
    home: { before: string; link: Link; after: string };
    call: { title: string; text: string; cta: Link };
    email: { title: string; text: string };
  };
  faq: { eyebrow: string; heading: string; items: readonly Faq[] };
}

export const contact: ContactContent = {
  meta: {
    title: "Contact Nayab Gull: Get a Free Quote | Nayab Gull",
    description:
      "Contact Nayab Gull for a free quote on a website, GoHighLevel setup or AI automation. Send the short form or book a free strategy call today.",
  },

  hero: {
    eyebrow: "Contact",
    headline: { before: "", highlight: "Contact Nayab Gull", after: " for a free quote" },
    lede: "Tell me what your business needs: a new website, a GoHighLevel setup, AI automation or all three. You get a clear price and a plan from the person who will do the work.",
  },

  form: {
    heading: "Get a free quote",
    text: "It takes about a minute. I reply within one business day.",
  },

  next: {
    eyebrow: "What happens next",
    heading: "Three steps after you hit send",
    intro: "No sales team and no long wait. Here is what you can expect from me.",
    steps: [
      {
        title: "I read your message",
        text: "Your form comes straight to me. I look at your current site and your business before I write back.",
      },
      {
        title: "You get a reply",
        text: "Within one business day, I answer with a few questions or a time to talk. Simple jobs may get a price right away.",
      },
      {
        title: "You get a written quote",
        text: "After a short call, I send the scope, the price and the timeline in writing. You decide in your own time.",
      },
    ],
  },

  other: {
    eyebrow: "Other ways",
    heading: "Other ways to contact Nayab Gull",
    intro: "Some people would rather talk than type. Pick whatever is easiest for you.",
    home: {
      before: "Not ready to talk yet? See ",
      link: { label: "what my web development agency builds", href: "/" },
      after: " first.",
    },
    call: {
      title: "Book a free call",
      text: "Choose a time on my calendar. We meet on video for about 30 minutes and go through your site and your leads.",
      cta: { label: "Book a free strategy call", href: STRATEGY_CALL_URL },
    },
    email: {
      title: "Email",
      text: "Prefer email? Write to me, and attach anything that helps explain the job.",
    },
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Before you get in touch",
    items: [
      {
        question: "Does a quote cost anything?",
        answer:
          "No. The quote and the first call are free. You are under no obligation to hire me afterward.",
      },
      {
        question: "What should I put in the message?",
        answer:
          "A few lines are enough. Tell me what your business does, what you want built and when you need it. A link to your current site helps too.",
      },
      {
        question: "What if I am not sure what I need?",
        answer:
          "That is normal, and it is what the first call is for. Pick the closest option in the form and describe the problem in your own words. For example, you might say that leads call after hours and nobody picks up. I will suggest the smallest fix that solves it.",
      },
      {
        question: "What do you do with my details?",
        answer:
          "I use them to reply to you and to prepare your quote. Your details are saved in my own contact list. I do not sell them, and I do not add you to a mailing list.",
      },
      {
        question: "When are you available for calls?",
        answer:
          "I am based in Lahore, Pakistan, and my workday overlaps with US business hours. The calendar shows open times in your own time zone.",
      },
    ],
  },
};
