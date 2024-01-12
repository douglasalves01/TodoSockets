<template>
  <div class="container-list">
    <div class="config-content">
      <button>
        <i
          class="pi pi-user"
          style="font-size: 1.5rem; color: #808080b2; font-weight: 600"
        ></i>
      </button>
      <button>
        <i
          class="pi pi-cog"
          style="font-size: 1.5rem; color: #808080b2; font-weight: 600"
        ></i>
      </button>
    </div>
    <div class="list-content">
      <div class="list-header">
        <h1>Lists</h1>
        <button @click="abrirModal()">
          <i
            class="pi pi-plus"
            style="font-size: 1rem; color: #fff; font-weight: 600"
          ></i>
        </button>
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
          <h4>{{ item.title }}</h4>
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
            if (this.listaDeItens.length > 0) {
              this.selecionarItem(this.listaDeItens[0]);
            }
          }
        })
        .catch((error) => {
          const message = error.response.data.message;
          console.log(message);
        });
    },
    selecionarItem(item) {
      this.itemSelecionado = item;

      this.$emit("pegarIdList", item.id);
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
  border-right: 1px solid #808080b2;
}
.config-content {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #808080b2;
  padding: 0.5rem 1rem;
}
.config-content button {
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: none;
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
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #808080b2;
}
.list-header h1 {
  color: #808080b2;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2rem;
}
.list-header button {
  padding: 0.6rem 0.8rem;
  border-radius: 5px;
  background-color: #5ac7aa;
  border: none;
}
.list-data {
  width: 100%;
  cursor: pointer;
}

.list {
  padding: 1.2rem 1rem;
}
.list h4 {
  color: #1d212d;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.list p {
  color: #5d6c87;
}
.list.selected {
  background-color: #f0f0f0;
  border-right: 4px solid #5ac7aa;
}
</style>
