<template>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            IF
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ $t('title') }}
          </h1>
        </div>

        <!-- Controls -->
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <div class="flex space-x-2">
            <button
              v-for="locale in ['de', 'en']"
              :key="locale"
              @click="$i18n.locale = locale"
              :class="[
                'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200',
                $i18n.locale === locale
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
            >
              {{ locale.toUpperCase() }}
            </button>
          </div>

          <!-- Dark Mode Toggle -->
          <button
            @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :title="$t('icon.color')"
          >
            <svg
              v-if="$colorMode.preference === 'light'"
              class="w-5 h-5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zM13 11a1 1 0 110 2h-2a1 1 0 110-2h2zm-6 0a1 1 0 110 2H5a1 1 0 110-2h2z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Subtitle -->
      <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
        {{ $t('subtitle') }}
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header-Komponente
</script>

<style scoped>
/* Header Styling */
</style>
