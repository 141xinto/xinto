import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path:'/login',
    component:() =>import("../views/index.vue")
 },
  {
    path:'/Home',
    component:() =>import("../views/Home.vue")
 }
 
]
const router = new VueRouter({
  routes
})

export default router
