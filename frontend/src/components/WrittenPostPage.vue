<template>
  <h1>주소창 확인</h1>
  <h1>dasdasdasdas</h1>
  <h1>dasdasdasdas</h1>
  <h1>dasdasdasdas</h1>
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

    axios.get(`./diary/read/${dino}`).then((res) => {
      console.log(res);
      // state.regDate = getTimeFromJavaDate(res.data.state.regDate);
      // state.dino = res.data.state.dino;
      // state.title = res.data.state.title;
      // state.content = res.data.state.content;
      // state.openYN = res.data.state.openYN;
      // state.replyYN = res.data.state.replyYN;
      // state.modDate = res.data.state.modDate;
    });

    return { state };
  },
};
</script>

<style></style>
