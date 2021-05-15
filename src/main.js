import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'chartkick/chart.js'
import VueChartkick from 'vue-chartkick'

createApp(App).use(router).use(VueChartkick).mount('#app')
