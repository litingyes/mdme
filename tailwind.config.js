import { addDynamicIconSelectors } from '@iconify/tailwind'
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{tsx,scss}',
    './node_modules/@nextui-org/theme/dist/components/(button|input|radio|tabs).js',
  ],
  theme: {
    extend: {
      listStyleType: {
        disc: 'disc',
        circle: 'circle',
        square: 'square',
        decimal: 'decimal',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui(),
    addDynamicIconSelectors(),
  ],
}
