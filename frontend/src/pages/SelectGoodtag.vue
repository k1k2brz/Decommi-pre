<template>
  <div
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
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const me = computed(() => {
      return store.state.users.me;
    });

    const tagSelectRouter = () => {
      store.dispatch("users/favTags", {
        id: store.state.users.me.id,
        pw: store.state.users.me.pw,
        email: store.state.users.me.email,
        likeTagList: tagSelection,
      });
      router.push({
        name: "Main",
      });
    };

    const clickBg = (e) => {
      e.target.style.borderRadius = "15px";
      if (
        e.target.style.background === "rgb(225, 232, 237)" ||
        e.target.style.background === ""
      ) {
        e.target.style.background = "#AE6FFF";
        e.target.style.color = "#fff";
      } else if (e.target.style.background === "rgb(174, 111, 255)") {
        e.target.style.background = "#E1E8ED";
        e.target.style.color = "#000";
      }
    };

    // 선택된 데이터 담기
    let tagSelection = reactive([]);
    // 태그 선택 개수
    const clickTag = ref(false);
    const tagSelectBtn = (e) => {
      // 배열에 같은 값이 있으면 배열에서 빼버리게
      if (tagSelection.indexOf(e.target.innerHTML) === -1) {
        tagSelection.push(e.target.innerHTML);
      } else {
        for (let i = 0; i < tagSelection.length; i++) {
          if (tagSelection[i] === e.target.innerHTML) {
            tagSelection.splice(i, 1);
            i--;
          }
        }
      }
    };
    const favTags = ref([
      "운동",
      "여행",
      "라이프스타일",
      "디지털카메라",
      "게임",
      "영화",
      "음악",
      "자동차",
      "패션",
      "독서",
      "컴퓨터",
    ]);
    return {
      tagSelectBtn,
      clickTag,
      favTags,
      tagSelection,
      tagSelectRouter,
      me,
      clickBg,
    };
  },
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
</style>
