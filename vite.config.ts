import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

const isDev = process.env.NODE_ENV !== 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
    AutoImport({
      imports: [ 'vue', ],
      dts: 'auto-imports.d.ts',
    }),
    UnoCSS({
      mode: 'global' || 'shadow-dom',
    }),
  ],
  define: {
    '__DEV__': isDev,
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
  },
})
