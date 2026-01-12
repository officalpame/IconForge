export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2026-01-12',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  devtools: { enabled: false },
  app: {
    head: {
      title: 'IconForge',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
