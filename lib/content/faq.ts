/** FAQ answers keep paragraphs apart with a blank line; the page renders each as its own <p>. */
export function faqParagraphs(answer: string): string[] {
  return answer
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter((part) => part !== "");
}

/** The same answer as one line of text, for FAQPage JSON-LD. */
export function faqPlainText(answer: string): string {
  return faqParagraphs(answer).join(" ");
}
