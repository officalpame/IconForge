<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <button
      v-for="icon in icons"
      :key="icon.id"
      @click="$emit('selectIcon', icon)"
      class="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-200"
    >
      <!-- Icon Preview -->
      <svg
        v-if="getIconPath(icon)"
        viewBox="0 0 512 512"
        class="w-8 h-8 mx-auto mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        fill="currentColor"
      >
        <path :d="getIconPath(icon)" />
      </svg>
      
      <!-- Icon Info -->
      <div class="text-center">
        <p class="text-xs font-medium text-gray-900 dark:text-white line-clamp-1">{{ icon.label }}</p>
        <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{{ icon.name }}</p>
      </div>
    </button>

    <!-- Empty State -->
    <div v-if="icons.length === 0" class="col-span-full text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 text-sm">Keine Icons gefunden</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Icon } from '~/types/icon'

defineProps<{
  icons: Icon[]
}>()

defineEmits<{
  selectIcon: [icon: Icon]
}>()

const getIconPath = (icon: Icon): string => {
  return icon.styles.solid?.path || icon.styles.regular?.path || icon.styles.duotone?.path || ''
}
</script>
