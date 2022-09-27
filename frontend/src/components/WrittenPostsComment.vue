<template>
  <div class="d-flex flex-column">
    <div>
      <button @click="bookmarkCmt" class="btn-icon">
        <div v-if="bmCmt" class="bi bi-chat-dots-fill icon-purple"></div>
        <div v-else class="bi bi-chat-dots"></div>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
// import { useStore } from "vuex";
export default {
  setup() {
    // const store = useStore();
    const bmCmt = ref(false);

    const bookmarkCmt = () => {
      bmCmt.value == true ? (bmCmt.value = false) : (bmCmt.value = true);
    };

    return {
      bookmarkCmt,
      bmCmt,
    };
  },
};
</script>

<style lang="sass" scoped>
.icon-purple
  color: #AE6FFF
</style>
