<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">홈</span>
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
              <!-- 1회만 클릭하고 다시 여기로 안돌아오면 해결 -->
              <PostWrite />
            </div>
          </div>
        </div>
        <WrittenPosts
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
import WrittenPosts from "@/components/WrittenPosts.vue";
import PostWrite from "@/components/PostWrite.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import axios from "@/axios";
// import axios from "@/axios";

export default {
  // 화면 실행전 미리 데이터를 준비하는 것
  // observer intersection
  // fetch({ store }) {
  //   store.dispatch("posts/loadPosts");
  // },
  setup() {
    const store = useStore();

    let state = reactive({
      mainPosts: [],
      body: 1,
      stopScrolling: true,
    });

    const me = computed(() => {
      return store.state.users.me;
    });

    onMounted(() => {
      getMorePostList();
    });

    const getMorePostList = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      const body = {
        page: state.body,
      };
      await axios
        .post("./decommi/diary/list", body, { headers })
        .then((res) => {
          if (state.body == 0) {
            state.mainPosts = res.data;
          } else {
            // '5' 라는 숫자 전부 백엔드 페이지 사이즈에 맞춰 바꿀 것
            for (let i = 0; i < res.data.length; i++) {
              state.mainPosts.push(res.data[i]);
            }
          }
          if (res.data.length % 5 !== 0) {
            state.stopScrolling = true;
          } else if (res.data.length % 5 == 0) {
            state.stopScrolling = false;
          }
        });
    };

    async function getMorePost() {
      if (state.stopScrolling == false) {
        state.body += 1;
        getMorePostList();
      } else if (state.stopScrolling == true) {
        return;
      }
    }

    window.addEventListener("scroll", windowSize);
    function windowSize() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 800
      ) {
        getMorePost();
      }
    }

    return { me, state, getMorePostList };
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
