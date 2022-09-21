<template>
  <div class="card mb-4">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between">
        <h5 class="card-title">{{ post.title }}</h5>
        <div class="d-flex flex-column">
          <button @click="reportContent" class="btn-icon bi bi-three-dots d-flex justify-content-end"></button>
          <div>
            <div v-if="reportToggle" class="reportBtn-shadow report-location position-absolute">
              <div>
                <!-- 본인의 포스팅일시 (email을 받아서) v-if로 보이는거 다르게 -->
                <button @click="onEditBtn" type="button" class="reportBtn" data-bs-toggle="modal"
                  data-bs-target="#exampleModal">
                  수정하기
                </button>
                <button @click="onRemoveBtn" type="button" class="reportBtn" data-bs-toggle="modal"
                  data-bs-target="#exampleModal">
                  삭제하기
                </button>
              </div>
              <div>
                <ReportModal />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="small-text mb-4">
        <span class="days">2022.08.01</span>
        <span class="ml-1 lastTime margin5">22시간 전</span>
      </div>
      <img src="@/assets/mainimg2.jpg" class="card-img-top mb-4" alt="none" />
      <p class="card-text mb-4">{{ post.content }}</p>
      <div class="mb-2 d-flex justify-content-between flex-column">
        <div class="mb-3 d-flex gap-1">
          <button type="button" class="btn-tag-sm d-flex">LifeStyle</button>
          <button type="button" class="btn-tag-sm d-flex">일상</button>
          <button type="button" class="btn-tag-sm d-flex">디지털 사진</button>
        </div>
        <!-- icon -->
        <div class="d-flex gap-3">
          <button @click="bookmarkBtn" class="btn-icon">
            <div v-if="bookmarkSave" class="bi bi-bookmark-fill icon-purple"></div>
            <div v-else class="bi bi-bookmark"></div>
          </button>
          <button @click="bookmarkFav" class="btn-icon">
            <div v-if="bmFav" class="bi bi-heart"></div>
            <div v-else class="bi bi-heart-fill icon-red"></div>
          </button>
          <button class="btn-icon">
            <div class="bi bi-share-fill"></div>
          </button>
          <button @click="bookmarkCmt" class="btn-icon">
            <div v-if="bmCmt" class="bi bi-chat-dots-fill icon-purple"></div>
            <div v-else class="bi bi-chat-dots"></div>
          </button>
        </div>
        <div>
          <div v-if="bookmarkSave" class="d-flex container bmSave position-relative">
            <div class="d-flex flex-column box-shadow position-absolute zindex p-3 gap-2" style="min-width: 250px">
              <div class="d-flex justify-content-between">
                <div style="margin: auto; width: 100%">
                  <span class="bold">내 북마크에 저장</span>
                </div>
                <button @click="bookmarkPlus" class="text-btn-big">+</button>
              </div>
              <div class="stroke-default"></div>
              <div @click="bookmarkSaveBtn" class="mt-2 d-flex gap-3">
                <button class="d-flex gap-3 bookmarkBtn">
                  <div class="box"></div>
                  <span>bookmark1</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="bookmarkSaveCheck" class="container bm-container d-flex position-absolute">
          <div class="position-relative bookmarks flex-wrap bg-white d-flex box-shadow p-3">
            <span class="ml-3 d-flex">북마크가 저장되었습니다.</span>
            <button @click="bookmarkChecking" class="text-btn pr-3">
              저장된 북마크 확인하기
            </button>
          </div>
        </div>
        <div v-if="bmCmt">
          <hr />
          <CommentWrite :post-id="post.id" />
          <div v-for="cmt in post.Comments" :key="cmt.id">
            <!-- 그리드로 변경 -->
            <div class="Maincomment mb-1 d-flex justify-content-between gap-2">
              <div v-if="onComment">
                <span>User</span>
                <span class="ml-3">{{ cmt.content }}</span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ReportModal from "@/pages/mainpage/ReportModal.vue";
