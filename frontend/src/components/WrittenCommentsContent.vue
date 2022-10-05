<template>
  <div>
    <div class="Maincomment mb-1 d-flex justify-content-between gap-2">
      <div v-if="onComment">
        <div class="grid">
          <span>User</span>
          <span class="ml-3">{{ comment.replyContent }}</span>
          <div>
            <span>{{ comment.regDate.split("-")[0] }}.</span>
            <span>{{ comment.regDate.split("-")[1] }}.</span>
            <span>{{ comment.regDate.split("-")[2].split("T")[0] }}</span>
          </div>
          <button @click="replyAddReply" class="text-btn pl-1">답글달기</button>
          <button
            v-if="cmtChangeBtn"
            @click="changeComment($event)"
            class="text-btn"
          >
            수정
          </button>
          <button @click="onRemoveComment" class="ml-2 bi bi-x-lg"></button>
        </div>
      </div>
      <div v-else>
        <div class="grid2">
          <span>User</span>
          <input
            v-model="commentChangeInput"
            type="text"
            @keyup.enter="changeCommentFinal"
          />
          <button @click="changeCommentFinal" class="btn-regular flex-wrap">
            수정완료
          </button>
          <button @click="changeComment()" class="text-btn flex-wrap">
            수정취소
          </button>
        </div>
      </div>
    </div>
    <div>
      <div v-if="onAddReply">
        <div class="mb-3 d-flex justify-content-center gap-2">
          <div>ㄴ</div>
          <input
            v-model="commentValue"
            @keyup.enter="addComment"
            type="text"
            class="comment serviceSearch w-100"
            placeholder="댓글을 입력해주세요."
          />
          <button @click="addComment" class="btn-regular">답글달기</button>
          <button @click="onAddReplyCancel" class="text-btn flex-wrap">
            답글취소
          </button>
        </div>
      </div>
      <div v-if="onComment2" class="grid3">
        <div>ㄴ</div>
        <span>User</span>
        <span class="ml-3">답글</span>
        <div>
          <span>{{ comment.regDate.split("-")[0] }}.</span>
          <span>{{ comment.regDate.split("-")[1] }}.</span>
          <span>{{ comment.regDate.split("-")[2].split("T")[0] }}</span>
        </div>
        <button
          v-if="cmtChangeBtn2"
          @click="changeComment2($event)"
          class="text-btn"
        >
          수정
        </button>
        <button @click="onRemoveComment" class="ml-2 bi bi-x-lg"></button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref } from "@vue/reactivity";
import { getCurrentInstance } from "@vue/runtime-core";
import axios from "axios";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    dino: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const { emit } = getCurrentInstance();

    const state = reactive({
      comment: props.comment,
      dino: props.dino,
    });
    const onAddReply = ref(false);

    const headers = {
      "Content-Type": "application/json",
      Authorization: store.state.users.me.token,
      mid: store.state.users.me.mid,
    };

    const onRemoveComment = async () => {
      try {
        const body = {
          dino: state.dino,
          rno: state.comment.rno,
          mid: store.state.users.me.mid,
        };
        await axios
          .post(`/decommi/api/diary/reply/remove`, body, { headers })
          .then((res) => {
            console.log(res);
            emit("remove");
          });
      } catch (err) {
        console.error(err);
      }
    };

    const commentValue = ref("");
    const onComment = ref(true);
    const onComment2 = ref(false);
    const cmtChangeBtn = ref(true);
    const cmtChangeBtn2 = ref(true);
    const commentChangeInput = ref(state.comment.replyContent);
    // 좋아요
    // false가 체크임
    const changeComment = () => {
      if (onComment.value == true) {
        onComment.value = false;
        cmtChangeBtn.value = false;
      } else if (onComment.value == false) {
        onComment.value = true;
        cmtChangeBtn.value = true;
      }
    };

    const addComment = async () => {
      console.log(commentValue.value);
      if (!commentValue.value == "") {
        try {
          const url = "/decommi/api/diary/reply/add/reply";
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
            onAddReply.value = false
            onComment2.value = true
        } catch (err) {
          console.error(err);
        }
      }
      // commentList.unshift(commentValue.value);
      commentValue.value = "";
    };

    const changeComment2 = () => {
      if (onComment2.value == true) {
        onComment2.value = false;
        cmtChangeBtn2.value = false;
      } else if (onComment2.value == false) {
        onComment2.value = true;
        cmtChangeBtn2.value = true;
      }
    };

    const changeCommentFinal = async () => {
      try {
        const body = {
          dino: state.dino,
          rno: state.comment.rno,
          mid: store.state.users.me.mid,
          replyContent: commentChangeInput.value,
        };
        await axios
          .post(`/decommi/api/diary/reply/modify`, body, { headers })
          .then((res) => {
            console.log(res);
          });
        emit("change", (state.comment.replyContent = commentChangeInput.value));
      } catch (err) {
        console.error(err);
      }
      onComment.value = true;
      cmtChangeBtn.value = true;
    };

    const replyAddReply = () => {
      if (onAddReply.value == false) {
        onAddReply.value = true;
      } else if (onAddReply.value == true) {
        onAddReply.value = false;
      }
    };

    const onAddReplyCancel = () => {
      if (onAddReply.value == true) {
        onAddReply.value = false;
      }
    };

    return {
      changeCommentFinal,
      changeComment,
      changeComment2,
      onComment,
      onComment2,
      cmtChangeBtn,
      cmtChangeBtn2,
      commentValue,
      commentChangeInput,
      onRemoveComment,
      state,
      replyAddReply,
      onAddReply,
      onAddReplyCancel,
      addComment,
    };
  },
};
</script>

<style lang="sass" scoped>
.grid
    display: grid
    grid-template-columns: 1fr 7fr 1fr 1.3fr 0.7fr 0.7fr

.grid2
    display: grid
    grid-template-columns: 1fr 6fr 1fr 1fr

.grid3
    display: grid
    grid-template-columns: 0.5fr 1fr 7fr 1.3fr 0.7fr 0.7fr

.text-btn
    word-break: break-all

.comment
  border-radius: 10px
  border: 0.5px solid grey
  font-weight: 300
  &:focus
    outline: 0.5px solid #AE6FFF
  &::placeholder
    padding-left: 7px
</style>
