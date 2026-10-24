import { validateJsonLd } from "../lib/seo/jsonld-validate.ts";
import { keywordFor } from "../lib/seo/keywords.ts";
import { snapshot } from "../lib/seo/snapshot.ts";

import { discoverPaths, fetchPath, run } from "./lib/site.ts";

await run("Structured data", async () => {
  const paths = await discoverPaths();
  return Promise.all(
    paths.map(async (path) => {
      const page = snapshot((await fetchPath(path)).body);
      return { path, issues: validateJsonLd(page.jsonLd, keywordFor(path)?.pageType ?? "service") };
    }),
  );
});
