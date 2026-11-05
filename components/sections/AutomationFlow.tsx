import { CheckIcon } from "@/components/ui/icons.tsx";
import type { HomeContent } from "@/content/home.ts";

const CHECK_CLASS = ["flow-check-1", "flow-check-2", "flow-check-3", "flow-check-4"] as const;

/**
 * "Live automation" card. Pure HTML + CSS, server-rendered, zero client JS. Only decorative parts
 * animate (checks, progress bar, "booked" chip); the text never moves, so it never hurts LCP or
 * contrast. With reduced motion (or no animation support) every step simply shows as done.
 */
export function AutomationFlow({ flow }: { flow: HomeContent["flow"] }) {
  const last = flow.steps.length - 1;
  return (
    <figure className="glass glass-blur mx-auto w-full max-w-md p-5 sm:p-7 lg:mx-0 lg:ml-auto">
      <span className="shine" aria-hidden="true" />
      <div className="flex items-center justify-between gap-3">
        <span className="badge-live inline-flex items-center gap-2 rounded-pill px-3 py-1 text-small font-semibold">
          <span className="dot-live size-2 rounded-full" aria-hidden="true" />
          {flow.label}
        </span>
        <span className="text-small text-text-muted">GoHighLevel + AI</span>
      </div>
      <figcaption className="mt-4 font-display text-h3 leading-snug font-semibold">
        {flow.caption}
      </figcaption>
      <div className="mt-5 h-1 overflow-hidden rounded-pill bg-surface-strong" aria-hidden="true">
        <div className="flow-progress btn-primary h-full w-full rounded-pill" />
      </div>
      <ol className="mt-6 space-y-3">
        {flow.steps.map((step, index) => (
          <li
            key={step.title}
            className="flex items-start gap-3 rounded-md border border-border bg-surface p-3"
          >
            <span
              aria-hidden="true"
              className={`grid size-8 shrink-0 place-items-center rounded-full ${
                index === last ? "bg-lime text-on-lime" : "bg-surface-strong text-accent"
              }`}
            >
              <CheckIcon className={`${CHECK_CLASS[index % CHECK_CLASS.length] ?? ""} size-4`} />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">{step.title}</span>
              <span className="block text-small text-text-muted">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-small">
        <span className="text-text-muted">{flow.footer}</span>
        <span
          aria-hidden="true"
          className="flow-booked inline-flex items-center gap-1.5 rounded-pill bg-lime px-3 py-1 font-semibold text-on-lime"
        >
          <CheckIcon className="size-4" />
          Booked
        </span>
      </div>
    </figure>
  );
}
