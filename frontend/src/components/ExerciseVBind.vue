<template>
  <div :class="nameClass">{{ name }}</div>
  <input :type="type" :value="name" />
  <!-- v-bind를 빼면 그냥 string -->
  <button class="btn btn-primary" @click="updateNeme">Click</button>
</template>

<script>
import { ref } from "vue";
// 화면변경은 ref

export default {
  setup() {
    const name = ref("VUE");
    const type = ref("number");
    const nameClass = ref("name");

    const updateNeme = () => {
      name.value = "Start";
      // ref를 사용했을 시 .value를 적어주어야 한다.
      type.value = "text";
    };
    return {
      name,
      updateNeme,
      type,
      nameClass,
    };
  },
};
</script>
