<template>
  <div>
    <div v-for="post in state.mainPosts" :key="post" class="card mb-4">
      <div class="card-body mt-3 mb-3 ml-4 mr-4 p-4">
        <div class="d-flex justify-content-between">
          <h5 @click="dinoTest(post.dino)" type="button" class="card-title">
            {{ post.title }}
          </h5>
          <PostMenu :onEditBtn="onEditBtn" :onRemoveBtn="onRemoveBtn" />
        </div>
        <div class="small-text mb-4">
          <span class="days">{{ post.regDate.split("-")[0] }}.</span>
          <span class="days">{{ post.regDate.split("-")[1] }}.</span>
          <span class="days">{{
            post.regDate.split("-")[2].split("T")[0]
          }}</span>
          <span class="ml-1 lastTime margin5">{{
            getTimeFromJavaDate(post.regDate)
          }}</span>
        </div>
        <img src="@/assets/mainimg2.jpg" class="card-img-top mb-4" alt="none" />
        <p class="card-text mb-4">{{ post.content }}</p>
        <div class="mb-2 d-flex justify-content-between flex-column">
          <div class="mb-3 d-flex gap-1">
            <button type="button" class="btn-tag-sm d-flex">태그 들어감</button>
          </div>
          <!-- icon -->
          <div class="d-flex justify-content-start">
            <WrittenPostsBookmark />
            <WrittenPostsHeart />
            <ReportModal />
            <WrittenPostsComment />
          </div>
          <WrittenComments />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import axios from "axios";
import ReportModal from "./ReportModal.vue";
import WrittenPostsBookmark from "./WrittenPostsBookmark.vue";
import PostMenu from "./PostMenu.vue";
import WrittenPostsHeart from "./WrittenPostsHeart.vue";
import WrittenPostsComment from "./WrittenPostsComment.vue";
import WrittenComments from "./WrittenComments.vue";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const bmFav = ref(false);
    const bmCmt = ref(false);
    // const bmPlus = ref(false);
    const CheckCmt = ref(false);

    const bookmarkSave = computed(() => {
      return store.state.posts.bookmarkSave;
    });

    let comment = reactive({
      value: "",
    });
    const content = computed(() => {
      return store.state.posts.mainPosts;
    });

    const onRemoveBtn = () => {
      store.dispatch("posts/remove", {
        id: props.post.id,
      });
      // try {
      //   const url = "./api/diary/write";
      //   const headers = {
      //     "Content-Type": "application/json",
      //     Authorization: store.state.users.me.token,
      //     mid: store.state.users.me.mid,
      //   };
      //   const body = {
      //     writer: store.state.users.me.email,
      //   };
      //   console.log(body);
      //   axios
      //     .post(url, body, { headers })
      //     .then((res) => {
      //       console.log(res.data);
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     });
      // } catch (err) {
      //   console.log(err);
      // }
    };
    const onEditBtn = async () => {
      store.dispatch("posts/changeMainPost", {
        id: props.post.id,
        title: props.post.myWriteTitle,
        content: props.post.myWriteContent,
      });
      try {
        const url = "./api/diary/write";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          title: props.post.myWriteTitle,
          content: props.post.myWriteContent,
          writer: store.state.users.me.id,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data);
            console.log(store.state.posts.mainPosts);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }

      // 버튼 눌렀을 때 이 mainPosts 전체를 넘겨줘야하나?
      router.push({ name: "CkEditor" });
    };

    function getTimeFromJavaDate(s) {
      const cont = new Date(s);
      let date = new Date();
      let calculated = (new Date(date.getTime()) - cont) / 1000; //초 계산
      if (calculated < 60) {
        return "방금 전";
      } else if (calculated < 60 * 60) {
        return `${Math.round(calculated / 60)}분 전`;
      } else if (calculated < 60 * 60 * 24) {
        return `${Math.round(calculated / (60 * 60))}시간 전`;
      } else if (calculated < 60 * 60 * 24 * 7) {
        return `${Math.round(calculated / (60 * 60 * 24))}일 전`;
      } else if (calculated < 60 * 60 * 24 * 7 * 5) {
        return `${Math.round(calculated / (60 * 60 * 24 * 7))}주 전`;
      } else if (calculated > 31536000) {
        return `${Math.round(calculated / 31536000)}년 전`;
      }
    }
    const state = reactive({
      mainPosts: [],
      dino: "",
    });

    // 컨트롤러 작성해 달라고 할 것

    axios.post("./diary/list").then((res) => {
      console.log(res.data);
      state.mainPosts = res.data;
    });

    const dinoTest = (dino) => {
      router.push(`/read?id=${dino}`);
    };

    return {
      state,
      bookmarkSave,
      bmFav,
      bmCmt,

      onRemoveBtn,
      onEditBtn,
      comment,
      content,
      close,
      getTimeFromJavaDate,
      dinoTest,
      CheckCmt,
    };
  },
  components: {
    ReportModal,
    WrittenPostsBookmark,
    PostMenu,
    WrittenPostsHeart,
    WrittenPostsComment,
    WrittenComments,
  },
};
</script>

<style lang="sass" scoped>
.zindex
  z-index: 10
  background-color: white

.bookmarkBtn
  border: none
  background: none

.card-text
  white-space: pre-line
</style>
