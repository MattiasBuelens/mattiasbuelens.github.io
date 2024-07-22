import js from '@eslint/js'
import globals from 'globals'
import eslintPluginSvelte from 'eslint-plugin-svelte'

export default [
  js.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    ignores: ['node_modules', '.svelte-kit', '.vercel', 'build', 'public']
  }
]
