// i18n-Konfiguration für Nuxt
// Unterstützt Deutsch und Englisch

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'de',
  messages: {
    de: {
      app: {
        title: 'IconForge',
        subtitle: 'Icons durchsuchen & exportieren'
      },
      search: {
        placeholder: 'Icons durchsuchen...',
        noResults: 'Keine Icons gefunden'
      },
      filter: {
        allStyles: 'Alle Stile',
        solid: 'Solid',
        regular: 'Regular',
        duotone: 'Duotone'
      },
      modal: {
        primaryColor: 'Primärfarbe',
        secondaryColor: 'Sekundärfarbe',
        color: 'Farbe',
        size: 'Größe',
        unicode: 'Unicode',
        styles: 'Verfügbare Stile',
        downloadPng: 'PNG herunterladen',
        copySvg: 'SVG kopieren',
        svgCopied: 'SVG in Zwischenablage kopiert!'
      },
      loading: 'Icons werden geladen...',
      error: 'Fehler beim Laden der Icons'
    },
    en: {
      app: {
        title: 'IconForge',
        subtitle: 'Browse & export icons'
      },
      search: {
        placeholder: 'Search icons...',
        noResults: 'No icons found'
      },
      filter: {
        allStyles: 'All styles',
        solid: 'Solid',
        regular: 'Regular',
        duotone: 'Duotone'
      },
      modal: {
        primaryColor: 'Primary Color',
        secondaryColor: 'Secondary Color',
        color: 'Color',
        size: 'Size',
        unicode: 'Unicode',
        styles: 'Available Styles',
        downloadPng: 'Download PNG',
        copySvg: 'Copy SVG',
        svgCopied: 'SVG copied to clipboard!'
      },
      loading: 'Loading icons...',
      error: 'Error loading icons'
    }
  }
}))
