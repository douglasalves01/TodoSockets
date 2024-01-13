import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import "primeicons/primeicons.css";
import Pusher from "pusher-js";
const app = createApp(App);

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
Pusher.logToConsole = true;

export const pusher = new Pusher(import.meta.env.VITE_KEY_PUSHER, {
  cluster: import.meta.env.VITE_CLUSTER_PUSHER,
});

const channel = pusher.subscribe("my-channel");
channel.bind("my-event", function (data) {
  app.messages.push(JSON.stringify(data));
});

app.use(router).mount("#app");
