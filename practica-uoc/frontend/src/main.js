import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/main.css'
import App from './App.vue'
import router from './router';

const app = createApp(App);
const pinia = createPinia()   

app.use(pinia)

import { useAuthStore } from './store/auth'
const authStore = useAuthStore()
authStore.loadSession()  //recupera la sesión del usuario al iniciar la aplicación
// Solo para desarrollo: exponerlo a la consola del navegador
window.authStore = authStore

app.use(router);
app.mount('#app');
