import { DemoForm } from "@/components/forms/DemoForm.tsx";
import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { CodeIcon, PhoneIcon, SparkIcon } from "@/components/ui/icons.tsx";
import { Section } from "@/components/ui/Section.tsx";
import type { ComingSoonContent, ComingSoonService } from "@/content/coming-soon.ts";
import { comingSoonJsonLd } from "@/lib/seo/coming-soon-jsonld.ts";

const ICONS: Record<ComingSoonService["icon"], typeof CodeIcon> = {
  spark: SparkIcon,
  phone: PhoneIcon,
  code: CodeIcon,
};

/**
 * The coming-soon page: hero, three service cards and the "Request a custom demo" form. One primary
 * call to action ("Request a custom demo", above the fold and again at the form), one secondary
 * ("Book a free call"). The H1 is plain text, so it stays the LCP element.
 */
export function ComingSoonPage({ content }: { content: ComingSoonContent }) {
  const { services, demo } = content;
  return (
    <>
      <JsonLd data={comingSoonJsonLd(content)} />
      <section
        aria-labelledby="coming-soon-heading"
        className="hero-bg pt-12 pb-14 text-center sm:pt-16 sm:pb-20"
      >
        <Container className="flex flex-col items-center">
          <span className="badge-live inline-flex items-center gap-2 rounded-pill px-3 py-1 text-small font-semibold">
            <span className="dot-live size-2 rounded-full" aria-hidden="true" />
            {content.badge}
          </span>
          <h1
            id="coming-soon-heading"
            className="mt-5 max-w-[24ch] text-hero leading-[1.1] font-bold break-words"
          >
            {content.headline.before}
            <span className="text-gradient">{content.headline.highlight}</span>
          </h1>
          <p className="mt-5 max-w-[58ch] text-lead text-text-muted">{content.lede}</p>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-small font-medium">
            {content.proof.map((fact, index) => (
              <span key={fact} className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-lime" aria-hidden="true" />
                {fact}
                {index === content.proof.length - 1 ? "." : ""}
              </span>
            ))}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={content.primaryCta.href}>{content.primaryCta.label}</ButtonLink>
            <ButtonLink href={content.secondaryCta.href} variant="secondary" icon={null}>
              {content.secondaryCta.label}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section id={services.id} labelledBy={`${services.id}-heading`}>
        <h2
          id={`${services.id}-heading`}
          className="mx-auto max-w-3xl text-center text-h2 leading-tight font-bold"
        >
          {services.heading}
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {services.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <GlassCard as="li" key={item.title} className="p-6 text-center">
                <span
                  aria-hidden="true"
                  className="btn-primary mx-auto grid size-12 place-items-center rounded-md"
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-h3 font-semibold">{item.title}</h3>
                <p className="mt-2 text-text-muted">{item.text}</p>
              </GlassCard>
            );
          })}
        </ul>
      </Section>

      <Section id={demo.id} labelledBy={`${demo.id}-heading`} className="pt-0!">
        <div className="glass mx-auto w-full max-w-xl scroll-mt-24 p-5 sm:p-7">
          <h2 id={`${demo.id}-heading`} className="text-center text-h2 leading-tight font-bold">
            {demo.heading}
          </h2>
          <p className="mt-3 mb-6 text-center text-text-muted">{demo.text}</p>
          <DemoForm
            labelledBy={`${demo.id}-heading`}
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          />
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-text-muted">{demo.note}</p>
          <ButtonLink href={content.secondaryCta.href} variant="secondary" icon={null}>
            {content.secondaryCta.label}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
