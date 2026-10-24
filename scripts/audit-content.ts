import { auditContent } from "../lib/content/audit-rules.ts";
import { keywordFor } from "../lib/seo/keywords.ts";
import { snapshot } from "../lib/seo/snapshot.ts";

import { discoverPaths, fetchPath, run } from "./lib/site.ts";

await run("Content audit", async () => {
  const paths = await discoverPaths();
  return Promise.all(
    paths.map(async (path) => {
      const res = await fetchPath(path);
      if (res.status !== 200) {
        return {
          path,
          issues: [{ rule: "status-200", message: `Answered ${res.status}, expected 200.` }],
        };
      }
      const page = snapshot(res.body);
      return { path, issues: auditContent({ ...page, entry: keywordFor(path) }) };
    }),
  );
});
