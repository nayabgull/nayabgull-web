import type { Access } from "payload";

/** Any logged-in editor. */
export const isEditor: Access = ({ req }) => Boolean(req.user);

/** Visitors see published documents only. Editors also see drafts. */
export const publishedOrEditor: Access = ({ req }) =>
  req.user ? true : { _status: { equals: "published" } };

export const anyone: Access = () => true;
