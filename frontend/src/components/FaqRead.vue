<template>
  <div class="top-margin">
    <div class="mb-4">
      <div class="home-title">
        <span class="home-title purple-color">FAQ</span>입니다.
      </div>
      <div class="home-title">무엇을 도와드릴까요?</div>
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
            <span class="days">{{ state.modDate.split("-")[0] }}.</span>
            <span class="days">{{ state.modDate.split("-")[1] }}.</span>
            <span class="days">{{
              state.modDate.split("-")[2].split("T")[0]
            }}</span>
          </div>

          <div v-if="state.writer == me.mid" class="d-flex">
            <!-- <button
              @click="onEditBtn"
              type="button"
              class="reportBtn reportBtnHover"
            >
              수정
            </button> -->
            <button
              @click="onRemoveBtn"
              type="button"
              class="reportBtn reportBtnHover"
            >
              삭제
            </button>
          </div>
        </div>
        <p class="card-text mb-4" v-html="state.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onBeforeMount } from "@vue/runtime-core";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let state = reactive({
      title: null,
      content: null,
      writer: null,
      regDate: null,
      modDate: null,
    });

    let hbno = new URLSearchParams(window.location.search).get("id");
    console.log(hbno);

    const mountedAxios = async () => {
      axios.post(`/decommi/help/read/${hbno}`).then((res) => {
        console.log(res.data);
        state.title = res.data.title;
        state.content = res.data.content;
        state.writer = res.data.writer;
        state.regDate = res.data.regDate;
        state.modDate = res.data.modDate;
      });
    };
    onBeforeMount(() => {
      mountedAxios();
    });

    const me = computed(() => {
      return store.state.users.me;
    });

    // const onEditBtn = async () => {
    //   try {
    //     const url = `/decommi/api/help/modify/${hbno}`;
    //     const headers = {
    //       "Content-Type": "application/json",
    //       Authorization: store.state.users.me.token,
    //       mid: store.state.users.me.mid,
    //     };
    //     const body = {
    //       hbno,
    //       writer: store.state.users.me.mid,
    //     };
    //     console.log(body);
    //     await axios
    //       .post(url, body, { headers })
    //       .then((res) => {
    //         // router.push(`/editPost?edit=${res.data.dino}`);
    //         console.log("수정이동");
    //         console.log(res.data);
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    const onRemoveBtn = async () => {
      try {
        const url = `/decommi/api/help/delete/${hbno}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          hbno,
          writer: store.state.users.me.mid,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data);
            router.push({
              name:'ServiceFaq'
            });
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    return {
      state,
      mountedAxios,
      // onEditBtn,
      onRemoveBtn,
      me,
    };
  },
};
</script>
