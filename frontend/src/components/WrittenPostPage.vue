<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">게시글</span>
    </div>
  </div>
  <div>
    <div class="card mb-4">
      <div class="card-body mt-4 mb-4 ml-5 mr-5 p-4">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">
            {{ state.title }}
          </h5>
        </div>
        <hr />
        <div class="small-text mb-4 d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <span class="days">{{ state.regDate.split("-")[0] }}.</span>
            <span class="days">{{ state.regDate.split("-")[1] }}.</span>
            <span class="days">{{
              state.regDate.split("-")[2].split("T")[0]
            }}</span>
            <span class="ml-1 lastTime margin5">{{
              getTimeFromJavaDate(state.regDate)
            }}</span>
          </div>
          <div v-if="state.writer == me.id" class="d-flex">
            <button
              @click="onEditBtn"
              type="button"
              class="reportBtn reportBtnHover"
            >
              수정
            </button>
            <button
              @click="onRemoveBtn"
              type="button"
              class="reportBtn reportBtnHover"
            >
              삭제
            </button>
          </div>
        </div>
        <!-- <img
          src="@/assets/mainimg2.jpg"
          class="card-img-top mb-4 mt-4"
          alt="none"
        /> -->
        <p class="card-text mb-4" v-html="state.content"></p>
        <div class="mb-2 d-flex justify-content-between flex-column">
          <div class="mb-3 d-flex gap-1">
            <button
              type="button"
              class="btn-tag-sm d-flex"
              v-for="tag in state.tags"
              :key="tag"
            >
              {{ tag }}
            </button>
          </div>
          <!-- icon -->
          <div
            v-if="state.writer !== me.id"
            class="d-flex justify-content-start"
          >
            <WrittenPostsBookmark :dino="state.dino" />
            <WrittenPostsHeart :dino="state.dino" />
            <ReportModal :dino="state.dino" />
          </div>
          <WrittenCommentsOrigin :dino="state.dino" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { computed, onBeforeMount } from "vue";
import WrittenPostsBookmark from "./WrittenPostsBookmark.vue";
import WrittenPostsHeart from "./WrittenPostsHeart.vue";
// import WrittenComments from "./WrittenComments.vue";
import ReportModal from "./ReportModal.vue";
import WrittenCommentsOrigin from "./WrittenCommentsOrigin.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      dino: null,
      title: null,
      content: null,
      Comments: [],
      Images: [],
      tags: [],
      openYN: null,
      replyYN: null,
      modDate: null,
      regDate: null,
      writer: null,
    });

    const onEditBtn = async () => {
      try {
        const url = "/decommi/api/diary/modify/check";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          dino: state.dino,
          writer: store.state.users.me.id,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            // reactive로 빼기
            // 누구나 수정 불가능하도록 고유번호 지정
            if (res.data.writer == store.state.users.me.id) {
              router.push(`/editPost?edit=${res.data.dino}`);
            } else {
              alert("수정할 권한이 없습니다");
              router.push({
                name: "Main",
              });
            }
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    const onRemoveBtn = async () => {
      try {
        const url = "/decommi/api/diary/delete";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          dino: state.dino,
          writer: store.state.users.me.id,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data);
            router.push({
              name: "Main",
            });
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    let dino = new URLSearchParams(window.location.search).get("id");
    state.dino = parseInt(`${dino}`);

    function getTimeFromJavaDate(s) {
      const cont = new Date(s);
      let date = new Date();
      let calculated = (new Date(date.getTime()) - cont) / 1000; //초 계산
      if (calculated < 60) {
        return "방금 전";
      } else if (calculated < 60 * 60) {
        return `${Math.round(calculated / 60)}분 전`;
      } else if (calculated < 60 * 60 * 24) {
        return `${Math.round(calculated / (60 * 60))}시간 전`;
      } else if (calculated < 60 * 60 * 24 * 7) {
        return `${Math.round(calculated / (60 * 60 * 24))}일 전`;
      } else if (calculated < 60 * 60 * 24 * 7 * 5) {
        return `${Math.round(calculated / (60 * 60 * 24 * 7))}주 전`;
      } else if (calculated > 31536000) {
        return `${Math.round(calculated / 31536000)}년 전`;
      }
    }
    const mountedAxios = async () => {
      await axios.get(`/decommi/diary/read/${dino}`).then((res) => {
        state.regDate = res.data.diaryPost.regDate;
        state.title = res.data.diaryPost.title;
        state.content = res.data.diaryPost.content;
        state.openYN = res.data.diaryPost.openYN;
        state.replyYN = res.data.diaryPost.replyYN;
        state.modDate = res.data.diaryPost.modDate;
        state.tags = res.data.diaryPost.tagList;
        state.writer = res.data.diaryPost.writer;
      });
    };
    onBeforeMount(() => {
      mountedAxios();
    });

    const me = computed(() => {
      return store.state.users.me;
    });

    return {
      state,
      mountedAxios,
      getTimeFromJavaDate,
      onEditBtn,
      onRemoveBtn,
      me,
    };
  },
  components: {
    WrittenPostsBookmark,
    WrittenPostsHeart,
    ReportModal,
    // WrittenComments,
    WrittenCommentsOrigin,
  },
};
</script>

<style lang="sass" scoped>
img
  max-width: 969px !important
</style>
