<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">내가 좋아요한 다이어리</span>
    </div>
    <!-- <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center gap-1">
        <button class="file-sort">이름순</button>
        <div class="boundaryLine"></div>
        <button class="file-sort">최신순</button>
      </div>
    </div> -->
    <div v-if="!favExist" class="text-center">
      <div class="MiniPostGrid gap-3">
        <MiniPost v-for="bm in state.heart" :key="bm" :bm="bm" />
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
              >아직 좋아요를 누른 다이어리가 없습니다.</span
            >
            <span class="bm-title-sm mt-2"
              >마음에 드는 다이어리에 좋아요를 눌러보세요!</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import MiniPost from "@/components/MiniPost.vue";
import axios from "axios";
// import axios from "axios";
// import Modal from "@/pages/bookmark/BmModal.vue";

export default {
  components: {
    MiniPost,
  },
  setup() {
    const store = useStore();
    const favExist = ref(false);
    const bookmarkValue = ref("");
    let bmTags = reactive([]);
    const showModal = ref(true);

    const state = reactive({
      heart: [],
    });
    console.log(state.heart);

    onMounted(async () => {
      try {
        const url = "/decommi/api/heart";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          mid: store.state.users.me.mid,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            state.heart.push(...res.data.diary);
            watchEffect(() => {
              if (state.heart[0] === undefined) {
                favExist.value = true;
              } else {
                favExist.value = false;
              }
            });
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    });

    if (localStorage.getItem("Content") !== null) {
      localStorage.removeItem("Content");
    }

    return {
      favExist,
      // addBookmark,
      showModal,
      bookmarkValue,
      bmTags,
      state,
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
