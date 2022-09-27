<template>
  <div class="pr-2">
    <button @click="bookmarkFav" class="btn-icon">
      <div v-if="bmFav" class="bi bi-heart-fill icon-red"></div>
      <div v-else class="bi bi-heart"></div>
    </button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const bmFav = ref(false);

    const bookmarkFav = async () => {
      if (bmFav.value == true) {
        bmFav.value = false;
      } else if (bmFav.value == false) {
        bmFav.value = true;
        try {
          const url = "./api/diary/heart";
          const headers = {
            "Content-Type": "application/json",
            Authorization: store.state.users.me.token,
            mid: store.state.users.me.mid,
          };
          const body = {
            hid: bmFav.value,
            // dino: dino,
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
        } catch (err) {
          console.log(err);
        }
        // 좋아요 누르면 데이터 보낼 것
      }
    };

    return { bmFav, bookmarkFav };
  },
};
</script>

<style lang="sass" scoped>
.icon-red
  color: #FF4040
</style>
