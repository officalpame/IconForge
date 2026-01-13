<template>
  <div :class="[  'min-h-screen flex flex-col', dark ? 'dark bg-gray-900' : 'bg-white' ]"    >

    <!--   Header   -->


    <header class = "sticky top-0 z-40 border-b shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700" >
      <div class = "max-w-7xl mx-auto px-6 py-4 flex items-center gap-6" >



        <div class = "shrink-0" >
          <h1 class = "text-2xl font-bold text-gray-900 dark:text-white" > ICONFORGE </h1>
          <p class = "text-xs text-gray-500 dark:text-gray-400" >Die ICON Datenbank</p>
        </div>



        <div class = "relative flex-1" >
          <input
            v-model = "querry"  
            type = "text"
            placeholder = "Icons durchsuchen..."  
            class = "w-full rounded-lg border px-4 py-2 pl-10 text-sm bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-1 focus:ring-blue-500"
          />
          <span class = "absolute left-3 top-2.5 text-gray-400" > 🔍 </span>
        </div>



        <div class = "flex items-center gap-2" >
          <select v-model = "styleFilter" class = "rounded-lg border px-2 py-2 text-sm dark:bg-gray-800 dark:text-white" >
            <option value = "all" >Alle</option>
            <option value = "solid" >Solid</option>
            <option value = "regular" >Regular</option>
            <option value = "brands" >Brands</option>
          </select>

          <button @click = "toggleTheme" class = "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center" >
            <img 
              :src = "dark ? '/pictures/light.png' : '/pictures/dark.png'" 
              alt = "Theme Toggle" 
              class = "h-12 w-12 object-contain"
            />
          </button> 
        </div>

      </div>
    </header>


    <!-- Grid -->



    <main class = "flex-1 max-w-7xl mx-auto w-full px-6 py-8" >
      <div class = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" >


        <button
          v-for="icon in gefiltert"
          :key="icon.id"
          @click="open(icon)"
          class="rounded-lg border p-4 bg-gray-50 hover:shadow hover:scale-105 transition dark:bg-gray-800 dark:border-gray-700"
        >
          <svg
            v-if="iconPathGrid(icon)"
            :viewBox="iconViewBoxGrid(icon)"
            class="w-8 h-8 mx-auto mb-2 text-gray-900 dark:text-white"
            fill="currentColor"
          >
            <path :d="iconPathGrid(icon)" />
          </svg>
          <p class="text-xs text-center truncate dark:text-white">{{ icon.label }}</p>
        </button>

        <p v-if = "gefiltert.length === 0" class = "col-span-full text-center text-sm text-gray-500">
          Keine Icons gefunden
        </p>

      </div>
      <div class="flex justify-center mt-6">
        <button v-if="icons.length < allIcons.length" @click="loadMore" class="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Mehr laden
        </button>
      </div>
    </main>

    <!-- Modal -->


    <div v-if = "current" class = "fixed inset-0 bg-black/50 flex items-center justify-center p-4" >
      <div class = "bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg shadow-xl" >



        <div class = "flex justify-between items-center border-b p-4 dark:border-gray-700" >
          <div>
            <h2 class = "font-bold dark:text-white"> {{ current.label }} </h2>
            <p class = "text-xs text-gray-500"> {{ current.id }} </p>
          </div>
          <button @click = "current=null">✕</button>
        </div>



        <div class = "p-6 space-y-4" >



          <div class = "flex justify-center bg-gray-100 dark:bg-gray-700 p-6 rounded-lg" >
            <svg :viewBox = "modalBox" class = "w-24 h-24" :fill = "isDuotone ? 'none' : primary" >
              <path v-if = "isDuotone" :d = "modalPath" :fill = "primary" opacity = "0.4"/>
              <path v-if = "isDuotone && modalPath2" :d = "modalPath2" :fill = "secondary"/>
              <path v-if = "!isDuotone" :d = "modalPath"/>
            </svg>
          </div>

          <!-- Farb-Button, Typ-Auswahl und Unicode nebeneinander -->
          <div class="flex gap-6 items-center justify-between mb-4">
            <!-- Farb-Button -->
            <div class="flex gap-2 items-center">
              <input type="color" v-model="primary" />
              <input v-if="isDuotone" type="color" v-model="secondary" />
            </div>
            <!-- Typ-Auswahl -->
            <div class="flex gap-2 items-center">
              <label class="text-sm dark:text-white">Typ:</label>
              <select v-model="activeStyle" class="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white">
                <option v-for="style in availableStyles" :key="style" :value="style">{{ style.charAt(0).toUpperCase() + style.slice(1) }}</option>
              </select>
            </div>
            <!-- Unicode -->
            <div class="flex gap-2 items-center">
              <span class="text-xs dark:text-white">Unicode:</span>
              <span class="text-xs font-mono px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">{{ unicodeHex }}</span>
              <button @click="copyUnicode" class="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600">Kopieren</button>
            </div>
          </div>

          <select v-model.number = "size" class = "w-full border rounded px-3 py-2" >
            <option v-for = "n in [64,128,256,512]" :key = "n" :value = "n"> {{ n }} × {{ n }} </option>
          </select>

          <div class = "flex gap-3" >
            <button @click = "exportPng" class = "flex-1 bg-blue-600 text-white py-2 rounded-lg" >
              PNG
            </button>
            <button @click = "copySvg" class = "flex-1 bg-gray-300 dark:bg-gray-700 py-2 rounded-lg" >
              SVG
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>





