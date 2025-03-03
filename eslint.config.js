import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                route: 'readonly',
                Laravel: 'readonly',
            },
        },
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        // See more details at: https://typescript-eslint.io/packages/parser/
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte', '.svelte.ts', '.svelte.js'], // Add support for additional file extensions, such as .svelte
                parser: ts.parser,
                // Specify a parser for each language, if needed:
                // parser: {
                //   ts: ts.parser,
                //   js: espree,    // Use espree for .js files (add: import espree from 'espree')
                //   typescript: ts.parser
                // },

                // We recommend importing and specifying svelte.config.js.
                // By doing so, some rules in eslint-plugin-svelte will automatically read the configuration and adjust their behavior accordingly.
                // While certain Svelte settings may be statically loaded from svelte.config.js even if you don’t specify it,
                // explicitly specifying it ensures better compatibility and functionality.
                // svelteConfig,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'svelte/infinite-reactive-loop': 'error',
            'svelte/no-at-html-tags': 'error',
            'svelte/no-target-blank': 'error',
        },
    },
    {
        ignores: ['vendor', 'node_modules', 'public', 'bootstrap/ssr', 'tailwind.config.js', 'resources/js/components/ui/*'],
    },
    prettier,
);
