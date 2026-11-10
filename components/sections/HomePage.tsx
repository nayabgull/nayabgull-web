import { JsonLd } from "@/components/seo/JsonLd.tsx";
import type { HomeContent } from "@/content/home.ts";
import { homeJsonLd } from "@/lib/seo/home-jsonld.ts";

import { About } from "./About.tsx";
import { Faq } from "./Faq.tsx";
import { FeaturedWork } from "./FeaturedWork.tsx";
import { Hero } from "./Hero.tsx";
import { Industries } from "./Industries.tsx";
import { LeadFlow } from "./LeadFlow.tsx";
import { Process } from "./Process.tsx";
import { QuoteSection } from "./QuoteSection.tsx";
import { Services } from "./Services.tsx";
import { Testimonials } from "./Testimonials.tsx";

/** Homepage sections, top to bottom: hero, services, lead flow, industries, process, work, about, FAQ, quote. */
export function HomePage({ content }: { content: HomeContent }) {
  return (
    <>
      <JsonLd data={homeJsonLd(content)} />
      <Hero hero={content.hero} />
      <Services services={content.services} />
      <LeadFlow flow={content.flow} />
      <Industries industries={content.industries} />
      <Process process={content.process} />
      <FeaturedWork work={content.work} />
      <Testimonials items={content.testimonials} />
      <About about={content.about} />
      <Faq faq={content.faq} />
      <QuoteSection quote={content.quote} source="/" />
    </>
  );
}
