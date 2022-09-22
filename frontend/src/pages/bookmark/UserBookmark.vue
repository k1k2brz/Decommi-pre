<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">내 북마크</span>
    </div>
    <div class="MiniPostGrid gap-3">
      <MiniPost v-for="contents in 6" :key="contents" />
    </div>
  </div>
</template>

<script>
import MiniPost from '@/components/MiniPost.vue';

// import axios from "@/axios";

export default {
    middleware: "authenticated",
    components: { MiniPost }
};
</script>

<style lang="sass" scoped>
a
  text-decoration: none
  cursor: pointer

.card
  padding: 20px 15px
</style>
