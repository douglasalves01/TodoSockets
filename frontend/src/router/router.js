import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
const routes = [
  {
    path: "/",
    redirect: "/register",
  },
  { path: "/login", name: "Login", component: SignIn },
  { path: "/register", name: "Register", component: SignUp },
  {
    path: "/dashboard",
    name: "Dashoard",
    component: Dashboard,
    meta: { requiresAuth: true }, // Indica que a rota requer autenticação
  },
];

export default createRouter({
  history: createWebHistory(),
  routes: routes,
});
