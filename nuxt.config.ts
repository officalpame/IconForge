export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2026-01-12',
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    config: {
      darkMode: 'class'
    }
  },
  css: ['~/assets/css/main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    server: {
      hmr: {
        clientPort: 3000,
        protocol: 'wss'
      }
    }
  },
  app: {
    head: {
      title: 'IconForge',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Browse, customize and export Font Awesome icons as PNG' }
      ]
    }
  }
})
