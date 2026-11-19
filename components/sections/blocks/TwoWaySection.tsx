import { ICONS } from "@/components/ui/icon-map.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { TwoWayBlock, TwoWayEnd } from "@/content/pages/types.ts";

function End({ end, strong }: { end: TwoWayEnd; strong?: boolean }) {
  const Icon = ICONS[end.icon];
  return (
    <div className="twoway-end rounded-md border border-border bg-surface p-4 text-center">
      <span
        className={`mx-auto grid size-12 place-items-center rounded-full ${strong ? "bg-lime text-on-lime" : "border border-border-strong bg-bg-raised text-accent"}`}
      >
        <Icon className="size-6" />
      </span>
      <span className="mt-2 block font-display font-semibold">{end.label}</span>
      <span className="block text-small text-text-muted">{end.caption}</span>
    </div>
  );
}

function Lane({ lane, back }: { lane: TwoWayBlock["request"]; back?: boolean }) {
  return (
    <div className={`twoway-lane ${back ? "twoway-lane-back" : ""}`}>
      <span className="twoway-tag">{lane.tag}</span>
      <span className="twoway-arrow">
        <span className="twoway-dot" />
      </span>
      <span className="text-small text-text-muted">{lane.text}</span>
    </div>
  );
}

/**
 * Definition section for two systems that talk: text on the left, a CSS picture on the right
 * (left system, a request lane →, an event lane ←, right system), then note cards and one closing
 * line. The picture is one image to screen readers (role="img" with a label); its parts are
 * decorative. It stacks vertically in a narrow column (container query, globals.css ".twoway").
 */
export function TwoWaySection({ block }: { block: TwoWayBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="space-y-4 text-text-muted">
          {block.paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "text-lead font-medium text-text" : ""}>
              <RichText value={paragraph} />
            </p>
          ))}
        </div>
        <figure role="img" aria-label={block.diagramLabel} className="glass @container p-5 sm:p-7">
          <div aria-hidden="true" className="twoway">
            <End end={block.left} />
            <div className="twoway-lanes">
              <Lane lane={block.request} />
              <Lane lane={block.event} back />
            </div>
            <End end={block.right} strong />
          </div>
        </figure>
      </div>
      <div className="@container mt-12">
        <ul className="grid gap-5 @3xl:grid-cols-3">
          {block.notes.map((note, index) => {
            const Icon = ICONS[note.icon];
            return (
              <li key={index} className="rounded-lg border border-border bg-surface p-6">
                <Icon className="size-6 text-accent" />
                <p className="mt-3 text-text-muted">
                  <RichText value={note.text} />
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-[60ch] text-center text-lead font-semibold">
        {block.callout}
      </p>
    </Section>
  );
}
