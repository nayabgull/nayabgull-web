import { RichText } from "@/components/ui/RichText.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { TableBlock } from "@/content/pages/types.ts";

/**
 * A comparison table that fits a 280 px screen without scrolling: one column per option, and each
 * row label sits on its own full-width line above its cells (a row group header). The `headers`
 * attribute ties every cell to its column and its row label for screen readers.
 */
export function TableSection({ block }: { block: TableBlock }) {
  const headingId = `${block.id}-heading`;
  const columnId = (index: number) => `${block.id}-col-${index}`;
  const rowId = (index: number) => `${block.id}-row-${index}`;
  return (
    <Section id={block.id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro ? <RichText value={block.intro} /> : undefined}
      />
      <div className="glass mx-auto mt-10 max-w-5xl">
        <table className="w-full table-fixed border-collapse text-left text-small break-words hyphens-auto sm:text-base">
          <caption className="px-3 pt-5 pb-2 text-left text-text-muted sm:px-5">
            {block.caption}
          </caption>
          <thead>
            <tr>
              {block.columns.map((column, index) => (
                <th
                  key={column}
                  id={columnId(index)}
                  scope="col"
                  className="border-b border-border-strong px-3 py-4 align-bottom font-semibold sm:px-5"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          {block.rows.map((row, rowIndex) => (
            <tbody key={row.label} className="border-b border-border last:border-b-0">
              <tr>
                <th
                  id={rowId(rowIndex)}
                  scope="rowgroup"
                  colSpan={block.columns.length}
                  className="px-3 pt-4 text-small font-semibold tracking-[0.08em] text-accent uppercase sm:px-5"
                >
                  {row.label}
                </th>
              </tr>
              <tr>
                {row.cells.map((cell, index) => (
                  <td
                    key={index}
                    headers={`${columnId(index)} ${rowId(rowIndex)}`}
                    className="px-3 pt-2 pb-4 align-top text-text-muted sm:px-5"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </Section>
  );
}
