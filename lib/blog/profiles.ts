/** Author profile links that feed the Person `sameAs` (seo.md §6). Only real URLs Nayab enters. */
export interface ProfileSite {
  field: "linkedinUrl" | "githubUrl" | "upworkUrl";
  label: string;
  hosts: readonly string[];
}

export const PROFILE_SITES: readonly ProfileSite[] = [
  { field: "linkedinUrl", label: "LinkedIn", hosts: ["linkedin.com", "www.linkedin.com"] },
  { field: "githubUrl", label: "GitHub", hosts: ["github.com", "www.github.com"] },
  { field: "upworkUrl", label: "Upwork", hosts: ["upwork.com", "www.upwork.com"] },
];

/** Empty is fine (the link is left out). Otherwise an https URL on the site's own domain. */
export function validateProfileUrl(value: unknown, site: ProfileSite): string | true {
  if (value === null || value === undefined || value === "") return true;
  if (typeof value !== "string") return `${site.label} link must be text.`;
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return `${site.label} link must be a full URL starting with https://.`;
  }
  if (url.protocol !== "https:") return `${site.label} link must start with https://.`;
  if (!site.hosts.includes(url.hostname)) {
    return `${site.label} link must be on ${site.hosts[0] ?? ""}.`;
  }
  return true;
}

/** The profile links an author has, in a fixed order, for the author box and `sameAs`. */
export function profileLinks(
  author: Partial<Record<ProfileSite["field"], unknown>>,
): { label: string; url: string }[] {
  return PROFILE_SITES.flatMap((site) => {
    const value = author[site.field];
    return typeof value === "string" &&
      value.trim() !== "" &&
      validateProfileUrl(value, site) === true
      ? [{ label: site.label, url: value.trim() }]
      : [];
  });
}
