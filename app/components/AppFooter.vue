<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {{ $t('footer.madeBy') }}
          <a
            href="https://pame.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-200"
          >
            {{ $t('footer.link') }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer-Komponente
</script>

<style scoped>
/* Footer Styling */
</style>
