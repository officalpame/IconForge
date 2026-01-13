<template>
  <div :class="['min-h-screen flex flex-col', dark ? 'dark bg-gray-900' : 'bg-white']">

  <!-- ================= HEADER ICONFORGE DATABASE ================= -->
    <header class="sticky top-0 z-40 border-b shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

        <div class="shrink-0">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">ICONFORGE</h1>
          <p class="text-xs text-gray-500 dark:text-gray-400">Deine Icon Sammlung</p>
        </div>

        <div class="relative flex-1">
          <input
            v-model="query"
            type="text"
            placeholder="Icons durchsuchen…"
            class="w-full rounded-lg border px-4 py-2 pl-10 text-sm bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-1 focus:ring-blue-500"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        <div class="flex items-center gap-2">
          <select v-model="styleFilter" class="rounded-lg border px-2 py-2 text-sm dark:bg-gray-800 dark:text-white">
            <option value="all">Alle</option>
            <option value="solid">Solid</option>
            <option value="regular">Regular</option>
            <option value="duotone">Duotone</option>
          </select>

          <button @click="toggleTheme" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center">
            <img 
              :src="dark ? '/pictures/light.png' : '/pictures/dark.png'" 
              alt="Theme Toggle" 
              class="h-12 w-12 object-contain"
            />
          </button>
        </div>

      </div>
    </header>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dark = ref(false)
const query = ref('')
const styleFilter = ref('all')

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', !dark.value)
  localStorage.setItem('darkMode', String(!dark.value))
}
</script>