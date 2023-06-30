import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest(async () => ({
  name: 'Example extension',
  manifest_version: 3,
  version: '1.0.0.0',
  action: { 
    "default_popup": 
    "src/popup/index.html" 
  },
 
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/contentScripts/index.ts'],
    },
  ],
  background: {
    service_worker: "./src/background/index.ts",
    type: "module"
  },
  permissions: ["storage"],
}))
