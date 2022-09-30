<template>
  <div class="pr-2">
    <button @click="bookmarkBtn" class="btn-icon">
      <div v-if="bookmarkSave" class="bi bi-bookmark-fill icon-purple"></div>
      <div v-else class="bi bi-bookmark"></div>
    </button>
    <div v-if="bookmarkSave" class="d-flex bmSave position-relative">
      <div class="position-absolute d-flex flex-column box-shadow zindex p-3 gap-2" style="min-width: 250px">
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
            <span style="white-space: nowrap">데이터 받으면 생성될 북마크</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="addBookmark" class="d-flex bmSave position-relative">
      <div class="position-absolute d-flex flex-column box-shadow zindex p-3 gap-2" style="min-width: 250px">
        <div class="d-flex justify-content-between">
          <div style="margin: auto; width: 100%">
            <span class="bold">북마크를 추가해주세요</span>
          </div>
          <button @click="addBmCancel" class="bi bi-x-lg"></button>
        </div>
        <div class="stroke-default"></div>
        <div class="gap-2 mt-1 d-flex flex-column justify-content-center">
          <input @keyup.enter="sendBookmark" v-model="sendBookmarkInput" maxlength="20" type="text" class="form-control" />
          <button @click="sendBookmark" class="btn-regular">북마크 생성</button>
        </div>
      </div>
    </div>
    <div v-if="bookmarkSaveCheck" class="d-flex bmSave position-relative">
      <div class="position-absolute bm-container d-flex box-shadow zindex p-3 gap-2" style="min-width: 250px">
        <div class="d-flex flex-wrap">
          <span class="ml-3">북마크가 저장되었습니다.</span>
          <button @click="bookmarkChecking" class="text-btn pr-3">
            저장된 북마크 확인하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "@/axios";

export default {
  props: {
    dino: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const addBookmark = ref(false);
    const sendBookmarkInput = ref("");
    const bookmarkSaveCheck = ref(false);
    const bookmarkSave = ref(false);
    const bmSave = ref(false);

    const bookmarkBtn = () => {
      if (bookmarkSave.value == false) {
        bookmarkSave.value = true;
        bmSave.value = true;
        // bmReport.value = false;
      } else if (bookmarkSave.value == true) {
        bookmarkSave.value = false;
        bmSave.value = false;
      }
    };

    const bookmarkPlus = () => {
      // 북마크 모달창
      bookmarkSave.value = false;
      addBookmark.value = true;
      console.log(addBookmark.value);
    };

    const addBmCancel = () => {
      addBookmark.value = false;
      bookmarkSave.value = true;
    };

    const sendBookmark = async () => {
      try {
        const url = "/decommi/api/diary/save";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          mid: store.state.users.me.mid,
          // dino: props.dino,
          // bfolderName: sendBookmarkInput.value,
          // writer: store.state.users.me.email,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
          sendBookmarkInput.value = "";
          addBookmark.value = false;
          bookmarkSave.value = true;
        } catch (err) {
          console.log(err);
        }
    };

    const bookmarkSaveBtn = async () => {
      try {
        const url = "/decommi/api/diary/save";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          mid: store.state.users.me.mid,
          // dino: props.dino,
          // bfolderName: sendBookmarkInput.value,
          // writer: store.state.users.me.email,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data);
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
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    const bookmarkChecking = () => {
      router.push({
        name: "BookMark",
      });
    };

    return {
      bookmarkSave,
      bookmarkPlus,
      addBookmark,
      sendBookmark,
      sendBookmarkInput,
      bookmarkSaveCheck,
      bookmarkSaveBtn,
      bookmarkChecking,
      addBmCancel,
      bookmarkBtn,
    };
  },
};
</script>

<style lang="sass" scoped>
.icon-purple
  color: #AE6FFF

.box
    width: 30px
    height: 30px
    border-radius: 5px
    background-color: #D8D8D8

.bmSave
  top: 10px
  right: 5px

.text-btn-big
  padding: 0
  color: #AE6FFF
  background: none
  border: none
  font-weight: 500
  font-size: 14px
  font-size: 20px
  font-weight: 700

.zindex
  z-index: 10
  background-color: white

.bookmarkBtn
  border: none
  background: none

.report
  top: 10px

.bookmarks
    font-size: 15px
    top: 80px
    right: 0px

.bm-container
    width: 380px
</style>
