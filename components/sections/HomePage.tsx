import { JsonLd } from "@/components/seo/JsonLd.tsx";
import type { HomeContent } from "@/content/home.ts";
import { homeJsonLd } from "@/lib/seo/home-jsonld.ts";

import { About } from "./About.tsx";
import { Faq } from "./Faq.tsx";
import { FeaturedWork } from "./FeaturedWork.tsx";
import { FinalCta } from "./FinalCta.tsx";
import { Hero } from "./Hero.tsx";
import { Industries } from "./Industries.tsx";
import { Pillars } from "./Pillars.tsx";
import { Pricing } from "./Pricing.tsx";
import { Process } from "./Process.tsx";
import { ProofBar } from "./ProofBar.tsx";
import { Testimonials } from "./Testimonials.tsx";

/** Homepage sections in the order set by content.md §5 and seo.md §10. */
export function HomePage({ content }: { content: HomeContent }) {
  return (
    <>
      <JsonLd data={homeJsonLd(content)} />
      <Hero hero={content.hero} flow={content.flow} />
      <ProofBar proof={content.proof} />
      <Pillars pillars={content.pillars} />
      <Industries industries={content.industries} />
      <FeaturedWork work={content.work} />
      <Testimonials items={content.testimonials} />
      <Process process={content.process} />
      <Pricing pricing={content.pricing} />
      <Faq faq={content.faq} />
      <About about={content.about} />
      <FinalCta cta={content.finalCta} />
    </>
  );
}
