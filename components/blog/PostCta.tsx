import { ButtonLink } from "@/components/ui/ButtonLink.tsx";
import { CALL_CTA } from "@/content/home.ts";

/**
 * CTA block inside a post, and the closing CTA of every post. The button is always the site's one
 * primary CTA (content.md §5), so a post never adds a competing one. A plain <div>, not an
 * <aside>: a complementary landmark inside <main> fails axe's best-practice rules.
 */
export function PostCta({ fields }: { fields: Record<string, unknown> }) {
  const heading = typeof fields.heading === "string" ? fields.heading : "";
  const text = typeof fields.text === "string" ? fields.text : "";
  if (heading === "") return null;
  return (
    <div className="my-10 rounded-lg border border-border-strong bg-surface p-6 sm:p-8">
      <h2 className="text-h3 font-bold">{heading}</h2>
      {text ? <p className="mt-3 max-w-[60ch] text-text-muted">{text}</p> : null}
      <ButtonLink href={CALL_CTA.href} className="mt-5">
        {CALL_CTA.label}
      </ButtonLink>
    </div>
  );
}
