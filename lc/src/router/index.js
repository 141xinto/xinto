import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',

    component: () => import('../views/About.vue')
  },
  {
    path: '/index',
    name: 'index',

    component: () => import('../views/index.vue')
  },
  {
    path: '/echeats',
    name: 'echeats',

    component: () => import('../views/echeats.vue')
  }
  ,
  {
    path: '/s',
    name: 's',

    component: () => import('../views/s.vue')
  }
  ,
  {
    path: '/c',
    name: 'c',

    component: () => import('../views/c.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
