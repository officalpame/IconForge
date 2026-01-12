<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <NuxtPage :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const darkMode = ref(true)

onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  if (saved !== null) {
    darkMode.value = JSON.parse(saved)
  }
  applyDarkMode()
})

watch(darkMode, (newVal) => {
  localStorage.setItem('darkMode', JSON.stringify(newVal))
  applyDarkMode()
})

function applyDarkMode() {
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function toggleDarkMode() {
  darkMode.value = !darkMode.value
}
</script>