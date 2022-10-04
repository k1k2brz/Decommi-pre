<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">내 다이어리</span>
    </div>
    <!-- <div> -->
    <!-- <span>날짜순</span>
            <div class="boundaryLine"></div>
            <span>북마크순</span>
            <div class="boundaryLine"></div>
            <span>하트순</span> -->
    <!-- </div> -->
    <div class="half d-flex justify-content-between">
      <div class="card-line w-70">
        <div class="card mb-4">
          <div class="form-floating">
            <div class="card-body">
              <PostWrite />
            </div>
          </div>
        </div>
        <WrittenMyDiary
          v-for="(post, index) in state.mainPosts"
          :key="post + index"
          :post="post"
        />
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
import PostWrite from "@/components/PostWrite.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import axios from "@/axios";
import WrittenMyDiary from "@/components/WrittenMyDiary.vue";

export default {
  // 화면 실행전 미리 데이터를 준비하는 것

  setup() {
    const store = useStore();

    const state = reactive({
      mainPosts: [],
    });

    const me = computed(() => {
      return store.state.users.me;
    });

    onMounted(async () => {
      try {
        const url = "/decommi/mydiary/list";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          // mid: store.state.users.me.mid,
          writer: store.state.users.me.id,
        };
        await axios.post(url, body, { headers }).then((res) => {
          state.mainPosts.length = 0;
          console.log(res.data);
          state.mainPosts = res.data;
        });
      } catch (err) {
        console.err(err);
      }
    });

    const handleScrolledToBottom = () => {
      console.log("k");
    };
    return { handleScrolledToBottom, me, state };
  },

  components: {
    HashFilter,
    RecommendTag,
    PostWrite,
    WrittenMyDiary,
  },
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
