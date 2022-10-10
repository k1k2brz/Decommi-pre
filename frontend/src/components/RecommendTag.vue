<template>
  <div class="tagBox d-flex flex-column">
    <div class="mt-4 mb-1 d-flex justify-content-center">
      <p class="filterTitle">나의 추천태그</p>
    </div>
    <div class="ml-2 mr-2 p-3 d-flex justify-content-between">
      <div class="gap-2 d-flex flex-wrap">
        <button
          @click="onClickTag"
          v-for="(recotag, index) in recotags"
          :key="'recotag' + index"
          type="button"
          class="btn-tag-sm d-flex"
        >
          {{ recotag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import axios from "axios";
export default {
  // props: ["recotags"],
  setup() {
    // console.log(props);
    const store = useStore();
    // const router = useRouter();
    const { emit } = getCurrentInstance();

    const recotags = ref([]);

    // 나의 선호태그 뽑기
    const tagList = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      await axios
        .post(
          "/decommi/member/liketaglist",
          { email: store.state.users.me.email },
          { headers }
        )
        .then((res) => {
          recotags.value.push(...res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const onClickTag = async (e) => {
      emit("onClickRecommendTag", e.target.innerHTML);
    };

    onMounted(() => {
      tagList();
    });
    return { recotags, onClickTag };
  },
};
</script>

<style lang="sass" scoped>
.tagBox
  border-radius: 5px
  min-height: 800px
</style>
