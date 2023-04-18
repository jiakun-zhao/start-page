import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
    plugins: [
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
})
