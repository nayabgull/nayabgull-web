import { CheckIcon, CodeIcon, FlowIcon, PhoneIcon } from "@/components/ui/icons.tsx";
import { InView } from "@/components/ui/InView.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";

const ICONS = [CodeIcon, FlowIcon, PhoneIcon, CheckIcon] as const;

/**
 * "What happens when a new lead comes in": lead arrives → saved → AI calls in 60 seconds → call
 * booked. The sequence plays when the section scrolls into view (InView sets data-inview) and loops
 * while it stays there. Pure CSS, transform and opacity only (globals.css, ".flow-*"). With reduced
 * motion, or with JavaScript off, every step shows its finished state.
 */
export function LeadFlow({ flow }: { flow: HomeContent["flow"] }) {
  const last = flow.steps.length - 1;
  return (
    <Section id="how-it-works" labelledBy="flow-heading">
      <SectionHeader
        id="flow-heading"
        eyebrow={flow.eyebrow}
        heading={flow.heading}
        intro={flow.intro}
      />
      <InView className="flow glass mt-12 px-5 py-8 sm:px-8 sm:py-10">
        <ol className="grid lg:grid-cols-4">
          {flow.steps.map((step, index) => {
            const Icon = ICONS[index] ?? CheckIcon;
            const done = index === last;
            return (
              <li
                key={step.title}
                className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:items-center lg:px-3 lg:pb-0 lg:text-center"
              >
                {done ? null : (
                  <span aria-hidden="true" className="flow-line">
                    <span className={`flow-line-fill flow-line-${index + 1}`} />
                  </span>
                )}
                <span className="relative grid size-14 shrink-0 place-items-center">
                  <span
                    aria-hidden="true"
                    className={`flow-ring flow-ring-${index + 1} absolute inset-0 rounded-full ${
                      done ? "bg-lime" : "bg-accent"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`flow-node flow-node-${index + 1} relative grid size-14 place-items-center rounded-full border ${
                      done
                        ? "border-lime bg-lime text-on-lime"
                        : "border-border-strong bg-bg-raised text-accent"
                    }`}
                  >
                    <Icon className={`size-6 ${index === 2 ? "flow-phone" : ""}`} />
                  </span>
                </span>
                <span className={`flow-text flow-text-${index + 1} min-w-0 lg:mt-5`}>
                  {/* The <ol> already numbers the steps for screen readers. */}
                  <span aria-hidden="true" className="block text-small font-semibold text-accent">
                    Step {index + 1}
                  </span>
                  <span className="mt-1 block font-display text-h3 leading-snug font-semibold">
                    {step.title}
                  </span>
                  <span className="mt-1.5 block text-text-muted">{step.detail}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-border pt-6 text-center">
          <span
            aria-hidden="true"
            className="flow-booked badge-live inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-small font-semibold"
          >
            <CheckIcon className="size-4" />
            Booked
          </span>
          <span className="text-text-muted">{flow.footer}</span>
        </p>
      </InView>
    </Section>
  );
}
