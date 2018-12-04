import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Order from '@/pages/Order.vue'
import Menus from '@/pages/Menus.vue'
import Profile from '@/components/ui-elements/Profile.vue'
import Slider from '@/components/ui-elements/Slider.vue'

Vue.use(Router)

export default new Router({
  //mode: "history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      //name: 'home',
      component: Home,
      children: [
        {
          path: '/:page',
          name: 'profile',
          component: Profile,
        },
        {
          path: '/:page',
          name: 'contact',
          component: Profile,
        },
        {
          path: '/menus',
          name: 'menus',
          component: Menus,
        },
        {
          path: '/order',
          name: 'order',
          component: Order,
        },
        {
          path: '',
          name: 'slider',
          component: Slider
        }
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
