import firebase from "firebase/app";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "base", auth: true },
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/history",
    name: "History",
    meta: { layout: "base", auth: true },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/",
    name: "Home",
    meta: { layout: "base", auth: true },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/planing",
    name: "Planing",
    meta: { layout: "base", auth: true },
    component: () => import("../views/Planing.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "base", auth: true },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "Record",
    meta: { layout: "base", auth: true },
    component: () => import("../views/Record.vue"),
  },
  {
    path: "/details/:id",
    name: "Record details",
    meta: { layout: "base", auth: true },
    component: () => import("../views/Details.vue"),
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

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const reqAuth = to.meta.auth;
  if (reqAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
