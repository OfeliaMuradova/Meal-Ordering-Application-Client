//import VueAxios from 'vue-axios'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/tooltip'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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

Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
