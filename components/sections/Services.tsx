import { ArrowLink } from "@/components/ui/ArrowLink.tsx";
import { GlassCard } from "@/components/ui/GlassCard.tsx";
import { CodeIcon, FlowIcon, SparkIcon } from "@/components/ui/icons.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { HomeContent, Service } from "@/content/home.ts";

const ICONS: Record<Service["id"], typeof CodeIcon> = {
  web: CodeIcon,
  ghl: FlowIcon,
  ai: SparkIcon,
};

/** Three cards, one line each: what the client gets. */
export function Services({ services }: { services: HomeContent["services"] }) {
  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeader
        id="services-heading"
        eyebrow={services.eyebrow}
        heading={services.heading}
        intro={services.intro}
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {services.items.map((service) => {
          const Icon = ICONS[service.id];
          return (
            <GlassCard as="li" key={service.id} className="flex flex-col p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-md bg-surface-strong text-accent">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-h3 font-semibold">{service.title}</h3>
              <p className="mt-2 text-text-muted">{service.line}</p>
              {service.link ? (
                <ArrowLink href={service.link.href} className="mt-auto pt-3">
                  {service.link.label}
                </ArrowLink>
              ) : null}
            </GlassCard>
          );
        })}
      </ul>
      {services.more.length > 0 ? (
        <div className="mt-8 flex flex-col gap-x-8 sm:flex-row sm:flex-wrap">
          {services.more.map((link) => (
            <ArrowLink key={link.href} href={link.href}>
              {link.label}
            </ArrowLink>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
