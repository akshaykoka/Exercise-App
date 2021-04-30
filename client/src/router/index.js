import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import About from "../views/About.vue";
import Tools from "../views/Tools.vue";
import User from "../views/User.vue";
import BMI from "../views/BMI.vue";
import Exercise from "../views/Exercise.vue";
import Food from "../views/Food.vue";
import People from "../views/People.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home, meta: { requiresAuth: true } },
  { path: "/login", name: "Login", component: Login, meta: { guest: true } },
  { path: "/about", name: "About", component: About },
  { path: "/signup", name: "Signup", component: Signup, meta: { guest: true } },
  {
    path: "/tools",
    name: "Tools",
    component: Tools,
    meta: { requiresAuth: true },
  },
  {
    path: "/food",
    name: "Food",
    component: Food,
    meta: { requiresAuth: true },
  },
  {
    path: "/exercise",
    name: "Exercise",
    component: Exercise,
    meta: { requiresAuth: true },
  },
  {
    path: "/bmi",
    name: "BMI",
    component: BMI,
    meta: { requiresAuth: true },
  },
  {
    path: "/User",
    name: "User",
    component: User,
    meta: { requiresAuth: true },
  },
  {
    path: "/people",
    name: "People",
    component: People,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
