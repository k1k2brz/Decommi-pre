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
              <PostWrite @Completed="Completed($event)" />
            </div>
          </div>
        </div>
        <WrittenPosts
          v-for="(post, index) in state.mainPosts"
          :key="post + index"
          :post="post"
          @onClickTag="onClickTag"
        />
      </div>
      <div class="w-30 search-tag-line d-flex justify-content-between ml-3">
        <div class="d-flex flex-column w-100">
          <div class="d-flex justify-content-center align-items-center mb-3">
            <input
              type="text"
              class="form-control serviceSearch mr-2"
              ref="searchInput"
              v-model="state.searchInput"
              @keyup.enter="btnSearch"
            />
            <button @click="btnSearch" class="btn-regular">입력</button>
          </div>
          <!-- <HashFilter /> -->
          <RecommendTag  @onClickRecommendTag="onClickRecommendTag" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HashFilter from "@/components/HashFilter.vue";
import RecommendTag from "@/components/RecommendTag.vue";
import WrittenPosts from "@/components/WrittenPosts.vue";
import PostWrite from "@/components/PostWrite.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
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
    const router = useRouter();
    const searchInput = ref("");
    let state = reactive({
      mainPosts: [],
      body: 1,
      stopScrolling: true,
      dtoList: store.state.posts.dtoList,
      searchInput: "",
      btn: false,
    });

    const me = computed(() => {
      return store.state.users.me;
    });

    // 비로그인시 home으로 보내버림
    function homeRouter() {
      if (store.state.users.me == "" || store.state.users.me == null) {
        router.push({
          name: "Home",
        });
      }
    }
    homeRouter();
    onMounted(() => {
      getMorePostList();
    });

    if (localStorage.getItem("Content") !== null) {
      localStorage.removeItem("Content");
    }

    const onClickTag = async (event) => {
      try {
        const url = "/decommi/diary/list/bytagname";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          tagName: event,
          // page: 1,
          // size: 5,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            state.mainPosts = [];
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
            router.push(`/mainpage?tagsearch=${event}`);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    const onClickRecommendTag = async (event) => {
      try {
        const url = "/decommi/diary/list/bytagname";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          tagName: event,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            state.mainPosts = [];
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
            router.push(`/mainpage?tagsearch=?${event}`);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    // 게시글 불러오기
    const getMorePostList = async () => {
      state.stopScrolling == true;
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      const body = {
        page: state.body,
      };
      await axios.post("/decommi/diary/list", body, { headers }).then((res) => {
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

    // 스크롤이 5로 나눠떨어지면 false 아니면 true
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

    const Completed = () => {
      getMorePostList();
    };

    // 검색
    const btnSearch = async () => {
      if (state.searchInput == "") {
        alert("검색어를 입력해주세요");
        searchInput.value.focus();
        return;
      }
      // let keyword2 = localStorage.getItem("tagList");
      // console.log(keyword2);
      // let keyword = localStorage.getItem("tagList");
      // if (keyword !== null && keyword !== "") {
      //   let kwd = keyword.split(",");
      //   // store.dispatch("posts/setSearch", {
      //   //   type: "s",
      //   //   keyword: state.searchInput,
      //   //   tagList: kwd,
      //   //   writer: store.state.users.me.id,
      //   //   Authorization: store.state.users.me.token,
      //   //   mid: store.state.users.me.mid,
      //   // });
      //   try {
      //     const url = "/decommi/diary/list";
      //     const headers = {
      //       "Content-Type": "application/json",
      //       Authorization: store.state.users.me.token,
      //       mid: store.state.users.me.mid,
      //     };
      //     const body = {
      //       type: "s",
      //       keyword: state.searchInput,
      //       tagList: kwd,
      //       writer: store.state.users.me.id,
      //     };
      //     console.log(body);
      //     state.mainPosts = [];
      //     await axios.post(url, body, { headers }).then((res) => {
      //       console.log(res.data);
      //       if (state.body == 0) {
      //         state.mainPosts = res.data;
      //       } else {
      //         // '5' 라는 숫자 전부 백엔드 페이지 사이즈에 맞춰 바꿀 것
      //         for (let i = 0; i < res.data.length; i++) {
      //           state.mainPosts.push(res.data[i]);
      //         }
      //       }
      //       if (res.data.length % 5 !== 0) {
      //         state.stopScrolling = true;
      //       } else if (res.data.length % 5 == 0) {
      //         state.stopScrolling = false;
      //       }
      //     });
      //   } catch (err) {
      //     console.error(err);
      //   }
      // } else if (!keyword || keyword == "") {
      try {
        const url = "/decommi/diary/list";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          keyword: state.searchInput,
          // type: "s",
          writer: store.state.users.me.id,
        };
        console.log(body);
        await axios.post(url, body, { headers }).then((res) => {
          state.mainPosts = [];
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
          router.push(`mainpage?search=${state.searchInput}`);
        });
      } catch (err) {
        console.error(err);
      }
      // }
      // let tmp = localStorage.getItem("tagList").split(",");
      // tmp.push(state.searchInput);
      state.searchInput == "";
      searchInput.value.focus();
    };

    const searchList = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      const body = {
        page: state.body,
      };
      await axios.post("/decommi/diary/list", body, { headers }).then((res) => {
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

    return {
      me,
      state,
      getMorePostList,
      Completed,
      searchList,
      btnSearch,
      searchInput,
      onClickTag,
      onClickRecommendTag,
      homeRouter,
    };
  },

  components: { RecommendTag, WrittenPosts, PostWrite },
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
