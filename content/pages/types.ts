import type { HomeContent, Link } from "../home.ts";

/**
 * Typed copy for every launch page except the homepage, so it can move to Payload later without
 * touching the components. Rules: docs/rules/content.md, docs/rules/seo.md, docs/seo/keyword-map.md.
 */

export interface LinkSpan {
  text: string;
  href: string;
}

/** Plain text, or text with inline links. */
export type Rich = string | readonly (string | LinkSpan)[];

export interface PageHero {
  eyebrow: string;
  headline: { before: string; highlight: string; after: string };
  lede: string;
  /** Only confirmed facts. Rendered as one line under the CTAs. */
  proof: readonly string[];
  primaryCta?: Link;
  secondaryCta?: Link;
}

interface BlockBase {
  /** Section id, unique on the page. */
  id: string;
  eyebrow: string;
  heading: string;
  intro?: Rich;
}

export interface ProseBlock extends BlockBase {
  kind: "prose";
  paragraphs: readonly Rich[];
  bullets?: readonly Rich[];
}

export interface Card {
  title: string;
  text: Rich;
  link?: Link;
}

export interface CardsBlock extends BlockBase {
  kind: "cards";
  columns: 2 | 3;
  items: readonly Card[];
}

export interface StepsBlock extends BlockBase {
  kind: "steps";
  intro: string;
  steps: HomeContent["process"]["steps"];
}

export interface Price {
  name: string;
  /** Starting price in whole US dollars. Only prices Nayab approved. */
  from: number;
  /** Full visible sentence, for example "Starts at $1,500." */
  label: string;
  text: string;
  includes: readonly string[];
}

export interface PricesBlock extends BlockBase {
  kind: "prices";
  items: readonly Price[];
  /** Says that these are starting prices, never guarantees. */
  note: string;
}

export interface RelatedLink extends Link {
  text: string;
}

export interface LinksBlock extends BlockBase {
  kind: "links";
  items: readonly RelatedLink[];
}

export interface ProfileBlock {
  kind: "profile";
  id: string;
  about: HomeContent["about"];
}

export type Block = ProseBlock | CardsBlock | StepsBlock | PricesBlock | LinksBlock | ProfileBlock;

export interface ServiceSchema {
  name: string;
  serviceType: string;
  description: string;
}

export interface PageContent {
  /** Site-relative path, for example "/gohighlevel-agency". */
  path: string;
  /** Short name for breadcrumbs. */
  name: string;
  /** ISO date of the last content review (sitemap lastModified). */
  updated: string;
  meta: { title: string; description: string };
  hero: PageHero;
  /** Optional "live automation" figure next to the hero copy. */
  flow?: HomeContent["flow"];
  blocks: readonly Block[];
  faq?: HomeContent["faq"];
  finalCta?: HomeContent["finalCta"];
  /** Service JSON-LD for hub, service and industry pages (seo.md §6). */
  service?: ServiceSchema;
  /** Person JSON-LD (About page). */
  person?: boolean;
  /** Legal pages only: `noindex, follow`, left out of the sitemap. */
  noindex?: boolean;
}

/** Every "starts at" price on a page, in page order (also feeds the Offer JSON-LD). */
export function pagePrices(content: PageContent): Price[] {
  return content.blocks.flatMap((block) => (block.kind === "prices" ? [...block.items] : []));
}

/** The H1 as plain text (also the title on the page's Open Graph image). */
export function headlineText(content: PageContent): string {
  const { before, highlight, after } = content.hero.headline;
  return `${before}${highlight}${after}`;
}
