import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd.tsx";
import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { Container } from "@/components/ui/Container.tsx";
import { Section } from "@/components/ui/Section.tsx";
import { SectionHeader } from "@/components/ui/SectionHeader.tsx";
import type { ContactContent } from "@/content/contact.ts";
import { contactJsonLd } from "@/lib/seo/contact-jsonld.ts";

import { Faq } from "./Faq.tsx";
import { QuoteCard } from "./QuoteCard.tsx";

/** /contact: the quote form first, then what happens next, the call and email options, and an FAQ. */
export function ContactPage({ content, email }: { content: ContactContent; email: string | null }) {
  const { hero, next, other } = content;
  return (
    <>
      <JsonLd data={contactJsonLd(content)} />
      <section
        aria-labelledby="hero-heading"
        data-cta-zone
        className="hero-bg pt-10 pb-16 sm:pt-14 lg:pb-20"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-small font-semibold tracking-[0.16em] text-accent uppercase">
              {hero.eyebrow}
            </span>
            <h1
              id="hero-heading"
              className="mt-3 text-display leading-[1.08] font-bold break-words"
            >
              <span className="text-gradient">{hero.headline.highlight}</span>
              {hero.headline.after}
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-lead text-text-muted">{hero.lede}</p>
          </div>
          <div className="mt-10">
            <QuoteCard
              id="quote"
              heading={content.form.heading}
              text={content.form.text}
              source="/contact"
            />
          </div>
        </Container>
      </section>

      <Section id="next" labelledBy="next-heading">
        <SectionHeader
          id="next-heading"
          eyebrow={next.eyebrow}
          heading={next.heading}
          intro={next.intro}
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {next.steps.map((step, index) => (
            <li key={step.title} className="glass p-6">
              <span
                aria-hidden="true"
                className="font-display text-h2 leading-none font-bold text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-h3 font-semibold">{step.title}</h3>
              <p className="mt-2 text-text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="other-ways" labelledBy="other-heading">
        <SectionHeader
          id="other-heading"
          eyebrow={other.eyebrow}
          heading={other.heading}
          intro={other.intro}
        />
        <div
          className={`mx-auto mt-12 grid gap-5 ${email ? "max-w-4xl md:grid-cols-2" : "max-w-xl"}`}
        >
          <div className="glass flex flex-col items-start p-6 sm:p-8">
            <h3 className="text-h3 font-semibold">{other.call.title}</h3>
            <p className="mt-2 mb-6 text-text-muted">{other.call.text}</p>
            <ButtonLink href={other.call.cta.href} className="mt-auto">
              {other.call.cta.label}
            </ButtonLink>
          </div>
          {email ? (
            <div className="glass flex flex-col items-start p-6 sm:p-8">
              <h3 className="text-h3 font-semibold">{other.email.title}</h3>
              <p className="mt-2 mb-6 text-text-muted">{other.email.text}</p>
              <a
                href={`mailto:${email}`}
                className="text-link mt-auto inline-flex min-h-11 items-center font-semibold break-all"
              >
                {email}
              </a>
            </div>
          ) : null}
        </div>
        <p className="mt-8 text-center text-text-muted">
          {other.home.before}
          <Link href={other.home.link.href} className="text-link">
            {other.home.link.label}
          </Link>
          {other.home.after}
        </p>
      </Section>

      <Faq faq={content.faq} />
    </>
  );
}
