import { defineConfig } from 'vite'

import Minifier from '@jiakun-zhao/vite-minifier'

export default defineConfig({
  plugins: [
    Minifier(),
  ],
})
