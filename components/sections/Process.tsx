import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";

export function Process({ process }: { process: HomeContent["process"] }) {
  return (
    <Section id="process" labelledBy="process-heading">
      <SectionHeader
        id="process-heading"
        eyebrow={process.eyebrow}
        heading={process.heading}
        intro={process.intro}
      />
      <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {process.steps.map((step, index) => (
          <li key={step.title} className="relative rounded-lg border border-border bg-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <span
                aria-hidden="true"
                className="font-display text-h2 leading-none font-bold text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-pill bg-surface-strong px-3 py-1 text-small font-medium">
                {step.when}
              </span>
            </div>
            <h3 className="mt-5 text-h3 font-semibold">{step.title}</h3>
            <p className="mt-2 text-text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
