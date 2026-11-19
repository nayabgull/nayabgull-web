import type { LeadType, ServiceNeed } from "../../lib/leads/options.ts";
import type { Flow, HomeContent, Link } from "../home.ts";

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
  /** Only confirmed facts. Rendered as one line above the CTAs. */
  proof: readonly string[];
  /**
   * "Book a free call" (Cal.com) on every page except the legal ones. A demo page (`request`) makes
   * "Get a free demo" (the form) primary and keeps "Book a free call" as `secondaryCta`.
   */
  primaryCta?: Link;
  secondaryCta?: Link;
  /**
   * Heading and one line above the quote form. Money pages set it: the hero then shows the form
   * card on the right, like the homepage. Without it the hero is centered text.
   */
  form?: { heading: string; text: string };
  /** Extra short paragraphs under the lede (service pages with a longer intro). */
  body?: readonly string[];
  /** One bold line right above the CTAs. */
  callout?: string;
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

/** The animated "what happens to a lead" sequence, with its own centered header. */
export interface FlowBlock extends Flow {
  kind: "flow";
  id: string;
}

export interface ProfileBlock {
  kind: "profile";
  id: string;
  about: HomeContent["about"];
}

/** A comparison table: the first column names the row, the others compare the options. */
export interface CompareBlock extends BlockBase {
  kind: "compare";
  /** Header of the first column, for example "Question". */
  rowLabel: string;
  /** The options being compared, in column order. */
  columns: readonly string[];
  /** Each row has one full sentence per column. */
  rows: readonly { label: string; cells: readonly string[] }[];
  note?: Rich;
}

export interface AgentStep {
  /** Short name on the step button, for example "Trigger". */
  label: string;
  title: string;
  text: string;
  /** One concrete case, in plain words. */
  example: string;
  icon: NonNullable<Flow["steps"][number]["icon"]>;
}

/** The click-through "how an agent works" sequence. Pure CSS, one step open at a time. */
export interface AgentFlowBlock extends BlockBase {
  kind: "agent-flow";
  steps: readonly AgentStep[];
  footer: string;
}

/** Icons that content may name (components/ui/icon-map.tsx). */
export type IconName =
  | "calendar"
  | "chat"
  | "check"
  | "chip"
  | "code"
  | "crm"
  | "database"
  | "flow"
  | "globe"
  | "mail"
  | "person"
  | "phone"
  | "plug"
  | "rules"
  | "shield"
  | "spark"
  | "target"
  | "test"
  | "wrench";

/**
 * Short text on the left, a small "request → model → tools → action" picture on the right, then
 * the remaining points as small cards and one closing line.
 */
export interface ExplainerBlock extends BlockBase {
  kind: "explainer";
  paragraphs: readonly string[];
  /** Spoken name of the picture (its labels are decorative). */
  diagramLabel: string;
  diagram: readonly { label: string; caption: string; icon: IconName }[];
  notes: readonly { text: string; icon: IconName }[];
  callout: string;
}

export interface Feature {
  /** Bold card title. Checklist items have none. */
  title?: string;
  text: Rich;
  icon?: IconName;
}

/**
 * A section built from short pieces: lead paragraphs, an optional example card, then a grid of
 * icon cards (`cards`) or a two-column check list (`checklist`), then one closing line.
 */
export interface FeaturesBlock extends BlockBase {
  kind: "features";
  layout: "cards" | "checklist";
  paragraphs?: readonly Rich[];
  example?: { label: string; paragraphs: readonly string[]; afterList?: boolean };
  listIntro?: string;
  items?: readonly Feature[];
  outro?: Rich;
}

export interface UseCase {
  title: string;
  /** The example business, shown as a chip. */
  business: string;
  problem: string;
  agent: string;
  result: string;
  /** The rest of the example, behind "See the full example". Left out: no expander. */
  more?: readonly string[];
}

/** Use cases as cards: the problem → what the agent does → result, plus the full example. */
export interface UseCasesBlock extends BlockBase {
  kind: "use-cases";
  items: readonly UseCase[];
  /**
   * Row labels on every card. Defaults to "The problem", "What the agent does" and "Result"; a
   * page about plain workflows names the middle row after the workflow instead.
   */
  labels?: { problem: string; agent: string; result: string };
}

/** Numbered steps: a horizontal stepper on wide screens, a vertical one on small screens. */
export interface StepperBlock extends BlockBase {
  kind: "stepper";
  steps: readonly { title: string; text: string }[];
}

export type Block =
  | ProseBlock
  | CardsBlock
  | StepsBlock
  | PricesBlock
  | LinksBlock
  | FlowBlock
  | ProfileBlock
  | CompareBlock
  | AgentFlowBlock
  | ExplainerBlock
  | FeaturesBlock
  | UseCasesBlock
  | StepperBlock;

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
  /** Hub above this page. Adds a middle step to the breadcrumb trail and its JSON-LD. */
  parent?: { name: string; path: string };
  /** ISO date of the last content review (sitemap lastModified). */
  updated: string;
  meta: { title: string; description: string };
  hero: PageHero;
  blocks: readonly Block[];
  faq?: HomeContent["faq"];
  /**
   * Heading and one line of the closing quote section. Every page ends with that section (quote
   * form plus "Book a free call"); pages without their own closing copy use the homepage's.
   */
  closing?: {
    heading: string;
    text: string;
    form?: { heading: string; text: string };
    /** Renders the closing section as a full-width call-to-action band. */
    band?: boolean;
  };
  /**
   * Set on a demo page: both forms send this request type, with the service preselected. Without
   * it the forms ask for a quote.
   */
  request?: { type: LeadType; service?: ServiceNeed };
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
