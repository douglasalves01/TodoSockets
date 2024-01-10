<template>
  <div class="container-header">
    <h1>Homework</h1>
    <div class="options">
      <button class="options-button">Deletar</button>
      <button class="options-button" @click="abrirModal()">+ Add To Do</button>
      <ModalList v-if="mostrarModal" @fechar="fecharModal" />
      <button class="options-button">+ Invite people</button>
    </div>
  </div>
</template>
<style scope>
.container-header {
  display: flex;
  justify-content: space-between;
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
</style>
<script>
import ModalList from "./ModalTodo.vue";
export default {
  components: {
    ModalList,
  },
  data() {
    return {
      mostrarModal: false,
      listaDeItens: [],
      itemSelecionado: null,
    };
  },
  methods: {
    abrirModal() {
      this.mostrarModal = true; // Exibir o modal ao clicar no botão "adicionar"
    },
    fecharModal() {
      this.mostrarModal = false; // Fechar o modal quando o evento 'fechar' for emitido
    },
  },
};
</script>
