import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    typescript: {
        strict: true,
    },
    css: ['@/assets/css/main.css'],
    modules: [
        '@nuxt/ui'
    ],

    app: {
        head: {
            title: 'ICONFORGE',
            meta: [
                { name: 'description', content: 'Icon Datenbank und Exporter' }
            ],
        }
    },

    vite: {
         build: {
        minify: 'esbuild'
    }
    }
})   
        


            
