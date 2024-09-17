import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Three3d.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue')
  },
  {
    path: '/vite/:path?',
    name: "vite",
    component: () => import(/* webpackChunkName: "map" */ '../views/Vite/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === "production" ? "/demo-main-vue/" : "",
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done();
})
export default router
