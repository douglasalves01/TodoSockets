<template>
  <div class="modal">
    <div class="modal-content">
      <div class="header-content">
        <h2>List</h2>
        <button id="modal-button" @click="fecharModal">
          <i
            class="pi pi-times"
            style="font-size: 1.5rem; color: #808080b2"
          ></i>
        </button>
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
        <button type="submit">
          <i class="pi pi-check" style="font-size: 1rem; color: #fff"></i>Save
        </button>
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
.header-content {
  padding: 0.8rem 0.8rem;
  display: flex;
  justify-content: space-between;
}
.header-content h2 {
  font-size: 2rem;
  color: #242731;
}
#modal-button {
  background-color: #fff;
  cursor: pointer;
}
form {
  padding: 0.8rem;
}
input {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #9a9ea5;
  outline: none;
  padding: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 400;
}
form > button {
  color: #fff;
  font-size: 1rem;
  padding: 0.7rem 1.8rem;
  margin-top: 1rem;
  cursor: pointer;
}
form > button:active {
  background-color: #5ac7aa;
  opacity: 0.8;
}
fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
label {
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 0.1rem;
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
      this.errorMessages = [];
      this.successMessage = "";
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
          this.fecharModal();
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
};
</script>
