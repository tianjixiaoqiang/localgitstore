import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Uploardnews from './views/uploardnews'
import Shownews from './views/shownews'
import Login from './views/login'
import Register from './views/register'
import Managenews from './views/managenews'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'shownews',
      component: Shownews
    },
    {
      path: '/uploard',
      name: 'uploardnews',
      component: Uploardnews
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
      {
          path:'/managenews',
          name:'managenews',
          component:Managenews
      }
  ]
})
