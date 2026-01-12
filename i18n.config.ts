import { defineI18nConfig } from '@nuxtjs/i18n/dist/runtime/composables'
import de from './locales/de.json'
import en from './locales/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'de',
  messages: {
    de,
    en
  }
}))
