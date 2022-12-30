# WebExtension Vite Starter

使用的是[@antfu](https://github.com/antfu)的仓库模板[vitesse-webext](https://github.com/antfu/vitesse-webext)进行开发。

## Introduction

前一段新冠阳性，居家隔离办公的时候，经常会遇到分享屏幕。但是当分享的时候，需要聚焦某一要素，简单的鼠标移动并不能让观看者很清晰直观的看到分享者的着重点。
于是便简单开发了一款浏览器插件，显示鼠标移动轨迹。

  - 💬 按住左边的ALT键，配合鼠标左键按下并在页面上滑动，即可在页面上绘制线条。
  - 📃 第一种模式是轨迹短暂跟随鼠标。第二种模式是可随意绘制。
  - 📦 取消按下坐标的ALT键，绘制的内容将被清空


<p align="center">
<sub>Popup</sub><br/>
<img width="655" src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20221230103311.png"><br/>
<sub>Inject Vue App into the Content Script</sub><br/>
<img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images微信图片_20221230103451.png">
</p>

## Features

- ⚡️ 鼠标轨迹跟随
- 🥝 自由绘制
- 🌈 颜色选择

## Pre-packed

### WebExtension Libraries

- [`free-hand`](https://github.com/steveruizok/perfect-freehand) - 绘制线条的笔刷样式。[笔刷调试网站](https://perfect-freehand-example.vercel.app/)

## Use the Template

### GitHub Repo

[what-is-my-mouse-trail](https://github.com/pinky-pig/what-is-my-mouse-trail.git).

### Clone to local

克隆仓库后，安装依赖，俺更喜欢`pnpm i`。

## Usage

### Folders

- `src` - main source.
  - `contentScript` - 往页面注入的`svg`，鼠标轨迹等都是通过`path`渲染到页面上。
  - `popup` - 浏览器的`popup`弹出框页面。
  - `background` - scripts for background.
  - `components` - auto-imported Vue components that are shared in popup and options page.
  - `styles` - styles shared in popup and options page
  - `assets` - assets used in Vue components
  - `manifest.ts` - manifest for the extension.
- `extension` - extension package root.
  - `assets` - static assets (mainly for `manifest.json`).
  - `dist` - built files, also serve stub entry for Vite on development.
- `scripts` - development and bundling helper scripts.


### Development

```bash
pnpm dev
```
- 如果需要自定义弹出框页面样式，可以在 `popup/Popup.vue` 中修改。
- 如果需要修改笔刷样式，可以在[`free-hand`](https://perfect-freehand-example.vercel.app/)调试好笔刷后，再将配置赋值给`contentScripts/views/App.vue` 中的`config_draw`参数。
- 如果需要修改业务逻辑，只需关注`popup/Popup.vue`和`contentScripts/views/App.vue`这两个页面。

### Build

To build the extension, run

```bash
pnpm build
```

安装：（以chrome浏览器为例）
1. 地址栏输入: `chrome://extensions/`。
2. 打开开发者模式。
3. 将生成的 `/extension` 文件夹直接拖拽到浏览器扩展程序页面。
