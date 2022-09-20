<template>
  <div class="tagBox mt-3 d-flex flex-column">
    <div class="mt-4 mb-1 d-flex justify-content-center">
      <p class="filterTitle">나의 추천태그</p>
    </div>
    <div class="ml-2 mr-2 p-3 d-flex justify-content-between">
      <div class="gap-2 d-flex flex-wrap">
        <button
          v-for="(recotag, index) in recotags"
          :key="'recotag' + index"
          type="button"
          class="btn-tag-sm d-flex"
        >
          {{ recotag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  // props: ["recotags"],
  setup() {
    // console.log(props);
    const recotags = ref([
      "운동",
      "여행",
      "라이프스타일",
      "디지털카메라",
      "게임",
      "영화",
      "음악",
      "자동차",
      "패션",
    ]);
    return { recotags };
  },
};
</script>

<style lang="sass" scoped>
.tagBox
  border-radius: 5px
  min-height: 400px
</style>
