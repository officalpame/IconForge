<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
    <UCard v-if="icon">
      <!-- Header -->
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              {{ icon.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ icon.label }}
            </p>
          </div>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="isOpen = false"
          />
        </div>
      </template>

      <div class="space-y-6">
        <!-- Icon Preview -->
        <div class="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <svg
            ref="svgRef"
            viewBox="0 0 512 512"
            :style="{ color: currentColor }"
            class="w-32 h-32 transition-all duration-300"
            fill="currentColor"
          >
            <path v-if="currentPath" :d="currentPath" />
          </svg>
        </div>

        <!-- Icon Info -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('icon.name') }}
            </label>
            <p class="text-sm text-gray-900 dark:text-white mt-1">{{ icon.name }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t('icon.unicode') }}
            </label>
            <p class="text-sm text-gray-900 dark:text-white font-mono mt-1">{{ icon.unicode }}</p>
          </div>
        </div>

        <!-- Style Selection -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            {{ $t('icon.selectStyle') }}
          </label>
          <div class="flex gap-2">
            <button
              v-for="style in availableStyles"
              :key="style"
              @click="currentStyle = style"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                currentStyle === style
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              ]"
            >
              {{ $t(`filter.${style}`) }}
            </button>
          </div>
        </div>

        <!-- Color Picker -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            {{ $t('color.primary') }}
          </label>
          <div class="flex gap-2">
            <input
              v-model="currentColor"
              type="color"
              class="w-12 h-10 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
            />
            <input
              v-model="currentColor"
              type="text"
              placeholder="#000000"
              class="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white uppercase"
            />
          </div>
        </div>

        <!-- Secondary Color für Duotone -->
        <div v-if="currentStyle === 'duotone'">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            {{ $t('color.secondary') }}
          </label>
          <div class="flex gap-2">
            <input
              v-model="secondaryColor"
              type="color"
              class="w-12 h-10 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
            />
            <input
              v-model="secondaryColor"
              type="text"
              placeholder="#FF6B35"
              class="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white uppercase"
            />
          </div>
        </div>

        <!-- Export Size -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            {{ $t('export.size') }}
          </label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="size in exportSizes"
              :key="size"
              @click="selectedSize = size"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                selectedSize === size
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              ]"
            >
              {{ $t(`export.size${size}`) }}
            </button>
          </div>
        </div>

        <!-- Export Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <UButton
            block
            color="primary"
            @click="handleDownload"
            :loading="isExporting"
          >
            {{ $t('export.download') }}
          </UButton>
          <UButton
            block
            color="gray"
            @click="handleCopy"
            :loading="isCopying"
          >
            {{ copiedSuccess ? $t('export.copied') : $t('export.copy') }}
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { Icon, IconStyleType, ExportSize } from '~/types/icon'

// Props
interface Props {
  modelValue: boolean
  icon: Icon | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Composables
const { exportToPNG, downloadBlob, copyToClipboard } = useExport()

// Modal State
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Reaktive States
const svgRef = ref<SVGElement | null>(null)
const currentStyle = ref<IconStyleType>('solid')
const currentColor = ref('#000000')
const secondaryColor = ref('#FF6B35')
const selectedSize = ref<ExportSize>(256)
const isExporting = ref(false)
const isCopying = ref(false)
const copiedSuccess = ref(false)

// Verfügbare Stile für aktuelles Icon
const availableStyles = computed(() => {
  if (!props.icon) return []
  const styles: IconStyleType[] = []
  if (props.icon.styles.solid) styles.push('solid')
  if (props.icon.styles.regular) styles.push('regular')
  if (props.icon.styles.duotone) styles.push('duotone')
  return styles
})

// Aktueller SVG-Pfad
const currentPath = computed(() => {
  if (!props.icon) return ''
  return props.icon.styles[currentStyle.value]?.path || ''
})

// Export-Größen
const exportSizes: ExportSize[] = [64, 128, 256, 512]

// Icon-Wechsel: Setze ersten verfügbaren Stil
watch(() => props.icon, (newIcon) => {
  if (newIcon && availableStyles.value.length > 0) {
    currentStyle.value = availableStyles.value[0]
  }
}, { immediate: true })

/**
 * PNG Download
 */
const handleDownload = async () => {
  if (!svgRef.value || !props.icon) return

  isExporting.value = true
  try {
    const blob = await exportToPNG(svgRef.value, selectedSize.value, currentColor.value, secondaryColor.value)
    if (blob) {
      const filename = `${props.icon.name}-${selectedSize.value}px.png`
      downloadBlob(blob, filename)
    }
  } catch (error) {
    console.error('Download-Fehler:', error)
  } finally {
    isExporting.value = false
  }
}

/**
 * In Zwischenablage kopieren
 */
const handleCopy = async () => {
  if (!svgRef.value) return

  isCopying.value = true
  copiedSuccess.value = false
  
  try {
    const blob = await exportToPNG(svgRef.value, selectedSize.value, currentColor.value, secondaryColor.value)
    if (blob) {
      const success = await copyToClipboard(blob)
      if (success) {
        copiedSuccess.value = true
        setTimeout(() => {
          copiedSuccess.value = false
        }, 2000)
      }
    }
  } catch (error) {
    console.error('Clipboard-Fehler:', error)
  } finally {
    isCopying.value = false
  }
}
</script>
