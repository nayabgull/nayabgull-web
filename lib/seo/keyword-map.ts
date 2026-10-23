export interface MappedPage {
  url: string;
  primary: string;
  /** Secondary target keywords. Entries marked "(link only)" in the map are not targets and are left out. */
  secondary: string[];
}

/** Removes notes such as "($176)", "(1K–10K)" or "(brand)" and normalizes case and spacing. */
export function normalizeKeyword(raw: string): string {
  return raw
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseSecondary(cell: string | undefined): string[] {
  if (!cell) return [];
  return cell
    .split(",")
    .filter((item) => !/\(link only\)/i.test(item))
    .map(normalizeKeyword)
    .filter((item) => !/^[-–—]*$/.test(item));
}

/**
 * Reads every Markdown table in docs/seo/keyword-map.md that has a "URL" and a "Primary" column.
 * Other tables (for example blog clusters) are ignored.
 */
export function parseKeywordMap(markdown: string): MappedPage[] {
  const pages: MappedPage[] = [];
  const lines = markdown.split("\n");
  let header: string[] | null = null;

  for (const line of lines) {
    if (!line.trim().startsWith("|")) {
      header = null;
      continue;
    }
    const cells = splitRow(line);
    if (cells.every((cell) => /^:?-+:?$/.test(cell))) continue;
    if (header === null) {
      header = cells.map((cell) => cell.toLowerCase());
      continue;
    }
    const urlIndex = header.indexOf("url");
    const primaryIndex = header.indexOf("primary");
    if (urlIndex === -1 || primaryIndex === -1) continue;

    const url = cells[urlIndex] ?? "";
    const primary = normalizeKeyword(cells[primaryIndex] ?? "");
    if (url === "" || primary === "") continue;
    pages.push({ url, primary, secondary: parseSecondary(cells[header.indexOf("secondary")]) });
  }
  return pages;
}

export interface KeywordConflict {
  keyword: string;
  urls: string[];
}

/** Every target keyword (primary or secondary) that is claimed by more than one page. */
export function findConflicts(pages: readonly MappedPage[]): KeywordConflict[] {
  const owners = new Map<string, Set<string>>();
  for (const page of pages) {
    for (const keyword of [page.primary, ...page.secondary]) {
      const set = owners.get(keyword) ?? new Set<string>();
      set.add(page.url);
      owners.set(keyword, set);
    }
  }
  return [...owners.entries()]
    .filter(([, urls]) => urls.size > 1)
    .map(([keyword, urls]) => ({ keyword, urls: [...urls].sort() }));
}
