/** @type {import("lint-staged").Configuration} */
const config = {
  "*.{ts,tsx,mts}": [
    "eslint --max-warnings=0 --fix",
    "prettier --write",
    // tsc cannot check single files against the project config, so type-check the whole project once.
    () => "tsc --noEmit",
  ],
  "*.{js,mjs,cjs}": ["eslint --max-warnings=0 --fix", "prettier --write"],
  "*.{json,md,css,yml,yaml}": ["prettier --write"],
};

export default config;
