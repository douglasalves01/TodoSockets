<template>
  <div class="container-card">
    <div class="card-header">
      <h3>{{ todoStatus }}</h3>
    </div>
    <div class="card-todos">
      <div class="todo" v-for="item in listaTodo" :key="item.id">
        <p>{{ item.title }}</p>
        <p>{{ item.description }}</p>
        <p>{{ item.status }}</p>
        <p>{{ item.member }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      listaTodo: [],
    };
  },
  props: {
    todoStatus: {
      type: String,
      required: true,
    },
  },
  methods: {
    buscarStatusTodo(status) {
      const token = localStorage.getItem("token");

      // Configurar o token no cabeçalho 'Authorization'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(`http://localhost:5000/todo/${status}`)
        .then((response) => {
          if (response.status === 200) {
            this.listaTodo = response.data.data;
          }
        })
        .catch((error) => {
          const message = error.response.data.message;
          console.log(message);
        });
    },
  },
  mounted() {
    let status = "";
    if (this.todoStatus === "To do") {
      status = "todo";
    } else if (this.todoStatus === "Doing") {
      status = "doing";
    } else if (this.todoStatus === "Done") {
      status = "done";
    }

    // Chamando a função buscarStatusTodo com a URL específica
    this.buscarStatusTodo(status);
  },
};
</script>

<style scope>
.container-card {
  width: 100%;
  height: 100%;
}
.card-header {
  width: 100%;
  padding: 0.2rem 0.5rem;
  background-color: #ededed;
  margin-bottom: 1rem;
}
</style>
