import {
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";

import { CTABlock } from "./blocks/cta.ts";
import { FAQBlock } from "./blocks/faq.ts";

/** Formatting shared by every editor: semantic blocks only, no colors, no font sizes. */
const baseFeatures = () => [
  ParagraphFeature(),
  HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
  BoldFeature(),
  ItalicFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  BlockquoteFeature(),
  HorizontalRuleFeature(),
  UploadFeature({ collections: { media: { fields: [] } } }),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
];

/**
 * Semantic blocks only (content.md §8): no colors, no font sizes. The H1 is the document title, so
 * the body starts at H2.
 */
export const editor = lexicalEditor({
  features: [
    ...baseFeatures(),
    LinkFeature({ enabledCollections: ["posts", "services", "industries", "case-studies"] }),
    BlocksFeature({ blocks: [FAQBlock] }),
  ],
});

/**
 * Blog post body. Links are typed as site paths ("/gohighlevel-agency") or full URLs, never picked
 * from a collection: the public site's pages are not all CMS documents, so a path is the only link
 * that always matches a real page. The publish hook checks every path.
 */
export const postEditor = lexicalEditor({
  features: [
    ...baseFeatures(),
    LinkFeature({ enabledCollections: [] }),
    BlocksFeature({ blocks: [FAQBlock, CTABlock] }),
  ],
});
