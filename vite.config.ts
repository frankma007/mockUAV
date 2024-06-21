import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// vite.config.ts

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    [vue()],



    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    //使用@路径
    alias: {
      "@": path.resolve("./src")
    }
  },

server: {
  host: "127.0.0.1",
  cors: true,
  port: 8888,
  open: false, //自动打开
  proxy: {
    // 这里的ccc可乱写, 是拼接在url后面的地址 如果接口中没有统一的后缀可自定义
    // 如果有统一后缀, 如api, 直接写api即可, 也不用rewrite了
    "^/api": {
      target: "http://192.168.100.154:8980/", // 真实接口地址, 后端给的基地址
      changeOrigin: true, // 允许跨域
      secure: false,  //关键参数，不懂的自己去查
      // rewrite: (path) => path.replace(/^\/api/, '')
    },
  },
}

})
