import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    typescript: {
        strict: true,
    },
    css: ['@/assets/styles/main.css'],
    modules: [
        '@nuxt/ui'
    ],

    app: {
        head: {
            title: 'ICONFORGE',
            meta: [
                { name: 'desciption', content: 'Icon Datenbank und Exporter' }
            ],
        }
    }

    vite: {
         build: {
        minify: 'esbuild'
    }
    }
})   
        


            
