import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
    plugins: [
        Vue(),
        UnoCSS({
            presets: [
                presetUno({ preflight: false }),
                presetAttributify(),
            ],
        }),
    ],
    resolve: {
        alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
        host: true,
    },
})
