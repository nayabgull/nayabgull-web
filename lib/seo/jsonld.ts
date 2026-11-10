import { BRAND, SITE_URL } from "./site.ts";

/** The only place JSON-LD is built (seo.md §6). Markup must match visible content. */

export type JsonLdNode = Record<string, unknown>;

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/#nayab-gull`;

export interface OrganizationInput {
  description: string;
  /** Profile URLs. Left empty until Nayab confirms the real ones. */
  sameAs?: readonly string[];
}

export function organization(input: OrganizationInput): JsonLdNode {
  return {
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: BRAND,
    url: SITE_URL,
    description: input.description,
    areaServed: { "@type": "Country", name: "United States" },
    founder: { "@id": PERSON_ID },
    ...withSameAs(input.sameAs),
  };
}

export function website(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BRAND,
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export interface Crumb {
  name: string;
  /** Site-relative path, e.g. "/" or "/services". */
  path: string;
}

export function breadcrumbs(crumbs: readonly Crumb[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path === "/" ? SITE_URL : `${SITE_URL}${crumb.path}`,
    })),
  };
}

export interface PersonInput {
  name: string;
  jobTitle: string;
  locality: string;
  country: string;
  /** Only real, confirmed profile URLs (LinkedIn, GitHub, Upwork). */
  sameAs?: readonly string[];
}

export function person(input: PersonInput): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: input.name,
    jobTitle: input.jobTitle,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: input.locality,
      addressCountry: input.country,
    },
    worksFor: { "@id": ORGANIZATION_ID },
    ...withSameAs(input.sameAs),
  };
}

export interface FaqInput {
  question: string;
  answer: string;
}

/** Built from the same items the visible FAQ renders, so the two can never drift apart. */
export function faqPage(items: readonly FaqInput[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function graph(nodes: readonly JsonLdNode[]): JsonLdGraph {
  return { "@context": "https://schema.org", "@graph": [...nodes] };
}

/** JSON for a <script type="application/ld+json"> block, with "<" escaped so it cannot close the tag. */
export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function withSameAs(sameAs: readonly string[] | undefined): JsonLdNode {
  return sameAs && sameAs.length > 0 ? { sameAs: [...sameAs] } : {};
}
