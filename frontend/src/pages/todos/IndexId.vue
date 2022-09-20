<template>
  <h1>To-Do Page</h1>
  <!-- 차이점을 주기 위해 editing을 받아옴 -->
  <TodoForm :editing="true" />
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
