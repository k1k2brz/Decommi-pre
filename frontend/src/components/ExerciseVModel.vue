<template>
  <input type="text" v-model="name" />
  <!-- v-bind를 빼면 그냥 string -->
  <button class="btn btn-primary" @click="onSubmit">Click</button>
</template>

<script>
import { ref } from "vue";
// 화면변경은 ref

export default {
  setup() {
    const name = ref("VUE");

    const onSubmit = () => {
      console.log(name.value);
    };
    // const updateNeme = (e) => {
    //   name.value = e.target.value;
    // }; -> v-model을 쓰면 쉽다
    return {
      name,
      onSubmit,
    };
  },
};
</script>
