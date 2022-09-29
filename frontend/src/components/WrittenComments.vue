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
  </div>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import WrittenCommentsContent from "./WrittenCommentsContent.vue";
// import { useStore } from "vuex";
export default {
  props: {
    dino: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      dino: props.dino,
    });
    // const store = useStore();
    const onComment = ref(true);
    const cmtChangeBtn = ref(true);
    const commentValue = ref("");
    const commentList = reactive([]);
    // 좋아요
    // false가 체크임
    const remove = (item, index) => {
      commentList.splice(index, 1);
    };

    const change = (comment) => {
      console.log(comment);
    };

    const addComment = () => {
      if (!commentValue.value == "") {
        commentList.unshift(commentValue.value);
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
