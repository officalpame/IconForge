<template>
  <div :class="['min-h-screen flex flex-col justify-center items-center', dark ? 'dark bg-gray-900' : 'bg-white']" style="position:relative;">
    <button @click="toggleTheme" class="absolute top-6 right-6 p-2 rounded-lg transition-colors flex items-center justify-center z-10 bg-white dark:bg-gray-900 shadow">
      <img :src="dark ? '/pictures/light.png' : '/pictures/dark.png'" alt="Theme Toggle" class="h-full w-12 object-contain" />
    </button>
    <h1 class="mb-10 text-6xl font-bold tracking-tight">
      ICONFORGE
    </h1>

    <NuxtLink
      to="/database"
      class="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
    >
      Zur Datenbank
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const dark = ref(false)

onMounted(() => {
  dark.value = localStorage.getItem('darkMode') === 'true'
  document.documentElement.classList.toggle('dark', dark.value)
})

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
  localStorage.setItem('darkMode', String(dark.value))
}
</script>

<style scoped>
</style>
