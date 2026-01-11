<template>
  <UModal v-model="isOpen" title="" @close="closeModal">
    <div class="space-y-6 p-6">
      <!-- Vorschau -->
      <div class="flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <svg
          v-if="icon && icon.styles[currentStyle as keyof typeof icon.styles]"
          ref="svgRef"
          viewBox="0 0 512 512"
          class="w-24 h-24 transition-all duration-300"
          :style="{ color: currentColor }"
          fill="currentColor"
        >
          <path
            :d="icon.styles[currentStyle as keyof typeof icon.styles]?.path"
          />
        </svg>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {{ $t('icon.preview') }}
        </p>
      </div>

      <!-- Icon Informationen -->
      <div class="space-y-2">
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ $t('icon.name') }}
          </label>
          <p class="text-gray-900 dark:text-white mt-1">{{ icon?.name }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ $t('icon.unicode') }}
          </label>
          <p class="text-gray-900 dark:text-white mt-1 font-mono">{{ icon?.unicode }}</p>
        </div>
      </div>

      <!-- Stil-Auswahl -->
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {{ $t('icon.style') }}
        </label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="style in ['solid', 'regular', 'duotone']"
            :key="style"
            @click="currentStyle = style as any"
            :class="[
              'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              currentStyle === style
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'
            ]"
            :disabled="!icon?.styles[style as keyof typeof icon.styles]"
          >
            {{ $t(`filter.${style}`) }}
          </button>
        </div>
      </div>

      <!-- Farb-Auswahl -->
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {{ $t('icon.color') }}
        </label>
        <div class="flex space-x-2">
          <input
            v-model="currentColor"
            type="color"
            class="w-12 h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
          />
          <input
            :value="currentColor"
            type="text"
            class="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="#000000"
            @change="(e: Event) => {
              const target = e.target as HTMLInputElement
              if (validateHex(target.value)) {
                currentColor = target.value
              }
            }"
          />
        </div>
      </div>

      <!-- Duotone Sekundärfarbe -->
      <div v-if="currentStyle === 'duotone'">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {{ $t('icon.secondaryColor') }}
        </label>
        <div class="flex space-x-2">
          <input
            v-model="secondaryColor"
            type="color"
            class="w-12 h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
          />
          <input
            :value="secondaryColor"
            type="text"
            class="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="#000000"
            @change="(e: Event) => {
              const target = e.target as HTMLInputElement
              if (validateHex(target.value)) {
                secondaryColor = target.value
              }
            }"
          />
        </div>
      </div>

      <!-- Export Größen -->
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {{ $t('export.size') }}
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="size in [64, 128, 256, 512]"
            :key="size"
            @click="selectedSize = size"
            :class="[
              'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              selectedSize === size
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'
            ]"
          >
            {{ $t(`export.size${size}`) }}
          </button>
        </div>
      </div>

      <!-- Export Buttons -->
      <div class="grid grid-cols-2 gap-2 pt-4">
        <button
          @click="exportPNG"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          {{ $t('export.download') }}
        </button>
        <button
          @click="copyClipboard"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
        >
          {{ $t('export.copy') }}
        </button>
      </div>

      <!-- Schließen Button -->
      <button
        @click="closeModal"
        class="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        {{ $t('close') }}
      </button>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { useColor } from '~/composables/useColor'
import { useExport } from '~/composables/useExport'

interface Icon {
  id: number
  name: string
  label: string
  unicode: string
  searchTerms: string[]
  styles: Record<string, { path: string }>
}

const props = defineProps<{
  modelValue: boolean
  icon: Icon | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const svgRef = ref<SVGElement | null>(null)
const currentColor = ref('#000000')
const secondaryColor = ref('#FF6B35')
const currentStyle = ref<'solid' | 'regular' | 'duotone'>('solid')
const selectedSize = ref(256)

const { validateHex } = useColor()
const { exportToPNG, downloadBlob, copyToClipboard: clipboardCopy } = useExport()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const closeModal = () => {
  emit('update:modelValue', false)
}

const exportPNG = () => {
  if (!svgRef.value) return

  exportToPNG(
    svgRef.value,
    selectedSize.value,
    currentColor.value,
    secondaryColor.value
  ).then((blob) => {
    if (blob) {
      const filename = `${props.icon?.name}-${selectedSize.value}px.png`
      downloadBlob(blob, filename)
    }
  })
}

const copyClipboard = () => {
  if (!svgRef.value) return

  exportToPNG(
    svgRef.value,
    selectedSize.value,
    currentColor.value,
    secondaryColor.value
  ).then((blob) => {
    if (blob) {
      clipboardCopy(blob).then((success) => {
        if (success) {
          console.log('In Zwischenablage kopiert!')
        }
      })
    }
  })
}
</script>

<style scoped>
/* Icon Detail Modal Styling */
</style>
