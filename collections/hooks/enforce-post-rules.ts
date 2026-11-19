import { ValidationError } from "payload";
import type { CollectionBeforeChangeHook, PayloadRequest } from "payload";

import { isPublishing, toCandidate } from "@/lib/cms/candidate.ts";
import type { PostRelationLoader } from "@/lib/cms/post-relations.ts";
import { relationId, resolvePostRelations } from "@/lib/cms/post-relations.ts";
import { checkPostRules } from "@/lib/cms/post-rules.ts";
import { checkPublishRules, fieldForRule, pathFor } from "@/lib/cms/publish-rules.ts";
import { keywordFor } from "@/lib/seo/keywords.ts";
import { canonicalFor } from "@/lib/seo/site.ts";

type Doc = Record<string, unknown>;

const asDoc = (value: unknown): Doc =>
  typeof value === "object" && value !== null ? (value as Doc) : {};
const text = (value: unknown): string => (typeof value === "string" ? value : "");

/** Reads media alt text and FAQ documents through the Local API, inside the same transaction. */
export function payloadLoader(req: PayloadRequest): PostRelationLoader {
  return {
    async mediaAlts(ids) {
      const result = await req.payload.find({
        collection: "media",
        where: { id: { in: [...ids] } },
        depth: 0,
        limit: ids.length,
        pagination: false,
        req,
      });
      return new Map(result.docs.map((doc) => [String(doc.id), doc.alt]));
    },
    async faqs(ids) {
      const result = await req.payload.find({
        collection: "faqs",
        where: { id: { in: [...ids] } },
        depth: 0,
        limit: ids.length,
        pagination: false,
        req,
      });
      return new Map(
        result.docs.map((doc) => [String(doc.id), { question: doc.question, answer: doc.answer }]),
      );
    },
  };
}

/**
 * Blog posts: drafts always save. Publishing fills in the dates, then runs the shared SEO and
 * content rules plus the blog rules (lib/cms/post-rules.ts). Any failure blocks the publish and
 * shows the editor every error on its field.
 */
export function enforcePostRules(
  loaderFor: (req: PayloadRequest) => PostRelationLoader,
  now: () => Date = () => new Date(),
): CollectionBeforeChangeHook {
  return async ({ data, originalDoc, req }) => {
    const incoming = asDoc(data);
    const merged: Doc = { ...asDoc(originalDoc), ...incoming };
    const candidate = toCandidate("posts", merged);
    const path = pathFor(candidate);

    if (candidate.slug !== "") {
      const seo = { ...asDoc(merged.seo), canonical: canonicalFor(path) };
      incoming.seo = seo;
      merged.seo = seo;
    }
    if (!isPublishing(merged)) return incoming;

    const stamp = now().toISOString();
    if (!text(merged.datePublished)) incoming.datePublished = stamp;
    incoming.dateModified = stamp;

    const relations = await resolvePostRelations(merged, loaderFor(req));
    const seo = asDoc(merged.seo);
    const postIssues = checkPostRules({
      path,
      slug: candidate.slug,
      excerpt: text(merged.excerpt),
      directAnswer: text(merged.directAnswer),
      hub: text(merged.hub) || undefined,
      hasAuthor: relationId(merged.author) !== undefined,
      hasCategory: relationId(merged.category) !== undefined,
      heroImageAlt: relations.heroImageAlt,
      bodyImageAlts: relations.bodyImageAlts,
      content: relations.content,
      secondaryKeywords: Array.isArray(seo.secondaryKeywords)
        ? seo.secondaryKeywords.filter((k): k is string => typeof k === "string")
        : [],
      entry: keywordFor(path),
    }).map((issue) => ({ ...issue, field: fieldForRule(issue.rule) }));

    const issues = [
      ...checkPublishRules({ ...candidate, content: relations.content }),
      ...postIssues,
    ];
    if (issues.length > 0) {
      throw new ValidationError({
        collection: "posts",
        errors: issues.map((issue) => ({
          message: `[${issue.rule}] ${issue.message}`,
          path: issue.field,
        })),
      });
    }
    return incoming;
  };
}

export const enforcePostPublishRules = enforcePostRules(payloadLoader);
