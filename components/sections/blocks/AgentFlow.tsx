import {
  ChatIcon,
  CheckIcon,
  CodeIcon,
  FlowIcon,
  PhoneIcon,
  SparkIcon,
} from "@/components/ui/icons.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { AgentFlowBlock, AgentStep } from "@/content/pages/types.ts";

const ICONS: Record<AgentStep["icon"], typeof CodeIcon> = {
  code: CodeIcon,
  flow: FlowIcon,
  phone: PhoneIcon,
  check: CheckIcon,
  chat: ChatIcon,
  spark: SparkIcon,
};

/**
 * "How an agent works": five steps the visitor clicks through, one open at a time. No JavaScript:
 * each step is a radio button, and CSS shows the panel of the checked one (globals.css, ".agent-*").
 * Arrow keys move between steps, as in any radio group. Only transform and opacity animate, and
 * nothing moves under prefers-reduced-motion. A list with the detail under each step on small
 * screens; a row of steps above one panel from 64rem.
 */
export function AgentFlow({ block }: { block: AgentFlowBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <div className="glass mt-12 px-4 py-6 sm:px-8 sm:py-10">
        {/* Named by the section heading: a visually hidden <legend> would count as clipped text. */}
        <fieldset aria-labelledby={headingId} className="agent-flow min-w-0">
          <ol className="agent-steps">
            {block.steps.map((step, index) => {
              const Icon = ICONS[step.icon];
              return (
                <li key={step.label} className="agent-step">
                  <label className="agent-tab">
                    <input
                      type="radio"
                      name={`${block.id}-step`}
                      defaultChecked={index === 0}
                      className="agent-input"
                    />
                    <span aria-hidden="true" className="agent-node">
                      <Icon className="size-6" />
                    </span>
                    <span className="min-w-0">
                      {/* The <ol> already numbers the steps for screen readers. */}
                      <span aria-hidden="true" className="block text-small text-text-muted">
                        Step {index + 1}
                      </span>
                      <span className="block font-display leading-snug font-semibold">
                        {step.label}
                      </span>
                    </span>
                    {index < block.steps.length - 1 ? (
                      <span aria-hidden="true" className="agent-line">
                        <span className="agent-line-fill" />
                      </span>
                    ) : null}
                  </label>
                  <div className="agent-panel">
                    <h3 className="text-h3 font-semibold">{step.title}</h3>
                    <p className="mt-2 text-text-muted">{step.text}</p>
                    <p className="mt-3 border-l-2 border-accent pl-4">{step.example}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </fieldset>
        <p className="mt-6 border-t border-border pt-6 text-center text-text-muted">
          {block.footer}
        </p>
      </div>
    </Section>
  );
}
