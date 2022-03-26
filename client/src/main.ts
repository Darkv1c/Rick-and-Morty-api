import { createApp } from 'vue'
import routes from 'pages-generated'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
    history: createWebHashHistory(), routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')