<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">게시글</span>
    </div>
    </div>
  <div>
    <div
      class="card mb-4"
    >
      <div class="card-body mt-3 mb-3 ml-4 mr-4 p-4">
        <div class="d-flex justify-content-between">
          <h5 type="button" class="card-title">
            {{ state.title }}
          </h5>
          <div class="d-flex flex-column">
          </div>
        </div>
      </div>
    </div>
  </div>
  {{state.title}}
</template>

<script>
import { reactive } from "@vue/reactivity";
// import { useStore } from "vuex";
// import { useRouter } from "vuex";
import axios from "axios";

export default {
  setup() {
    // const store = useStore();
    // const router = useRouter();

    // 여기 CSS 수정하기

    const state = reactive({
      dino: "",
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

    axios.get(`./diary/read/${dino}`).then((res) => {
      console.log(res.data.diaryPost);
      state.regDate = getTimeFromJavaDate(res.data.diaryPost.regDate);
      state.dino = res.data.diaryPost.dino;
      state.title = res.data.diaryPost.title;
      state.content = res.data.diaryPost.content;
      state.openYN = res.data.diaryPost.openYN;
      state.replyYN = res.data.diaryPost.replyYN;
      state.modDate = res.data.diaryPost.modDate;
    });

    return { state };
  },
};
</script>

<style></style>
