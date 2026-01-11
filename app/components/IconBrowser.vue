<template>
  <div class="w-full">
    <!-- Suchbereich -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('search.placeholder')"
        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />
    </div>

    <!-- Filter -->
    <div class="mb-6 flex gap-2 flex-wrap">
      <button
        v-for="style in ['solid', 'regular', 'duotone']"
        :key="style"
        @click="selectedStyle = style as any"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-200',
          selectedStyle === style
            ? 'bg-blue-500 text-white shadow-lg'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
        ]"
      >
        {{ $t(`filter.${style}`) }}
      </button>
    </div>

    <!-- Icon Grid -->
    <div v-if="filteredIcons.length > 0" class="icon-grid animate-fade-in">
      <div
        v-for="icon in filteredIcons"
        :key="icon.id"
        @click="selectIcon(icon)"
        class="icon-item"
      >
        <div class="flex items-center justify-center h-16 mb-2">
          <svg
            v-if="icon.styles[selectedStyle as keyof typeof icon.styles]"
            viewBox="0 0 512 512"
            class="w-8 h-8 text-gray-700 dark:text-gray-300"
            fill="currentColor"
          >
            <path
              :d="icon.styles[selectedStyle as keyof typeof icon.styles]?.path"
            />
          </svg>
        </div>
        <p class="text-xs text-center text-gray-700 dark:text-gray-300 font-medium truncate">
          {{ icon.name }}
        </p>
      </div>
    </div>

    <!-- Keine Ergebnisse -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">
        {{ $t('search.noResults') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Icon {
  id: number
  name: string
  label: string
  unicode: string
  searchTerms: string[]
  styles: Record<string, { path: string }>
}

const props = defineProps<{
  icons: Icon[]
  filteredIcons: Icon[]
}>()

const emit = defineEmits<{
  selectIcon: [icon: Icon]
  updateSearch: [query: string]
  updateStyle: [style: string]
}>()

const searchQuery = ref('')
const selectedStyle = ref('solid')

watch(searchQuery, (newVal) => {
  emit('updateSearch', newVal)
})

watch(selectedStyle, (newVal) => {
  emit('updateStyle', newVal)
})

const selectIcon = (icon: Icon) => {
  emit('selectIcon', icon)
}
</script>

<style scoped>
/* Icon Browser Styling */
</style>
