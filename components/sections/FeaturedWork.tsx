import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import { TagList } from "@/components/ui/TagList.tsx";
import type { HomeContent } from "@/content/home.ts";

/**
 * Case study card. TODO(nayab): `work.caseStudy.approved` must be true before launch; the card uses
 * only facts Nayab supplied. No invented numbers.
 */
export function FeaturedWork({ work }: { work: HomeContent["work"] }) {
  const study = work.caseStudy;
  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeader id="work-heading" eyebrow={work.eyebrow} heading={work.heading} />
      <GlassCard
        as="article"
        shine
        hover={false}
        className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 p-6 sm:p-10"
        data-approved={study.approved}
      >
        <div className="min-w-0">
          <h3 className="text-h3 font-semibold break-words">{study.name}</h3>
          {study.summary.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-text-muted">
              {paragraph}
            </p>
          ))}
          <TagList tags={study.tags} className="mt-6" />
        </div>
        <div className="flex min-w-0 flex-col items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-text-muted">{work.note}</p>
          <ButtonLink href={study.url} variant="secondary">
            {work.linkLabel}
          </ButtonLink>
        </div>
      </GlassCard>
    </Section>
  );
}
