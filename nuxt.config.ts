// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // SPA-Modus für optimale Client-Side Performance
  ssr: false,
  
  compatibilityDate: '2024-04-03',

  // Nuxt Modules
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode'
  ],

  // TypeScript Konfiguration
  typescript: {
    strict: true,
    typeCheck: false
  },

  // Internationalisierung (i18n) - Mandatory
  i18n: {
    locales: [
      { code: 'de', file: 'de.json', name: 'Deutsch' },
      { code: 'en', file: 'en.json', name: 'English' }
    ],
    lazy: true,
    langDir: './locales',
    defaultLocale: 'de'
  },

  // Color Mode (Dark Mode Support)
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  // Tailwind CSS
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },

  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // Globale CSS
  css: ['~/assets/css/main.css'],

  // App Meta
  app: {
    head: {
      title: 'IconForge',
      htmlAttrs: {
        lang: 'de'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Font Awesome Icon Viewer & PNG Exporter' }
      ]
    }
  },

  // Dev Tools
  devtools: { enabled: true }
})
