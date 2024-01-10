import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import "primeicons/primeicons.css";
router.beforeEach((to, from, next) => {
  // Verifica se a rota requer autenticação
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      // Se houver um token, permite o acesso à rota protegida
      next();
    }
    // Se não houver um token, redireciona para a página de login
    next({ name: "Login" });
  }
  // Para rotas que não requerem autenticação, permite o acesso diretamente
  next();
});

createApp(App).use(router).mount("#app");
