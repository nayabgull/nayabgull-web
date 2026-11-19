/**
 * Reads the copy out of a Payload Lexical document (SerializedEditorState) so the same content
 * rules that audit rendered pages in CI can run when an editor presses Publish.
 */

export interface LexicalHeading {
  level: number;
  text: string;
}

export interface LexicalLink {
  href: string;
  text: string;
}

export interface LexicalCopy {
  headings: LexicalHeading[];
  /** Paragraphs, list items and quotes in reading order. */
  paragraphs: string[];
  links: LexicalLink[];
}

interface LexicalNode {
  type?: unknown;
  text?: unknown;
  tag?: unknown;
  fields?: unknown;
  children?: unknown;
}

const TEXT_BLOCKS = new Set(["paragraph", "quote", "listitem"]);
const BLOCKS = new Set(["paragraph", "quote", "listitem", "heading", "list"]);

const isNode = (value: unknown): value is LexicalNode =>
  typeof value === "object" && value !== null;

type Fields = Readonly<Record<string, unknown>>;

const fieldsOf = (node: LexicalNode): Fields =>
  isNode(node.fields) ? (node.fields as Fields) : {};

const childrenOf = (node: LexicalNode): LexicalNode[] =>
  Array.isArray(node.children) ? node.children.filter(isNode) : [];

const clean = (text: string): string => text.replace(/\s+/g, " ").trim();

/** Text of a node's inline content (text, links, line breaks); nested blocks are skipped. */
function inlineText(node: LexicalNode): string {
  if (node.type === "text") return typeof node.text === "string" ? node.text : "";
  if (node.type === "linebreak") return " ";
  return childrenOf(node)
    .filter((child) => !BLOCKS.has(String(child.type)))
    .map(inlineText)
    .join("");
}

function collectLinks(node: LexicalNode, links: LexicalLink[]): void {
  if (node.type === "link" || node.type === "autolink") {
    const fields = isNode(node.fields) ? (node.fields as { url?: unknown }) : {};
    if (typeof fields.url === "string" && fields.url !== "") {
      links.push({ href: fields.url, text: clean(inlineText(node)) });
    }
    return;
  }
  for (const child of childrenOf(node)) collectLinks(child, links);
}

/** Text of a block's own copy: the FAQ block (heading + populated answers) and the CTA block. */
function walkBlock(node: LexicalNode, copy: LexicalCopy): void {
  const fields = fieldsOf(node);
  const heading = typeof fields.heading === "string" ? clean(fields.heading) : "";
  if (heading !== "") copy.headings.push({ level: 2, text: heading });
  if (fields.blockType === "faq" && Array.isArray(fields.faqs)) {
    for (const faq of fields.faqs) {
      const answer = isNode(faq) ? (faq as { answer?: unknown }).answer : undefined;
      if (typeof answer !== "string") continue;
      for (const part of answer.split(/\n\s*\n/)) {
        const text = clean(part);
        if (text !== "") copy.paragraphs.push(text);
      }
    }
  }
  if (fields.blockType === "cta" && typeof fields.text === "string" && clean(fields.text) !== "") {
    copy.paragraphs.push(clean(fields.text));
  }
}

function walk(node: LexicalNode, copy: LexicalCopy): void {
  const type = String(node.type);
  if (type === "block") {
    walkBlock(node, copy);
    return;
  }
  if (type === "heading") {
    const level = Number(String(node.tag).replace(/^h/i, ""));
    const text = clean(inlineText(node));
    if (text !== "" && Number.isInteger(level)) copy.headings.push({ level, text });
    collectLinks(node, copy.links);
    return;
  }
  if (TEXT_BLOCKS.has(type)) {
    const text = clean(inlineText(node));
    if (text !== "") copy.paragraphs.push(text);
    collectLinks(
      { children: childrenOf(node).filter((c) => !BLOCKS.has(String(c.type))) },
      copy.links,
    );
  }
  for (const child of childrenOf(node)) {
    if (BLOCKS.has(String(child.type)) || type === "root" || type === "list") walk(child, copy);
  }
}

/** Extracts headings, copy blocks and links. Anything that is not a Lexical state returns empty copy. */
export function extractLexical(state: unknown): LexicalCopy {
  const copy: LexicalCopy = { headings: [], paragraphs: [], links: [] };
  if (isNode(state) && isNode((state as { root?: unknown }).root)) {
    walk((state as { root: LexicalNode }).root, copy);
  }
  return copy;
}

/** Every node of the given Lexical type, depth first. */
function nodesOfType(state: unknown, type: string): LexicalNode[] {
  const found: LexicalNode[] = [];
  const visit = (node: LexicalNode): void => {
    if (node.type === type) found.push(node);
    for (const child of childrenOf(node)) visit(child);
  };
  if (isNode(state) && isNode((state as { root?: unknown }).root)) {
    visit((state as { root: LexicalNode }).root);
  }
  return found;
}

export interface LexicalBlock {
  blockType: string;
  fields: Fields;
}

/** Custom blocks (FAQ, CTA) in reading order. */
export function lexicalBlocks(state: unknown): LexicalBlock[] {
  return nodesOfType(state, "block").map((node) => {
    const fields = fieldsOf(node);
    return { blockType: typeof fields.blockType === "string" ? fields.blockType : "", fields };
  });
}

/** The `value` of every upload (image) node: a media id, or the media document once populated. */
export function lexicalUploads(state: unknown): unknown[] {
  return nodesOfType(state, "upload").map((node) => (node as { value?: unknown }).value);
}
