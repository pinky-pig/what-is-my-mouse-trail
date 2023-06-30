import { createApp } from 'vue'
import App from './App.vue'

const injectionDiv = document.createElement('div')
injectionDiv.id = 'mouseTrailContentScriptApp'
document.body.prepend(injectionDiv)

const app = createApp(App)
app.mount('#mouseTrailContentScriptApp')

