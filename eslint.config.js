const { configs: jsConfigs } = require('@eslint/js')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')

module.exports = [
  jsConfigs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      node: true, // Specifies the Node.js environment
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'import/extensions': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignores: ['node_modules', 'dist'],
  },
]
