import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
    {
      path: '/students',
      name: 'Student Portal',
      component: () => import('../views/Students.vue')
    },
    {
      path: '/parents',
      name: 'Parent Portal',
      component: () => import('../views/Parents.vue')
    },
    {
      path: '/sign_in',
      name: 'Sign In',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/about_us/:id',
      name: 'personal',
      component: () => import('../views/Personal.vue')
    },
    {
      path: '/about_us',
      name: 'About Us',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        },
]

const router = new VueRouter({
  routes
})

export default router
