import { JsonLd } from "@/components/seo/JsonLd.tsx";
import type { HomeContent } from "@/content/home.ts";
import { homeJsonLd } from "@/lib/seo/home-jsonld.ts";

import { About } from "./About.tsx";
import { Faq } from "./Faq.tsx";
import { FeaturedWork } from "./FeaturedWork.tsx";
import { FinalCta } from "./FinalCta.tsx";
import { Hero } from "./Hero.tsx";
import { HowItWorks } from "./HowItWorks.tsx";
import { Industries } from "./Industries.tsx";
import { Process } from "./Process.tsx";
import { Services } from "./Services.tsx";
import { Testimonials } from "./Testimonials.tsx";

/** Homepage sections, top to bottom: hero, services, how it works, industries, process, work, about, FAQ, CTA. */
export function HomePage({ content }: { content: HomeContent }) {
  return (
    <>
      <JsonLd data={homeJsonLd(content)} />
      <Hero hero={content.hero} flow={content.flow} />
      <Services services={content.services} />
      <HowItWorks how={content.howItWorks} />
      <Industries industries={content.industries} />
      <Process process={content.process} />
      <FeaturedWork work={content.work} />
      <Testimonials items={content.testimonials} />
      <About about={content.about} />
      <Faq faq={content.faq} />
      <FinalCta cta={content.finalCta} />
    </>
  );
}
