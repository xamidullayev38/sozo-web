import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import vParallax from './directives/vParallax'

const app = createApp(App)

// Register global parallax directive
app.directive('parallax', vParallax)

app.mount('#app')

AOS.init({
  duration: 1000,
  once: true,
})
