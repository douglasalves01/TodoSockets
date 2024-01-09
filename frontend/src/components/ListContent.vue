<template>
  <div class="container-list">
    <div class="config-content">
      <button>user</button>
      <button>config</button>
    </div>
    <div class="list-content">
      <div class="list-header">
        <h1>List</h1>
        <button @click="abrirModal()">adicionar</button>
        <ModalList v-if="mostrarModal" @fechar="fecharModal" />
      </div>
      <div class="list-data">
        <p>title</p>
        <p>description</p>
      </div>
    </div>
  </div>
</template>
<script>
import ModalList from "./ModalList.vue";
export default {
  components: {
    ModalList,
  },
  data() {
    return {
      mostrarModal: false,
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
<style scope>
.container-list {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0.5rem 1rem;
}
.config-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  border-right: 1px solid #000;
}
.list-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
}
.list-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
</style>
