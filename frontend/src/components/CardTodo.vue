<template>
  <div class="container-card">
    <div class="card-header">
      <h3>{{ todoStatus }}</h3>
    </div>
    <div class="card-todos">
      <div class="todo" v-for="item in listaTodo" :key="item.id">
        <div class="todo-text">
          <h4>
            <i
              class="pi pi-bookmark"
              style="font-size: 1rem; color: #000000d2; font-weight: 600"
            ></i
            >{{ item.title }}
          </h4>
          <p>{{ item.description }}</p>
        </div>
        <div class="todo-options">
          <select
            id="status"
            name="status"
            v-on:change="updateStatus(item)"
            v-model="item.status"
          >
            <option value="todo">To do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <p>
            <i
              class="pi pi-user"
              style="font-size: 1rem; color: #000000d2; font-weight: 600"
            ></i>
            {{ item.name }}
          </p>
        </div>
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
    updateStatus(item) {
      const token = localStorage.getItem("token");

      // Configurar o token no cabeçalho 'Authorization'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .patch(`http://localhost:5000/todo/edit/${item.id}`, {
          status: item.status,
        })
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
.card-todos {
  padding: 0.5rem;
  border-bottom: 4px solid #332e1d;
}
.todo {
  background-color: #f66c0e0f;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  margin-bottom: 10px;
  border: 2px dashed #000;
}

.todo-options select {
  font-weight: 400;
  font-size: 0.9rem;
  background-color: #f66c0e0f;
  border: 1px solid #ced2d9;
  padding: 0.1rem 0.5rem;
}
.todo-text {
  margin-right: 20px;
}
.todo-text h4 {
  margin-bottom: 10px;
  font-weight: 700;
}
.todo-text h4 > i {
  margin-right: 10px;
}
.todo-options select {
  margin-bottom: 10px;
}
.todo-options p > i {
  margin-right: 5px;
}
</style>
