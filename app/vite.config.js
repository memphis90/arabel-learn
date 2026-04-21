import { defineConfig } from 'vite'
import vue  from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name:        'Arabel Learn',
        short_name:  'Learn',
        description: 'Impara a programmare, un livello alla volta',
        theme_color: '#6366f1',
        background_color: '#05050f',
        display:     'standalone',
        start_url:   '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],

  root: path.resolve(__dirname),

  build: {
    outDir: path.resolve(__dirname, '../dist/app'),
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5174,
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
})
