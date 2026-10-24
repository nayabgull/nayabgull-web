/** One failed rule on one page. Shared by the SEO, content and structured-data audits. */
export interface Issue {
  rule: string;
  message: string;
}
