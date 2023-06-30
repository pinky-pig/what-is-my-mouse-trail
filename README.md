
# Crx.js Vue Template

- [√] background
- [√] content scripts
- [√] popup
- [√] options

## 安装

[Document](https://crxjs.dev/vite-plugin/getting-started/vue/create-project)

根据上面文档，可以构建一个最基本的项目，启动项目后，能看到 popup ，并且热更新。

## 新增

这里就是添加 background、 content scripts、options 三个模块。

```ts
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
  }
}))

```
