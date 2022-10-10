<template>
  <div class="pt-5">
    <h3 class="">내가 관심있는 태그</h3>
    <div class="d-flex justify-content-between mb-4 mt-1">
      <div class="subtext">관심있는 태그를 찾아보세요!</div>
      <!-- <button
        @click="btnTagEdit"
        style="text-decoration: none"
        class="text-btn routerHover mt-2"
      >
        태그 수정하기
      </button> -->
    </div>
    <div class="purple-box pt-5 pl-4 pr-4 pb-5">
      <div class="ml-2 mr-2 d-flex justify-content-between">
        <div class="flex-wrap gap-2 d-flex">
          <div
            class="tag"
            v-for="(tag, index) in favTags"
            :key="tag + index"
            :data-index="index"
          >
            <!-- @click="clickBg($event)" -->
            <TagButton :class="{ tagColor: state.ev == true }" :tag="tag" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div
    class="container container_default d-flex justify-content-center align-items-center p-0 m-0"
  >
    <div class="q-pa-md">
      <div class="backgrondBox">
        <div>
          <div class="d-flex justify-content-center mb-3">
            <h1 class="home-title mb-4">
              <span class="home-title purple-color">관심있는 태그</span>를 선택
              해주세요(최소 3개 이상)
            </h1>
          </div>
          <div class="scroll grid gap-2 pr-3">
            <div
              class="rows d-flex mb-1 justify-content-center align-items-center"
              v-for="(favTag, index) in favTags"
              :key="'favTag' + index"
              :data-index="index"
              @click="clickBg($event)"
            >
              <button
                @click="tagSelectBtn"
                class="d-flex justify-content-center align-items-center tagSelectBtn"
                style="width: 100%; height: 100%"
              >
                {{ favTag }}
              </button>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <button
            @click="tagSelectRouter"
            class="btn btn-primary"
            :disabled="tagSelection.length < 3"
          >
            <span>{{ tagSelection.length }}개의 태그가 선택됨</span>
          </button>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import axios from "@/axios";
import TagButton from "../components/TagButton.vue";

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      liketag: [],
      allTag: [],
      ev: true,
    });
    const me = computed(() => {
      return store.state.users.me;
    });
    // const clickBg = (e) => {
    //   e.target.style.borderRadius = "15px";
    //   if (
    //     e.target.style.background === "rgb(225, 232, 237)" ||
    //     e.target.style.background === ""
    //   ) {
    //     e.target.style.background = "#AE6FFF";
    //     e.target.style.color = "#fff";
    //   } else if (e.target.style.background === "rgb(174, 111, 255)") {
    //     e.target.style.background = "#E1E8ED";
    //     e.target.style.color = "#000";
    //   }
    // };

    // const tagButton = (event) => {
    //   console.log(event);
    //   if (event == true) {
    //     state.ev = true;
    //   } else if (event == false) {
    //     state.ev = false;
    //   }
    // };
    // 선택된 데이터 담기
    let tagSelection = reactive([]);
    // 태그 선택 개수
    const clickTag = ref(false);
    // const tagSelectBtn = (e) => {
    //   // 배열에 같은 값이 있으면 배열에서 빼버리게
    //   if (tagSelection.indexOf(e.target.innerHTML) === -1) {
    //     tagSelection.push(e.target.innerHTML);
    //     const url = "/decommi/member/editliketaglist";
    //     const headers = {
    //       "Content-Type": "application/json",
    //     };
    //     const body = {
    //       tagName: e.target.innerHTML,
    //       email: store.state.users.me.email,
    //     };
    //     console.log(body);
    //     axios
    //       .post(url, body, { headers })
    //       .then((res) => {
    //         console.log(res.data);
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   } else {
    //     const url = "/decommi/member/editliketaglist";
    //     const headers = {
    //       "Content-Type": "application/json",
    //     };
    //     const body = {
    //       tagName: e.target.innerHTML,
    //       email: store.state.users.me.email,
    //     };
    //     console.log(body);
    //     for (let i = 0; i < tagSelection.length; i++) {
    //       if (tagSelection[i] === e.target.innerHTML) {
    //         axios.post(url, body, { headers }).then((res) => {
    //           console.log(res.data);
    //         });
    //         tagSelection.splice(i, 1);
    //         i--;
    //       }
    //     }
    //   }
    // };
    const tagList = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      const body = {
        email: store.state.users.me.email,
      };
      await axios
        .post("/decommi/member/liketaglist", body, { headers })
        .then((res) => {
          state.liketag.push(...res.data);
          //   for (let i = 0; i < favTags.value.length; i++) {
          //     const element = favTags.value[i];
          //     if (state.liketag.includes(element) == true) {
          //       console.log(element);
          //       state.allTag.push(element);
          //     } else if (state.liketag.includes(element) == false) {
          //       state.allTag.push(element);
          //     }
          //   }
          //   console.log(state.allTag);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    tagList();

    const favTags = ref([
      "운동",
      "여행",
      "라이프스타일",
      "디지털카메라",
      "게임",
      "영화감상",
      "음악감상",
      "자동차",
      "패션",
      "독서",
      "컴퓨터",
      "그림",
      "전시",
      "베이킹",
      "요리",
      "피아노",
      "기타",
      "프라모델조립",
      "해외축구",
      "시",
      "연극",
      "뮤지컬",
    ]);
    return {
      //   tagSelectBtn,
      clickTag,
      favTags,
      tagSelection,
      me,
      // clickBg,
      state,
      // tagButton,
    };
  },
  components: { TagButton },
};
</script>

<style lang="sass" scoped>
.checkTag
  background: red
  color: red

.btn
  width: 100%
  background-color: #AE6FFF
  border: none
  border-radius: 30px
  color: white
  font-weight: 500
  font-size: 16px
  white-space: nowrap

.grid
  display: grid
  grid-template-columns: repeat(5, 1fr)

.rows
  border: none
  background-color: #E1E8ED
  height: 120px
  border-radius: 15px
  font-size: 22px

.scroll
  overflow-y: scroll
  height: 300px
  &::-webkit-scrollbar
    width: 7px
  &::-webkit-scrollbar-thumb
    height: 30%
    background: #AE6FFF
    border-radius: 10px
  &::-webkit-scrollbar-track
    background: rgba(33, 122, 244, .1)


.backgrondBox
  background-color: #EEF6FF
  border: none
  padding: 60px 90px

.tagSelectBtn
  background: none
  border: none
  font-size: 18px
  font-weight: 500


.btn-tag
  padding: 5px 12px
  background-color: #E1E8ED
  border: none
  border-radius: 20px
  color: white
  font-weight: 400
  font-size: 15px
  white-space: nowrap
.btn-tag2
  padding: 5px 12px
  background-color: red
  border: none
  border-radius: 20px
  color: white
  font-weight: 400
  font-size: 15px
  white-space: nowrap
</style>
