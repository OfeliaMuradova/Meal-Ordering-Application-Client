import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


// const API_URL = process.env.API_URL || 'http://localhost:8080/'


// axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + localStorage.token
//   }
// })

// Vue.use(VueAxios)

//import { AxiosPlugin } from './axios-plugin';
//Vue.use(AxiosPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
