import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    formatters: true,
    react: true,
    ignores: ['src-tauri/', 'pnpm-lock.yaml'],
  },
  ...tailwind.configs['flat/recommended'],
)
