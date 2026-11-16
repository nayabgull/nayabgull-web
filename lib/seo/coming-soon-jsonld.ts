import type { ComingSoonContent } from "../../content/coming-soon.ts";

import type { JsonLdGraph } from "./jsonld.ts";
import { breadcrumbs, graph, organization, website } from "./jsonld.ts";
import { nayabPerson } from "./page-jsonld.ts";

/**
 * Organization (ProfessionalService), WebSite and BreadcrumbList for the coming-soon page, plus the
 * Person node the Organization's `founder` points to. It has no Service, FAQ or Offer: the page shows none.
 */
export function comingSoonJsonLd(content: ComingSoonContent): JsonLdGraph {
  return graph([
    organization({ description: content.meta.description }),
    website(),
    breadcrumbs([{ name: "Home", path: "/" }]),
    nayabPerson(),
  ]);
}
