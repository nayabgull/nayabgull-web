import Image from "next/image";

import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent } from "@/content/home.ts";

/** Initials avatar until Nayab adds public/images/nayab-gull.webp (then set `about.photo`). */
function Avatar({ about }: { about: HomeContent["about"] }) {
  if (about.photo) {
    return (
      <Image
        src={about.photo}
        alt={`${about.name}, ${about.role.toLowerCase()} in ${about.location}`}
        width={160}
        height={160}
        sizes="160px"
        className="size-32 rounded-full object-cover sm:size-40"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="btn-primary grid size-32 place-items-center rounded-full font-display text-h2 font-bold sm:size-40"
    >
      {about.initials}
    </span>
  );
}

export function About({ about }: { about: HomeContent["about"] }) {
  return (
    <Section id="about" labelledBy="about-heading">
      <GlassCard
        hover={false}
        className="reveal grid grid-cols-1 gap-8 p-6 sm:p-10 md:grid-cols-[auto_1fr] md:items-center"
      >
        <div className="flex flex-col items-start gap-3">
          <Avatar about={about} />
          <span className="font-display font-semibold">{about.name}</span>
          <span className="text-small text-text-muted">
            {about.role} · {about.location}
          </span>
        </div>
        <div>
          <SectionHeader id="about-heading" eyebrow={about.eyebrow} heading={about.heading} />
          <div className="mt-5 max-w-3xl space-y-4 text-text-muted">
            {about.text.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </GlassCard>
    </Section>
  );
}
