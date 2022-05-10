import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: "login",
    meta: {
      auth: false
    },
    component: () => import("../views/index.vue")
  },
  {
    path: '/Home',
    name: "Home",
    meta: {
      auth: true
    },
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: '/users',
        name: "users",
        meta: {
          auth: true
        },
        component: () => import("../views/users.vue"),
      },
      {
        path: '/roles',
        name: "roles",
        meta: {
          auth: true
        },
        component: () => import("../views/roles.vue"),
      },
      {
        path: '/rights',
        name: "rights",
        meta: {
          auth: true
        },
        component: () => import("../views/rights.vue"),
      },

      {
        path: '/goods',
        name: "goods",
        meta: {
          auth: true
        },
        component: () => import("../views/goods.vue"),
      },
      {
        path: '/params',
        name: "params",
        meta: {
          auth: true
        },
        component: () => import("../views/params.vue"),
      }, {
        path: '/categories',
        name: "categories",
        meta: {
          auth: true
        },
        component: () => import("../views/categories.vue"),
      },
      {
        path: '/orders',
        name: "orders",
        meta: {
          auth: true
        },
        component: () => import("../views/orders.vue"),
      },
      {
        path: '/reports',
        name: "reports",
        meta: {
          auth: true
        },
        component: () => import("../views/reports.vue"),
      },
      
    ],
  }

]
const router = new VueRouter({
  routes
})



router.beforeEach((to, from, next) => {
  const flag = to.matched.some(item => {
    return item.meta.auth
  })
  if (flag) {
    const token = sessionStorage.getItem("token")
    if (!token) {
      return next({
        path: '/login'
      })
      // router.replace('/login')
    }
    next()
  } else (
    next()
  )



})
export default router
