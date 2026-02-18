import { createApp } from 'vue'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './components/app/App.vue'
import router from './router'

createApp(App)
.use(router)
.mount('#app')
