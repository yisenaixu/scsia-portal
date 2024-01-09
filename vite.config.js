import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  return {
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
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.js',
        template: '/index.html',
        inject: {
          data: {
            title: loadEnv(mode,process.cwd())['VITE_APP_TITLE']
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
