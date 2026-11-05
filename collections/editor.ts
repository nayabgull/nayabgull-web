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

import { FAQBlock } from "./blocks/faq.ts";

/**
 * Semantic blocks only (content.md §8): no colors, no font sizes. The H1 is the document title, so
 * the body starts at H2.
 */
export const editor = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    BoldFeature(),
    ItalicFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    LinkFeature({ enabledCollections: ["posts", "services", "industries", "case-studies"] }),
    UploadFeature({ collections: { media: { fields: [] } } }),
    BlocksFeature({ blocks: [FAQBlock] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
});
