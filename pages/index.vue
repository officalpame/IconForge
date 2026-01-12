<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-white mb-4">
        Hello World! 👋
      </h1>
      <p class="text-2xl text-white/90 mb-8">
        Nuxt + Tailwind funktioniert!
      </p>
      <button 
        @click="count++"
        class="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-xl hover:bg-purple-100 transition-all transform hover:scale-105"
      >
        Klicks: {{ count }}
      </button>
      <div class="mt-8">
        <button
          @click="toggleDark"
          class="bg-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-all"
        >
          Toggle Dark Mode
        </button>
        <p class="text-white/80 mt-2">Mode: {{ colorMode.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const count = ref(0)
const colorMode = useColorMode()

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
