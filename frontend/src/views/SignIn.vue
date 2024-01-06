<template>
  <h2>Login</h2>
  <form action="" method="post">
    <fieldset>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
    </fieldset>
    <fieldset>
      <label for="password">Senha</label>
      <input type="password" name="password" id="password" />
    </fieldset>
  </form>
  <p>
    Não tem uma conta ainda?
    <router-link to="/register">Clique aqui!</router-link>
  </p>
</template>
