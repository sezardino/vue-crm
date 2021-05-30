import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "base" },
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/history",
    name: "History",
    meta: { layout: "base" },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/",
    name: "Home",
    meta: { layout: "base" },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/planing",
    name: "Planing",
    meta: { layout: "base" },
    component: () => import("../views/Planing.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "base" },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "Record",
    meta: { layout: "base" },
    component: () => import("../views/Record.vue"),
  },
  {
    path: "/records",
    name: "Records",
    meta: { layout: "base" },
    component: () => import("../views/Records.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "auth" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { layout: "auth" },
    component: () => import("../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
