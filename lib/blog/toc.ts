import { slugify } from "../cms/slugify.ts";

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

interface Node {
  type?: unknown;
  tag?: unknown;
  text?: unknown;
  fields?: unknown;
  children?: unknown;
}

const isNode = (value: unknown): value is Node => typeof value === "object" && value !== null;
const childrenOf = (node: Node): Node[] =>
  Array.isArray(node.children) ? node.children.filter(isNode) : [];

function textOf(node: Node): string {
  if (node.type === "text" && typeof node.text === "string") return node.text;
  return childrenOf(node).map(textOf).join("");
}

/** Heading text and level of a top-level node: an H2–H4, or a FAQ block (shown as an H2). */
function headingOf(node: Node): { text: string; level: number } | undefined {
  if (node.type === "heading") {
    const level = Number(String(node.tag).replace(/^h/i, ""));
    const text = textOf(node).replace(/\s+/g, " ").trim();
    return text !== "" && Number.isInteger(level) ? { text, level } : undefined;
  }
  const fields = isNode(node.fields) ? (node.fields as Record<string, unknown>) : {};
  if (node.type === "block" && fields.blockType === "faq" && typeof fields.heading === "string") {
    const text = fields.heading.trim();
    return text !== "" ? { text, level: 2 } : undefined;
  }
  return undefined;
}

export interface Outline {
  /** H2 sections for the table of contents. */
  entries: TocEntry[];
  /** Anchor id for each top-level node index that renders a heading. */
  ids: ReadonlyMap<number, string>;
}

/**
 * Anchor ids for every heading in the body, unique on the page, plus the H2 list for the table of
 * contents. The renderer and the table of contents both use this, so links always match.
 */
export function outline(state: unknown): Outline {
  const root =
    isNode(state) && isNode((state as { root?: unknown }).root)
      ? (state as { root: Node }).root
      : undefined;
  const ids = new Map<number, string>();
  const entries: TocEntry[] = [];
  // "main" is the skip-link target in the site layout.
  const used = new Set<string>(["main"]);
  (root ? childrenOf(root) : []).forEach((node, index) => {
    const heading = headingOf(node);
    if (!heading) return;
    const base = slugify(heading.text) || "section";
    let id = base;
    for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
    used.add(id);
    ids.set(index, id);
    if (heading.level === 2) entries.push({ id, text: heading.text, level: 2 });
  });
  return { entries, ids };
}
