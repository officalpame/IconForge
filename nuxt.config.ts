import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    typescript: {
        strict: true,
    },
    devtools: {
        enabled: false 
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
        


            
