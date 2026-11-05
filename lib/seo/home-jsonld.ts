import type { HomeContent } from "../../content/home.ts";

import type { JsonLdGraph } from "./jsonld.ts";
import { breadcrumbs, faqPage, graph, organization, person, website } from "./jsonld.ts";

/** Organization (ProfessionalService), WebSite, BreadcrumbList, Person and FAQPage for "/". */
export function homeJsonLd(content: HomeContent): JsonLdGraph {
  return graph([
    organization({ description: content.meta.description }),
    website(),
    breadcrumbs([{ name: "Home", path: "/" }]),
    person({
      name: content.about.name,
      jobTitle: content.about.role,
      locality: "Lahore",
      country: "PK",
    }),
    faqPage(content.faq.items),
  ]);
}
