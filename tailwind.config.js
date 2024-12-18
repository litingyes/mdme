import { addDynamicIconSelectors } from '@iconify/tailwind'
import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{tsx,scss}',
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
