const { defineConfig } = require("@vue/cli-service");

const target = "http://localhost:8081";
module.exports = defineConfig({
  configureWebpack: {
    performance: {
      maxEntrypointSize: 512000000,
      maxAssetSize: 512000000,
    },
  },
  devServer: {
    port: 8080,
    proxy: {
      "/decommi/api/": { target, changeOrigin: true },
      "/decommi/images": { target, changeOrigin: true },
      "/decommi/api/diary": { target, changeOrigin: true },
      "/decommi/diary": { target, changeOrigin: true },
      "/decommi/member/": { target, changeOrigin: true },
      "/decommi/mydiary/": { target, changeOrigin: true },
      "/decommi/help/": { target, changeOrigin: true },
    },
  },

  // publicPath: "/decommi",
  transpileDependencies: ["vue-meta"],
});
