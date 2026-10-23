import { setTimeout as sleep } from "node:timers/promises";

/** Waits up to 60 s for a URL to answer (any HTTP status). Exit 1 on timeout. Used by CI. */
const url = process.argv[2] ?? "http://localhost:3000";

for (let attempt = 0; attempt < 60; attempt++) {
  try {
    await fetch(url);
    process.exit(0);
  } catch {
    await sleep(1000);
  }
}
console.error(`${url} did not answer within 60 s.`);
process.exitCode = 1;