<script setup lang="ts">



import { ref, computed, onMounted, watch } from 'vue'
import type { Icon as IconType } from '~/types/icon'

const dark = ref(false)
const querry = ref('') 
const styleFilter = ref('all')




// Lazy Layout Function
const icons = ref<IconType[]>([])
const allIcons = ref<IconType[]>([])
const page = ref(1)
const pageSize = 66


function iconPathGrid(icon: IconType) {

  const d = icon.svg?.solid || icon.svg?.regular || icon.svg?.duotone || icon.svg?.brands;
  if (typeof d === 'object' && d.path) return d.path;
  if (typeof d === 'string') return d;
  return '';
}

function iconViewBoxGrid(icon: IconType) {
  if (icon.svg?.brands) {
    const d = icon.svg.brands;
    const vb = typeof d === 'object' ? d.viewBox : null;
    return Array.isArray(vb) ? vb.join(' ') : vb || '0 0 512 512';
  }
  const d = icon.svg?.solid || icon.svg?.regular || icon.svg?.duotone;
  const vb = typeof d === 'object' ? d.viewBox : null;
  return Array.isArray(vb) ? vb.join(' ') : vb || '0 0 512 512';
}



onMounted(async () => {
  dark.value = localStorage.getItem('darkMode') === 'true'
  document.documentElement.classList.toggle('dark', dark.value)
  await loadIcons()
})

const current = ref<IconType|null>(null)

const primary = ref('#111827')
const secondary = ref('#6B7280')
const size = ref(256)
const activeStyle = ref('solid')

// Styles die für das aktuelle Icon verfügbar sind
const availableStyles = computed(() => {
  return current.value?.styles || Object.keys(current.value?.svg || {}) || []
})

// Unicode als Hex anzeigen
const unicodeHex = computed(() => {
  if (!current.value) return ''
  let uni = current.value.unicode || (current.value.unicodes?.secondary?.[0] ?? '')
  return uni ? uni.replace(/^10/, 'f') : ''
})

// Unicode kopieren
async function copyUnicode() {
  if (!current.value) return
  let uni = unicodeHex.value
  await navigator.clipboard.writeText(uni)
}


// Gefilterte Icons basierend auf Suchanfrage und Stilfilter

