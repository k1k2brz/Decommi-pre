<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">게시글 수정</span>
    </div>
  </div>
  <input
    v-model="content.title"
    type="text"
    class="myWriteTitle none form-control"
    placeholder="제목을 입력하세요."
  />
  <textarea
    v-model="content.content"
    @input="autoResize"
    @click="clickTextarea"
    class="myWriteContent form-control"
    placeholder="오늘의 다이어리를 작성해 보세요!"
    id="floatingTextarea"
    cols="30"
    rows="10"
  />
  <button @click="onEditBtn" class="btn-regular">수정완료</button>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const content = reactive({
      edittitle: store.state.posts.mainPosts.myWriteTitle,
      editcontent: store.state.posts.mainPosts.myWriteContent,
    });

    const mainPosts = computed(() => {
      return store.state.posts.mainPosts;
    });

    onMounted(() => {
      console.log(store.state.posts.mainPosts);
    });

    const autoResize = (e) => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const onEditBtn = () => {
      console.log(store.state.posts.id);
      store.dispatch("posts/changeMainPost", {
        id: store.state.posts.id,
        title: content.edittitle,
        content: content.editcontent,
      });
      router.push({
        name: "Main",
      });
    };
    return { autoResize, mainPosts, onEditBtn, content };
  },
};
</script>

<style lang="sass" scoped>
.myWriteContent
  overflow: visible

.form-control
  border: none
  resize: none
  &:focus
    box-shadow: none
</style>
