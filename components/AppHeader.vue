<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">IF</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">
              IconForge
            </h1>
            <p class="text-xs text-gray-600">
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
            class="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Style Filter -->
        <div class="flex gap-2">
          <select 
            :value="selectedStyle"
            @change="$emit('update:selectedStyle', ($event.target as HTMLSelectElement).value)"
            class="px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="all">Alle Stile</option>
            <option value="solid">Solid</option>
            <option value="regular">Regular</option>
            <option value="duotone">Duotone</option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  selectedStyle: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'update:selectedStyle': [value: string]
}>()
</script>
