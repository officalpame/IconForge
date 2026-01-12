<template>
  <div class="flex flex-col min-h-screen bg-white text-gray-900">
    <!-- Header -->
    <AppHeader 
      v-model="search"
      :selected-style="styleFilter"
      @update:selected-style="styleFilter = $event as 'all' | 'solid' | 'regular' | 'duotone'"
    />

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="loading" class="text-center py-16">
        <p class="text-gray-600">Icons werden geladen...</p>
      </div>
      <div v-else-if="error" class="text-center py-16">
        <p class="text-red-600">{{ error }}</p>
      </div>
      <div v-else>
        <div class="mb-6">
          <p class="text-sm text-gray-600">{{ filteredIcons.length }} Icons gefunden</p>
        </div>
        
        <!-- Browser Component -->
        <IconBrowser 
          :icons="displayedIcons"
          @select-icon="openModal"
        />

        <!-- Load More Button -->
        <div v-if="hasMore" class="text-center mt-8">
          <button 
            @click="loadMore"
            class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition font-medium"
          >
            Mehr laden ({{ filteredIcons.length - displayedCount }} verbleibend)
          </button>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <IconDetailModal 
      :icon="selectedIcon"
      @close="closeModal"
    />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Icon } from '~/types/icon'

const search = ref('')
const styleFilter = ref<'all' | 'solid' | 'regular' | 'duotone'>('all')

const icons = ref<Icon[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const displayedCount = ref(48)
const batchSize = 48

const selectedIcon = ref<Icon | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/icons.json')
    if (!res.ok) throw new Error('Icons konnten nicht geladen werden')
    icons.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Fehler'
  } finally {
    loading.value = false
  }
})

watch([search, styleFilter], () => {
  displayedCount.value = batchSize
})

const filteredIcons = computed(() => {
  return icons.value.filter(icon => {
    const query = search.value.toLowerCase()
    const matchesSearch = query === '' || [
      icon.name,
      icon.label,
      ...icon.searchTerms
    ].some(term => term.toLowerCase().includes(query))

    const matchesStyle = styleFilter.value === 'all' || icon.styles[styleFilter.value]

    return matchesSearch && matchesStyle
  })
})

const displayedIcons = computed(() => {
  return filteredIcons.value.slice(0, displayedCount.value)
})

const hasMore = computed(() => displayedCount.value < filteredIcons.value.length)

const openModal = (icon: Icon) => {
  selectedIcon.value = icon
}

const closeModal = () => {
  selectedIcon.value = null
}

const loadMore = () => {
  displayedCount.value += batchSize
}
</script>
