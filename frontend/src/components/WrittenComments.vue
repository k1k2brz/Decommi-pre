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
      <WrittenCommentsContent
        :dino="state.dino"
        :midCount="state.midCount[index]"
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
  <!-- <PageInfinite /> -->
</template>

<script>
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { ref, reactive } from "@vue/reactivity";
import WrittenCommentsContent from "./WrittenCommentsContent.vue";
import axios from "axios";
// import PageInfinite from "./PageInfinite.vue";

export default {
  props: {
    dino: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
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
      pageee: 0,
      duplicatedCheck: [],
      userNumber: 1,
      replyMidNum: [],
      midCount: [],
      counting: 1,
    });

    console.log(state.midCount)
    console.log(state.replyMidNum)

    // console.log(state.midCount);

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
              // if (state.duplicatedCheck.includes(res.data.mid) == false) {
              //   state.duplicatedCheck.push(store.state.users.me.mid);
              //   console.log(state.duplicatedCheck);
              // } else {
              //   const dp = state.duplicatedCheck.indexOf(
              //     store.state.users.me.mid
              //   );
              //   console.log(dp);
              // }
              // 페이지를 0으로 초기화한다
              state.reqPage = 0;
              replyMore();
              // replyMore()
              // for (let index = 0; index <= state.reqPage; index++) {
              //   replyMoreAddComment(index);
              // }

              // commentList.push(commentValue.value);
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
            // 페이지 중복을 막기 위한 초기화
            state.counting = 1;
            state.replyMidNum = [];
            state.midCount = [];
            for (let index = 0; index < res.data.replyList.length; index++) {
              const element = res.data.replyList[index].mid;
              if (!state.replyMidNum.includes(element)) {
                state.replyMidNum.push(element);
              }
              if (state.replyMidNum.indexOf(element) !== -1 && state.midCount) {
                state.midCount.push(state.replyMidNum.indexOf(element) + 1);
              } else if (state.replyMidNum.indexOf(element) == -1) {
                state.midCount.push(state.counting);
                state.counting + 1;
              }
            }
            state.commentList = [];
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

    const reply = async () => {
      try {
        const body = {
          dino: state.dino,
          reqPage: state.reqPage,
          mid: store.state.users.me.mid,
        };
        await axios
          .post(`/decommi/api/diary/reply/`, body, { headers })
          .then((res) => {
            if (res.data.replyList == undefined) {
              return;
            }
            for (let index = 0; index < res.data.replyList.length; index++) {
              const element = res.data.replyList[index].mid;
              if (!state.replyMidNum.includes(element)) {
                state.replyMidNum.push(element);
              }
              if (state.replyMidNum.indexOf(element) !== -1) {
                state.midCount.push(state.replyMidNum.indexOf(element) + 1);
              } else if (state.replyMidNum.indexOf(element) == -1) {
                state.midCount.push(state.counting);
                state.counting + 1;
              }
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

    reply();

    const onComment = ref(true);
    const cmtChangeBtn = ref(true);
    const commentValue = ref("");

    // 좋아요
    // false가 체크임
    const remove = async () => {
      replyMore();
    };

    const change = (comment) => {
      console.log(comment);
    };

    const replyreply = () => {
      replyMore();
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
