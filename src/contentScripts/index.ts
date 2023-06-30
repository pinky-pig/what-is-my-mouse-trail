import { createApp } from 'vue'
import App from './index.vue'

const injectionDiv = document.createElement('div')
injectionDiv.id = 'mouseTrailContentScriptApp'

const style = document.createElement('style')
style.innerHTML = `
#mouseTrailContentScriptApp {
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2147483647;
}
`

document.body.prepend(injectionDiv)
document.body.prepend(style)

const app = createApp(App)
app.mount('#mouseTrailContentScriptApp')

