import { ICONS } from "@/components/ui/icon-map.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { CallFlowBlock } from "@/content/pages/types.ts";

/**
 * One real call, from ring to text summary. Left: the call as numbered steps on a vertical line,
 * each with the words said at that point as a speech bubble (caller bubbles sit left, AI bubbles
 * are tinted). Right: the text message the owner gets after the call. HTML and CSS only
 * (globals.css, ".call-*"); nothing animates, so it reads the same with reduced motion.
 */
export function CallFlowSection({ block }: { block: CallFlowBlock }) {
  const headingId = `${block.id}-heading`;
  const last = block.steps.length - 1;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <ol className="call-steps glass p-5 sm:p-8">
          {block.steps.map((step, index) => {
            const Icon = ICONS[step.icon];
            const caller = step.who === "Caller";
            return (
              <li key={step.title} className="call-step relative flex gap-4 sm:gap-5">
                <span
                  aria-hidden="true"
                  className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full ${
                    index === last
                      ? "bg-lime text-on-lime"
                      : "border border-border-strong bg-bg-raised text-accent"
                  }`}
                >
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0 flex-1 pb-8">
                  <span className="block text-small font-semibold text-accent">
                    {/* The <ol> already numbers the steps for screen readers. */}
                    <span aria-hidden="true">Step {index + 1} · </span>
                    {step.who}
                  </span>
                  <h3 className="mt-1 text-h3 font-semibold">{step.title}</h3>
                  <p className={`call-bubble mt-3 ${caller ? "call-bubble-caller" : ""}`}>
                    {step.says}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="call-phone lg:sticky lg:top-28">
          <div className="call-phone-screen">
            <span className="block text-center text-small font-semibold text-text-muted">
              {block.summary.label}
            </span>
            <dl className="call-sms mt-4 space-y-2">
              {block.summary.lines.map((line) => (
                <div key={line.name} className="flex flex-wrap gap-x-2">
                  <dt className="font-semibold">{line.name}:</dt>
                  <dd>{line.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[60ch] text-center text-lead font-semibold">
        {block.footer}
      </p>
    </Section>
  );
}
