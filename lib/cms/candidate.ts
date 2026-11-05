import { SERVICE_SECTIONS } from "./publish-rules.ts";
import type { PageCollection, PublishCandidate, ServiceSection } from "./publish-rules.ts";

type Doc = Readonly<Record<string, unknown>>;

const isDoc = (value: unknown): value is Doc => typeof value === "object" && value !== null;
const text = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

/** True when a document would be live: only a publish is checked, drafts always save. */
export function isPublishing(doc: unknown): boolean {
  return isDoc(doc) && doc._status === "published";
}

/** Reads a Payload document (untyped, may be partial) into what the publish rules need. */
export function toCandidate(collection: PageCollection, doc: unknown): PublishCandidate {
  const data: Doc = isDoc(doc) ? doc : {};
  const seo: Doc = isDoc(data.seo) ? data.seo : {};
  const section = SERVICE_SECTIONS.find((s): s is ServiceSection => s === data.section);
  return {
    collection,
    slug: text(data.slug) ?? "",
    section,
    title: text(data.title) ?? "",
    seo: {
      title: text(seo.title),
      metaDescription: text(seo.metaDescription),
      primaryKeyword: text(seo.primaryKeyword),
      canonical: text(seo.canonical),
    },
    content: data.content,
    resultApproved: data.resultApproved === true,
  };
}
