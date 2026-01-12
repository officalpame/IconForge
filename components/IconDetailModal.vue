<template>
  <div v-if="icon" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-gray-900">{{ icon.label }}</h2>
          <p class="text-sm text-gray-600">{{ icon.name }}</p>
        </div>
        <button 
          @click="$emit('close')" 
          class="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Icon Preview -->
        <div class="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <svg
            :viewBox="getViewBox()"
            :fill="isDuotone ? 'none' : primaryColor"
            class="w-24 h-24 transition-all duration-300"
          >
            <path 
              v-if="isDuotone" 
              :d="getPath()" 
              :fill="primaryColor" 
              opacity="0.4" 
            />
            <path 
              v-if="isDuotone && getPath(true)" 
              :d="getPath(true)" 
              :fill="secondaryColor" 
            />
            <path v-if="!isDuotone" :d="getPath()" />
          </svg>
        </div>

        <!-- Icon Info -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-medium text-gray-600">Name</label>
            <p class="text-sm text-gray-900 font-mono mt-1">{{ icon.name }}</p>
          </div>
          <div>
            <label class="text-xs font-medium text-gray-600">Unicode</label>
            <p class="text-sm text-gray-900 font-mono mt-1">{{ icon.unicode }}</p>
          </div>
        </div>

        <!-- Style Selection -->
        <div>
          <label class="text-sm font-medium text-gray-700 block mb-2">Stil</label>
          <div class="flex gap-2">
            <button
              v-for="style in availableStyles"
              :key="style"
              @click="currentStyle = style as 'solid' | 'regular' | 'duotone'"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                currentStyle === style
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ style }}
            </button>
          </div>
        </div>

        <!-- Color Selection -->
        <div :class="isDuotone ? 'grid grid-cols-2 gap-4' : 'space-y-4'">
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">
              {{ isDuotone ? 'Primärfarbe' : 'Farbe' }}
            </label>
            <input 
              v-model="primaryColor" 
              type="color" 
              class="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
          <div v-if="isDuotone">
            <label class="text-sm font-medium text-gray-700 block mb-2">Sekundärfarbe</label>
            <input 
              v-model="secondaryColor" 
              type="color" 
              class="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        <!-- Export Size -->
        <div>
          <label class="text-sm font-medium text-gray-700 block mb-2">Größe</label>
          <select v-model.number="exportSize" class="w-full px-3 py-2 rounded-lg border border-gray-300">
            <option v-for="size in [64, 128, 256, 512]" :key="size" :value="size">
              {{ size }} × {{ size }} px
            </option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button 
            @click="downloadPng"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            PNG herunterladen
          </button>
          <button 
            @click="copySvg"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-medium transition"
          >
            SVG kopieren
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Icon } from '~/types/icon'

const props = defineProps<{
  icon: Icon | null
}>()

const emit = defineEmits<{
  close: []
}>()

const primaryColor = ref('#111827')
const secondaryColor = ref('#6B7280')
const exportSize = ref(256)
const currentStyle = ref<'solid' | 'regular' | 'duotone'>('solid')

const availableStyles = computed(() => {
  if (!props.icon) return []
  return Object.keys(props.icon.styles).filter(s => props.icon?.styles[s as keyof typeof props.icon.styles])
})

const isDuotone = computed(() => {
  if (!props.icon) return false
  const styleData = props.icon.styles[currentStyle.value]
  return styleData ? 'path2' in styleData : false
})

const getPath = (secondary = false): string => {
  if (!props.icon) return ''
  const styleData = props.icon.styles[currentStyle.value]
  if (!styleData) return ''
  if (secondary && 'path2' in styleData) {
    return (styleData as any).path2
  }
  return styleData.path
}

const downloadPng = async () => {
  if (!props.icon) return
  const path = getPath()
  if (!path) return

  let svgContent = ''
  if (isDuotone.value) {
    const path2 = getPath(true)
    svgContent = `<path fill="${primaryColor.value}" opacity="0.4" d="${path}"/><path fill="${secondaryColor.value}" d="${path2}"/>`
  } else {
    svgContent = `<path fill="${primaryColor.value}" d="${path}"/>`
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${exportSize.value}" height="${exportSize.value}">${svgContent}</svg>`
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = exportSize.value
    canvas.height = exportSize.value
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, exportSize.value, exportSize.value)
    ctx.drawImage(img, 0, 0)
    canvas.toBlob((blob) => {
      if (!blob) return
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${props.icon!.name}-${exportSize.value}.png`
      link.click()
      URL.revokeObjectURL(link.href)
    })
    URL.revokeObjectURL(url)
  }
  img.src = url
}

const copySvg = async () => {
  if (!props.icon) return
  const path = getPath()
  if (!path) return

  let svgContent = ''
  if (isDuotone.value) {
    const path2 = getPath(true)
    svgContent = `<path fill="${primaryColor.value}" opacity="0.4" d="${path}"/><path fill="${secondaryColor.value}" d="${path2}"/>`
  } else {
    svgContent = `<path fill="${primaryColor.value}" d="${path}"/>`
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${svgContent}</svg>`
  await navigator.clipboard.writeText(svg)
  alert('SVG kopiert!')
}
</script>
