import {
  ArrowRightIcon,
  CheckIcon,
  CodeIcon,
  FlowIcon,
  PhoneIcon,
} from "@/components/ui/icons.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";

const ICONS = [CodeIcon, FlowIcon, PhoneIcon, CheckIcon] as const;

/** One row: Website → GoHighLevel → AI call → Booked call (lime check). Stacks on small screens. */
export function HowItWorks({ how }: { how: HomeContent["howItWorks"] }) {
  const last = how.steps.length - 1;
  return (
    <Section id="how-it-works" labelledBy="how-heading">
      <SectionHeader
        id="how-heading"
        eyebrow={how.eyebrow}
        heading={how.heading}
        intro={how.intro}
      />
      <ol className="mt-12 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
        {how.steps.map((step, index) => {
          const Icon = ICONS[index] ?? CheckIcon;
          const done = index === last;
          return (
            <li key={step.title} className="contents">
              <div
                className={`flex min-w-0 items-center gap-4 rounded-lg border p-5 ${
                  done ? "border-lime bg-lime-soft" : "border-border bg-surface"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-11 shrink-0 place-items-center rounded-full ${
                    done ? "bg-lime text-on-lime" : "bg-surface-strong text-accent"
                  }`}
                >
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold">{step.title}</span>
                  <span className="block text-small text-text-muted">{step.detail}</span>
                </span>
              </div>
              {index < last ? (
                <ArrowRightIcon className="mx-auto size-5 rotate-90 text-text-muted lg:rotate-0" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
