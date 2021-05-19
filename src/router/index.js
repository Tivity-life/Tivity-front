import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/home/home.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('../components/signUp/signUp.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login/login.vue"),
  },
  {
    path: "/todolist",
    name: "todolist",
    component: () => import("../components/todolist/todo.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../components/home/about.vue"),
  },
  {
    path: "/start",
    name: "start",
    component: () => import("../components/start/start.vue"),
  },
  {
    path: "/to-do",
    name: "to-do",
    component: () => import("../components/todolist/todo.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../components/map/map.vue"),
  },
  {
    path: "/habits",
    name: "habits",
    component: () => import("../components/habit-tracker/habit.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../components/calendar/Calendar.vue"),
  },
  {
    path: "/homepage",
    name: "homepage",
    component: () => import("../components/homepage/homepage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// Save in the local storage each last movement of the router.
router.afterEach((to, from, next) => {
  localStorage.setItem("/tivity/lastPosition", from.path);
});

export default router
