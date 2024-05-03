/**
 * Most packages haven't fully migrated to the new
 * FlatConfig system yet (eslint >=v9); typing plugins
 * manually is a temporary albeit necessary workaround
 */

declare module "@eslint/js" {
  import type { Linter } from "eslint";

  export const configs: {
    readonly recommended: { readonly rules: Readonly<Linter.RulesRecord> };
    readonly all: { readonly rules: Readonly<Linter.RulesRecord> };
  };
}

declare module "eslint-plugin-import" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-plugin-react" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    all: { rules: Linter.RulesRecord };
    "jsx-runtime": { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-plugin-react-hooks" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: {
      rules: {
        "rules-of-hooks": Linter.RuleEntry;
        "exhaustive-deps": Linter.RuleEntry;
      };
    };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-plugin-storybook" {
  import type {Linter, Rule} from "eslint";

  export const configs: {
    csf: {
      rules: Linter.RulesRecord;
    };
    "csf-strict": {
      rules: Linter.RulesRecord;
    };
    recommended: {
      rules: Linter.RulesRecord;
    };
    "addon-interactions": {
      rules: Linter.RulesRecord;
    };
  };
  export const rules: Record<string, Rule.RuleModule>
}

declare module "@next/eslint-plugin-next" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    "core-web-vitals": { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}
