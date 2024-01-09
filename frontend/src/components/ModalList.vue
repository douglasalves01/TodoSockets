<template>
  <div class="modal">
    <div class="modal-content">
      <div class="header-content">
        <h2>List</h2>
        <button @click="fecharModal">X</button>
      </div>
      <form action="" v-on:submit.prevent="handleSubmitForm()" method="post">
        <fieldset>
          <label for="title">Title</label>
          <input type="text" name="title" id="title" v-model="dados.title" />
        </fieldset>
        <fieldset>
          <label for="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            v-model="dados.description"
          />
        </fieldset>
        <fieldset>
          <label for="member">Member</label>
          <input
            type="email"
            name="member"
            id="member"
            v-model="dados.member"
          />
        </fieldset>
        <input type="submit" value="Salvar" />
      </form>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2); /* Fundo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  /* Estilos para o conteúdo do modal */
  background: #fff;
  width: 350px;
  height: 400px;
  border-radius: 4px;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dados: {
        title: "",
        description: "",
        member: "",
      },
    };
  },
  methods: {
    fecharModal() {
      this.$emit("fechar"); // Emitir evento para fechar o modal
    },
    handleSubmitForm() {
      const token = localStorage.getItem("token");

      // Configurar o token no cabeçalho 'Authorization'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .post("http://localhost:5000/list/create", this.dados)
        .then((response) => {
          if (response.status === 200) {
            const message = response.data.message;
            console.log(message);
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
