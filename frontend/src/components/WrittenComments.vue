<template>
  <div>
    <!-- 그리드로 변경 -->
    <hr />
    <div>
      <div class="mb-3 d-flex justify-content-center gap-2">
        <input
          v-model="commentValue"
          @keyup.enter="addComment"
          type="text"
          class="comment serviceSearch w-100"
          placeholder="댓글을 입력해주세요."
        />
        <button @click="addComment" class="btn-regular">댓글입력</button>
      </div>
    </div>
    <div v-for="(cmt, index) in state.commentList" :key="cmt + index">
      <!-- :midCount="state.midCount[index]" -->
      <WrittenCommentsContent
        :dino="state.dino"
        :comment="cmt"
        @remove="remove(item, index)"
        @change="change($event)"
        @replyreply="replyreply"
      />
    </div>
    <button
      style="opacity: 90%"
      class="btn-regular-round mt-3 w-100"
      v-if="stateInfo"
      @click="btnreply()"
    >
      댓글 더 보기
    </button>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { ref, reactive } from "@vue/reactivity";
import WrittenCommentsContent from "./WrittenCommentsContent.vue";
import axios from "axios";

export default {
  props: {
    dino: {
      type: Number,
      required: true,
    },
    commentList: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { emit } = getCurrentInstance();
    // const router = useRouter();
    const headers = {
      "Content-Type": "application/json",
      Authorization: store.state.users.me.token,
      mid: store.state.users.me.mid,
    };
    let stateInfo = ref(false);
    const state = reactive({
      dino: props.dino,
      reqPage: 0,
      writer: store.state.users.me.id,
      commentList: [],
      pageTotalCount: 0,
      pageNumber: 0,
      duplicatedCheck: [],
      userNumber: 1,
      replyMidNum: [],
      midCount: [],
      counting: 1,
      pageArray: [],
      aaaa: 0,
    });

    // 코멘트 추가
    const addComment = async () => {
      if (!commentValue.value == "") {
        try {
          const url = "/decommi/api/diary/reply/add/";
          const body = {
            mid: store.state.users.me.mid,
            dino: state.dino,
            replyContent: commentValue.value,
          };
          console.log(body);
          await axios
            .post(url, body, { headers })
            .then((res) => {
              console.log(res.data);
              // 페이지를 0으로 초기화한다
              // state.reqPage = 0;
              replyreply();
            })
            .catch((err) => {
              console.error(err);
            });
        } catch (err) {
          console.error(err);
        }
      }
      commentValue.value = "";
    };

    // commenList를 초기화 하면서 다시 불러온다 (reactive 반응형 작동용)
    const replyMore = async () => {
      try {
        const body = {
          dino: state.dino,
          reqPage: state.reqPage,
          mid: store.state.users.me.mid,
        };
        // commnetList가 없을 때
        if (state.reqPage == 0) state.commentList = null;
        await axios
          .post(`/decommi/api/diary/reply/`, body, { headers })
          .then((res) => {
            console.log(res.data);
            if (res.data.replyList == undefined) {
              return;
            }
            state.commentList.push(...res.data.replyList);
            if (res.data.replyList.length % 5 == 0) {
              stateInfo.value = true;
            } else {
              stateInfo.value = false;
            }
          });
      } catch (err) {
        console.error(err);
      }
    };

    const replyMoreMore = async () => {
      try {
        const body = {
          dino: state.dino,
          reqPage: state.reqPage,
          mid: store.state.users.me.mid,
        };
        // commnetList가 없을 때
        if (state.reqPage == 0) state.commentList = null;
        await axios
          .post(`/decommi/api/diary/reply/`, body, { headers })
          .then((res) => {
            console.log(res.data);
            if (res.data.replyList == undefined) {
              return;
            }
            state.commentList.push(...res.data.replyList);
            if (res.data.replyList.length % 5 == 0) {
              stateInfo.value = true;
            } else {
              stateInfo.value = false;
            }
          });
      } catch (err) {
        console.error(err);
      }
    };

    // 버튼을 클릭했을 때 +1이 되고 reply가 실행되도록 하는 함수
    // 여기서 +1이 작동되어야 댓글이 부분이 안꼬임
    function btnreply() {
      state.reqPage += 1;
      stateInfo.value = false;
      reply();
    }
    // function replyEmit() {
    //   state.commentList = [];
    //   // console.log("replyreply");
    // }

    const reply = async () => {
      try {
        const body = {
          dino: state.dino,
          reqPage: state.reqPage,
          mid: store.state.users.me.mid,
        };
        // await replyEmit();
        await axios
          .post(`/decommi/api/diary/reply/`, body, { headers })
          .then((res) => {
            console.log("=======================");
            if (res.data.replyList == undefined) {
              return;
            }
            state.commentList.push(...res.data.replyList);
            if (res.data.replyList.length % 5 == 0) {
              stateInfo.value = true;
            } else {
              stateInfo.value = false;
            }
          });
        emit("reply", state.commentList);
      } catch (err) {
        console.error(err);
      }
    };

    reply();

    const onComment = ref(true);
    const cmtChangeBtn = ref(true);
    const commentValue = ref("");

    // 좋아요
    // false가 체크임
    const remove = async () => {
      // 댓글 삭제시 첫 댓글로 돌아감
      state.reqPage = 0;
      replyreply();
    };

    const change = (comment) => {
      console.log(comment);
    };

    const replyreply = async () => {
      // state.counting = 1;
      // state.replyMidNum = [];
      // state.midCount = [];
      state.commentList = [];

      state.aaaa = state.reqPage;
      state.reqPage = 0;
      await reply();
      await a();

      function a() {
        for (let index = 1; index <= state.aaaa; index++) {
          state.reqPage = index;
          replyMoreMore();
        }
      }
    };

    return {
      remove,
      onComment,
      cmtChangeBtn,
      commentValue,
      addComment,
      state,
      change,
      stateInfo,
      reply,
      btnreply,
      replyMore,
      replyreply,
    };
  },
  components: { WrittenCommentsContent },
};
</script>

<style lang="sass" scoped>
.comment
    border-radius: 10px
    border: 0.5px solid grey
    font-weight: 300
    &:focus
      outline: 0.5px solid #AE6FFF
    &::placeholder
      padding-left: 7px

.Maincomment
    display: grid
    grid-template-columns: 1fr 5fr 1fr
</style>
