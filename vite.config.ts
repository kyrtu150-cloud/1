import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
// База для GitHub Pages задаётся через VITE_BASE (напр. "/1/").
// Локально остаётся "/", поэтому dev/preview работают без изменений.
export default defineConfig({
  // База задаётся через VITE_BASE (на GitHub Pages — "/1/"), локально — "/".
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
})
