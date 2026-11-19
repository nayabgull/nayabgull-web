import { lexicalUploads } from "../content/lexical.ts";

type Id = number | string;
type Doc = Readonly<Record<string, unknown>>;

const isDoc = (value: unknown): value is Doc => typeof value === "object" && value !== null;

/** A relationship value is an id, or the document itself once populated. */
export function relationId(value: unknown): Id | undefined {
  if (typeof value === "number" || (typeof value === "string" && value !== "")) return value;
  if (isDoc(value)) return relationId(value.id);
  return undefined;
}

/** Reads media alt text and FAQ items by id. The hook passes a Payload-backed loader. */
export interface PostRelationLoader {
  mediaAlts: (ids: readonly Id[]) => Promise<ReadonlyMap<string, string | undefined>>;
  faqs: (ids: readonly Id[]) => Promise<ReadonlyMap<string, { question: string; answer: string }>>;
}

export interface PostRelations {
  /** `null` when the post has no hero image. */
  heroImageAlt: string | null;
  bodyImageAlts: (string | undefined)[];
  /** The Lexical state with every FAQ block's items replaced by the FAQ documents. */
  content: unknown;
}

const unique = (ids: readonly (Id | undefined)[]): Id[] => [
  ...new Set(ids.filter((id): id is Id => id !== undefined)),
];

function mapFaqBlocks(node: unknown, populate: (ids: unknown[]) => unknown[]): unknown {
  if (Array.isArray(node)) return node.map((child) => mapFaqBlocks(child, populate));
  if (!isDoc(node)) return node;
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node)) next[key] = mapFaqBlocks(value, populate);
  const fields = next.fields;
  if (next.type === "block" && isDoc(fields) && fields.blockType === "faq") {
    next.fields = { ...fields, faqs: populate(Array.isArray(fields.faqs) ? fields.faqs : []) };
  }
  return next;
}

/** Collects the FAQ ids used in every FAQ block. */
function faqIds(content: unknown): Id[] {
  const ids: (Id | undefined)[] = [];
  mapFaqBlocks(content, (values) => {
    ids.push(...values.map(relationId));
    return values;
  });
  return unique(ids);
}

/**
 * Loads what the publish rules need from related documents: hero and body image alt text, and the
 * FAQ text inside FAQ blocks (they hold ids while the editor works).
 */
export async function resolvePostRelations(
  doc: Doc,
  loader: PostRelationLoader,
): Promise<PostRelations> {
  const heroId = relationId(doc.heroImage);
  const bodyIds = lexicalUploads(doc.content).map(relationId);
  const mediaIds = unique([heroId, ...bodyIds]);
  const alts: ReadonlyMap<string, string | undefined> =
    mediaIds.length > 0 ? await loader.mediaAlts(mediaIds) : new Map();
  const ids = faqIds(doc.content);
  const faqs: ReadonlyMap<string, { question: string; answer: string }> =
    ids.length > 0 ? await loader.faqs(ids) : new Map();

  const altOf = (id: Id | undefined): string | undefined =>
    id === undefined ? undefined : alts.get(String(id));
  return {
    heroImageAlt: heroId === undefined ? null : (altOf(heroId) ?? ""),
    bodyImageAlts: bodyIds.map(altOf),
    content: mapFaqBlocks(doc.content, (values) =>
      values.flatMap((value) => {
        const id = relationId(value);
        const faq = id === undefined ? undefined : faqs.get(String(id));
        return faq ? [{ id, ...faq }] : [];
      }),
    ),
  };
}
