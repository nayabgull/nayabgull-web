import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";

/** Text only for now: no photo and no avatar until Nayab adds a real photo. */
export function About({ about }: { about: HomeContent["about"] }) {
  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeader id="about-heading" eyebrow={about.eyebrow} heading={about.heading} />
      <div className="mx-auto mt-8 max-w-[65ch]">
        <p className="text-center font-display font-semibold">
          {about.name}
          <span className="font-sans font-normal text-text-muted">
            {" · "}
            {about.role}, {about.location}.
          </span>
        </p>
        <div className="mt-6 space-y-4 text-text-muted">
          {about.text.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
