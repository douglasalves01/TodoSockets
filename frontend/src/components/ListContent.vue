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
        <div
          class="list"
          v-for="item in listaDeItens"
          :key="item.id"
          @click="selecionarItem(item)"
          :class="{ selected: itemSelecionado === item }"
        >
          <p>{{ item.title }}</p>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ModalList from "./ModalList.vue";
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
    buscarListas() {
      const token = localStorage.getItem("token");

      // Configurar o token no cabeçalho 'Authorization'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:5000/list")
        .then((response) => {
          if (response.status === 200) {
            this.listaDeItens = response.data.data;
          }
        })
        .catch((error) => {
          const message = error.response.data.message;
          console.log(message);
        });
    },
    selecionarItem(item) {
      if (this.itemSelecionado === item) {
        this.itemSelecionado = null;
      } else {
        this.itemSelecionado = item;
      }
    },
  },
  mounted() {
    this.buscarListas();
  },
};
</script>
<style scope>
.container-list {
  width: 100%;
  height: 100%;
  display: flex;
}
.config-content {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #000;
  padding: 0.5rem 1rem;
}
.list-content {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
}
.list-data {
  width: 100%;
  cursor: pointer;
}

.list {
  padding: 0.5rem 1rem;
}
.list.selected {
  background-color: #f0f0f0;
}
</style>
