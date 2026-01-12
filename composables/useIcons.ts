import { ref } from 'vue'

// Schnittstelle für Icon-Objekt
interface IconStyle {
  path: string
}

export interface Icon {
  id: number
  name: string
  label: string
  unicode: string
  searchTerms: string[]
  styles: {
    solid?: IconStyle
    regular?: IconStyle
    duotone?: IconStyle
  }
}

// Composable für Icon-Verwaltung
export const useIcons = () => {
  const icons = ref<Icon[]>([])
  const filteredIcons = ref<Icon[]>([])
  const searchQuery = ref('')
  const selectedStyle = ref<'solid' | 'regular' | 'duotone'>('solid')

  // Lade Icons aus JSON
  const loadIcons = async () => {
    try {
      const response = await fetch('/icons.json')
      icons.value = await response.json()
      filterIcons()
    } catch (error) {
      console.error('Fehler beim Laden der Icons:', error)
    }
  }

  // Filtere Icons basierend auf Suche und Stil
  const filterIcons = () => {
    filteredIcons.value = icons.value.filter(icon => {
      const matchesSearch = searchQuery.value === '' || 
        icon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        icon.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        icon.searchTerms.some(term => 
          term.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      
      return matchesSearch
    })
  }

  return {
    icons,
    filteredIcons,
    searchQuery,
    selectedStyle,
    loadIcons,
    filterIcons
  }
}
