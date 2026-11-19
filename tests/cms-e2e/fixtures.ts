/** Slugs of the test-only documents that seed.ts creates in the throwaway e2e database. */
export const E2E = {
  post: "e2e-test-post",
  draft: "e2e-draft-post",
  category: "e2e-test-category",
  author: "e2e-test-author",
  tag: "e2e-test-tag",
  title: "E2E Test Post About Automation",
  directAnswer: "This is a test post that exists only in the e2e test database.",
  faqQuestion: "Is this post only in the test database?",
  hub: "/gohighlevel-agency",
} as const;