const gefiltert = computed(() => {
  const q = querry.value.toLowerCase();
  return icons.value.filter(icon => {
    const label = (icon.label || '').toString().toLowerCase();
    const id = (icon.id || '').toString().toLowerCase();
    const terms = Array.isArray(icon.search?.terms)? icon.search.terms.map(t => t.toLowerCase()) : [];
    const matchText=
      !q ||
      label.includes(q) ||
      id.includes(q) ||
      terms.some(term => term.includes(q)); 

   const styles = Object.keys(icon.svg || {});
   const matchStyle = styleFilter.value === 'all' || styles.includes(styleFilter.value);

    return matchText && matchStyle;
  });
});




async function loadIcons() {
  if (allIcons.value.length === 0) {
    const res = await fetch('/icons.json')
    allIcons.value = Object.values(await res.json())
  }
  icons.value = allIcons.value.slice(0, page.value * pageSize)
}

function loadMore() {
  page.value++
  icons.value = allIcons.value.slice(0, page.value * pageSize)
}

onMounted(async () => {
  dark.value = localStorage.getItem('darkMode') === 'true'
  document.documentElement.classList.toggle('dark', dark.value)
  await loadIcons()
})





function toggleTheme( ) {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value )
  localStorage.setItem('darkMode', String(dark.value))
}


function iconPath(icon: IconType) {
  const d = icon.svg?.solid || icon.svg?.regular || icon.svg?.duotone
  return typeof d === 'object' ? (d as any).path : ''
}


function iconViewBox(icon: IconType) {
  const d = icon.svg?.solid || icon.svg?.regular || icon.svg?.duotone
  const vb = typeof d === 'object' ? (d as any).viewBox : null
  return Array.isArray(vb) ? vb.join(' ') : vb || '0 0 512 512'
}


function open(icon: IconType) {
  current.value = icon
  // Style-Auswahl immer auf ersten verfügbaren Style setzen
  const styles = icon.styles || Object.keys(icon.svg || {})
  activeStyle.value = styles[0] || 'solid'
}


const isDuotone = computed(() => {
  const s = current.value?.svg?.[activeStyle.value]
  return s && typeof s === 'object' && 'path2' in s
})


const modalPath = computed(() => {
  const s = current.value?.svg?.[activeStyle.value]
  return typeof s === 'object' ? (s as any).path : ''
})


const modalPath2 = computed(() => {
  const s = current.value?.svg?.[activeStyle.value]
  return typeof s === 'object' ? (s as any).path2 : ''
})


const modalBox = computed(() => {
  const s = current.value?.svg?.[activeStyle.value]
  const vb = typeof s === 'object' ? (s as any).viewBox : null
  return Array.isArray(vb) ? vb.join(' ') : vb || '0 0 512 512'
})




async function exportPng() {
  if (!current.value) return
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size.value}" height="${size.value}">
    ${isDuotone.value
      ? `<path d="${modalPath.value}" fill="${primary.value}" opacity="0.4"/><path d="${modalPath2.value}" fill="${secondary.value}"/>`
      : `<path d="${modalPath.value}" fill="${primary.value}"/>`}
  </svg>`


  const img = new window.Image()
  img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  img.onload = () => {
    const c = document.createElement('canvas')
    c.width = size.value
    c.height = size.value
    c.getContext('2d')!.drawImage(img, 0, 0)
    c.toBlob(b => {
      if (!b) return
      const a = document.createElement('a')
      a.href = URL.createObjectURL(b)
      a.download = `${current.value!.id}.png`
      a.click()
    })
  }
}


async function copySvg() {
  if (!current.value) return
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    ${isDuotone.value
      ? `<path d="${modalPath.value}" fill="${primary.value}" opacity="0.4"/><path d="${modalPath2.value}" fill="${secondary.value}"/>`
      : `<path d="${modalPath.value}" fill="${primary.value}"/>`}
  </svg>`
  await navigator.clipboard.writeText(svg)
}

// SVG-ID kopieren
async function copyId() {
  if (!current.value) return
  await navigator.clipboard.writeText(current.value.id)
}


</script>