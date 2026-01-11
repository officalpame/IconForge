export default defineNuxtConfig({
  ssr: false,
  srcDir: 'app',
  modules: [
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
      { code: 'de', iso: 'de-DE', name: 'Deutsch' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],
    defaultLocale: 'de',
    strategy: 'prefix',
    langDir: 'locales/',
    vueI18n: './app/i18n.config.ts'
  },
  css: [
    '~/assets/css/main.css'
  ],
  colorMode: {
    preference: 'system',
    classSuffix: ''
  },
  devtools: { enabled: true }
})
