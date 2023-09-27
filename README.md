<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesmousetrail.gif" width="600"/>
</p>

## 🌸 介绍

前一段新冠阳性，居家隔离办公的时候，经常会遇到分享屏幕。但是当分享的时候，需要聚焦某一要素，简单的鼠标移动并不能让观看者很清晰直观的看到分享者的着重点。
于是便简单开发了一款浏览器插件，显示鼠标移动轨迹。

## 🎉 功能

- [X] 鼠标移动尾巴
- [X] 按住 Alt 键，页面充当简易画板（鼠标尾巴不会消失）
- [X] 设置尾巴颜色
- [] 设置画笔粗细


## 🏄‍♂️ 开发

只是一个小项目，难度不大。

代码开发打包编译使用的是（代码详见 refactor 分支）： 

- Vue3
- Vite
- UnoCSS
- CRXJS


## 👊 操作

- 按住左边 Alt 键和鼠标左键，在页面滑动，有小尾巴跟随。松开 Alt 结束
- 按住 Ctrl 和左边 Alt 键和鼠标左键，绘制线条。鼠标左键抬起，结束当前线条绘制。按键抬起，结束
- Popup 页面，可以选择颜色


## 🍄 二次开发

### 工具类

- [`free-hand`](https://github.com/steveruizok/perfect-freehand) - 绘制线条的笔刷样式。[笔刷调试网站](https://perfect-freehand-example.vercel.app/)
- [CRXJS](https://crxjs.dev/vite-plugin) - 插件开发


### 文件目录

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


### 运行

```bash
pnpm dev
```
- 如果需要自定义弹出框页面样式，可以在 `popup/Popup.vue` 中修改。
- 如果需要修改笔刷样式，可以在[`free-hand`](https://perfect-freehand-example.vercel.app/)调试好笔刷后，再将配置赋值给`contentScripts/views/App.vue` 中的`config_draw`参数。
- 如果需要修改业务逻辑，只需关注`popup/Popup.vue`和`contentScripts/views/App.vue`这两个页面。

### 打包

<p id="Build">To build the extension, run</p>

```bash
pnpm build
```

安装：（以chrome浏览器为例）
1. 地址栏输入: `chrome://extensions/`。
2. 打开开发者模式。
3. 将生成的 `/extension` 文件夹直接拖拽到浏览器扩展程序页面。
