<template>
  <div>
    <div class="card mb-4">
      <div class="card-body mt-3 mb-3 ml-4 mr-4 p-4">
        <div class="d-flex justify-content-between">
          <h5 @click="dinoTest(post.dino)" type="button" class="card-title">
            {{ post.title }}
          </h5>
        </div>
        <hr />
        <div class="small-text mb-4 d-flex justify-content-between">
          <div>
            <span class="days">{{ post.regDate.split("-")[0] }}.</span>
            <span class="days">{{ post.regDate.split("-")[1] }}.</span>
            <span class="days">{{
              post.regDate.split("-")[2].split("T")[0]
            }}</span>
            <span class="ml-1 lastTime margin5">{{
              getTimeFromJavaDate(post.regDate)
            }}</span>
          </div>
          <PostMenu
            v-if="state.writer == state.loginWriter"
            :onEditBtn="onEditBtn"
            :onRemoveBtn="onRemoveBtn"
          />
        </div>
        <!-- <img src="@/assets/mainimg2.jpg" class="card-img-top mb-4" alt="none" /> -->
        <p
          class="card-text mb-4"
          style="object-fit: cover"
          v-html="post.content"
        ></p>
        <div class="mb-2 d-flex justify-content-between flex-column">
          <div class="mb-3 d-flex gap-1">
            <button
              @click="onClickTag"
              type="button"
              class="btn-tag-sm d-flex"
              v-for="(tag, index) in state.tagList"
              :key="tag + index"
            >
              {{ tag }}
            </button>
          </div>
          <!-- icon -->
          <div
            class="d-flex justify-content-start"
            v-if="state.writer !== state.loginWriter"
          >
            <!-- :bmDino="state.bmDino" -->
            <WrittenPostsBookmark :dino="state.dino" />
            <WrittenPostsHeart :dino="state.dino" />
            <ReportModal :dino="state.dino" />
          </div>
          <WrittenComments :dino="state.dino" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import ReportModal from "./ReportModal.vue";
import WrittenPostsBookmark from "./WrittenPostsBookmark.vue";
import PostMenu from "./PostMenu.vue";
import WrittenPostsHeart from "./WrittenPostsHeart.vue";
import WrittenComments from "./WrittenComments.vue";
import { computed } from "@vue/runtime-core";

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
    const { emit } = getCurrentInstance();

    const bmFav = ref(false);
    const bmCmt = ref(false);
    // const bmPlus = ref(false);
    const CheckCmt = ref(false);

    let comment = reactive({
      value: "",
    });

    const state = reactive({
      dino: props.post.dino,
      writer: props.post.writer,
      loginWriter: store.state.users.me.id,
      tagList: [],
      bmDino: [],
    });

    const me = computed(() => {
      return store.state.users.me.writer;
    });

    const onClickTag = async (e) => {
      emit("onClickTag", e.target.innerHTML);
    };

    // //**
    //  * axios로 dino 로 favorite와 save 의상태값을 받아와야한다있다(bmFav, isSave)
    //  * >> 있는지 체크를해서 있다 >  true >> 색칠
    //  * 없다 >> false
    //  *
    //  *
    //  * 눌렀을떄
    //  * 체크를 다시보내서 있다(isFav, isSave) >> 그러면 백엔드에서 있다 >> 그러면 지운다
    //  * 체크를 해서 없다 >> 백엔드에서 없으니 >> 그 sql테이블에 넣는다
    //  *
    //  */ >>

    const onRemoveBtn = async () => {
      try {
        const url = "./api/diary/delete";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          dino: state.dino,
          writer: store.state.users.me.id,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data);
            router.go(0);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    const onEditBtn = async () => {
      // store.dispatch("posts/changeMainPost", {
      // id: props.post.id,
      // });
      try {
        const url = "./api/diary/modify/check";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          dino: state.dino,
          writer: store.state.users.me.id,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            // reactive로 빼기
            // 누구나 수정 불가능하도록 고유번호 지정
            if (res.data.writer == store.state.users.me.id) {
              // router.push(`/editPost?edit=${res.data.dino}`);
              aaaa();
            } else {
              alert("수정할 권한이 없습니다");
              router.push({
                name: "Main",
              });
            }
            console.log(res.data);
            async function aaaa() {
              await axiosComponent();
              await router.push(`/editPost?edit=${res.data.dino}`);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    const axiosComponent = async () => {
      const url = "./api/diary/modify/check";
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      const body = {
        dino: state.dino,
        writer: store.state.users.me.id,
      };
      console.log(body);
      await axios
        .post(url, body, { headers })
        .then((res) => {
          localStorage.setItem("Content", res.data.content);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    // state 에 리액티브로 대충
    // showmodal = false 이렇게 한다음에

    // 엑시오스에서 일치하는게 있으면 showmodal띄우게 처음부터 설정하는것도 생각

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

    const PostList = async () => {
      await axios.get(`./diary/read/${state.dino}`).then((res) => {
        state.dino = res.data.diaryPost.dino;
        for (let i = 0; i < res.data.diaryPost.tagList.length; i++) {
          state.tagList.push(res.data.diaryPost.tagList[i]);
        }
      });
    };

    PostList();

    const dinoTest = (dino) => {
      router.push(`/read?id=${dino}`);
    };

    return {
      state,
      bmFav,
      bmCmt,
      onRemoveBtn,
      onEditBtn,
      comment,
      close,
      getTimeFromJavaDate,
      dinoTest,
      CheckCmt,
      me,
      onClickTag,
    };
  },
  components: {
    ReportModal,
    WrittenPostsBookmark,
    PostMenu,
    WrittenPostsHeart,
    // WrittenPostsComment,
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
  text-overflow: ellipsis
  overflow: hidden
  word-break: break-word

  display: -webkit-box
  -webkit-line-clamp: 15 // 원하는 라인수
  -webkit-box-orient: vertical
</style>
