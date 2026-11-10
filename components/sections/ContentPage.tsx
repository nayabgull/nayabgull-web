import { JsonLd } from "@/components/seo/JsonLd.tsx";
import type { Block, PageContent } from "@/content/pages/types.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";

import { About } from "./About.tsx";
import { CardsSection } from "./blocks/CardsSection.tsx";
import { LinksSection } from "./blocks/LinksSection.tsx";
import { PricesSection } from "./blocks/PricesSection.tsx";
import { ProseSection } from "./blocks/ProseSection.tsx";
import { Faq } from "./Faq.tsx";
import { FinalCta } from "./FinalCta.tsx";
import { PageHero } from "./PageHero.tsx";
import { Process } from "./Process.tsx";

function BlockSection({ block }: { block: Block }) {
  switch (block.kind) {
    case "prose":
      return <ProseSection block={block} />;
    case "cards":
      return <CardsSection block={block} />;
    case "steps":
      return <Process process={block} />;
    case "prices":
      return <PricesSection block={block} />;
    case "links":
      return <LinksSection block={block} />;
    case "profile":
      return <About about={block.about} />;
  }
}

/** Every launch page except the homepage: hero, content blocks, FAQ and the final CTA. */
export function ContentPage({ content }: { content: PageContent }) {
  return (
    <>
      <JsonLd data={pageJsonLd(content)} />
      <PageHero content={content} />
      {content.blocks.map((block) => (
        <BlockSection key={block.id} block={block} />
      ))}
      {content.faq ? <Faq faq={content.faq} /> : null}
      {content.finalCta ? <FinalCta cta={content.finalCta} /> : null}
    </>
  );
}
