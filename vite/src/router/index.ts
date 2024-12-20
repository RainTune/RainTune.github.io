import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// @ts-ignore
// const basename = process.env.NODE_ENV === "production" ? "/demo-vite/" : "";
const basename = "/demo-vite/"
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(basename),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
