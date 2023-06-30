import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

const isDev = process.env.NODE_ENV !== 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [ 
        'vue', 
        '@vueuse/core',
      ],
      dts: 'auto-imports.d.ts',
    }),
  ],
  define: {
    '__DEV__': isDev,
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
  },
})
