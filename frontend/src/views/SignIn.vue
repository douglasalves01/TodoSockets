<template>
  <div class="container">
    <div class="content-image">
      <ImageSection />
    </div>
    <div class="content-form">
      <h2>Login</h2>
      <form v-on:submit.prevent="handleSubmitForm()" action="" method="post">
        <fieldset>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model="dados.email" />
        </fieldset>
        <fieldset>
          <label for="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="dados.password"
          />
        </fieldset>
        <input type="submit" value="Login" />
      </form>
      <p>
        Não tem uma conta ainda?
        <router-link to="/register">Clique aqui!</router-link>
      </p>
      <div v-if="successMessage" class="message success">
        <i class="pi pi-check" style="font-size: 2rem"></i>
        {{ successMessage }}
      </div>
      <div v-if="errorMessages.length > 0" class="message error">
        <p v-for="message in errorMessages" :key="message">
          <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem"></i>
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "../views/Dashboard.vue";
import ImageSection from "../components/ImageSection.vue";
import router from "../router/router.js";
import axios from "axios";
export default {
  data() {
    return {
      dados: {
        email: "",
        password: "",
      },
      successMessage: "",
      errorMessages: [],
    };
  },
  methods: {
    handleSubmitForm() {
      this.errorMessages = [];
      this.successMessage = "";
      axios
        .post("http://localhost:5000/users/login", this.dados)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem("token", token);
            this.successMessage = "Login realizado com sucesso!";
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.errorMessages = [error.response.data.message];
          } else {
            this.errorMessages = ["Erro desconhecido ao tentar fazer login."];
          }
        });
    },
  },
  components: { ImageSection },
};
</script>

<style lang="css">
fieldset {
  border: none;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;

  border-radius: 50rem 0 0 50px;
}
.content-image {
  width: 35%;
  background-color: #5ac7aa;
}
.content-form {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content-form h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
a {
  color: inherit;
}
.content-form p {
  color: #808080;
  font-size: 1.2rem;
  font-weight: 500;
}
.content-form fieldset {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.content-form input {
  padding: 0.8rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  color: #808080;
}
form {
  width: 60%;
}
fieldset > label {
  font-size: 1.5rem;
  font-weight: 500;
  color: #808080;
}
fieldset input {
  border-top: none;
  border-left: none;
  border-right: none;
}
fieldset input:focus {
  outline: none;
}
.content-form input[type="submit"] {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  width: 100%;
  margin-bottom: 1rem;
  background-color: #5ac7aa;
  border-radius: 8px;
  border: none;
}
.content-form input[type="submit"]:active {
  background-color: #5ac7aada;
}
</style>
