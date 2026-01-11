import de from './locales/en.json'
import en from './locales/de.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'de',
  messages: {
    de,
    en
  }
}))
