#!/usr/bin/env bash
# SessionStart hook for Claude Code cloud sessions (see .claude/settings.json and docs/cloud-sessions.md).
# Installs Node 24 + pnpm + dependencies and writes build-only placeholder env vars so `pnpm build`
# and `pnpm verify` work with zero manual setup. Never blocks a session: it always exits 0.
# Local machines are untouched: it does nothing unless CLAUDE_CODE_REMOTE is "true".

set -uo pipefail

[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0

NODE_DIR=/opt/node24
NODE_DIST=https://nodejs.org/dist/latest-v24.x

log() { echo "[cloud-session-setup] $*" >&2; }
warn() { echo "[cloud-session-setup] WARNING: $*" >&2; }

# True when version $1 >= version $2 (both "x.y.z", no "v").
version_gte() { [ "$(printf '%s\n%s\n' "$2" "$1" | sort -V | head -n1)" = "$2" ]; }

node_version() { "$1" -v 2>/dev/null | sed 's/^v//'; }

# Reads a field from package.json with whatever node is available.
pkg_field() { node -p "require('./package.json').$1" 2>/dev/null; }

install_node24() {
  local tarball tmp
  tarball=$(curl -fsSL "$NODE_DIST/SHASUMS256.txt" | grep -oE 'node-v[0-9.]+-linux-x64\.tar\.xz' | head -n1) ||
    return 1
  [ -n "$tarball" ] || return 1
  tmp=$(mktemp -d)
  log "Downloading $tarball"
  curl -fsSL "$NODE_DIST/$tarball" -o "$tmp/$tarball" || { rm -rf "$tmp"; return 1; }
  # Verify the tarball against the official checksum list before extracting it.
  (cd "$tmp" && curl -fsSL "$NODE_DIST/SHASUMS256.txt" | grep " $tarball\$" | sha256sum -c --quiet -) ||
    { rm -rf "$tmp"; return 1; }
  rm -rf "$NODE_DIR" && mkdir -p "$NODE_DIR" &&
    tar -xJf "$tmp/$tarball" -C "$NODE_DIR" --strip-components=1
  local status=$?
  rm -rf "$tmp"
  return $status
}

ensure_node() {
  local required current
  required=$(pkg_field engines.node | sed -E 's/^[^0-9]*//')
  [ -n "$required" ] || { warn "could not read engines.node from package.json"; return 1; }
  current=$(node_version node)
  if [ -n "$current" ] && version_gte "$current" "$required"; then
    log "Node v$current satisfies >=$required"
    return 0
  fi
  local existing
  existing=$(node_version "$NODE_DIR/bin/node")
  if [ -n "$existing" ] && version_gte "$existing" "$required"; then
    log "Using existing $NODE_DIR (v$existing)"
  else
    install_node24 || { warn "Node 24 download failed"; return 1; }
  fi
  export PATH="$NODE_DIR/bin:$PATH"
  USE_NODE_DIR=1
  log "Node $(node -v) from $NODE_DIR/bin"
}

ensure_pnpm() {
  local pm
  pm=$(pkg_field packageManager)
  case "$pm" in pnpm@*) ;; *) warn "packageManager is not pnpm@x ('$pm')"; return 1 ;; esac
  # Corepack shims go next to the active node binary.
  corepack enable --install-directory "$(dirname "$(command -v node)")" pnpm &&
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack prepare "$pm" --activate >/dev/null || return 1
  log "pnpm $(COREPACK_ENABLE_DOWNLOAD_PROMPT=0 pnpm -v)"
}

install_deps() {
  local stamp=node_modules/.cloud-session-setup.sha256 hash
  hash=$(cat package.json pnpm-lock.yaml scripts/cloud-session-setup.sh | sha256sum | cut -d' ' -f1)
  if [ -f "$stamp" ] && [ "$(cat "$stamp")" = "$hash" ]; then
    log "Dependencies unchanged, skipping pnpm install"
    return 0
  fi
  log "Running pnpm install --frozen-lockfile"
  CI=true COREPACK_ENABLE_DOWNLOAD_PROMPT=0 pnpm install --frozen-lockfile >&2 || return 1
  echo "$hash" >"$stamp"
}

# Build-only placeholders. Not secrets: lib/env.ts rejects "placeholder" values on Vercel production,
# and the Turnstile keys are Cloudflare's public test keys.
write_env() {
  if [ -z "${CLAUDE_ENV_FILE:-}" ]; then
    warn "CLAUDE_ENV_FILE is not set; PATH and placeholders were not persisted"
    return 0
  fi
  {
    [ "${USE_NODE_DIR:-0}" = 1 ] && echo "export PATH=\"$NODE_DIR/bin:\$PATH\""
    echo "export COREPACK_ENABLE_DOWNLOAD_PROMPT=0"
    local entry key
    for entry in \
      "SITE_MODE=live" \
      "NEXT_TELEMETRY_DISABLED=1" \
      "DATABASE_URI=postgres://placeholder:placeholder@localhost:5432/placeholder" \
      "DATABASE_URI_DIRECT=postgres://placeholder:placeholder@localhost:5432/placeholder" \
      "PAYLOAD_SECRET=placeholder-build-only-not-a-secret-000000" \
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA" \
      "TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA"; do
      key=${entry%%=*}
      # Keep anything already set (for example a real value in the environment settings).
      [ -n "${!key:-}" ] || echo "export $entry"
    done
  } >>"$CLAUDE_ENV_FILE"
  log "Wrote PATH and placeholder env vars (names only): $CLAUDE_ENV_FILE"
}

main() {
  cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/..}" || return 1
  ensure_node || warn "Node 24 is not available; using $(node -v 2>/dev/null || echo 'no node')"
  ensure_pnpm || warn "pnpm setup via corepack failed"
  install_deps || warn "pnpm install failed; run it by hand to see why"
  write_env || warn "could not write $CLAUDE_ENV_FILE"
}

main || warn "setup did not finish"
exit 0
