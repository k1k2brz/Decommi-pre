<template>
  <div class="Maincomment mb-1 d-flex justify-content-between gap-2">
    <div v-if="onComment">
      <div class="grid">
        <span>User</span>
        <span class="ml-3">{{ state.comment }}</span>
        <span>2022.08.28</span>
        <button
          v-if="cmtChangeBtn"
          @click="changeComment($event)"
          class="text-btn"
        >
          수정
        </button>
        <!-- 백엔드에서 들어오는 comment번호를 ()안에 넣는다. -->
        <!-- comment Id가 필요 -->
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
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { getCurrentInstance } from "@vue/runtime-core";
export default {
  props: {
    comment: {
      type: String,
      required: true,
    },
    dino: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const { emit } = getCurrentInstance();
    const onRemoveComment = () => {
      emit("remove");
    };

    const commentValue = ref("");
    const onComment = ref(true);
    const cmtChangeBtn = ref(true);
    const commentChangeInput = ref(props.comment);
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

    const state = reactive({
      comment: props.comment,
    });

    const changeCommentFinal = () => {
      emit("change", (state.comment = commentChangeInput.value));
      onComment.value = true;
      cmtChangeBtn.value = true;
    };

    return {
      changeCommentFinal,
      changeComment,
      onComment,
      cmtChangeBtn,
      commentValue,
      commentChangeInput,
      onRemoveComment,
      state,
    };
  },
};
</script>

<style lang="sass" scoped>
.grid
    display: grid
    grid-template-columns: 1fr 7fr 1fr 0.7fr 0.7fr

.grid2
    display: grid
    grid-template-columns: 1fr 6fr 1fr 1fr

.text-btn
    word-break: break-all
</style>
