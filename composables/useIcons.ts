import { ref, computed } from 'vue'
import type { Icon, IconStyleType } from '~/types/icon'

// Icon Management
export function useIcons() {
  const icons = ref<Icon[]>([])
  const searchQuery = ref('')
  const selectedStyle = ref<IconStyleType | 'all'>('all')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Filter Logic
  const filteredIcons = computed(() => {
    let result = icons.value

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(icon => 
        icon.name.toLowerCase().includes(query) ||
        icon.label.toLowerCase().includes(query) ||
        icon.searchTerms.some(term => term.toLowerCase().includes(query))
      )
    }

    if (selectedStyle.value !== 'all') {
      result = result.filter(icon => 
        icon.styles[selectedStyle.value as IconStyleType] !== undefined
      )
    }

    return result
  })

  // Load Icons
  const loadIcons = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/icons.json')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      icons.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Load failed'
      console.error('Icon load error:', e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    icons,
    searchQuery,
    selectedStyle,
    isLoading,
    error,
    filteredIcons,
    loadIcons
  }
}
