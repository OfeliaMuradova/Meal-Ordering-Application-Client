import Vue from 'vue'
import Router from 'vue-router'
//import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      //component: Home
    },
    {
      path: '/logged',
      name: 'logged',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( './components/layout/Logged.vue')
    }
  ]
})
