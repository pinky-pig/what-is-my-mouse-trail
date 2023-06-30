import { createApp } from 'vue'
import App from './index.vue'

const injectionDiv = document.createElement('div')
injectionDiv.id = 'app'
document.body.prepend(injectionDiv)

const app = createApp(App)
app.mount('#app')

