// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [
    vuePlugin(),
    vueJsx(),
    {
      name: 'virtual',
      resolveId(id) {
        if (id === '@foo') {
          return id
        }
      },
      load(id) {
        if (id === '@foo') {
          return `export default { msg: 'hi' }`
        }
      }
    }
  ],
  build: {
    minify: false
  }
}
