import { ValidationError } from "payload";
import type { CollectionBeforeChangeHook } from "payload";

import { isPublishing, toCandidate } from "@/lib/cms/candidate.ts";
import { checkPublishRules, pathFor } from "@/lib/cms/publish-rules.ts";
import type { PageCollection } from "@/lib/cms/publish-rules.ts";
import { canonicalFor } from "@/lib/seo/site.ts";

type Doc = Record<string, unknown>;

const asDoc = (value: unknown): Doc =>
  typeof value === "object" && value !== null ? (value as Doc) : {};

/**
 * Blocks publishing when the document breaks a hard SEO or content rule. Drafts always save.
 * The rules are the same functions `pnpm audit:seo` and `pnpm audit:content` run in CI.
 */
export const enforcePublishRules = (collection: PageCollection): CollectionBeforeChangeHook => {
  return ({ data, originalDoc }) => {
    const incoming = asDoc(data);
    const merged: Doc = { ...asDoc(originalDoc), ...incoming };
    const candidate = toCandidate(collection, merged);

    // The canonical is always the page's own URL, so fill it in for the editor.
    if (candidate.slug !== "") {
      const seo = { ...asDoc(merged.seo), canonical: canonicalFor(pathFor(candidate)) };
      incoming.seo = seo;
      merged.seo = seo;
    }

    if (!isPublishing(merged)) return incoming;

    const issues = checkPublishRules(toCandidate(collection, merged));
    if (issues.length > 0) {
      throw new ValidationError({
        collection,
        errors: issues.map((issue) => ({
          message: `[${issue.rule}] ${issue.message}`,
          path: issue.field,
        })),
      });
    }
    return incoming;
  };
};
