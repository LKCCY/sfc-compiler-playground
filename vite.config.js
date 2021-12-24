import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    eslintPlugin()
  ]
})
