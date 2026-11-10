import type { JsonLdGraph } from "@/lib/seo/jsonld.ts";
import { serializeJsonLd } from "@/lib/seo/jsonld.ts";

/** Renders one JSON-LD block. Data comes only from lib/seo/jsonld.ts builders, never from user input. */
export function JsonLd({ data }: { data: JsonLdGraph }) {
  return (
    <script
      type="application/ld+json"
      // Serialized by serializeJsonLd, which escapes "<" so the block cannot break out of the tag.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
