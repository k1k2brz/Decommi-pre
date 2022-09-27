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
      <button @click="addComment(index.idx)" class="btn-regular">
        댓글입력
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import axios from "axios";

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
    });

    const store = useStore();

    const commentValue = ref("");
    // let comments = reactive([]);

    const me = computed(() => {
      return store.state.users.me;
    });

    const newDate = ref(Date.now());

    const addComment = () => {
      if (!commentValue.value == "") {
        store.dispatch("posts/addComment", {
          id: newDate,
          postId: props.postId,
          replyContent: commentValue.value,
        });

        // console.log(newDate);
        // comments.push(commentValue.value);

        try {
          const url = "./api/diary/write";
          const headers = {
            "Content-Type": "application/json",
            Authorization: store.state.users.me.token,
            mid: store.state.users.me.mid,
          };
          const body = {
            replyContent: commentValue.value,
          };
          console.log(body);
          axios
            .post(url, body, { headers })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.error(err);
            });
        } catch (err) {
          console.log(err);
        }
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
