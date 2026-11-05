import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { HammerIcon, HomeIcon, RoofIcon, ScaleIcon, ToothIcon } from "@/components/ui/icons.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";

const ICONS = {
  law: ScaleIcon,
  dental: ToothIcon,
  "real-estate": HomeIcon,
  roofing: RoofIcon,
  contractors: HammerIcon,
} as const;

export function Industries({ industries }: { industries: HomeContent["industries"] }) {
  return (
    <Section id="industries" labelledBy="industries-heading">
      <SectionHeader
        id="industries-heading"
        eyebrow={industries.eyebrow}
        heading={industries.heading}
        intro={industries.intro}
      />
      <ul className="@container mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {industries.items.map((industry) => {
          const Icon = ICONS[industry.id as keyof typeof ICONS];
          return (
            <GlassCard as="li" key={industry.id} className="reveal p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-surface-strong text-accent">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-h3 font-semibold">{industry.name}</h3>
              </div>
              <span className="mt-6 block text-small font-semibold tracking-wide text-text-muted uppercase">
                The problem
              </span>
              <p className="mt-1">{industry.pain}</p>
              <span className="mt-5 block text-small font-semibold tracking-wide text-lime-text uppercase">
                What I build
              </span>
              <p className="mt-1 text-text-muted">{industry.outcome}</p>
            </GlassCard>
          );
        })}
      </ul>
    </Section>
  );
}
