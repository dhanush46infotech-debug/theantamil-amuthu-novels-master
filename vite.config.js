import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  build: {
    cssMinify: 'esbuild',
    minify: 'esbuild'
  },
  esbuild: {
    logOverride: { 'css-syntax-error': 'silent' }
  }
})
