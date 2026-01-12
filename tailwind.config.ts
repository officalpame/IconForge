import type { Config } from 'tailwindcss';

export default {
    content: [
        './app/components/**/*.{js,vue,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/assets/**/*.{js,ts}',
        './app/composables/**/*.{js,ts}'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1DA1F2',
                secondary: '#14171A'
            }
        }
    },
    plugins: []
} satisfies Config;
        