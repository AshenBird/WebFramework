const { build } = require('vite')
const vuePlugin = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

module.exports = async () => {
  await build({
    root: process.cwd(),
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
      rollupOptions: {
        input:require("path").resolve(__dirname, '../../../index.html'),
      },
      minify: false
    }
  })
}
