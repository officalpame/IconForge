<template>
  <footer class="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          {{ $t('footer.madeWith') }} ❤️ {{ $t('footer.by') }} 
          <a 
            href="https://github.com/officalpame" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            officalpame
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
