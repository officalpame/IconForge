export default defineNuxtConfig({
  ssr: false,
  srcDir: 'app',
  compatibilityDate: '2026-01-11',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],
  ui: {
    colors: {
      primary: 'blue'
    }
  },
  i18n: {
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'de',
    strategy: 'prefix',
    langDir: 'locales/',
    vueI18n: './i18n.config.ts'
  },
  css: [
    './app/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  colorMode: {
    preference: 'system',
    classSuffix: ''
  },
  devtools: { enabled: true }
})
