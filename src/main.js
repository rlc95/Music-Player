import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Navbar.vue'
// Step 1: Create app instance
const app = createApp(App)
// Step 2: Register global component
app.component('app-bar', Navbar)

// Step 3: Mount app
app.mount('#app')
