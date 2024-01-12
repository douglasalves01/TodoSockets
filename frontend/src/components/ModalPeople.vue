<template>
  <div class="modal-people">
    <div class="modal-content-people">
      <div class="header-content">
        <h2>Invite People</h2>
        <button id="modal-button" @click="fecharModalPeople">
          <i
            class="pi pi-times"
            style="font-size: 1.5rem; color: #808080b2"
          ></i>
        </button>
      </div>
      <form action="" v-on:submit.prevent="handleSubmitForm()" method="post">
        <fieldset>
          <label for="title">Email</label>
          <input type="text" name="member" id="member" v-model="dados.member" />
        </fieldset>
        <button type="submit">
          <i class="pi pi-check" style="font-size: 1rem; color: #fff"></i>Save
        </button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.modal-people {
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

.modal-content-people {
  /* Estilos para o conteúdo do modal */
  background: #fff;
  width: 350px;
  height: 250px;
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
  border: none;
}
form {
  padding: 0.8rem;
}
input,
select {
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
  background-color: #5ac7aa;
  border: none;
  border-radius: 5px;
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
  props: {
    itemId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dados: {
        member: "",
        idList: this.itemId,
      },
    };
  },
  methods: {
    fecharModalPeople() {
      this.$emit("fecharPeople"); // Emitir evento para fechar o modal
    },
    handleSubmitForm() {
      const token = localStorage.getItem("token");

      // Configurar o token no cabeçalho 'Authorization'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .patch(`http://localhost:5000/list/edit/${this.itemId}`, this.dados)
        .then((response) => {
          if (response.status === 200) {
            const message = response.data.message;
            console.log(message);
          }
          this.fecharModalPeople();
        })
        .catch((error) => {
          const message = error.response.data.message;
          console.log(message);
        });
    },
  },
};
</script>
