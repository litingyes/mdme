import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  react: true,
  ignores: ['src-tauri/', 'pnpm-lock.yaml'],
})
