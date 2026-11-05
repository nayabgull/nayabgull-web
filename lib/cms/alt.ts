export const MAX_ALT_LENGTH = 125;

/** Alt text rules from seo.md §5 and content.md §8. Returns an error message, or true when valid. */
export function validateAlt(alt: string | null | undefined): string | true {
  const text = (alt ?? "").trim();
  if (text === "") return "Alt text is required. Describe what the image shows.";
  if (text.length > MAX_ALT_LENGTH) {
    return `Alt text is ${text.length} characters (max ${MAX_ALT_LENGTH}).`;
  }
  if (/^(image|picture|photo|graphic) of\b/i.test(text)) {
    return 'Alt text must not start with "image of" or "photo of". Describe the content directly.';
  }
  return true;
}
