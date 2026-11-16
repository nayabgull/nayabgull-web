import { z } from "zod";

const postgresUrl = z
  .string()
  .regex(/^postgres(ql)?:\/\/\S+$/, "must be a postgres:// or postgresql:// connection string");

const envSchema = z.object({
  /** Pooled Neon connection string. Used by the running app. */
  DATABASE_URI: postgresUrl,
  /** Direct (non-pooled) Neon connection string. Used only by migrations. */
  DATABASE_URI_DIRECT: postgresUrl.optional(),
  /** Signs Payload sessions. Generate with `openssl rand -hex 32`. */
  PAYLOAD_SECRET: z.string().min(32, "must be at least 32 characters"),
  /**
   * Cloudflare Turnstile keys for the lead form. Both optional: with no secret the form skips the
   * Turnstile check (honeypot and Zod still run), so the build and local work need no keys.
   */
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
});

export type Env = z.infer<typeof envSchema>;
export type EnvSource = Readonly<Record<string, string | undefined>>;

/** CI uses obvious placeholders so the build runs without a database. They must never reach production. */
const PLACEHOLDER = /placeholder/i;

/**
 * Validates the environment. Throws one error that lists every bad key, so a deploy fails at boot
 * instead of on the first request.
 */
export function parseEnv(source: EnvSource): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const lines = result.error.issues.map(
      (issue) => `  - ${issue.path.join(".")}: ${issue.message}`,
    );
    throw new Error(`Invalid environment variables:\n${lines.join("\n")}`);
  }
  const env = result.data;
  if (source.VERCEL_ENV === "production") {
    const bad = (Object.keys(env) as (keyof Env)[]).filter((key) =>
      PLACEHOLDER.test(env[key] ?? ""),
    );
    if (bad.length > 0) {
      throw new Error(`Placeholder values are not allowed in production: ${bad.join(", ")}`);
    }
  }
  return env;
}

/** True when the process runs a migration (`pnpm db:migrate*` sets PAYLOAD_DB_DIRECT=1). */
export function isMigrationRun(source: EnvSource): boolean {
  return source.PAYLOAD_DB_DIRECT === "1";
}

/** The pooled URL for the app; the direct URL for migrations (poolers break DDL transactions). */
export function connectionString(env: Env, migrating: boolean): string {
  if (!migrating) return env.DATABASE_URI;
  if (!env.DATABASE_URI_DIRECT) {
    throw new Error("DATABASE_URI_DIRECT is required to run migrations.");
  }
  return env.DATABASE_URI_DIRECT;
}

let cached: Env | undefined;

/** Validated environment, parsed once per process. */
export function getEnv(): Env {
  cached ??= parseEnv(process.env);
  return cached;
}
