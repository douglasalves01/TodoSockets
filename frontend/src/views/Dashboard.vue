<template>
  <div class="container-dashboard">
    <aside class="aside">
      <ListContent />
    </aside>
    <main>
      <div class="header">
        <HeaderContent />
      </div>
      <div class="section">
        <CardTodo todoStatus="To do" />
        <CardTodo todoStatus="Doing" />
        <CardTodo todoStatus="Done" />
      </div>
    </main>
  </div>
</template>

<style scope>
.container-dashboard {
  width: 100vw;
  height: 100vh;
  display: flex;
}
aside {
  width: 25%;
  border-right: 1px solid;
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
</style>

<script>
import ListContent from "../components/ListContent.vue";
import HeaderContent from "../components/HeaderContent.vue";
import CardTodo from "../components/CardTodo.vue";
export default {
  components: {
    ListContent,
    HeaderContent,
    CardTodo,
  },
};
</script>
