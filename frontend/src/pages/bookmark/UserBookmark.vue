<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">내 북마크</span>
    </div>
    <div class="half d-flex justify-content-between">
      <div class="card-line w-70">
        <div class="card mb-4">
          <div class="form-floating">
            <div class="card-body">
              <!-- 1회만 클릭하고 다시 여기로 안돌아오면 해결 -->
              <PostWrite />
            </div>
          </div>
        </div>
        <WrittenPosts v-for="post in mainPosts" :key="post.id" :post="post" />
      </div>
      <div class="w-30 search-tag-line d-flex justify-content-between ml-3">
        <div class="d-flex flex-column w-100">
          <HashFilter />
          <RecommendTag />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HashFilter from "@/components/HashFilter.vue";
import RecommendTag from "@/components/RecommendTag.vue";
import WrittenPosts from "@/components/WrittenPosts.vue";
import PostWrite from "../../components/PostWrite.vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
// import axios from "@/axios";

export default {
  // 화면 실행전 미리 데이터를 준비하는 것
  // observer intersection
  fetch({ store }) {
    store.dispatch("posts/loadPosts");
  },
  setup() {
    const store = useStore();

    const me = computed(() => {
      return store.state.users.me;
    });

    const mainPosts = computed(() => {
      return store.state.posts.mainPosts;
    });

    const handleScrolledToBottom = () => {
      console.log("k");
    };
    return { handleScrolledToBottom, me, mainPosts };
  },

  components: { HashFilter, RecommendTag, WrittenPosts, PostWrite },
  middleware: "authenticated",
};
</script>

<style lang="sass" scoped>
a
  text-decoration: none
  cursor: pointer

.card
  padding: 20px 15px
</style>
