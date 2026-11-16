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

/** One card per industry: their problem and what I fix, in one plain line. */
export function Industries({ industries }: { industries: HomeContent["industries"] }) {
  return (
    <Section id="industries" labelledBy="industries-heading">
      <SectionHeader
        id="industries-heading"
        eyebrow={industries.eyebrow}
        heading={industries.heading}
        intro={industries.intro}
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {industries.items.map((industry) => {
          const Icon = ICONS[industry.id];
          return (
            <li
              key={industry.id}
              className="glass p-6 sm:last:col-span-2 lg:col-span-2 lg:last:col-span-2 lg:nth-[4]:col-start-2"
            >
              <span className="grid size-11 place-items-center rounded-md bg-surface-strong text-accent">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-h3 font-semibold">{industry.name}</h3>
              <p className="mt-2 text-text-muted">{industry.line}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
