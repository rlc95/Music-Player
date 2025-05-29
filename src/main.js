import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Navbar.vue'
import VueTypedJs from 'vue-typed-js'
// Step 1: Create app instance
const app = createApp(App)
// Step 2: Register global component
app.component('app-bar', Navbar)
app.component('VueTypedJs', VueTypedJs)
// Step 3: Mount app
app.mount('#app')
