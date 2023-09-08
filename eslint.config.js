import eslintConfig from '@maxxxxxdlp/eslint-config';
import eslintConfigReact from '@maxxxxxdlp/eslint-config-react';
import globals from 'globals';

const excludeJest = eslintConfig.filter(
  (object) =>
    !Object.keys(object.rules ?? {}).some((rule) => rule.startsWith('jest')),
);

export default [
  ...excludeJest,
  ...eslintConfigReact,
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: Object.fromEntries(
        Object.entries({
          ...globals.browser,
          ...globals.node,
        }).map(([key, value]) => [key.trim(), value]),
      ),
    },
  },
  {
    rules: {
      // This rule is crashing for me
      'unicorn/expiring-todo-comments': 'off',
    },
  },
];
