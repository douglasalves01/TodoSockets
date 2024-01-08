<template>
  <div class="container-card">
    <div class="header">
      <h3>{{ todoStatus }}</h3>
    </div>
    <div class="todos">
      <div class="card-todo">
        <p>title</p>
        <p>status</p>
        <p>description</p>
        <p>user</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todoStatus: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scope>
.container-card {
  width: 100%;
  height: 100%;
}
</style>
