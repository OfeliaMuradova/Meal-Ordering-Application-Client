import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/Login.vue'

import Home from '@/user/pages/Home.vue'
import Order from '@/user/pages/Order.vue'
import Menus from '@/user/pages/Menus.vue'
import Profile from '@/user/components/Profile.vue'
import Slider from '@/user/components/Slider.vue'

import AdminPanel from '@/admin/AdminPanel.vue'
import AdminForm from '@/admin/components/AdminForm.vue'
import Orders from '@/admin/components/Orders.vue'
import Users from '@/admin/components/Users.vue'

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
          requiresAuth: true,
          admin: false
        },
        children: [
          {
            path: '',
            name: 'slider',
            component: Slider,
            meta: { 
              requiresAuth: true,
              admin: false
            }
          },
          {
            path: '/menus',
            name: 'menus',
            component: Menus,
            meta: { 
              requiresAuth: true,
              admin: false
            }
          },
          {
            path: '/order',
            name: 'order',
            component: Order,
            meta: { 
              requiresAuth: true,
              admin: false
            }
          }
        ]
      },
      {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/orders',
        component: AdminPanel,
        meta: { 
          requiresAuth: true,
          admin: true
        },
        children: [
          {
            path: 'orders',
            name: 'adminOrders',
            component: Orders,
            meta: { 
              requiresAuth: true,
              admin: true
            }
          },
          {
            path: 'companies',
            name: 'companies',
            component: AdminForm,
            meta: { 
              requiresAuth: true,
              admin: true
            },
          },
          {
            path: 'profile',
            name: 'adminProfile',
            component: Profile,
            meta: { 
              requiresAuth: true,
              admin: true
            },
          },
          {
            path: 'orders',
            name: 'orders',
            component: Users,
            meta: { 
              requiresAuth: true,
              admin: true
            },
          },
          {
            path: 'menus',
            name: 'adminMenus',
            component: AdminForm,
            meta: { 
              requiresAuth: true,
              admin: true
            },
          },
          {
            path: 'users',
            name: 'users',
            component: AdminForm,
            meta: { 
              requiresAuth: true,
              admin: true
            },
          },
        ]
      },
      {
          path: '/login',
          name: 'login',
          component: Login,
          meta: { 
            requiresAuth: false,
            //admin: false
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
        //console.log(parts[1]);
        token = parts[1];
      }
  });

  //todo: validateToken
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
