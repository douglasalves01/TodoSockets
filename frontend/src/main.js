import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
import App from "./App.vue";

const routes = [
  { path: "/login", name: "Login", component: SignIn },
  { path: "/register", name: "Register", component: SignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

createApp(App).use(router).mount("#app");
