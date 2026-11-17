/**
 * Explains a mobile LCP in the CI log: the LCP element and phases, the observed FCP/LCP, when each
 * script finished and the long main-thread tasks near LCP, so a missed budget shows its cause.
 */

interface Node {
  snippet?: string;
}

interface TableItem {
  node?: Node;
  phase?: string;
  timing?: number;
}

interface NetworkItem {
  url?: string;
  resourceType?: string;
  networkEndTime?: number;
  transferSize?: number;
}

interface TaskItem {
  startTime?: number;
  duration?: number;
}

interface Audit {
  numericValue?: number;
  details?: { items?: unknown[] };
}

/** The parts of a Lighthouse result (LHR) this report reads. */
export interface Lhr {
  requestedUrl?: string;
  audits?: Record<string, Audit | undefined>;
}

const items = <T>(audit: Audit | undefined): T[] => (audit?.details?.items ?? []) as T[];
const ms = (value: number | undefined) => (value === undefined ? "?" : `${Math.round(value)}`);

/** Last path segment of a URL, without query string. */
export function shortName(url: string): string {
  const path = url.replace(/[?#].*$/, "");
  return path.slice(path.lastIndexOf("/") + 1) || path;
}

/** One block of lines for one representative mobile run. */
export function lcpReport(lhr: Lhr): string[] {
  const audits = lhr.audits ?? {};
  const metrics = items<Record<string, number | undefined>>(audits.metrics)[0] ?? {};
  const observedLcp = metrics.observedLargestContentfulPaint;
  const [elementTable, phaseTable] = items<{ items?: TableItem[] }>(
    audits["largest-contentful-paint-element"],
  );
  const snippet = elementTable?.items?.[0]?.node?.snippet ?? "?";
  const phases = (phaseTable?.items ?? [])
    .map((item) => `${item.phase ?? "?"} ${ms(item.timing)}`)
    .join(", ");

  const scripts = items<NetworkItem>(audits["network-requests"])
    .filter((request) => request.resourceType === "Script" && request.url)
    .map((request) => {
      const end = request.networkEndTime;
      const when =
        observedLcp === undefined || end === undefined
          ? ""
          : end <= observedLcp
            ? " (before LCP)"
            : "";
      return `${shortName(request.url ?? "")} ${ms(end)}${when}`;
    });

  const longTasks = items<TaskItem>(audits["main-thread-tasks"])
    .filter(
      (task) =>
        (task.duration ?? 0) >= 10 && (task.startTime ?? Infinity) <= (observedLcp ?? 0) + 100,
    )
    .map((task) => `${ms(task.startTime)}+${ms(task.duration)}`);

  return [
    `LCP ${lhr.requestedUrl ?? "?"}: ${ms(audits["largest-contentful-paint"]?.numericValue)} ms`,
    `  element ${snippet}`,
    `  phases ${phases || "?"}`,
    `  observed FCP ${ms(metrics.observedFirstContentfulPaint)} ms, LCP ${ms(observedLcp)} ms`,
    `  scripts end (ms) ${scripts.join(", ") || "none"}`,
    `  main-thread tasks >= 10 ms near LCP (start+duration) ${longTasks.join(", ") || "none"}`,
  ];
}
