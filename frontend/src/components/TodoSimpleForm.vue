<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </div>
    <div v-show="hasError" style="color: red">This field cannot be empty</div>
  </form>
</template>

<script>
import { ref, getCurrentInstance } from "vue";

export default {
  emits: ["add-todo"],
  // 부모 컴포넌트를 받기 위해 props, context
  setup() {
    const { emit } = getCurrentInstance();
    const todo = ref("");
    const hasError = ref(false);
    const onSubmit = () => {
      // preventDefault없이 위에 .prevent로 가능
      // input에 넣은 값 받아오게끔
      if (todo.value === "") {
        hasError.value = true;
      } else {
        // 자식 컴포넌트에서 부모 컴포넌트로 보내기 위해
        emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        // todos.value.push({
        //   // private key가 없으니 Date.now
        //   id: Date.now(),
        //   subject: todo.value,
        //   completed: false,
        // });
        hasError.value = false;
        todo.value = "";
      }
    };
    return {
      todo,
      hasError,
      onSubmit,
    };
  },
};
</script>

<style></style>
