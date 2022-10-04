<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">나의 관심태그</span>
    </div>
  </div>
  <div class="p-0 m-0">
    <div class="MiniPostGrid gap-3">
      <!-- props로 보낸 데이터 받을 것 -->
      <MiniPost v-for="content in 6" :key="content" />
    </div>
  </div>
</template>

<script>
import MiniPost from "@/components/MiniPost.vue";
export default {
  components: { MiniPost },
};
</script>

<style lang="sass" scoped></style>
