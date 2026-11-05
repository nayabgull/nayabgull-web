import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { Section } from "@/components/ui/Section.tsx";
import type { HomeContent } from "@/content/home.ts";

export function FinalCta({ cta }: { cta: HomeContent["finalCta"] }) {
  return (
    <Section id="book" labelledBy="book-heading">
      <GlassCard
        shine
        hover={false}
        className="reveal flex flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <h2 id="book-heading" className="max-w-3xl text-h2 leading-tight font-bold">
          {cta.heading}
        </h2>
        <p className="mt-5 max-w-2xl text-lead text-text-muted">{cta.text}</p>
        <ButtonLink href={cta.cta.href} className="mt-8">
          {cta.cta.label}
        </ButtonLink>
        <p className="mt-4 text-small text-text-muted">{cta.note}</p>
      </GlassCard>
    </Section>
  );
}
