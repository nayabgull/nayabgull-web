import type { ContactContent } from "../../content/contact.ts";
import { home } from "../../content/home.ts";
import { faqPlainText } from "../content/faq.ts";

import type { JsonLdGraph } from "./jsonld.ts";
import { breadcrumbs, faqPage, graph, organization, website } from "./jsonld.ts";

/** Organization, WebSite, BreadcrumbList and FAQPage for /contact. */
export function contactJsonLd(content: ContactContent): JsonLdGraph {
  return graph([
    organization({ description: home.meta.description }),
    website(),
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
    faqPage(
      content.faq.items.map((item) => ({
        question: item.question,
        answer: faqPlainText(item.answer),
      })),
    ),
  ]);
}
