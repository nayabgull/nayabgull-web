import { LeadForm } from "@/components/forms/LeadForm.tsx";

/** The quote form in a glass card, with its own heading. Used in the hero and on /contact. */
export function QuoteCard({
  id,
  heading,
  text,
  source,
  as: Heading = "h2",
}: {
  /** Unique on the page: the card's anchor and the prefix of its heading id. */
  id: string;
  heading: string;
  text: string;
  source: string;
  as?: "h2" | "h3";
}) {
  const headingId = `${id}-heading`;
  return (
    <div id={id} className="glass mx-auto w-full max-w-xl scroll-mt-24 p-5 sm:p-7">
      <Heading id={headingId} className="text-h3 font-semibold">
        {heading}
      </Heading>
      <p className="mt-1.5 mb-5 text-small text-text-muted">{text}</p>
      <LeadForm
        source={source}
        labelledBy={headingId}
        turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />
    </div>
  );
}
