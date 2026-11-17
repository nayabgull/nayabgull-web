import { ICONS } from "@/components/ui/icon-map.tsx";
import { CheckIcon } from "@/components/ui/icons.tsx";
import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { Feature, FeaturesBlock } from "@/content/pages/types.ts";

function Example({ example }: { example: NonNullable<FeaturesBlock["example"]> }) {
  return (
    <div className="rounded-lg border border-l-4 border-border border-l-accent bg-surface p-6">
      <span className="text-small font-semibold tracking-[0.12em] text-accent uppercase">
        {example.label}
      </span>
      <div className="mt-2 space-y-3">
        {example.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function Card({ item }: { item: Feature }) {
  const Icon = ICONS[item.icon ?? "check"];
  return (
    <li className="glass flex flex-col gap-3 p-6">
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-md bg-surface-strong text-accent"
      >
        <Icon className="size-6" />
      </span>
      {/* The title is the bold lead-in of the item, as in the copy ("**Title:** text"). */}
      <p className="text-text-muted">
        {item.title ? (
          <strong className="mb-1 block font-display text-h3 font-semibold text-text">
            {item.title}
          </strong>
        ) : null}
        <RichText value={item.text} />
      </p>
    </li>
  );
}

function CheckItem({ item }: { item: Feature }) {
  return (
    <li className="flex items-start gap-3 rounded-md border border-border bg-surface px-4 py-3">
      <span
        aria-hidden="true"
        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-lime-soft text-lime-text"
      >
        <CheckIcon className="size-4" />
      </span>
      <span>
        <RichText value={item.text} />
      </span>
    </li>
  );
}

/**
 * A designed section from short pieces: lead text (two columns, or text beside an example card),
 * an icon-card grid or a two-column check list, and one closing line. The grids use container
 * queries, so they fit any column they sit in.
 */
export function FeaturesSection({ block }: { block: FeaturesBlock }) {
  const headingId = `${block.id}-heading`;
  const paragraphs = block.paragraphs ?? [];
  const items = block.items ?? [];
  const exampleTop = block.example && !block.example.afterList ? block.example : undefined;
  const exampleBottom = block.example?.afterList ? block.example : undefined;
  const leadColumns = paragraphs.length > 1 || exampleTop ? "lg:grid-cols-2" : "";
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      {paragraphs.length > 0 || exampleTop ? (
        <div className={`mx-auto mt-10 grid max-w-5xl items-start gap-6 lg:gap-10 ${leadColumns}`}>
          {paragraphs.length > 0 ? (
            <div
              className={`grid gap-4 text-text-muted ${exampleTop ? "" : "lg:col-span-2 lg:grid-cols-2 lg:gap-10"}`}
            >
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    paragraphs.length === 1 && !exampleTop
                      ? "mx-auto max-w-[65ch] text-center lg:col-span-2"
                      : ""
                  }
                >
                  <RichText value={paragraph} />
                </p>
              ))}
            </div>
          ) : null}
          {exampleTop ? <Example example={exampleTop} /> : null}
        </div>
      ) : null}
      {block.listIntro ? (
        // The sentence that introduces the list ends with a colon, so it heads the list as an H3.
        <h3 className="mt-12 text-center text-lead font-semibold">{block.listIntro}</h3>
      ) : null}
      {items.length > 0 ? (
        <div className="@container mt-6">
          {block.layout === "cards" ? (
            <ul className="grid gap-5 @2xl:grid-cols-2 @5xl:grid-cols-3">
              {items.map((item, index) => (
                <Card key={item.title ?? index} item={item} />
              ))}
            </ul>
          ) : (
            <ul className="mx-auto grid max-w-4xl gap-3 @2xl:grid-cols-2">
              {items.map((item, index) => (
                <CheckItem key={index} item={item} />
              ))}
            </ul>
          )}
        </div>
      ) : null}
      {exampleBottom ? (
        <div className="mx-auto mt-8 max-w-3xl">
          <Example example={exampleBottom} />
        </div>
      ) : null}
      {block.outro ? (
        <p className="mx-auto mt-10 max-w-[60ch] text-center text-lead font-semibold">
          <RichText value={block.outro} />
        </p>
      ) : null}
    </Section>
  );
}
