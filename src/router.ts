import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Order from '@/pages/Order.vue'
import Menus from '@/pages/Menus.vue'
import Profile from '@/components/Profile.vue'
import Slider from '@/components/Slider.vue'

Vue.use(Router)

var loggedIn: boolean;
checkAuth();

let router = new Router({
  mode: 'history',
  routes: [
      {
          path: '/',
          component: Home,
          meta: { 
            requiresAuth: true
          },
          children: [
            {
              path: '',
              name: 'slider',
              component: Slider,
              meta: { 
                requiresAuth: true
              }
            },
            {
              path: '/menus',
              name: 'menus',
              component: Menus,
              meta: { 
                requiresAuth: true
              }
            },
            {
              path: '/order',
              name: 'order',
              component: Order,
              meta: { 
                requiresAuth: true
              }
            }
          ]
      },
      {
          path: '/login',
          name: 'login',
          component: Login,
          meta: { 
            requiresAuth: false
          }
      }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    checkAuth();

    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});


  function checkAuth(){
    var token = "";
    var value = "; " + document.cookie;
      var cookies = value.split("; ");
      cookies.forEach((cookie: string) => {
        if(cookie.startsWith("access_token")){
          var parts = cookie.split("=");
          console.log(parts[1]);
          token = parts[1];
        }
    });

    //todo: checktoken and if the token is valid
    if(token)
      loggedIn = true;
  }



export default router

    /*,
    {
      path: '/logged',
      name: 'logged',
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( './components/layout/Logged.vue')
    }
    
  ]
})*/
