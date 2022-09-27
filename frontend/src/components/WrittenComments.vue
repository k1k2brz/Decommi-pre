<template>
  <div>
    <!-- 그리드로 변경 -->
    <div v-if="bmCmt">
      <hr />
      <CommentWrite />
      <div class="Maincomment mb-1 d-flex justify-content-between gap-2">
        <div v-if="onComment">
          <span>User</span>
          <span class="ml-3"></span>
        </div>
        <div v-else>
          <span>User</span>
          <input
            type="text"
            v-model="comment.value"
            @keyup.enter="changeCommentFinal"
          />
          <button @click="changeCommentFinal" class="btn-regular">
            수정완료
          </button>
        </div>
        <div class="d-flex justify-content-end">
          <span>2022.08.28</span>
          <button
            v-if="cmtChangeBtn"
            @click="changeComment($event)"
            class="text-btn"
          >
            수정
          </button>
          <button v-else @click="changeComment($event)" class="text-btn">
            수정취소
          </button>
          <!-- 백엔드에서 들어오는 comment번호를 ()안에 넣는다. -->
          <!-- comment Id가 필요 -->
          <button @click="onRemoveComment" class="ml-2 bi bi-x-lg"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const onComment = ref(true);
    const cmtChangeBtn = ref(true);

    // 좋아요
    // false가 체크임
    const changeComment = (e) => {
      console.log(e);
      if (onComment.value == true) {
        onComment.value = false;
        cmtChangeBtn.value = false;
      } else if (onComment.value == false) {
        onComment.value = true;
        cmtChangeBtn.value = true;
      }
    };
    const onRemoveComment = () => {
      store.dispatch("posts/removeComment", {
        // id: props.post.id,
      });
      //   console.log(props.post.id);
    };
    const changeCommentFinal = () => {
      store.dispatch("posts/changeComment", {
        // content: comment.value,
      });
    };
    return {
      changeCommentFinal,
      onRemoveComment,
      changeComment,
      onComment,
      cmtChangeBtn,
    };
  },
};
</script>

<style lang="sass" scoped></style>
