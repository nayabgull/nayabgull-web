# Cloud sessions (Claude Code on the web)

Every Claude Code cloud session for this repo sets itself up. Nothing to configure by hand.

## Start a session

1. On claude.ai/code, pick the `nayabgull/nayabgull-web` repository.
2. Pick the **Default** environment (Trusted network). No setup script, no environment variables.

That is all. Any claude.ai account with access to the repo works the same way.

## What happens at session start

`.claude/settings.json` runs `scripts/cloud-session-setup.sh` as a SessionStart hook (on startup and resume). The script:

- does nothing unless `CLAUDE_CODE_REMOTE=true`, so it never runs on a local machine;
- uses Node 24 from `/opt/node24`, or downloads the latest Node 24 (checksum verified) when the
  container's Node is below `engines.node`;
- activates the pnpm version from `packageManager` with corepack;
- runs `pnpm install --frozen-lockfile`, skipped when `package.json`, `pnpm-lock.yaml` and the
  script are unchanged;
- installs a pinned gitleaks release (SHA-256 checked) for the `secrets` stage of `pnpm verify`,
  skipped when gitleaks is already installed. Semgrep (`sast`) stays CI-only: the Default
  environment blocks `semgrep.dev`, where its rules come from;
- writes `PATH` and build-only placeholder variables (`DATABASE_URI`, `PAYLOAD_SECRET`, Cloudflare's
  public Turnstile test keys and a few flags) for the session, only when they are not already set,
  so `pnpm build` and `pnpm verify` work without a database.

The script always exits 0. If a step fails it prints a `WARNING` line and the session still starts.

## Secrets

Real secrets never go in the repo or in the environment's variables. The placeholders contain the
word `placeholder` and `lib/env.ts` rejects them on Vercel production. Real values live only in
`.env.local` (git-ignored) and in Vercel.
