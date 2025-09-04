import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/electronics-shop/' // ⚠️ مهم جدًا للنشر على GitHub Pages
})
