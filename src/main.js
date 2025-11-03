import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

createApp(App).mount('#app')
AOS.init({
  duration: 1000,
  once: true,
})
