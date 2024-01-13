<template>
  <div class="container-card">
    <div class="card-header">
      <h3>{{ todoStatus }}</h3>
    </div>
    <div class="card-todos" :style="{ borderColor: borderColor }">
      <div
        class="todo"
        v-for="item in listaTodo"
        :key="item.id"
        :style="{ borderColor: borderColor }"
      >
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
            <option value="to do">To do</option>
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
        <div class="delete-todo">
          <button @click="deleteTodo(item)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { pusher } from "../main.js";

export default {
  data() {
    return {
      listaTodo: [],
      dados: {
        idList: this.itemId,
        status: this.todoStatus,
      },
    };
  },
  props: {
    todoStatus: {
      type: String,
      required: true,
    },
    //id da todo
    itemId: {
      type: String,
      default: null,
    },
    borderColor: {
      type: String,
      default: "#000",
    },
  },
  methods: {
    buscarStatusTodo() {
      const token = localStorage.getItem("token");

      // Configurar o token no cabeçalho 'Authorization'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .get(`http://localhost:5000/todo/status`, {
          params: {
            idList: this.itemId,
            status: this.todoStatus,
          },
        })
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
    deleteTodo(item) {
      const token = localStorage.getItem("token");

      // Configurar o token no cabeçalho 'Authorization'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .delete(`http://localhost:5000/todo/delete/${item.id}`, {
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
    ouvirPusher() {
      const channel = pusher.subscribe("my-channel");
      channel.bind("todo", (data) => {
        console.log("Aviso recebido:", data.message);

        this.buscarStatusTodo();
      });
    },
  },
  watch: {
    itemId: function (newItemId, oldItemId) {
      if (newItemId !== oldItemId) {
        this.dados.idList = newItemId;
        this.buscarStatusTodo();
      }
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
    this.ouvirPusher();
    this.buscarStatusTodo();
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
  width: 300px;
  height: 85px;
  background-color: #f66c0e0f;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
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
.delete-todo {
  margin-right: -12px;
  margin-top: -15px;
}
.delete-todo > button {
  background-color: #f66c0e0f;
  border: none;
  cursor: pointer;
}
.delete-todo > button:active {
  color: #00000083;
  border: none;
}
.todo-text {
  margin-right: 20px;
  width: 150px;
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
