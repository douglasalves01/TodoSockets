<template>
  <div class="container-dashboard">
    <aside class="aside">
      <ListContent @pegarIdList="lidarComSelecaoDeItem" />
    </aside>
    <main>
      <div class="header">
        <HeaderContent :itemId="itemId" />
      </div>
      <div class="section">
        <CardTodo
          :itemId="itemId"
          id="card"
          todoStatus="To do"
          :borderColor="'#332E1D'"
        />
        <CardTodo
          :itemId="itemId"
          id="card"
          todoStatus="Doing"
          :borderColor="'#EFEBA9'"
        />
        <CardTodo
          :itemId="itemId"
          id="card"
          todoStatus="Done"
          :borderColor="'#9ADCB9'"
        />
      </div>
    </main>
  </div>
</template>

<style scope>
.message {
  display: flex;
  align-items: center;
  position: absolute;
  width: 350px;
  bottom: -10px;
  right: 10px;
  padding: 1em;
  border: 1px solid #000;
  margin: 0 auto;
  text-align: center;
  max-width: 60%;
  margin: 1em auto;
  border-radius: 2px;
}
.message i {
  margin-right: 1rem;
}

.success {
  color: #163f01;
  background-color: #d6fc92;
  border-color: #d6fc92;
}

.error {
  color: #602400;
  background-color: #fdefb0;
  border-color: #fdefb0;
}
.container-dashboard {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.aside {
  width: 25%;
}
main {
  width: 75%;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
}
.header {
  width: 100%;
  height: 15%;
}
.section {
  width: 100%;
  height: 85%;
  display: flex;
}
#card {
  margin-right: 1rem;
}
</style>

<script>
import ListContent from "../components/ListContent.vue";
import HeaderContent from "../components/HeaderContent.vue";
import CardTodo from "../components/CardTodo.vue";
export default {
  data() {
    return {
      itemId: null,
    };
  },

  components: {
    ListContent,
    HeaderContent,
    CardTodo,
  },
  methods: {
    lidarComSelecaoDeItem(itemId) {
      this.itemId = itemId;
    },
  },
};
</script>
