<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
    <AppHeader />

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-20">
        <svg class="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-600 dark:text-red-400 text-lg font-medium">{{ error }}</p>
      </div>

      <!-- Icon Browser -->
      <IconBrowser
        v-else
        :icons="filteredIcons"
        v-model:search-query="searchQuery"
        v-model:selected-style="selectedStyle"
        @select-icon="handleSelectIcon"
      />
    </main>

    <!-- Icon Detail Modal -->
    <IconDetailModal
      v-model="showModal"
      :icon="selectedIcon"
    />

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { Icon } from '~/types/icon'

const { filteredIcons, searchQuery, selectedStyle, isLoading, error, loadIcons } = useIcons()

const showModal = ref(false)
const selectedIcon = ref<Icon | null>(null)

const handleSelectIcon = (icon: Icon) => {
  selectedIcon.value = icon
  showModal.value = true
}

onMounted(() => loadIcons())
</script>
