import { HammerIcon, HomeIcon, RoofIcon, ScaleIcon, ToothIcon } from "@/components/ui/icons.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent, Industry } from "@/content/home.ts";

const ICONS: Record<Industry["id"], typeof ScaleIcon> = {
  law: ScaleIcon,
  dental: ToothIcon,
  "real-estate": HomeIcon,
  roofing: RoofIcon,
  contractors: HammerIcon,
};

/** One plain line per industry: their problem and what I fix. */
export function Industries({ industries }: { industries: HomeContent["industries"] }) {
  return (
    <Section id="industries" labelledBy="industries-heading">
      <SectionHeader
        id="industries-heading"
        eyebrow={industries.eyebrow}
        heading={industries.heading}
        intro={industries.intro}
      />
      <ul className="mt-12 divide-y divide-border rounded-lg border border-border bg-surface">
        {industries.items.map((industry) => {
          const Icon = ICONS[industry.id];
          return (
            <li key={industry.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:gap-6 sm:p-6">
              <div className="flex shrink-0 items-center gap-3 sm:w-64">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-surface-strong text-accent">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-h3 font-semibold">{industry.name}</h3>
              </div>
              <p className="text-text-muted sm:self-center">{industry.line}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
