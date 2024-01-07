<template>
  <div class="container">
    <div class="content-image">teste imagem</div>
    <div class="content-form">
      <h2>Create Account</h2>
      <form v-on:submit.prevent="handleSubmitForm()" action="" method="post">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="name" name="name" id="name" v-model="dados.name" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model="dados.email" />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="dados.password"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmação de senha</label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            v-model="dados.confirmPassword"
          />
        </div>
        <input type="submit" value="Criar conta" />
      </form>
      <p>
        Já tem uma conta?
        <router-link to="/login">Clique aqui!</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dados: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {},
  },
};
</script>

<style lang="css" scoped>
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
.content-form .form-group {
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
