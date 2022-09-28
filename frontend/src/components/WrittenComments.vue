<template>
  <div>
    <!-- 그리드로 변경 -->
    <hr />
    <div>
      <div class="mb-3 d-flex justify-content-center gap-2">
        <input v-model="commentValue" @keyup.enter="addComment" type="text" class="comment serviceSearch w-100"
          placeholder="댓글을 입력해주세요." />
        <button @click="addComment" class="btn-regular">
          댓글입력
        </button>
      </div>
    </div>
    <div class="Maincomment mb-1 d-flex justify-content-between gap-2">
      <div v-if="onComment">
        <span>User</span>
        <span v-for="(comment, index) in commentList" :key="comment + index" class="ml-3" >{{ comment }}</span>
      </div>
      <div v-else>
        <span>User</span>
        <input type="text" v-model="comment.value" @keyup.enter="changeCommentFinal" />
        <button @click="changeCommentFinal" class="btn-regular">
          수정완료
        </button>
      </div>
      <div class="d-flex justify-content-end">
        <span>2022.08.28</span>
        <button v-if="cmtChangeBtn" @click="changeComment($event)" class="text-btn">
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

</template>

<script>
import { ref, reactive } from "@vue/reactivity";
// import { useStore } from "vuex";
export default {
  setup() {
    // const store = useStore();
    const onComment = ref(true);
    const cmtChangeBtn = ref(true);
    const commentValue = ref("");
    const commentList = reactive([])

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
    const onRemoveComment = () => {

    };
    const changeCommentFinal = () => {

    };


    const addComment = () => {
      if (!commentValue.value == "") {
        commentList.push(commentValue.value)
        commentValue.value = "";
      }
    };

    return {
      changeCommentFinal,
      onRemoveComment,
      changeComment,
      onComment,
      cmtChangeBtn,
      commentValue,
      addComment,
      commentList
    };
  },
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
