import { Component, createApp } from 'vue'
import routes from 'pages-generated'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import components from './components'

const router = createRouter({
    history: createWebHashHistory(), routes
})

const app = createApp(App)
//add global components 
for (let prop in components){
    app.component(prop, components[prop as keyof Component])
}

app.use(router)
app.mount('#app')

console.log(components)