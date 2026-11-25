type Doc = Readonly<Record<string, unknown>> | null | undefined;

const status = (doc: Doc): unknown => doc?._status;

/**
 * A post change is visible on the site only when the post is published now or was published
 * before the change (an unpublish). Draft saves and autosaves change nothing public.
 */
export function postChangeIsPublic(doc: Doc, previousDoc: Doc): boolean {
  return status(doc) === "published" || status(previousDoc) === "published";
}
