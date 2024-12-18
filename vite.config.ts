import type { BuildOptions } from 'vite'
import { resolve } from 'node:path'
import process from 'node:process'
import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

const host = process.env.TAURI_DEV_HOST

export default defineConfig(async () => ({
  plugins: [
    reactRouter(),
  ],
  clearScreen: false,
  server: {
    port: 7000,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 7001,
        }
      : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  build: {
    target: process.env.TAURI_ENV_PLATFORM === 'windows'
      ? 'chrome105'
      : 'safari13',
    minify: (!process.env.TAURI_ENV_DEBUG ? 'esbuild' : false) as BuildOptions['minify'],
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}))
