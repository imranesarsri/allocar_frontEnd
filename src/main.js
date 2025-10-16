import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import GSAP for animations
import { gsap } from 'gsap'
window.gsap = gsap


const app = createApp(App)

// Use router
app.use(router)

// Global properties (if needed)
app.config.globalProperties.$gsap = gsap

// Mount the app
app.mount('#app')