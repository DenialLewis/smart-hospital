// const { defineConfig } = require('@vue/cli-service')
//   module.exports = {
//     // Options that Vue CLI expects
//     publicPath: '/',
//     devServer: {
//       proxy: 'http://localhost:8080',
//     },
//     lintOnSave: false, // Example of turning off linting on save
//   };
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {  // Only proxy certain paths if possible, rather than all
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
      },
    },
    hot: true,  // Re-enable hot reload
  },
  lintOnSave: false,
});
