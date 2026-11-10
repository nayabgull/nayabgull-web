import type { HomeContent } from "../../content/home.ts";
import { faqPlainText } from "../content/faq.ts";

import type { JsonLdGraph } from "./jsonld.ts";
import { breadcrumbs, faqPage, graph, organization, website } from "./jsonld.ts";
import { nayabPerson } from "./page-jsonld.ts";

/** Organization (ProfessionalService), WebSite, BreadcrumbList, Person and FAQPage for "/". */
export function homeJsonLd(content: HomeContent): JsonLdGraph {
  return graph([
    organization({ description: content.meta.description }),
    website(),
    breadcrumbs([{ name: "Home", path: "/" }]),
    nayabPerson(),
    faqPage(
      content.faq.items.map((item) => ({
        question: item.question,
        answer: faqPlainText(item.answer),
      })),
    ),
  ]);
}
