<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">Todo list</span>
    </div>
  </div>
  <TodoForm />
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";

export default {
  components: {
    TodoForm,
  },
};
</script>

<style></style>
