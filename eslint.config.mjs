import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import { dirname } from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

export default tseslint.config(
	/** 1) Ignore build artifacts */
	{ ignores: ['dist', '.next'] },

	/** 2) Base + Next presets + Prettier */
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			...compat.extends('next/core-web-vitals', 'next/typescript'),
			eslintPluginPrettierRecommended
		],

		/** 3) Files to lint‑ear */
		files: ['**/*.{mjs,js,jsx,ts,tsx}'],

		/** 4) Environment */
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},

		/** 5) Extra plugins */
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports
		},

		/** 6) Rules */
		rules: {
			/* Basic best practices */
			eqeqeq: ['warn', 'always'],
			// 'no-console': 'warn',

			/* TypeScript */
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: true,
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			],

			/* Imports order */
			'simple-import-sort/exports': 'warn',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^next', '^@?\\w'],
						['^@'],
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						['^.+\\.s?css$']
					]
				}
			],

			/* Clean unused imports */
			'unused-imports/no-unused-imports': 'warn'
		}
	}
)
