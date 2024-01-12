<template>
  <div class="container-header">
    <h1>Homework</h1>
    <p>ID da Lista do Pai: {{ itemId }}</p>
    <div class="options">
      <button class="delete-button" @click="deletarLista(itemId)">
        <i class="pi pi-trash" style="font-size: 1.5rem"></i>
      </button>
      <button class="options-button" @click="abrirModal()">+ Add To Do</button>
      <ModalTodo :itemId="itemId" v-if="mostrarModal" @fechar="fecharModal" />
      <button class="options-button" @click="abrirModalPeople()">
        + Invite people
      </button>
      <ModalPeople
        :itemId="itemId"
        v-if="mostrarModalPeople"
        @fecharPeople="fecharModalPeople"
      />
    </div>
  </div>
</template>
<style scope>
.container-header {
  display: flex;
  justify-content: space-between;
}
.options {
  display: flex;
  align-items: center;
}
.options-button {
  padding: 0.5rem 2rem;
  background-color: #5ac7aa;
  border-radius: 4px;
  border: none;
  color: #fff;
  margin-right: 1.5rem;
}
.options-button:active {
  background-color: #5ac7aa;
  opacity: 0.8;
}
.delete-button {
  padding: 0.5rem 0.8rem;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #0000009a;
  color: #000000;
  margin-right: 1.5rem;
}
.delete-button:active {
  background-color: #ffffff88;
  opacity: 0.8;
}
</style>
<script>
import axios from "axios";
import ModalTodo from "./ModalTodo.vue";
import ModalPeople from "./ModalPeople.vue";
export default {
  props: {
    itemId: {
      type: String,
      default: null,
    },
  },
  components: {
    ModalTodo,
    ModalPeople,
  },
  data() {
    return {
      mostrarModal: false,
      mostrarModalPeople: false,
      listaDeItens: [],
      itemSelecionado: null,
    };
  },
  methods: {
    deletarLista() {
      const token = localStorage.getItem("token");

      // Configurar o token no cabeçalho 'Authorization'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .delete(`http://localhost:5000/list/delete/${this.itemId}`)
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
    abrirModal() {
      this.mostrarModal = true; // Exibir o modal ao clicar no botão "adicionar"
    },
    fecharModal() {
      this.mostrarModal = false; // Fechar o modal quando o evento 'fechar' for emitido
    },
    abrirModalPeople() {
      this.mostrarModalPeople = true;
    },
    fecharModalPeople() {
      this.mostrarModalPeople = false;
    },
  },
};
</script>
