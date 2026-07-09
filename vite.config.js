import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  build: {
    minify: false,
    target: 'es2020',
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vue') || id.includes('node_modules/vue-i18n')) return 'vue-vendor'
          if (id.includes('node_modules/ogl')) return 'ogl-vendor'
          if (id.includes('node_modules/gsap')) return 'gsap-vendor'
        },
      },
    },
  },
})
