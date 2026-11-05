import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Authors } from "./collections/Authors.ts";
import { CaseStudies } from "./collections/CaseStudies.ts";
import { editor } from "./collections/editor.ts";
import { FAQs } from "./collections/FAQs.ts";
import { Industries } from "./collections/Industries.ts";
import { Media } from "./collections/Media.ts";
import { Posts } from "./collections/Posts.ts";
import { Redirects } from "./collections/Redirects.ts";
import { Services } from "./collections/Services.ts";
import { Users } from "./collections/Users.ts";
import { connectionString, getEnv, isMigrationRun } from "./lib/env.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const env = getEnv();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " | Nayab Gull CMS" },
  },
  collections: [Users, Media, Authors, FAQs, Posts, Services, Industries, CaseStudies, Redirects],
  editor,
  secret: env.PAYLOAD_SECRET,
  db: postgresAdapter({
    // Pooled URL for the app, direct URL for migrations (`pnpm db:migrate` sets PAYLOAD_DB_DIRECT=1).
    pool: { connectionString: connectionString(env, isMigrationRun(process.env)) },
    // Schema changes only ever go through migration files, never auto-push.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
