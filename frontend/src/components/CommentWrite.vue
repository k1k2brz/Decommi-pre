<template>
  <div>
    <div class="mb-3 d-flex justify-content-center gap-2">
      <input
        v-model="commentValue"
        @keyup.enter="addComment"
        type="text"
        class="comment serviceSearch w-100"
        placeholder="댓글을 입력해주세요."
      />
      <button @click="addComment(index.idx)" class="btn-regular">댓글입력</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    let index = reactive({
      idx: 0,
    })
    
    const store = useStore();

    const commentValue = ref("");
    // let comments = reactive([]);

    const me = computed(() => {
      return store.state.users.me;
    });

    const addComment = (comment) => {
      if (!commentValue.value == "") {
        store.dispatch("posts/addComment", {
          id: Date.now(),
          postId: props.postId,
          content: commentValue.value,
          idx: comment
        });
        console.log(index.idx)
        index.idx += 1
        // comments.push(commentValue.value);
        commentValue.value = "";
      }
    };

    // const removeComment = (index) => {
    //   comments.splice(index, 1);
    // };

    return { commentValue, addComment, me, index };
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
      padding-left: 10px

.Maincomment
    display: grid
    grid-template-columns: 1fr 5fr 1fr
</style>
