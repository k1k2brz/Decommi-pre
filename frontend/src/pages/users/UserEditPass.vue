<template>
  <div
    class="container container_default d-flex justify-content-center align-items-center p-0 m-0"
  >
    <div class="q-pa-md" style="max-width: 400px">
      <div class="backgrondBox p-5">
        <form @submit.prevent>
          <div class="d-flex justify-content-center">
            <h1 class="home-title mb-4">회원정보 수정</h1>
          </div>
          <div class="mb-3">
            <div class="font14 mb-1 ml-2">
              보안을 위해 비밀번호를 한 번 더 입력해주세요.
            </div>
            <div>
              <input
                v-model="pass.pw"
                type="password"
                class="form-control"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
            <div class="font14 mt-1 ml-2" v-if="pass.pwErr">
              비밀번호가 맞지 않습니다.
            </div>
            <div
              class="mt-3 d-flex justify-content-center align-items-center mb-1"
            >
              <button
                @click.prevent="onBtn"
                type="submit"
                class="btn-regular-full"
              >
                확인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  setup() {
    const store = useStore();

    const me = computed(() => {
      return store.state.users.me;
    });

    const pass = reactive({
      pw: "",
      pwErr: false,
    });
    const onBtn = async () => {
      try {
        const url = "/decommi/member/checkpw";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          email: store.state.users.me.email,
          pw: pass.pw,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            if (res.data == true) {
              router.push({
                name: "UserEdit",
              });
              pass.pwErr = false;
            } else if (res.data == false) {
              pass.pwErr = true;
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    return { onBtn, pass, me };
  },
};
</script>

<style lang="sass" scoped></style>
