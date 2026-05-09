// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import jsPlugin from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';
import drizzle from 'eslint-plugin-drizzle';

const { configs: tseslintConfigs } = tsPlugin;

// ---- Ignore files/folders ----
const ignoresConfig = defineConfig([
  {
    name: 'project/ignores',
    ignores: ['.next/', 'node_modules/', 'public/', '.vscode/', 'next-env.d.ts']
  }
]);

// ---- JavaScript Config ----
const eslintConfig = defineConfig([
  {
    name: 'project/javascript',
    files: ['**/*.{js,mjs}'],
    languageOptions: {},
    extends: [jsPlugin.configs.recommended] // safe flat config extend
  }
]);

// ---- TypeScript Config ----
const typescriptConfig = defineConfig([
  // TypeScript files only
  {
    name: 'project/typescript',
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tsParser,

      parserOptions: {
        project: true
      }
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      drizzle
    },

    rules: {
      ...tseslintConfigs.recommended.rules,
      ...tseslintConfigs['recommended-type-checked'].rules,
      ...tseslintConfigs['stylistic-type-checked'].rules,

      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_'
        }
      ],

      '@typescript-eslint/require-await': 'off',

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false
          }
        }
      ],

      'drizzle/enforce-delete-with-where': [
        'error',
        {
          drizzleObjectName: ['db', 'ctx.db']
        }
      ],

      'drizzle/enforce-update-with-where': [
        'error',
        {
          drizzleObjectName: ['db', 'ctx.db']
        }
      ]
    }
  },

  // Plain JS/MJS files
  {
    name: 'project/node-files',

    files: ['**/*.{js,mjs}'],

    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly'
      }
    }
  }
]);

// ---- React + Next.js Config ----
const reactConfig = defineConfig([
  {
    name: 'project/react-next',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin
    },
    rules: {
      // merge all plugin rules manually
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      ...jsxA11yPlugin.configs.strict.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': 'off',
      'react/jsx-no-target-blank': 'off',
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
      'jsx-a11y/media-has-caption': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]);

// ---- Export combined config ----
export default defineConfig([
  ...ignoresConfig,
  ...eslintConfig,
  ...typescriptConfig,
  ...reactConfig
]);
