import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";

/**
 * TODO(nayab): PRICING SLOT. Render real "starts at" ranges here once Nayab supplies them
 * (content/home.ts → pricing). Never invent prices; JSON-LD Offer only when a price is visible.
 */
export function Pricing({ pricing }: { pricing: HomeContent["pricing"] }) {
  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <GlassCard hover={false} className="reveal p-6 sm:p-10" data-slot="pricing">
        <SectionHeader id="pricing-heading" eyebrow={pricing.eyebrow} heading={pricing.heading} />
        <div className="mt-5 max-w-3xl space-y-3 text-lead text-text-muted">
          {pricing.text.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
