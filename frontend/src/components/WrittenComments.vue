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
    <div v-for="(comment, index) in commentList" :key="comment + index">
      <WrittenCommentsContent
        :dino="state.dino"
        :comment="comment"
        @remove="remove(item, index)"
        @change="change($event)"
      />
    </div>
    <button class="btn btn-primary w-100" v-if="stateInfo" @click="reply">
      댓글 더 보기
    </button>
  </div>
  <!-- <PageInfinite /> -->
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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
    const router = useRouter();
    const headers = {
      "Content-Type": "application/json",
      Authorization: store.state.users.me.token,
      mid: store.state.users.me.mid,
    };
    let stateInfo = ref(false);
    const commentList = reactive([]);
    const state = reactive({
      dino: props.dino,
      reqPage: 0,
      writer: store.state.users.me.id,
    });

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
            commentList.push(...res.data.replyList);
            if (res.data.replyList.length % 5 == 0) {
              state.reqPage += 1;
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

    function getMoreComment() {
      state.reqPage += 1;
      reply();
    }

    function updateStates(cState, sInfo) {
      commentList.push(...cState);
      stateInfo.push(sInfo);
    }

    // async function getComments() {
    //   const body = {
    //     dino: state.dino,
    //     reqPage: state.reqPage,
    //     mid: store.state.users.me.mid,
    //   };
    //   await axios
    //     .post(`/decommi/api/diary/reply/`, body, { headers })
    //     .then(function (res) {
    //       console.log(res.data);
    //       // if (res.data.pageTotalCount == state.reqPage + 1) {
    //       //   updateStates(res.data.commentList, -999);
    //       // } else {
    //       //   updateStates(res.data.commentList, res.data.commentList.length);
    //       // }
    //     })
    //     .catch(function () {});
    // }

    const onComment = ref(true);
    const cmtChangeBtn = ref(true);
    const commentValue = ref("");

    // 좋아요
    // false가 체크임
    const remove = async () => {
      router.go(0);
      // commentList.splice(index, 1);
    };

    const change = (comment) => {
      console.log(comment);
    };

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
            })
            .catch((err) => {
              console.error(err);
            });
        } catch (err) {
          console.error(err);
        }
        // commentList.unshift(commentValue.value);
      }
      commentValue.value = "";
    };

    return {
      remove,
      onComment,
      cmtChangeBtn,
      commentValue,
      addComment,
      commentList,
      state,
      change,
      stateInfo,
      getMoreComment,
      // getComments,
      updateStates,
      reply,
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
