import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { CheckIcon, CodeIcon, FlowIcon, SparkIcon } from "@/components/ui/icons.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import { TagList } from "@/components/ui/TagList.tsx";
import type { HomeContent } from "@/content/home.ts";

const ICONS = { web: CodeIcon, ghl: FlowIcon, ai: SparkIcon } as const;

export function Pillars({ pillars }: { pillars: HomeContent["pillars"] }) {
  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeader
        id="services-heading"
        eyebrow={pillars.eyebrow}
        heading={pillars.heading}
        intro={pillars.intro}
      />
      <ul className="@container mt-12 grid gap-6 lg:grid-cols-3">
        {pillars.items.map((pillar) => {
          const Icon = ICONS[pillar.id as keyof typeof ICONS];
          return (
            <GlassCard as="li" key={pillar.id} className="reveal flex flex-col p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-md bg-surface-strong text-accent">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-h3 font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-text-muted">{pillar.summary}</p>
              <ul className="mt-6 space-y-3">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-lime-text" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <TagList tags={pillar.tools} className="mt-auto pt-8" />
            </GlassCard>
          );
        })}
      </ul>
    </Section>
  );
}