import CommentWrite from "./CommentWrite.vue";
import { computed } from "@vue/runtime-core";
import { onBeforeMount } from "vue";

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

    const reportToggle = ref(false);
    const bookmarkSave = ref(false);
    const bookmarkSaveCheck = ref(false);
    const bmFav = ref(true);
    const bmCmt = ref(false);
    const bmPlus = ref(false);
    const onComment = ref(true);
    const cmtChangeBtn = ref(true);
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
    };
    const onEditBtn = () => {
      store.dispatch("posts/changeMainPost", {
        id: props.post.id,
        title: props.post.myWriteTitle,
        content: props.post.myWriteContent,
      });
      // 버튼 눌렀을 때 이 mainPosts 전체를 넘겨줘야하나?
      router.push({ name: "CkEditor" });
    };

    const reportContent = () => {
      if (reportToggle.value == false) {
        reportToggle.value = true;
        store.state.reportToggle = true;
      } else if (reportToggle.value == true) {
        reportToggle.value = false;
        store.state.reportToggle = false;
      }
    };

    const bookmarkBtn = () => {
      if (bookmarkSave.value == false) {
        bookmarkSave.value = true;
      } else if (bookmarkSave.value == true) {
        bookmarkSave.value = false;
      }
    };

    onBeforeMount(() => {
      // 댓글 비공개 조사하기
      // console.log(bmCmt.value)
      // console.log(store.state.posts.mainPosts[0])
      if (store.state.posts.mainPosts[0].replyYN == false) {
        store.state.posts.mainPosts == false
      }
    })

    // 좋아요
    // false가 체크임
    const bookmarkFav = () => {
      if (bmFav.value == true) {
        bmFav.value = false;
      } else if (bmFav.value == false) {
        bmFav.value = true;
        // 좋아요 누르면 데이터 보낼 것
      }
    };

    const bookmarkCmt = () => {
      bmCmt.value == true ? (bmCmt.value = false) : (bmCmt.value = true);
    };

    const bookmarkPlus = () => {
      bmPlus.value == false ? (bmPlus.value = true) : (bmPlus.value = false);
      console.log(bmPlus.value);
    };

    const bookmarkSaveBtn = () => {
      if (bookmarkSaveCheck.value == false) {
        bookmarkSaveCheck.value = true;
        bookmarkSave.value = false;
        setTimeout(() => {
          // 마우스가 올라가 있으면 사라지지 않게 이벤트 추가
          // Fade 애니메이션 줄 것
          bookmarkSaveCheck.value = false;
        }, 5000);
      } else if (bookmarkSaveCheck.value == true)
        bookmarkSaveCheck.value = false;
    };

    const bookmarkChecking = () => {
      router.push({
        name: "BookMark",
      });
    };

    const changeComment = (e) => {
      console.log(e)
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
        id: props.post.id,
      });
    };

    const changeCommentFinal = () => {
      store.dispatch("posts/changeComment", {
        content: comment.value,
      });
    };

    return {
      reportToggle,
      reportContent,
      bookmarkSave,
      bookmarkSaveCheck,
      bmFav,
      bmCmt,
      bookmarkBtn,
      bookmarkFav,
      bookmarkCmt,
      bookmarkSaveBtn,
      bookmarkChecking,
      bookmarkPlus,
      onRemoveBtn,
      onEditBtn,
      onComment,
      changeComment,
      cmtChangeBtn,
      changeCommentFinal,
      onRemoveComment,
      comment,
      content,
    };
  },
  components: { ReportModal, CommentWrite },
};
</script>

<style lang="sass" scoped>
.box
    width: 30px
    height: 30px
    border-radius: 5px
    background-color: #D8D8D8

.bookmarks
    font-size: 15px
    top: 80px
    right: 11px

.bm-container
    width: 500px

.bg-white
  background-color: white

.bmSave
  top: 10px

.zindex
  z-index: 10
  background-color: white

.icon-purple
  color: #AE6FFF

.icon-red
  color: #FF4040

.bookmarkBtn
  border: none
  background: none

.report-location
  right: 30px
  z-index: 10
  background-color: white

.text-btn-big
  padding: 0
  color: #AE6FFF
  background: none
  border: none
  font-weight: 500
  font-size: 14px
  font-size: 20px
  font-weight: 700

.card-text
  white-space: pre-line
</style>
