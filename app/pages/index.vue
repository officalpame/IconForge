<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
    <AppHeader />

  
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 gap-8">
      
        <IconBrowser
          :icons="icons"
          :filteredIcons="filteredIcons"
          @selectIcon="handleSelectIcon"
          @updateSearch="handleUpdateSearch"
          @updateStyle="handleUpdateStyle"
        />
      </div>
    </main>


    <IconDetailModal
      v-model="showModal"
      :icon="selectedIcon"
    />


    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import IconBrowser from '~/components/IconBrowser.vue'
import IconDetailModal from '~/components/IconDetailModal.vue'
import { useIcons } from '~/composables/useIcons'

interface Icon {
  id: number
  name: string
  label: string
  unicode: string
  searchTerms: string[]
  styles: Record<string, { path: string }>
}

// Nutze Composables
const {
  icons,
  filteredIcons,
  searchQuery,
  selectedStyle,
  filterIcons
} = useIcons()

// Local State
const selectedIcon = ref<Icon | null>(null)
const showModal = ref(false)

// Aktualisiere Suchabfrage
const handleUpdateSearch = (query: string) => {
  searchQuery.value = query
  filterIcons()
}

// Aktualisiere Stil
const handleUpdateStyle = (style: string) => {
  selectedStyle.value = style as any
  filterIcons()
}

// Wähle Icon aus
const handleSelectIcon = (icon: Icon) => {
  selectedIcon.value = icon
  showModal.value = true
}

</script>

<style scoped>
</style>
