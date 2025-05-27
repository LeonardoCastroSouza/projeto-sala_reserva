
import { createApp } from 'vue'
import App from './App.vue'
import './plugins/axios.js' // Importa configuração do axios

// Se você estiver usando Tailwind CSS, adicione:
import './assets/css/tailwind.css'

const app = createApp(App)

// Registrar componentes globalmente se necessário
// app.component('RoomManager', RoomManager)

app.mount('#app')
