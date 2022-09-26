<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">내 북마크</span>
    </div>
    <div class="d-flex justify-content-between">
      <div class="d-flex justify-content-center align-items-center">
        <button
          class="new-folder"
          data-bs-toggle="modal"
          data-bs-target="#bookmarkModal"
        >
          + 새 북마크 폴더
        </button>
        <div class="d-flex align-items-center">
          <div v-if="showModal" class="modal fade" id="bookmarkModal">
            <div
              class="modal-dialog d-flex align-items-center"
              style="height: 90vh"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">새 북마크 추가</h5>
                  <button
                    @click="bmCancel"
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div class="modal-body">
                  <form onsubmit="return false">
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label"
                        >폴더명</label
                      >
                      <input
                        maxlength="20"
                        v-model="bookmarkValue"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    @click="bmCancel"
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    닫기
                  </button>
                  <button
                    @click="addBookmark"
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    북마크 추가
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center gap-1">
        <button class="file-sort">이름순</button>
        <div class="boundaryLine"></div>
        <button class="file-sort">최신순</button>
      </div>
    </div>
    <div v-if="bmExist" class="text-center">
      <div class="row row-cols-5 mt-3">
        <div
          class="col d-flex p-2 mb-4"
          v-for="(bmTag, index) in bmTags"
          :key="'bmTag' + index"
        >
          <div class="folder-box">
            <button
              @click="onClickFolder"
              class="btnFolder folder-stroke p-4 mb-3"
            >
              <img src="@/assets/folder.png" alt="이미지 없음" />
            </button>
            <div class="pl-2 pr-2">
              <span class="bold">{{ bmTag }}</span>
            </div>
            <button
              @click="onRemoveBookmark(bmTag, index)"
              class="bi bi-x-lg"
            ></button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-100">
        <div
          class="d-flex flex-column justify-content-center align-items-center pd-container"
        >
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <div class="w-20 d-flex justify-content-center align-items-center">
              <div class="bookmark-circle">
                <img
                  src="@/assets/bookmarkAll.png"
                  alt="No image"
                  class="ml-1"
                />
              </div>
            </div>
            <span class="bm-title mt-2"
              >아직 북마크 된 다이어리가 없습니다.</span
            >
            <span class="bm-title-sm mt-2"
              >다시 보고 싶은 다이어리를 북마크 해보세요!</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import axios from "axios";
// import Modal from "@/pages/bookmark/BmModal.vue";

export default {
  components: {
    // Modal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const bmExist = ref(false);
    const bookmarkValue = ref("");
    let bmTags = reactive([]);
    const showModal = ref(true);

    const me = computed(() => {
      return store.state.users.me;
    });

    // 북마크에 들어왔을 때 북마크가 존재하면 화면 바뀜
    watchEffect(() => {
      if (bmTags.length === 0) {
        bmExist.value = false;
      } else if (bmTags.length !== 0) {
        bmExist.value = true;
      }
    });

    // VUEX로 옮기기 - 그냥 옮기자
    const addBookmark = () => {
      if (!bookmarkValue.value == "") {
        bmTags.push(bookmarkValue.value);

        try {
          const url = "./api/diary/save";
          const headers = {
            "Content-Type": "application/json",
            Authorization: store.state.users.me.token,
            mid: store.state.users.me.mid,
          };
          const body = {
            // bfolderName: bookmarkValue.value,
            // writer: store.state.users.me.email,
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
        bookmarkValue.value = "";
      }
    };

    const btnCancel = () => {
      if (showModal.value == true) {
        showModal.value = false;
      }
    };

    const bmCancel = () => {
      bookmarkValue.value = "";
    };

    const onRemoveBookmark = (bmTag, index) => {
      bmTags.splice(index, 1);
    };

    const onClickFolder = () => {
      router.push({
        name: "UserBookmark",
      });
    };

    return {
      bmExist,
      addBookmark,
      btnCancel,
      showModal,
      bookmarkValue,
      bmTags,
      onRemoveBookmark,
      bmCancel,
      onClickFolder,
      me,
    };
  },
};
</script>

<style lang="sass" scoped>
.btnFolder
  border: none
  background: none
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px
  border-radius: 15px
  &:hover
    transition: all 0.1s linear
    scale: 101%
    box-shadow: rgba(102, 101, 101, 0.2) 0px 3px 10px 0px

.folder-box
  word-break: break-all

.boundaryLine
    width: 1.5px
    height: 15px
    background: grey

.folder-stroke
    // border-bottom: 0.5px solid grey
    // box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px


img
    width: 100%

.bookmark-circle
    width: 100%
    height: 100%
    border-radius: 50%
    background-color: #F8F8F8
    padding: 20%

.pd-container
    padding: 15% 0

.bm-title
    font-size: 36px
    font-weight: 700

.bm-title-sm
    font-size: 18px
    color: #B4B4B4
</style>
