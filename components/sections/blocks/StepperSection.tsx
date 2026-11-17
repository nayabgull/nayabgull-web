import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { StepperBlock } from "@/content/pages/types.ts";

/**
 * Process steps: a vertical stepper (number, line, text) on small screens and a horizontal one with
 * a connecting line from 64rem (globals.css, ".stepper"). No JavaScript, nothing animates.
 */
export function StepperSection({ block }: { block: StepperBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <ol
        className="stepper mt-12"
        style={{ "--stepper-count": block.steps.length } as React.CSSProperties}
      >
        {block.steps.map((step, index) => (
          <li key={step.title} className="stepper-step">
            <span aria-hidden="true" className="stepper-number">
              {index + 1}
            </span>
            <div className="stepper-body">
              <h3 className="text-h3 font-semibold">{step.title}</h3>
              <p className="mt-2 text-text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
