import { ICONS } from "@/components/ui/icon-map.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { ExplainerBlock } from "@/content/pages/types.ts";

/**
 * Definition section: short text on the left, a small CSS picture of how a request travels
 * (request → AI model → tools → action) on the right, then the other points as small cards. The
 * picture is one image to screen readers (role="img" with a label); its parts are decorative.
 */
export function ExplainerSection({ block }: { block: ExplainerBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader id={headingId} eyebrow={block.eyebrow} heading={block.heading} />
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-4 text-text-muted">
          {block.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? "text-lead font-medium text-text" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
        <figure role="img" aria-label={block.diagramLabel} className="glass agent-map p-5 sm:p-7">
          <ol aria-hidden="true" className="relative space-y-4">
            {block.diagram.map((node, index) => {
              const Icon = ICONS[node.icon];
              return (
                <li key={node.label} className="agent-map-node relative flex items-center gap-4">
                  <span
                    className={`agent-map-icon relative z-10 grid size-12 shrink-0 place-items-center rounded-full ${index === block.diagram.length - 1 ? "bg-lime text-on-lime" : "border border-border-strong bg-bg-raised text-accent"}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1 rounded-md border border-border bg-surface px-4 py-3">
                    <span className="block font-display font-semibold">{node.label}</span>
                    <span className="block text-small text-text-muted">{node.caption}</span>
                  </span>
                </li>
              );
            })}
            <span className="agent-map-line" />
          </ol>
        </figure>
      </div>
      <div className="@container mt-12">
        <ul className="grid gap-5 @3xl:grid-cols-3">
          {block.notes.map((note) => {
            const Icon = ICONS[note.icon];
            return (
              <li key={note.text} className="rounded-lg border border-border bg-surface p-6">
                <Icon className="size-6 text-accent" />
                <p className="mt-3 text-text-muted">{note.text}</p>
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
