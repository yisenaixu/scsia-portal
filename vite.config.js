import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/portal': {
        target : 'http://120.76.192.186:8080/',
        changeOrigin: true,
      },
      '/dev-api/profile':{
        target : 'http://120.76.192.186:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/,'')
      },
    }
  },
  base: '/',
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(),'src/assets/icons')],
      symbolId: "icon-[name]"
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
