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
          <!-- <PostMenu class="pl-3" :onEditBtn="onEditBtn" :onRemoveBtn="onRemoveBtn" /> -->
        </div>
        <!-- <div class="small-text mb-4">
          <span class="days">{{ state.regDate.split("-")[0] }}.</span>
          <span class="days">{{ state.regDate.split("-")[1] }}.</span>
          <span class="days">{{
          state.regDate.split("-")[2].split("T")[0]
          }}</span>
          <span class="ml-1 lastTime margin5">{{
          getTimeFromJavaDate(state.regDate)
          }}</span>
        </div> -->
        <hr />
        <img src="@/assets/mainimg2.jpg" class="card-img-top mb-4 mt-4" alt="none" />
        <p class="card-text mb-4">{{ state.content }}</p>
        <div class="mb-2 d-flex justify-content-between flex-column">
          <div class="mb-3 d-flex gap-1">
            <button type="button" class="btn-tag-sm d-flex" v-for="tag in state.tags" :key="tag">
              {{ tag }}
            </button>
          </div>
          <!-- icon -->
          <div class="d-flex justify-content-start">
            <WrittenPostsBookmark :dino="state.dino" />
            <WrittenPostsHeart :dino="state.dino" />
            <ReportModal :dino="state.dino" />
          </div>
          <WrittenComments :dino="state.dino" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { reactive } from "@vue/reactivity";
// import { useStore } from "vuex";
// import { useRouter } from "vuex";
import axios from "axios";
import { onBeforeMount } from "vue";
import WrittenPostsBookmark from "./WrittenPostsBookmark.vue";
import WrittenPostsHeart from "./WrittenPostsHeart.vue";
import WrittenComments from "./WrittenComments.vue";
import ReportModal from "./ReportModal.vue";

export default {
  setup() {
    // const store = useStore();
    // const router = useRouter();
    // 여기 CSS 수정하기
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
    });
    let dino = new URLSearchParams(window.location.search).get("id");
    state.dino = parseInt(`${dino}`)
    // if (dino.length == 0) {
    //   errorAndGetBack();
    // }
    // function errorAndGetBack() {
    //   alert("잘못된 접근입니다");
    //   router.push("/");
    // }
    function getTimeFromJavaDate(s) {
      const cont = new Date(s);
      let date = new Date();
      let calculated = (new Date(date.getTime()) - cont) / 1000; //초 계산
      if (calculated < 60) {
        return "방금 전";
      }
      else if (calculated < 60 * 60) {
        return `${Math.round(calculated / 60)}분 전`;
      }
      else if (calculated < 60 * 60 * 24) {
        return `${Math.round(calculated / (60 * 60))}시간 전`;
      }
      else if (calculated < 60 * 60 * 24 * 7) {
        return `${Math.round(calculated / (60 * 60 * 24))}일 전`;
      }
      else if (calculated < 60 * 60 * 24 * 7 * 5) {
        return `${Math.round(calculated / (60 * 60 * 24 * 7))}주 전`;
      }
      else if (calculated > 31536000) {
        return `${Math.round(calculated / 31536000)}년 전`;
      }
    }
    const mountedAxios = async () => {
      await axios.get(`./diary/read/${dino}`).then((res) => {
        console.log(res.data.diaryPost);
        state.regDate = getTimeFromJavaDate(res.data.diaryPost.regDate);
        state.title = res.data.diaryPost.title;
        state.content = res.data.diaryPost.content;
        state.openYN = res.data.diaryPost.openYN;
        state.replyYN = res.data.diaryPost.replyYN;
        state.modDate = res.data.diaryPost.modDate;
        state.tags = res.data.diaryPost.tagList;
      });
    };
    onBeforeMount(() => {
      mountedAxios();
    });
    return { state, mountedAxios };
  },
  components: { WrittenPostsBookmark, WrittenPostsHeart, ReportModal, WrittenComments }
};
</script>
  
<style>

</style>