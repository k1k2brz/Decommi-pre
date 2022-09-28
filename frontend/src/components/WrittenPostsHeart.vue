<template>
  <div class="pr-2">
    <button @click="bookmarkFav" class="btn-icon">
      <div v-if="state.bmFav" class="bi bi-heart-fill icon-red"></div>
      <div v-else class="bi bi-heart"></div>
    </button>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import axios from "axios";
import { useStore } from "vuex";
export default {
  props: {
    dino: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const store = useStore();
    let state = reactive({
      bmFav: false,
    })
    // 신호 받기
    // dino랑 mid가 들어온다
    // 좋아요의 상태 체크
    // function heartChecking() {
    //   // controller >> 서비스에서 DB로 가서 DB에서 userid , dino가 같은게 있는지 확인하는 컨트롤러
    //   // 있으면 true반환 없으면 false반환
    //   // controller가 두개 나와야한다.
    //   const url = "./api/diary/isheart";
    //   const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: store.state.users.me.token,
    //     mid: store.state.users.me.mid,
    //   };
    //   // axios로 상태값을 체크한다 (백엔드에서 true냐 false냐)
    //   // 백엔드에 hid (상태)
    //   const body = {
    //     dino: props.dino,
    //     mid: store.state.users.me.mid,
    //   };
    //   console.log(body);
    //   axios.post(url, body, { headers })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    //   if (store.state.users.me.mid != 0) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }


    // 좋아요 누르기 (빨간색)
    const bookmarkFav = async () => {
      try {
        const url = "./api/diary/heart";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          // hid: bmFav.value,
          dino: props.dino,
          mid: store.state.users.me.mid,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            if (res.data == false) {
              state.bmFav = false;
            } else if (res.data == true) {
              state.bmFav = true;
            }
            console.log(state.bmFav);
            console.log(res);
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
    return {
      state,
      bookmarkFav,
      // heartChecking
    };
  },
};
</script>

<style lang="sass" scoped>
.icon-red
  color: #FF4040
</style>
