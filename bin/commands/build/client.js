const { build } = require('vite');
// vite build --ssrManifest --outDir dist/client
module.exports = async () => {
  return build({
    build: {
      outDir: "dist/client",
      ssrManifest: true,
    }
  });
};
