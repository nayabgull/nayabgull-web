import { home } from "../../content/home.ts";
import type { PageContent } from "../../content/pages/types.ts";
import { pagePrices } from "../../content/pages/types.ts";
import { faqPlainText } from "../content/faq.ts";

import type { JsonLdGraph, JsonLdNode } from "./jsonld.ts";
import { breadcrumbs, faqPage, graph, organization, person, service, website } from "./jsonld.ts";

/** The Person node for Nayab, shared by the homepage and the About page. */
export function nayabPerson(): JsonLdNode {
  return person({
    name: home.about.name,
    jobTitle: home.about.role,
    locality: "Lahore",
    country: "PK",
  });
}

/**
 * JSON-LD for a launch page: Organization, WebSite and BreadcrumbList on every page, plus Service
 * (with an Offer per visible price), Person and FAQPage where the page has them (seo.md §6).
 */
export function pageJsonLd(content: PageContent): JsonLdGraph {
  const nodes: JsonLdNode[] = [
    organization({ description: home.meta.description }),
    website(),
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: content.name, path: content.path },
    ]),
  ];
  if (content.service) {
    nodes.push(
      service({
        ...content.service,
        path: content.path,
        offers: pagePrices(content).map((price) => ({ name: price.name, from: price.from })),
      }),
    );
  }
  if (content.person) nodes.push(nayabPerson());
  if (content.faq) {
    nodes.push(
      faqPage(
        content.faq.items.map((item) => ({
          question: item.question,
          answer: faqPlainText(item.answer),
        })),
      ),
    );
  }
  return graph(nodes);
}
