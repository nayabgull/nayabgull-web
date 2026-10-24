import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "feat",
        "fix",
        "content",
        "chore",
        "docs",
        "test",
        "perf",
        "refactor",
        "ci",
        "build",
        "revert",
      ],
    ],
  },
};

export default config;
