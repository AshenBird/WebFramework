const { build } = require('vite');
const { resolve } = require("path");
// vite build --ssr src/entry-server.ts --outDir dist/server
module.exports = async () => {
  return build({
    build: {
      outDir: "dist/server",
      ssr: true,
      rollupOptions: {
        input: resolve(process.cwd(),'src/entry-server.ts'),
      },
    }
  });
}
