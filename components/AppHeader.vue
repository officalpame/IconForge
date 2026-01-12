<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">IF</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ $t('app.title') }}
            </h1>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              {{ $t('app.subtitle') }}
            </p>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-3">
          <!-- Language Switcher -->
          <div class="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              v-for="loc in availableLocales"
              :key="loc.code"
              @click="locale = loc.code"
              :class="[
                'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                locale === loc.code
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              {{ loc.code.toUpperCase() }}
            </button>
          </div>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDark"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            :title="isDark ? $t('nav.lightMode') : $t('nav.darkMode')"
          >
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const colorMode = useColorMode()

const availableLocales = locales.value
const isDark = computed(() => colorMode.value === 'dark')
const toggleDark = () => colorMode.preference = isDark.value ? 'light' : 'dark'
</script>
