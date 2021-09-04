import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const Topic = () => import('../views/Topic.vue')
const Answer = () => import('../views/Answer.vue')
const Profile = () => import('../views/Profile.vue')
const Admin = () => import('../views/Admin.vue')
const Information = () => import('../views/Information.vue')

import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/topic/:uuid',
    name: 'Topic',
    component: Topic,
    // beforeEnter: authGuard
  },
  {
    path: '/answer/:uuid',
    name: 'Answer',
    component: Answer,
    // beforeEnter: authGuard
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: authGuard
  },
  {
    path: '/information',
    name: 'Information',
    component: Information,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
})

export default router
