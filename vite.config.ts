import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        proposta1: resolve(import.meta.dirname, 'proposta-1/index.html'),
        proposta2: resolve(import.meta.dirname, 'proposta-2/index.html'),
        proposta3: resolve(import.meta.dirname, 'proposta-3/index.html'),
      },
    },
  },
})
