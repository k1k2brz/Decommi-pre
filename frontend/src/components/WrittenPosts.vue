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
              v-for="tag in state.tagList"
              :key="tag"
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
          <WrittenComments
            v-if="state.replyYN == true"
            :dino="state.dino"
            :commentList="post.replyList"
            @reply="reply($event)"
          />
          <div v-else>
            <hr />
            <div>
              <div
                class="replyNoComment mb-3 d-flex justify-content-center gap-2"
              >
                <input
                  type="text"
                  class="comment serviceSearch w-100"
                  placeholder="????????? ???????????? ?????? ?????????????????????."
                  readonly
                  disalbed
                />
                <button
                  class="btn-regular"
                  style="background-color: #b4b4b4"
                  disalbed
                >
                  ????????????
                </button>
              </div>
            </div>
            <!-- <div class="diaryComment"></div> -->
          </div>
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
import { computed, onBeforeUpdate } from "@vue/runtime-core";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // console.log(props.post);
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
      tagList: props.post.tagList,
      bmDino: [],
      commentList: props.post.replyList,
      replyYN: props.post.replyYN,
    });

    const me = computed(() => {
      return store.state.users.me.writer;
    });

    onBeforeUpdate(() => {
      state.tagList = [];
      state.tagList = props.post.tagList;
      state.replyYN = [];
      state.replyYN = props.post.replyYN;
      // state.commentList = [];
      // state.commentList = props.post.commentList;
    });

    const reply = (item) => {
      emit("reply", item);
    };

    const onClickTag = async (e) => {
      emit("onClickTag", e.target.innerHTML);
    };

    // //**
    //  * axios??? dino ??? favorite??? save ??????????????? ????????????????????????(bmFav, isSave)
    //  * >> ????????? ??????????????? ?????? >  true >> ??????
    //  * ?????? >> false
    //  *
    //  *
    //  * ????????????
    //  * ????????? ??????????????? ??????(isFav, isSave) >> ????????? ??????????????? ?????? >> ????????? ?????????
    //  * ????????? ?????? ?????? >> ??????????????? ????????? >> ??? sql???????????? ?????????
    //  *
    //  */ >>

    const onRemoveBtn = async () => {
      try {
        const url = "/decommi/api/diary/delete";
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
        const url = "/decommi/api/diary/modify/check";
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
            // reactive??? ??????
            // ????????? ?????? ?????????????????? ???????????? ??????
            if (res.data.writer == store.state.users.me.id) {
              // router.push(`/editPost?edit=${res.data.dino}`);
              aaaa();
            } else {
              alert("????????? ????????? ????????????");
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
      const url = "/decommi/api/diary/modify/check";
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

    // state ??? ??????????????? ??????
    // showmodal = false ????????? ????????????

    // ?????????????????? ??????????????? ????????? showmodal????????? ???????????? ?????????????????? ??????

    function getTimeFromJavaDate(s) {
      const cont = new Date(s);
      let date = new Date();
      let calculated = (new Date(date.getTime()) - cont) / 1000; //??? ??????
      if (calculated < 60) {
        return "?????? ???";
      } else if (calculated < 60 * 60) {
        return `${Math.round(calculated / 60)}??? ???`;
      } else if (calculated < 60 * 60 * 24) {
        return `${Math.round(calculated / (60 * 60))}?????? ???`;
      } else if (calculated < 60 * 60 * 24 * 7) {
        return `${Math.round(calculated / (60 * 60 * 24))}??? ???`;
      } else if (calculated < 60 * 60 * 24 * 7 * 5) {
        return `${Math.round(calculated / (60 * 60 * 24 * 7))}??? ???`;
      } else if (calculated > 31536000) {
        return `${Math.round(calculated / 31536000)}??? ???`;
      }
    }

    const PostList = async () => {
      try {
        await axios.get(`/decommi/diary/read/${state.dino}`).then((res) => {
          // console.log(res.data);
          state.dino = res.data.diaryPost.dino;
          // for (let i = 0; i < res.data.diaryPost.tagList.length; i++) {
          //   state.tagList.push(res.data.diaryPost.tagList[i]);
          // }
        });
      } catch (err) {
        console.error(err);
      }
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
      reply,
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
.replyNoComment
  opacity: 50%

.comment
    border-radius: 10px
    border: 0.5px solid grey
    font-weight: 300
    &:focus
      outline: 0.5px solid #AE6FFF
    &::placeholder
      padding-left: 7px
      color: black
.diaryComment
  font-size: 14px
  color: #6C6C6C
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
  -webkit-line-clamp: 15 // ????????? ?????????
  -webkit-box-orient: vertical
</style>
