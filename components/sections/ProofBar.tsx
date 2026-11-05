import { Container } from "@/components/ui/Container.tsx";
import type { HomeContent } from "@/content/home.ts";

/** Only true, confirmed facts. No logos, no ratings. */
export function ProofBar({ proof }: { proof: HomeContent["proof"] }) {
  return (
    <section aria-label={proof.heading} className="border-y border-border bg-surface">
      <Container className="py-10">
        <div role="list" className="grid grid-cols-1 gap-6 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {proof.items.map((item) => (
            <div role="listitem" key={item.value} className="flex flex-col gap-1">
              <span className="font-display text-h3 font-bold">{item.value}</span>
              <span className="text-small text-text-muted">{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
