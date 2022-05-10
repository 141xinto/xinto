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

    component: () => import("../views/index.vue")
  },
  {
    path: '/Home',
    name: "Home",

    component: () => import("../views/Home.vue"),
    redirect: '/hell',
    children: [
      {
        path: '/hell',
        name: "hell",

        component: () => import("../views/hell.vue"),
      },
      {
        path: '/users',
        name: "users",

        component: () => import("../views/users.vue"),
      },
      {
        path: '/roles',
        name: "roles",

        component: () => import("../views/roles.vue"),
      },
      {
        path: '/rights',
        name: "rights",

        component: () => import("../views/rights.vue"),
      },

      {
        path: '/goods',
        name: "goods",

        component: () => import("../views/goods.vue"),
      },
      {
        path: '/goodsAdd',
        name: "goodsAdd",

        component: () => import("../views/goodsAdd.vue"),
      },

      {
        path: '/params',
        name: "params",

        component: () => import("../views/params.vue"),
      }, {
        path: '/categories',
        name: "categories",

        component: () => import("../views/categories.vue"),
      },
      {
        path: '/orders',
        name: "orders",

        component: () => import("../views/orders.vue"),
      },
      {
        path: '/reports',
        name: "reports",

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

    }
    next()
  } else (
    next()
  )

})
export default router
