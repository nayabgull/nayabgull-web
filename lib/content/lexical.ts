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

function walk(node: LexicalNode, copy: LexicalCopy): void {
  const type = String(node.type);
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
