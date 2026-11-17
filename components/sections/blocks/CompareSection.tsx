import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { CompareBlock } from "@/content/pages/types.ts";

/**
 * A comparison table with a header row and a header cell per row. Below 48rem every row becomes a
 * card and each cell shows its column name in front (CSS, ".compare-*"), so nothing scrolls sideways.
 */
export function CompareSection({ block }: { block: CompareBlock }) {
  const headingId = `${block.id}-heading`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <table aria-labelledby={headingId} className="compare mt-12 w-full text-left">
        <thead>
          <tr>
            <th scope="col">{block.rowLabel}</th>
            {block.columns.map((column, index) => (
              <th key={column} scope="col" className={index === 0 ? "compare-best" : undefined}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, index) => (
                <td
                  key={block.columns[index]}
                  data-label={block.columns[index]}
                  className={index === 0 ? "compare-best" : undefined}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {block.note ? (
        <p className="mx-auto mt-8 max-w-[65ch] text-center text-text-muted">
          <RichText value={block.note} />
        </p>
      ) : null}
    </Section>
  );
}
