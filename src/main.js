import { createApp } from 'vue'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './components/app/App.vue'
import router from './router'
import { createPinia } from 'pinia' 
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

createApp(App)
.use(router)
.use(createPinia())
.use(Toast)
.mount('#app')
