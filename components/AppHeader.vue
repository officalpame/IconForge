<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">IF</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              IconForge
            </h1>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Icons durchsuchen & exportieren
            </p>
          </div>
        </div>

        <!-- Suchfeld -->
        <div class="flex-1 mx-8 relative">
          <input
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            placeholder="Icons durchsuchen..."
            class="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white dark:bg-gray-800 dark:text-white"
          />
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Style Filter & Dark Mode Toggle -->
        <div class="flex gap-2">
          <select 
            :value="selectedStyle"
            @change="$emit('update:selectedStyle', ($event.target as HTMLSelectElement).value)"
            class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="all">Alle Stile</option>
            <option value="solid">Solid</option>
            <option value="regular">Regular</option>
            <option value="duotone">Duotone</option>
          </select>
          
          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode"
            class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100"
            :title="isDark ? 'Light Mode' : 'Dark Mode'"
          >
            <!-- Sun Icon (Light Mode) -->
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon Icon (Dark Mode) -->
            <svg v-else class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  modelValue: string
  selectedStyle: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'update:selectedStyle': [value: string]
}>()

const isDark = ref(true)

onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  isDark.value = saved !== null ? JSON.parse(saved) : true
})

function toggleDarkMode() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', JSON.stringify(true))
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', JSON.stringify(false))
  }
}
</script>
