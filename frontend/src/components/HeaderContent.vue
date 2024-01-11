<template>
  <div class="container-header">
    <h1>Homework</h1>
    <p>ID da Lista do Pai: {{ itemId }}</p>
    <div class="options">
      <button class="options-button">Deletar</button>
      <button class="options-button" @click="abrirModal()">+ Add To Do</button>
      <ModalTodo v-if="mostrarModal" @fechar="fecharModal" />
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
import ModalTodo from "./ModalTodo.vue";
export default {
  props: {
    itemId: {
      type: String,
      default: null,
    },
  },
  watch: {
    itemId(newValue, oldValue) {
      // Faça algo quando o valor mudar
      console.log(`Novo valor da propriedade itemId: ${newValue}`);
    },
  },
  components: {
    ModalTodo,
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
