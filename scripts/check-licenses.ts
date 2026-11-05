import { execFileSync } from "node:child_process";

/** Permissive licences, MPL-2.0 (file-level copyleft, used by axe-core and lightningcss) and WTFPL (truncate-utf8-bytes, via Payload). */
const ALLOWED = [
  "MIT",
  "MIT-0",
  "ISC",
  "Apache-2.0",
  "BSD",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "0BSD",
  "BlueOak-1.0.0",
  "CC0-1.0",
  "CC-BY-3.0",
  "CC-BY-4.0",
  "Python-2.0",
  "Unlicense",
  "MPL-2.0",
  "WTFPL",
];

try {
  execFileSync(
    "license-checker-rseidelsohn",
    ["--excludePrivatePackages", "--onlyAllow", ALLOWED.join(";"), "--summary"],
    { stdio: "inherit" },
  );
  console.log("Licence check passed.");
} catch {
  console.error("Licence check failed: a dependency uses a licence outside the allow-list above.");
  process.exitCode = 1;
}
