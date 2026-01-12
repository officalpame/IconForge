<template>
  <div class="space-y-6">
    <!-- Suchfeld -->
    <div class="relative">
      <input
        v-model="localSearch"
        type="text"
        :placeholder="$t('search.placeholder')"
        class="w-full px-4 py-3 pl-12 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
        @input="$emit('update:searchQuery', localSearch)"
      />
      <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <!-- Style Filter -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="style in styles"
        :key="style"
        @click="$emit('update:selectedStyle', style)"
        :class="[
          'px-4 py-2 rounded-lg font-medium text-sm transition-all',
          selectedStyle === style
            ? 'bg-primary-500 text-white shadow-lg'
            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
        ]"
      >
        {{ $t(`filter.${style}`) }}
      </button>
    </div>

    <!-- Ergebnis-Zähler -->
    <div v-if="icons.length > 0" class="text-sm text-gray-600 dark:text-gray-400">
      {{ $t('search.resultsCount', icons.length, { count: icons.length }) }}
    </div>

    <!-- Icon Grid -->
    <div 
      v-if="icons.length > 0"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fade-in"
    >
      <button
        v-for="icon in icons"
        :key="icon.id"
        @click="$emit('selectIcon', icon)"
        class="group p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <!-- Icon Preview -->
        <div class="flex items-center justify-center h-16 mb-2">
          <svg
            v-if="getIconPath(icon)"
            viewBox="0 0 512 512"
            class="w-10 h-10 text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors"
            fill="currentColor"
          >
            <path :d="getIconPath(icon)" />
          </svg>
        </div>
        <!-- Icon Name -->
        <p class="text-xs font-medium text-gray-900 dark:text-white truncate">
          {{ icon.name }}
        </p>
        <!-- Icon Label -->
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
          {{ icon.label }}
        </p>
      </button>
    </div>

    <!-- Keine Ergebnisse -->
    <div v-else class="flex flex-col items-center justify-center py-16">
      <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        {{ $t('search.noResults') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Icon, IconStyleType } from '~/types/icon'

// Props
interface Props {
  icons: Icon[]
  searchQuery: string
  selectedStyle: IconStyleType | 'all'
}

const props = withDefaults(defineProps<Props>(), {
  icons: () => [],
  searchQuery: '',
  selectedStyle: 'all'
})

// Emits
defineEmits<{
  selectIcon: [icon: Icon]
  'update:searchQuery': [query: string]
  'update:selectedStyle': [style: IconStyleType | 'all']
}>()

// Lokale Kopie des Suchbegriffs
const localSearch = ref(props.searchQuery)

// Verfügbare Stile
const styles = ['all', 'solid', 'regular', 'duotone'] as const

/**
 * Gibt den SVG-Pfad für ein Icon zurück
 * Je nach ausgewähltem Stil wird der entsprechende Pfad zurückgegeben
 */
const getIconPath = (icon: Icon): string | undefined => {
  if (props.selectedStyle === 'all') {
    // Ersten verfügbaren Stil verwenden
    return icon.styles.solid?.path || icon.styles.regular?.path || icon.styles.duotone?.path
  }
  return icon.styles[props.selectedStyle]?.path
}
</script>
