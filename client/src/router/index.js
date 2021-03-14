import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import About from "../views/About.vue";
import Dairy from "../views/Dairy";

import { CurrentUser } from "../models/Users";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/about", name: "About", component: About },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/dairy", name: "Dairy", component: Dairy },
  {
    path: "/User",
    name: "User",
    component: () => import("../views/User.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.isSecret && !CurrentUser) next("/login");
  else next();
});

export default router;