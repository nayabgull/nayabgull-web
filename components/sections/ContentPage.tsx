import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { home } from "@/content/home.ts";
import type { Block, PageContent } from "@/content/pages/types.ts";
import { pageJsonLd } from "@/lib/seo/page-jsonld.ts";

import { About } from "./About.tsx";
import { AgentFlow } from "./blocks/AgentFlow.tsx";
import { CallFlowSection } from "./blocks/CallFlowSection.tsx";
import { CardsSection } from "./blocks/CardsSection.tsx";
import { CompareSection } from "./blocks/CompareSection.tsx";
import { ExplainerSection } from "./blocks/ExplainerSection.tsx";
import { FeaturesSection } from "./blocks/FeaturesSection.tsx";
import { LinksSection } from "./blocks/LinksSection.tsx";
import { PricesSection } from "./blocks/PricesSection.tsx";
import { ProseSection } from "./blocks/ProseSection.tsx";
import { StepperSection } from "./blocks/StepperSection.tsx";
import { UseCasesSection } from "./blocks/UseCasesSection.tsx";
import { Faq } from "./Faq.tsx";
import { LeadFlow } from "./LeadFlow.tsx";
import { PageHero } from "./PageHero.tsx";
import { Process } from "./Process.tsx";
import { QuoteSection } from "./QuoteSection.tsx";

function BlockSection({ block }: { block: Block }) {
  switch (block.kind) {
    case "call-flow":
      return <CallFlowSection block={block} />;
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
    case "flow":
      return <LeadFlow flow={block} id={block.id} />;
    case "profile":
      return <About about={block.about} />;
    case "compare":
      return <CompareSection block={block} />;
    case "agent-flow":
      return <AgentFlow block={block} />;
    case "explainer":
      return <ExplainerSection block={block} />;
    case "features":
      return <FeaturesSection block={block} />;
    case "use-cases":
      return <UseCasesSection block={block} />;
    case "stepper":
      return <StepperSection block={block} />;
  }
}

/**
 * Every launch page except the homepage and /contact: hero, content blocks, FAQ, then the quote
 * form section with "Book a free call" that closes every page.
 */
export function ContentPage({ content }: { content: PageContent }) {
  return (
    <>
      <JsonLd data={pageJsonLd(content)} />
      <PageHero content={content} />
      {content.blocks.map((block) => (
        <BlockSection key={block.id} block={block} />
      ))}
      {content.faq ? <Faq faq={content.faq} /> : null}
      <QuoteSection
        quote={{ ...home.quote, ...content.closing }}
        source={content.path}
        request={content.request}
        band={content.closing?.band}
      />
    </>
  );
}
