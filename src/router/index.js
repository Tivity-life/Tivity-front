import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/home/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('../components/sign-in/signin.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/login.vue')
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: () => import('../components/todolist/todo.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/home/about.vue')
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('../components/start/start.vue')
  }, {
    path: '/to-do',
    name: 'to-do',
    component: () => import('../components/todolist/todo.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
