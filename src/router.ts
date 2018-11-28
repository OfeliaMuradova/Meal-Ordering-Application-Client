import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import LoginComponent from '@/components/layout/LoginComponent.vue'

Vue.use(Router)

export default new Router({
  //mode: "history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        //{ path: '', component: UserHome },
      ]
    }
    
    
    /*,
    {
      path: '/logged',
      name: 'logged',
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( './components/layout/Logged.vue')
    }
    */
  ]
})
