<template>
  <div class="card mb-4">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between">
        <h5 class="card-title">{{ post.title }}</h5>
        <div class="d-flex flex-column">
          <button
            @click.stop="
              dropdownToggle.reportToggle.value =
                !dropdownToggle.reportToggle.value
            "
            class="btn-icon bi bi-three-dots d-flex justify-content-end"
          ></button>
          <div>
            <div
              v-if="dropdownToggle.reportToggle.value"
              @blur="close"
              class="reportBtn-shadow report-location position-absolute"
            >
              <div class="d-flex flex-column">
                <!-- 본인의 포스팅일시 (email을 받아서) v-if로 보이는거 다르게 -->
                <button
                  @click="onEditBtn"
                  type="button"
                  class="reportBtn reportBtnHover"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  수정하기
                </button>
                <button
                  @click="onRemoveBtn"
                  type="button"
                  class="reportBtn reportBtnHover"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="small-text mb-4">
        <span class="days">2022.08.01</span>
        <span class="ml-1 lastTime margin5">{{ writeinfo.regdate }}</span>
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
            <div
              v-if="bookmarkSave"
              class="bi bi-bookmark-fill icon-purple"
            ></div>
            <div v-else class="bi bi-bookmark"></div>
          </button>
          <button @click="bookmarkFav" class="btn-icon">
            <div v-if="bmFav" class="bi bi-heart"></div>
            <div v-else class="bi bi-heart-fill icon-red"></div>
          </button>
          <button @click="onModal" class="btn-icon">
            <div v-if="bmReport" class="bi bi-megaphone-fill icon-purple"></div>
            <div v-else class="bi bi-megaphone"></div>
          </button>
          <button @click="bookmarkCmt" class="btn-icon">
            <div v-if="bmCmt" class="bi bi-chat-dots-fill icon-purple"></div>
            <div v-else class="bi bi-chat-dots"></div>
          </button>
          <ReportModal />
        </div>
        <div>
          <div
            v-if="bookmarkSave"
            class="d-flex container bmSave position-relative"
          >
            <div
              class="d-flex flex-column box-shadow position-absolute zindex p-3 gap-2"
              style="min-width: 250px"
            >
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
        <div>
          <div v-if="addBookmark" class="container report position-relative">
            <div
              class="d-flex flex-column box-shadow position-absolute zindex p-3 gap-2"
            >
              <div class="d-flex justify-content-between">
                <div>
                  <!-- style="margin: auto" -->
                  <span class="bold">북마크를 추가해주세요</span>
                </div>
              </div>
              <div class="stroke-default"></div>
              <div class="gap-2 mt-1 d-flex flex-column justify-content-center">
                <input
                  v-model="sendBookmarkInput"
                  maxlength="20"
                  type="text"
                  class="form-control"
                />
                <button @click="sendBookmark" class="btn-regular">
                  북마크 생성
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="bookmarkSaveCheck"
          class="container bm-container d-flex position-absolute"
        >
          <div
            class="position-relative bookmarks flex-wrap bg-white d-flex box-shadow p-3"
          >
            <span class="ml-3 d-flex">북마크가 저장되었습니다.</span>
            <button @click="bookmarkChecking" class="text-btn pr-3">
              저장된 북마크 확인하기
            </button>
          </div>
        </div>
        <div>
          <div v-if="!report" class="container position-relative">
            <div
              class="d-flex flex-column box-shadow position-absolute report zindex p-3 gap-2"
            >
              <div class="d-flex justify-content-between">
                <div>
                  <!-- style="margin: auto" -->
                  <span class="bold">신고하기</span>
                </div>
              </div>
              <div class="stroke-default"></div>
              <div class="gap-2 mt-1 d-flex flex-column justify-content-center">
                <span> 이 다이어리의 어떤 점이 문제인가요? </span>
                <select v-model="selectReport" class="mt-2">
                  <option disabled value="pso">Please select one</option>
                  <option :value="{ report: '스팸이거나 의심스럽습니다.' }">
                    스팸이거나 의심스럽습니다.
                  </option>
                  <option
                    :value="{
                      report: '민감한 내용또는 사진을 보여주고 있습니다.',
                    }"
                  >
                    민감한 내용또는 사진을 보여주고 있습니다.
                  </option>
                  <option
                    :value="{ report: '가학적이거나 유해한 내용입니다.' }"
                  >
                    가학적이거나 유해한 내용입니다.
                  </option>
                  <option :value="{ report: '사실을 오도하고 있습니다.' }">
                    사실을 오도하고 있습니다.
                  </option>
                  <option
                    :value="{
                      report: '자해 또는 자살 의도를 표현하고 있습니다.',
                    }"
                  >
                    자해 또는 자살 의도를 표현하고 있습니다.
                  </option>
                  <option :value="{ report: '기타 의견.' }">기타 의견.</option>
                </select>
                <textarea
                  v-model="textareaReport"
                  class="textarea mt-2"
                  cols="35"
                  rows="10"
                ></textarea>
              </div>
              <button @click="sendReport" class="btn-regular">신고하기</button>
            </div>
          </div>
        </div>
        <div
          v-if="sendReportCheck"
          class="container bm-container d-flex position-absolute"
        >
          <div
            class="position-relative bookmarks flex-wrap bg-white d-flex box-shadow p-3"
          >
            <span class="ml-3 mr-3 d-flex">신고가 완료되었습니다.</span>
          </div>
        </div>
        <div v-if="bmCmt">
          <hr />
          <CommentWrite :post-id="post.id" />
          <div v-for="(cmt, idx) in post.Comments" :key="cmt.id + idx">
            <!-- 그리드로 변경 -->
            <div class="Maincomment mb-1 d-flex justify-content-between gap-2">
              <div v-if="onComment">
                <span>User</span>
                <span class="ml-3">{{ cmt.replyContent }}</span>
              </div>
              <div v-else>
                <span>User</span>
                <input
                  type="text"
                  v-model="comment.value"
                  @keyup.enter="changeCommentFinal"
                />
                <button @click="changeCommentFinal" class="btn-regular">
                  수정완료
                </button>
              </div>
              <div class="d-flex justify-content-end">
                <span>2022.08.28</span>
                <button
                  v-if="cmtChangeBtn"
                  @click="changeComment($event)"
                  class="text-btn"
                >
                  수정
                </button>
                <button v-else @click="changeComment($event)" class="text-btn">
                  수정취소
                </button>
                <!-- 백엔드에서 들어오는 comment번호를 ()안에 넣는다. -->
                <!-- comment Id가 필요 -->
                <button
                  @click="onRemoveComment"
                  class="ml-2 bi bi-x-lg"
                ></button>
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
import { onBeforeMount, onBeforeUnmount, computed, onMounted } from "vue";
import axios from "axios";

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

    const bookmarkSave = ref(false);
    const bookmarkSaveCheck = ref(false);
    const bmFav = ref(true);
    const bmCmt = ref(false);
    // const bmPlus = ref(false);
    const bmReport = ref(false);
    const onComment = ref(true);
    const cmtChangeBtn = ref(true);
    const report = ref(true);
    const sendReportCheck = ref(false);
    const selectReport = ref("");
    const textareaReport = ref("");
    const addBookmark = ref(false);
    const sendBookmarkInput = ref("");

    const dropdownToggle = {
      reportToggle: ref(false),
      close: () => {
        dropdownToggle.reportToggle.value = false;
      },
    };

    onBeforeUnmount(() => {
      document.removeEventListener("click", dropdownToggle.close);
    });

    onMounted(() => {
      document.addEventListener("click", dropdownToggle.close);
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
          writer: store.state.users.me.email,
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

    const reportContent = () => {
      dropdownToggle.reportToggle.value = !dropdownToggle.reportToggle.value;
    };

    const bookmarkBtn = () => {
      if (bookmarkSave.value == false) {
        bookmarkSave.value = true;
        bmReport.value = false;
        report.value = true;
      } else if (bookmarkSave.value == true) {
        bookmarkSave.value = false;
      }
    };

    onBeforeMount(() => {
      // 댓글 비공개 조사하기
      // console.log(bmCmt.value)
      // console.log(store.state.posts.mainPosts[0])
      if (store.state.posts.mainPosts[0].replyYN == false) {
        store.state.posts.mainPosts == false;
      }
    });

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
      const index = store.state.posts.mainPosts.findIndex((v) => v.id);
      console.log(index);
      bmCmt.value == true ? (bmCmt.value = false) : (bmCmt.value = true);
    };

    const bookmarkPlus = () => {
      // 북마크 모달창
      addBookmark.value = true;
      bookmarkSave.value = false;
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
      console.log(e);
      if (onComment.value == true) {
        onComment.value = false;
        cmtChangeBtn.value = false;
      } else if (onComment.value == false) {
        onComment.value = true;
        cmtChangeBtn.value = true;
      }
    };

    const onModal = () => {
      if (bmReport.value == false) {
        bmReport.value = true;
        report.value = false;
        bookmarkSave.value = false;
      } else if (bmReport.value == true) {
        bmReport.value = false;
        report.value = true;
      }
    };

    const sendReport = () => {
      console.log(textareaReport.value);
      console.log(selectReport.value.report);
      textareaReport.value = "";
      selectReport.value = "pso";
      bmReport.value = false;
      report.value = true;
      sendReportCheck.value = true;
      setTimeout(() => {
        // 마우스가 올라가 있으면 사라지지 않게 이벤트 추가
        // Fade 애니메이션 줄 것
        sendReportCheck.value = false;
      }, 5000);
    };

    const onRemoveComment = () => {
      store.dispatch("posts/removeComment", {
        id: props.post.id,
      });
      console.log(props.post.id);
    };

    const changeCommentFinal = () => {
      store.dispatch("posts/changeComment", {
        content: comment.value,
      });
    };

    const sendBookmark = () => {
      console.log(sendBookmarkInput.value);
      sendBookmarkInput.value = "";
      addBookmark.value = false;
      bookmarkSave.value = true;
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
    const writeinfo = reactive({
      regDate: null,
    });

    // 컨트롤러 작성해 달라고 할 것
    axios.get(`./api/diary/write`).then((res) => {
      writeinfo.regDate = getTimeFromJavaDate(res.data.writeinfo.regDate);
    });

    return {
      writeinfo,
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
      close,
      dropdownToggle,
      bmReport,
      onModal,
      report,
      sendReport,
      selectReport,
      textareaReport,
      sendReportCheck,
      addBookmark,
      sendBookmark,
      sendBookmarkInput,
      getTimeFromJavaDate,
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

.textarea
  border: 1px solid #D8D8D8
  resize: none

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

.report
  top: 10px
</style>
