import {fileURLToPath, URL} from 'node:url'

import {resolve} from 'node:path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import topLevelAwait from "vite-plugin-top-level-await";
// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    server: {
        proxy: {
            '/portal': {
                target: 'http://120.76.192.186:8080/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/protal/, 'protal')
            },
        }
    },
    plugins: [
        vue(),
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
            symbolId: "icon-[name]"
        }),
        topLevelAwait({
            // The export name of top-level await promise for each chunk module
            promiseExportName: "__tla",
            // The function to generate import names of top-level await promise in each chunk module
            promiseImportName: i => `__tla_${i}`
        })

    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
