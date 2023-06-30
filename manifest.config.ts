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
  icons: {
    "16": "icons/favicon-16x16.png",
    "32": "icons/favicon-32x32.png",
    "128": "icons/favicon-128x128.png",
    "192": "icons/favicon-192x192.png",
    "512": "icons/favicon-512x512.png"
  }
}))
