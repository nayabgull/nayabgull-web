import { afterEach, describe, expect, it, vi } from "vitest";

import { connectionString, getEnv, isMigrationRun, parseEnv } from "@/lib/env.ts";

const GOOD = {
  DATABASE_URI: "postgres://user:pass@host-pooler.neon.tech/db",
  DATABASE_URI_DIRECT: "postgresql://user:pass@host.neon.tech/db",
  PAYLOAD_SECRET: "x".repeat(32),
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("parseEnv", () => {
  it("accepts a complete environment", () => {
    expect(parseEnv(GOOD)).toEqual(GOOD);
  });

  it("makes the direct URL optional", () => {
    const { DATABASE_URI_DIRECT: _unused, ...rest } = GOOD;
    expect(parseEnv(rest).DATABASE_URI_DIRECT).toBeUndefined();
  });

  it("lists every missing or malformed key in one error", () => {
    expect(() => parseEnv({ DATABASE_URI: "mysql://x", PAYLOAD_SECRET: "short" })).toThrow(
      /DATABASE_URI: must be a postgres[\s\S]*PAYLOAD_SECRET: must be at least 32/,
    );
    expect(() => parseEnv({})).toThrow(/Invalid environment variables/);
  });

  it("rejects placeholder values on Vercel production only", () => {
    const placeholder = { ...GOOD, PAYLOAD_SECRET: "ci-placeholder-".padEnd(40, "0") };
    expect(() => parseEnv({ ...placeholder, VERCEL_ENV: "production" })).toThrow(
      /Placeholder values are not allowed in production: PAYLOAD_SECRET/,
    );
    expect(() => parseEnv({ ...placeholder, VERCEL_ENV: "preview" })).not.toThrow();
    expect(() => parseEnv(placeholder)).not.toThrow();
  });
});

describe("migration connection", () => {
  it("detects a migration run", () => {
    expect(isMigrationRun({ PAYLOAD_DB_DIRECT: "1" })).toBe(true);
    expect(isMigrationRun({})).toBe(false);
  });

  it("uses the pooled URL for the app and the direct URL for migrations", () => {
    const env = parseEnv(GOOD);
    expect(connectionString(env, false)).toBe(GOOD.DATABASE_URI);
    expect(connectionString(env, true)).toBe(GOOD.DATABASE_URI_DIRECT);
  });

  it("refuses to migrate without the direct URL", () => {
    const { DATABASE_URI_DIRECT: _unused, ...rest } = GOOD;
    expect(() => connectionString(parseEnv(rest), true)).toThrow(/DATABASE_URI_DIRECT is required/);
  });
});

describe("getEnv", () => {
  it("parses process.env once and caches it", async () => {
    vi.resetModules();
    for (const [key, value] of Object.entries(GOOD)) vi.stubEnv(key, value);
    const { getEnv: fresh } = await import("@/lib/env.ts");
    const first = fresh();
    vi.stubEnv("PAYLOAD_SECRET", "changed");
    expect(fresh()).toBe(first);
  });

  it("throws at first use when the environment is bad", async () => {
    vi.resetModules();
    vi.stubEnv("DATABASE_URI", "");
    const { getEnv: fresh } = await import("@/lib/env.ts");
    expect(() => fresh()).toThrow(/Invalid environment variables/);
    expect(typeof getEnv).toBe("function");
  });
});
