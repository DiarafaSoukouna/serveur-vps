import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// views

import Profile from "./views/Profile.vue";
import login from "./views/login.vue";
import Details from "./views/details.vue";
import vps from "./views/vps.vue";
import base from "./views/base.vue";
import expire from "./views/expire.vue";
import auth from "/auth";
import domaine from "./views/domaine.vue";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "feather-icons/dist/feather";

// mouting point for the whole app

import App from "@/App.vue";

// routes

const routes = [
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  { path: "/details", component: Details },
  { path: "/vps", component: vps },
  { path: "/base", component: base },
  { path: "/expire", component: expire },
  { path: "/domaine", component: domaine },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

createApp(App).use(router).mount("#app");
