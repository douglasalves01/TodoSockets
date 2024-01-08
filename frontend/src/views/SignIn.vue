<template>
  <div class="container">
    <div class="content-image">Teste imagem login</div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dados: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      axios
        .post("http:localhost:5000/users/login", this.dados)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem("token", token);
          }
        })
        .catch((error) => {
          const message = error.response.data.message;
          console.log(message);
        });
    },
  },
};
</script>

<style lang="css" scoped>
fieldset {
  border: none;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.content-image {
  width: 35%;
  background-color: rgb(92, 192, 220);
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
  margin-bottom: 1rem;
}
.content-form fieldset {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.content-form input {
  padding: 0.8rem 0;
}
form {
  width: 60%;
}
.content-form input[type="submit"] {
  width: 100%;
  margin-bottom: 1rem;
}
</style>
